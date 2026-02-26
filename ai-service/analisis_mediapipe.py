"""
Análisis biomecánico con MediaPipe - KINEXT PRO
Extrae ángulos articulares, simetría y tempo frame a frame
"""

import cv2
import mediapipe as mp
import numpy as np
import math

mp_pose = mp.solutions.pose


def calcular_angulo(a, b, c):
    """Calcula el ángulo en el punto B formado por los vectores BA y BC"""
    a = np.array(a)
    b = np.array(b)
    c = np.array(c)

    ba = a - b
    bc = c - b

    coseno = np.dot(ba, bc) / (np.linalg.norm(ba) * np.linalg.norm(bc) + 1e-6)
    coseno = np.clip(coseno, -1.0, 1.0)
    angulo = math.degrees(math.acos(coseno))
    return round(angulo, 1)


def get_coords(landmarks, idx, w, h):
    """Devuelve coordenadas en píxeles de un landmark"""
    lm = landmarks[idx]
    return [lm.x * w, lm.y * h]


async def analizarMediaPipe(video_path: str, ejercicio: str, start_time: int, end_time: int):
    """
    Analiza el vídeo con MediaPipe y devuelve métricas biomecánicas.
    Retorna dict con ángulos, simetría y tempo.
    """
    try:
        cap = cv2.VideoCapture(video_path)
        fps = cap.get(cv2.CAP_PROP_FPS) or 30
        w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

        frame_start = int(start_time * fps)
        frame_end = int(end_time * fps)

        # Datos acumulados por frame
        angulos_rodilla_izq = []
        angulos_rodilla_der = []
        angulos_cadera_izq = []
        angulos_cadera_der = []
        alturas_cadera = []  # Para detectar tempo (bajada/subida)

        pose = mp_pose.Pose(
            static_image_mode=False,
            model_complexity=1,
            min_detection_confidence=0.5,
            min_tracking_confidence=0.5
        )

        frame_idx = 0
        cap.set(cv2.CAP_PROP_POS_FRAMES, frame_start)

        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break

            current_frame = frame_start + frame_idx
            if current_frame > frame_end:
                break

            frame_idx += 1

            rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            results = pose.process(rgb)

            if not results.pose_landmarks:
                continue

            lm = results.pose_landmarks.landmark

            # Landmarks clave
            # Izquierda
            cadera_izq = get_coords(lm, mp_pose.PoseLandmark.LEFT_HIP, w, h)
            rodilla_izq = get_coords(lm, mp_pose.PoseLandmark.LEFT_KNEE, w, h)
            tobillo_izq = get_coords(lm, mp_pose.PoseLandmark.LEFT_ANKLE, w, h)
            hombro_izq = get_coords(lm, mp_pose.PoseLandmark.LEFT_SHOULDER, w, h)

            # Derecha
            cadera_der = get_coords(lm, mp_pose.PoseLandmark.RIGHT_HIP, w, h)
            rodilla_der = get_coords(lm, mp_pose.PoseLandmark.RIGHT_KNEE, w, h)
            tobillo_der = get_coords(lm, mp_pose.PoseLandmark.RIGHT_ANKLE, w, h)
            hombro_der = get_coords(lm, mp_pose.PoseLandmark.RIGHT_SHOULDER, w, h)

            # Calcular ángulos
            ang_rod_izq = calcular_angulo(cadera_izq, rodilla_izq, tobillo_izq)
            ang_rod_der = calcular_angulo(cadera_der, rodilla_der, tobillo_der)
            ang_cad_izq = calcular_angulo(hombro_izq, cadera_izq, rodilla_izq)
            ang_cad_der = calcular_angulo(hombro_der, cadera_der, rodilla_der)

            angulos_rodilla_izq.append(ang_rod_izq)
            angulos_rodilla_der.append(ang_rod_der)
            angulos_cadera_izq.append(ang_cad_izq)
            angulos_cadera_der.append(ang_cad_der)

            # Altura media de cadera (normalizada) para tempo
            altura_cadera = (lm[mp_pose.PoseLandmark.LEFT_HIP].y + lm[mp_pose.PoseLandmark.RIGHT_HIP].y) / 2
            alturas_cadera.append(altura_cadera)

        cap.release()
        pose.close()

        if not angulos_rodilla_izq:
            return {"success": False, "msg": "MediaPipe no detectó pose en el vídeo"}

        # --- MÉTRICAS CALCULADAS ---

        # Ángulos mínimos (máxima flexión = punto más bajo)
        min_rod_izq = min(angulos_rodilla_izq)
        min_rod_der = min(angulos_rodilla_der)
        min_cad_izq = min(angulos_cadera_izq)
        min_cad_der = min(angulos_cadera_der)

        # Ángulos medios
        media_rod_izq = round(np.mean(angulos_rodilla_izq), 1)
        media_rod_der = round(np.mean(angulos_rodilla_der), 1)

        # Simetría rodillas (diferencia en ángulo mínimo)
        diff_rodillas = abs(min_rod_izq - min_rod_der)
        simetria_pct = round(max(0, 100 - (diff_rodillas / 1.8)), 1)

        # Profundidad (paralelo = ~90°, por debajo = <90°)
        profundidad_media = round((min_rod_izq + min_rod_der) / 2, 1)
        rompe_paralelo = profundidad_media < 92

        # Valgo detección (simplificado: diferencia asimétrica grande)
        valgo_detectado = diff_rodillas > 15

        # Tempo: detectar bajada y subida usando alturas de cadera
        tempo_excentrico = 0
        tempo_concentrico = 0
        if len(alturas_cadera) > 4:
            # La cadera baja = altura aumenta (coordenadas Y en imagen)
            punto_min = alturas_cadera.index(max(alturas_cadera))  # punto más bajo
            frames_bajada = punto_min
            frames_subida = len(alturas_cadera) - punto_min
            tempo_excentrico = round(frames_bajada / fps, 1)
            tempo_concentrico = round(frames_subida / fps, 1)

        metricas = {
            "angulo_rodilla_izq_min": min_rod_izq,
            "angulo_rodilla_der_min": min_rod_der,
            "angulo_cadera_izq_min": min_cad_izq,
            "angulo_cadera_der_min": min_cad_der,
            "profundidad_media": profundidad_media,
            "rompe_paralelo": rompe_paralelo,
            "simetria_pct": simetria_pct,
            "diferencia_rodillas_deg": round(diff_rodillas, 1),
            "valgo_detectado": valgo_detectado,
            "tempo_excentrico_seg": tempo_excentrico,
            "tempo_concentrico_seg": tempo_concentrico,
            "frames_analizados": len(angulos_rodilla_izq)
        }

        return {"success": True, "metricas": metricas}

    except Exception as e:
        return {"success": False, "msg": f"Error MediaPipe: {str(e)}"}