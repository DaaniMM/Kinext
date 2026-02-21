#importar la clase FastApi de la dependencia fastapi
    #┬┐Qué hace fastAPI? -> permite tener el control total de la url y los metodos get,post ... 
    #┬┐Qué hace UploadFile? -> representa el archivo que sube el usuario -> permite controlar sus datos:  nombre (.filename), tipo (.content_type), contenido (.file)
    #┬┐Qué hace File? -> UNICO USO-> File(...) --> indica a la funcion que el parametro que va a recibir no es una variable del codigo, sino un elemento que va a recibirse mediante la peticion HTTP (recordatorio: en arc se pasaba en el BODY un json con los datos que queria insertar en bd -> pues ese archivo es el video literalmente en .mp4 )
from fastapi import FastAPI, UploadFile, File
import base64
import anthropic

#cv2 -> permite procesar videos e imagenes : abrir video - contar frames totales - seleccionar frames - leer esos frames -convertir a jpg - cerrar video
#tempfile -> crear archivos temporales donde se guarda la info del video para que la use cv2 --> despues se elimina para q no ocupe espacio
#os -> leer la api key, trabajar con archivos/carpetas para buscar archivo temporal y borrarlo
import cv2
import tempfile
import os

#permite ocultar mi apiKey para q nadie pueda verla, pero que siga usandose en el codigo para poder llamar a la ia a q analice
from dotenv import load_dotenv

#Permiso para que mi frontend pueda hablar con mi backend
    #como mi front y mi back (astro - strapi) están separados, por defecto por seguridad no pouedo comunicarme entre ellas
    #sirve para indicar exactamente las url de las que quiero recibir/enviar datos
    #indicar métodos permitidos , etc (headers)
from fastapi.middleware.cors import CORSMiddleware

#para disminuir la cantidad de codigo de este archivo, decido crear un archivo externo que tenga los prompts de los ejercicios
from prompts import PROMPTS_EJERCICIOS



#En la variable app -> guarda la clase FastApi() --> new class()...
app = FastAPI(
    title="KINEXT - Análisis Biomecánico IA",
    version="1.0.0",
    openapi_version="3.1.0"
)

app.add_middleware(  #añade a app la funcionalidad de: (lo de abajo)
    CORSMiddleware,     #usar la clase CORS
    allow_origins=["*"],  #permite peticiones de cualquier dominio --> luego cambiaré a allow_origins=["https://kinext.com"]
    allow_credentials=True, #permite que el frontend envie - Cookies - Headers de autenticación - Sesiones (COOKIES)
    allow_methods=["*"],  #metodos permitidos: cualquiera
    allow_headers=["*"]  #acepta cualquier header http -> content-type , custom-header ....
)

##load_dotenv() #cargar variables de entorno (apiKEY) en .env antes de trabajar

# cliente_claude = anthropic.Anthropic(
#     api_key=os.getenv("ANTHROPIC_API_KEY")
# )

#funcion que recibe la ruta del video como STRINGy el numero de frames (por defecto 3), devuelve una lista (como un array)
def extraer_frames_video(video_path: str, num_frames: int = 3) -> list:
    """
    Extrae frames del video en posiciones distribuidas
    """
    cap = cv2.VideoCapture(video_path) #la variable cap almacena el video abierto -> cap puede leer cantidad de frames, ir a frame especifico, leer contenido de frame, cerrar video

    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT)) #total_frames guarda el resultado EN INTEGER de obtener (get) el numero total de frames (CAP_PROP_FRAME_COUNT)

    if total_frames == 0: #si el total de frames es 0, cierra el video , y lanza una excepcion con un mensaje
        cap.release()
        raise Exception("Video vacío o corrupto") 

    frames_extraidos = [] #crear un list vacio

    for i in range(num_frames): #crea un bucle que itera sobre la cantidad total de frames que tiene el video
        inicio = 0.30
        fin = 0.70
        porcentaje = inicio + i * (fin - inicio) / (num_frames - 1)
        posicion = int(total_frames * porcentaje)
            #explicación de formula  
                #si el video tiene 300 frames (total_frames) y nosotros queremos usar solo 3 frames (num_frames)
                #1┬¬ iteracion: 0.30 + 0 * 0.40 / 2 --> 0.30 (30% del video)
                #2┬¬ iteracion: 0.30 + 1 * 0.40 / 2 --> 0.50 (50% del video)
                #3┬¬ iteracion: 0.30 + 2 * 0.40 / 2 --> 0.70 (70% del video)

        cap.set(cv2.CAP_PROP_POS_FRAMES, posicion) 
        success, frame = cap.read() #UNPACKING
        if not success:
            continue
            #setea una propiedad en cap: Coloca el cursor del video en el frame n┬║ 'posicion' -> por lo q ahora cap es el frame 'posicion' del video
                # .read() - lee imagen - devuelve una tupla con dos cosas -> true/false, la informacion de px de la imagen de ese frame del video
                # UNPACKING == desestructurar --> guarda el primer elemento de la tupla en la variable success, el segundo en frame
                # si success NO es true : continue --> termina y pasa a la siguiente iteracion del bucle
                # si success SI es true no entra en ese "if not" y sigue ejeecutando el codigo tan normal
            
    
        success_encode, buffer = cv2.imencode('.jpg', frame) #UNPACKING
        if not success_encode:
            continue
            #Claude necesita jpg(bytes), pero 'frame' ahora mismo lo que tiene es un array de px
                #.imencode() - comprime img a otra extension - recibe 2 parametros: archivo al que quiero convertir , imagen a convertir
                # UNPACKING --> .imencode() devuelve una tupla con dos cosas -> true/false , array numPY con los bytes (array numPY = lista especial de python para trabajar con numeros, mucho mas rapida)
                    #buffer almacena ese array numPY que tiene los bytes de la img en formato .jpg --> hay que pasarlo a bytes normales

        frame_bytes = buffer.tobytes() #convierte a bytes normales

        frames_extraidos.append(frame_bytes) #añade frame_bytes al list creado antes
        
    cap.release() #cerrar el video y libera memoria


    if len(frames_extraidos) == 0:
        raise Exception("No se pudo extraer ningún frame válido")
            #Si la cantidad de elementos en la list es 0 , lanza error porq no hay ningun frame

    return frames_extraidos



