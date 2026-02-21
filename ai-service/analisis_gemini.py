# Explicación:
    # En el front, el usuario sube el video y selecciona el star_time y end_time fisicamente mediante NoUiSlider (libreria js)
    # Eso se pasa como parametros a la función de análisis, junto con el video y el ejercicio a analizar.
    # Gemini ve el video y se enfoca en el tramo entre star y end -> devuelve analisis

#Imports
    #fastAPI -> permite tener el control total de la url y los metodos get,post ... 
    #UploadFile? -> representa el archivo que sube el usuario -> permite controlar sus datos:  nombre (.filename), tipo (.content_type), contenido (.file)
    #File? -> UNICO USO-> File(...) --> indica a la funcion que el parametro que va a recibir no es una variable del codigo, sino un elemento que va a recibirse mediante la peticion HTTP (recordatorio: en arc se pasaba en el BODY un json con los datos que queria insertar en bd -> pues ese archivo es el video literalmente en .mp4 )
    #time -> permite "controlar el tiempo". En este caso, se usa para time.sleep(2)
    #os -> leer la api key, trabajar con archivos/carpetas para buscar archivo temporal y borrarlo
    #google.generativeai -> traduce el codigo python a "lenguaje ia Google"
    #tempfile -> crear archivos temporales donde se guarda la info del video para que la use cv2 --> despues se elimina para q no ocupe espacio
    #dotenv -> permite ocultar mi apiKey para q nadie pueda verla, pero que siga usandose en el codigo para poder llamar a la ia a q analice
    #prompts -> archivo .py que tiene todos los prompts en base al ejercicio seleccionado

from fastapi import FastAPI, UploadFile, File
import os
import time 
import google.generativeai as genai
import tempfile
from dotenv import load_dotenv
from prompts import PROMPTS_EJERCICIOS

    # Cargar archivo .env (es decir, la api key)
load_dotenv()

    # Configurar la api key de Google
        #.configure() permite añadir una configuracion a la conexion con google (genai)
        #el parámetro que se le pasa es api_key, con el valor que tenga "GOOGLE_API_KEY" dentro dela rchivo .env
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))




    # Función para recibir video y analizarlo
        # Como el proceso de subir video-analizar-responder al usuario tarda -> necesitamos asincronia (async)
            # 1 Primero se obtiene el prompt del archivo .py en base al ejercicio que el usuario elige
            # 2 Y se comprueba si no existe para devolver un error. Si existe continua la ejecución
            # 3 Se crea el prompt final = prompt + star y end times seleccionados por usuario
            # 4 La variable video guarda un "objeto de referencia" que apunta al video subido a la nube de google
            # 5 POLLING -> mientras el estado del videos sea PROCESSING, se pone un temporizador de 2s antes de obtener el video
                # Motivo -> como el video tarda un poco en subirse, mientras tanto se lanzarían constantemente peticiones a google sin parar para obtener ese video
                # Problema -> Google puede bloquearme por hacer miles de peticiones/segund sin respuesta (puede interpretar ataque)
                # Resolución -> Se hace petición cada 2s para asegurar que google procesa y me devuelve el video. -> video.name es el "id" que google asigna al video subido a su nube --> el bucle se resuelve cuando state = ACTIVE // ERROR
            # 6 El método generate_content permite que la ia vea el video y responda en base al prompt que le he pasado
            # 7 Tras el analisis se borra el video subido a la nube para liberar espacio
            # 8 Si todo sale bien, devuelve true y la respuesta de la ia (response)
                # response devuelve un objeto con muchos "metadatos" --> .text es el que contiene el analisis en texto del ejercicio
        # Finalmente, si el bloque try falla, se lanza la Exception

async def analizarGemini(video_path: str, ejercicio: str, start_time: int, end_time: int):
    model = genai.GenerativeModel("gemini-2.5-flash") # Inicializar el modelo -> GenerativeModel crea una instancia con el modelo ia seleccionado
    try:
        #1
        prompt = PROMPTS_EJERCICIOS.get(ejercicio)

        #2
        if not prompt:
            return {"success": False, "msg":"Error, ejercicio no encontrado"}
        
        #3
        prompt_final = (f"""{prompt} IMPORTANTE: El usuario ha marcado que el ejercicio ocurre entre el segundo {start_time} y el segundo {end_time}. Céntrate solo en ese intervalo.""")

        #4
        video = genai.upload_file(path=video_path)

        #5
        while video.state.name == "PROCESSING":
            time.sleep(2)
            video= genai.get_file(video.name)

        if video.state.name == "FAILED":
            return {"success": False, "msg": "Gemini no pudo procesar video"}

        #6
        response = model.generate_content([video, prompt_final])

        #7
        genai.delete_file(video.name)

        #8
        return{"success": True, "msg":response.text}
    
    except Exception as e:
        return {"success": False, "msg":str(e)}