def convertir_a_b64(contenido_bytes: bytes) -> str:
    return base64.b64encode(contenido_bytes).decode('utf-8')
        #de la libreria 'base64' usa el metodo .'codificar/convertir a base64' (bytes a convertir) y .conviertelos a (utf-8 --> texto)



def analizar_con_claude_simulado(imagenes_base64: list, ejercicio: str) -> str:
    """
    Simula análisis de Claude con múltiples frames (SIN gastar API)
    Cuando tengas API key, reemplazarás por llamada real
    """
    
    num_frames = len(imagenes_base64)
    
    return f"""
## Análisis Biomecánico - {ejercicio.title()}

**Frames analizados: {num_frames} (progresión completa)**

**Puntuación técnica: 6.5/10**

### AN├üLISIS POR FASE:

**Frame 1 (30% - Fase inicial):**
✅ Setup correcto
✅ Pies bien posicionados
✅ Torso erguido

**Frame 2 (50% - Posición crítica):**
⚠️ **ERROR detectado:**
   - Rodilla IZQUIERDA comienza valgo (se mete hacia dentro)
   - Rodilla derecha mantiene alineación
   - **Asimetría bilateral**

**Frame 3 (70% - Fase final):**
❌ **ERROR CRÍTICO:**
   - AMBOS talones despegados del suelo
   - Sobrecarga rodillas + inestabilidad
   
✅ Profundidad adecuada (cadera bajo paralelo)

### PROGRESIÓN TEMPORAL:

Frame 1 (30%): Correcto
   ↓
Frame 2 (50%): Aparece valgo rodilla izquierda
   ↓
Frame 3 (70%): Valgo + talones levantados

**Causa probable:** Falta movilidad tobillo + debilidad glúteo medio izquierdo

### CORRECCIONES:

1. **Movilidad tobillo:**
   - Wall ankle stretch 2x/día

2. **Fortalecimiento glúteo medio izquierdo:**
   - Clamshells 3x15
   - Sentadilla con banda en rodillas

### RECOMENDACIÓN:

NO añadir carga hasta corregir patrón. Trabajo correctivo 2-3 semanas.

---
⚠️ MODO SIMULADO - {num_frames} frames procesados sin gasto API
"""


"""
# FUNCIÓN REAL CLAUDE (comentada hasta tener API key)
def analizar_con_claude_real(imagenes_base64: list, ejercicio: str) -> str:
    #1 Crear cliente Claude
    cliente = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY")) #guarda en cliente la conexion con claude api mediante la KEY del .env
    
    #2 Preparar imágenes para Claude
    content_imagenes = []             #list vacia que va a contener las 3 img en b64 para que pueda usarla claude
    for img_b64 in imagenes_base64:   #bucle que itera sobre cada imagen del list pasado como parametro (imagenes en base64)
        content_imagenes.append({     #añade un objeto con type y source
            "type": "image",
            "source": {
                "type": "base64",
                "media_type": "image/jpeg",
                "data": img_b64
            }
        })
    
    #3 Obtener prompt especifico según el ejercicio desde el DICCIONARIO(como un objeto) creado en el archivo prompts.py
    if ejercicio not in PROMPTS_EJERCICIOS:
        raise Exception(f"El ejercicio '{ejercicio}' no está disponible.")  #Si el ejercicio buscado no está en el diciconario -> error

    prompt = PROMPTS_EJERCICIOS.get(ejercicio)  #si el ejercicio está: almacena en la variable el valor correspondiente a la clave ejercicio dentro del diccionario
    
    #4 Llamar a Claude
    mensaje = cliente.messages.create(      #variable mensaje que almacena el resultado de llamar al metodo de 'crear mensaje' con el siguiente formato
        model="claude-sonnet-4-20250514",           #modelo de claude a utilizar
        max_tokens=1000,                            #max de tokens (750 palabras aprox) --> mas tokens=mas caro
        messages=[                                  #array con el contenido del mensaje
            {                                           
                "role": "user",                         #la persona que habla con la ia (el usuario)
                "content": content_imagenes + [         #contenido del mensaje: 3 imagenes + [tipo texto , el prompt escrito antes]
                    {"type": "text", "text": prompt}    
                ]
            }
        ]
    )
    
    #5 Extraer respuesta                 #claude devuelve mensaje.content[ {"type": text , "text": LA RESPUESTA} ]
    return mensaje.content[0].text      #retorna el mensaje de claude, pero solo la respuesta  
"""


#  ==================== RUTAS API ====================


#Cuando app reciba por get "/" -> haz la función inicio() -> devuelve un json con datos, simplemmente para confirmar que el servidor funciona
@app.get("/")
def inicio():
    return{
        "status": "online",
        "servicio": "KINEXT - Análisis Biomecánico IA",
        "version": "1.0.0" 
    }



#Cuando app recibe por post "/subir-imagen" -> el usuario subira el video para q lo analice la IA
    #la función recibe un parametro que no existe en el codigo, pero llamamos "imagen" para poder manejarlo
    #esa "imagen" es de tipo UploadFile (pertenece a esa clase)
    #File(...) le dice a la funcion que esa "imagen" la va a recibir por el BODY de la peticion http (el video que el user suba)
        #finalmente en este caso devuelve el nombre del video
@app.post("/subir-imagen")
def uploadImage(imagen: UploadFile = File(...)):
    return {"nombre_archivo": imagen.filename}




#Cuando app recibe por post una imagen:
    #recibe el parametro imagen, de tipo/clase UploadFile, y con el valor que reciba en el Body de la peticion HTTP (la imagen literal q el user envia)
    #contenido tiene el valor de leer la informacion de la imagen (metodo read)
    #tamaño es el numero de bytes q ocupa esa imagen
    #retorna un objeto con el nombre, tipo y tamaño
@app.post("/analizar-video")
async def analizarVideo(ejercicio: str, video: UploadFile = File(...), modo: str = "simulado"):
    try:
        #crear archivo temporal y almacenar en él los datos bytes del video del usuario
        temp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.mp4') #guarda en la variable un archivo temporal con .NombreUnico (no se borra automatico , archivo .mp4)
        contenido_video = await video.read() #lee los bytes del video y los guarda
        temp_file.write(contenido_video) #escribe los bytes extraidos antes en el archivo temporal
        temp_file.close() #cierra el archivo porq no vamos a editarlo mas
        temp_path = temp_file.name #obtener la ruta del archivo -> /tmp/tmpXYZ123.mp4

        #extraer frames y analizar video
        frames = extraer_frames_video(temp_path, 3) #guardo en la variable los 3 frames extraidos del video en bytes, pasandole la ruta del video de donde tiene q extraer y la cantidad de frames a extraer

        frames_b64 = []  #creo un list vacio y recorro los frames en bytes para convertirlos a base64
        for frame in frames:
            frames_b64.append(convertir_a_b64(frame))

        os.unlink(temp_path) #elimina el archivo temporal para liberar memoria

        if modo == "real":
            return {
                "success": False,
                "error": "Modo real requiere API KEY"
                #analisis = analizar_con_claude_real(frames_b64, ejercicio)
            }
        else:
            analisis = analizar_con_claude_simulado(frames_b64, ejercicio) #guardo el analisis de la ia pasandole el list de frames y el nombre del ejercicio


        return {
            "success": True,
            "ejercicio": ejercicio,
            "analisis": analisis,
            "modo": f"{modo.upper()}"
        }

    except Exception as e:
        return{
            "success": False,
            "error": str(e)
        }




#ahora necesitamos convertir esa informacion a base64 para que pueda procesarla CLAUDE
    #base64 -> forma segura de enviar datos binarios como texto
    #hay que importar la libreria base64 arriba
        #creamos el metodo convertir_a_b64 antes de todo, para
        #modificar funcion analizarImagen añadiendo imagen_b64

#importamos libreria Anthropic arriba del todo

#crear cliente CLaude
    #api key --> contraseña para usar claude desde codigo en vez de navegador
    #



