# Explicación: 
    # El archivo main.py es el que "escucha" lo que se recibe desde el front (Astro)

# Imports:
    #fastAPI -> permite tener el control total de la url y los metodos get,post ... 
    #UploadFile? -> representa el archivo que sube el usuario -> permite controlar sus datos:  nombre (.filename), tipo (.content_type), contenido (.file)
    #File? -> UNICO USO-> File(...) --> indica a la funcion que el parametro que va a recibir no es una variable del codigo, sino un elemento que va a recibirse mediante la peticion HTTP (recordatorio: en arc se pasaba en el BODY un json con los datos que queria insertar en bd -> pues ese archivo es el video literalmente en .mp4 )
    #fastapi.middleware.cors -> permisos para que front y end se comuniquen -> como front y back estan separados, por defecto de seguridad no pueden comunicar -> permite indicar exactamente las url de las que quiero recibir/enviar datos, indicar métodos permitidos , etc (headers)
    #os -> leer la api key, trabajar con archivos/carpetas para buscar archivo temporal y borrarlo

    #analisis_gemini -> el archivo .py que contiene el método para analizar el video usando geminis

from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import tempfile
import os
import httpx 
from pydantic import BaseModel
from analisis_gemini import analizarGemini


# Crear la app
app = FastAPI()

# Headers de la peticion HTTP para permitir que front y back interactuen -> admite todos los métodos y headers desde la url de mi web
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], #ULR DE MI WEB EN VEZ DE EL *
    allow_methods=["*"],
    allow_headers=["*"]
)


# Endpoints
# Verificar que el servidor responde correctamente
@app.get("/")
def home():
    return {"status": "Servidor de KINEXT funcionando"}

#post -> analizar video
    #Eecibe como parametros: 
        #video -> parametro de tipo uploadfile (datos binarios del video y métodos para obtener nombre, leer...) cuyo valor es File(...) -> File indica que busque ese parametro en el body de la peticion http // (...) indica que es obligatorio obtener ese parametro
        #ejercicio,start_time y end_time -> parametros cuyo valor es Form() --> indica que el valor viene como texto/número en el body de la petición HTTP
    # 1 Como el parametro video es uploadFile, tiene el metodo read. Se usa await para esperar a que se lea el video por completo antes de guardarlo en la variable
        # Validación: si el archivo no es un video, termina ejecución y devuelve error
        # Validación: si el archivo supera los 100mb, termina ejecución y devuelve error (límite de ia que hace analisis-geminis)
    # 2 Se crea un archivo temporal que almacene ese video (para usar-eliminar y que no ocupe espacio)
        # delete=False --> por defecto se elimina automat. al hacer close() -> False permite que siga existiendo hata que haga yo unlink()
        # suffix=".mp4" -> para que el video sea mp4
            #.write() ---> guarda en el archivo temporal el video 
            #.close() ---> cierra el archivo cuando se deja de escribir para que no de error (si no cierro, pc puede pensar que quiero seguir escribiendo y genera errores)
            #.name ------> permite guardar en la variable el "id" de ese video en la nube
    # 3 Guarda en la variable response el resultado (analisis) de llamar a la funcion que está en el archivo analisis_geminis.py (importado al principio)
    # 4 Cuando la ia ha dado la respuesta, o cuando se produce error en la ejecución, si existe la ruta -> eliminamos el archivo temporal que tenga el "id"(ruta) para liberar espacio

@app.post("/analizar_video")
async def analizar_video(video: UploadFile = File(...), ejercicio: str = Form(...), start_time: int = Form(...), end_time: int = Form(...)):
    ruta_video_temporal = None
    try:
        #1
        video_subido = await video.read()

        if not video.content_type.startswith("video/"):
            return {"success": False, "msg": "Solo se aceptan videos"}

        tamaño_mb = len(video_subido) / 1024 / 1024
        if tamaño_mb > 100:
            return {"success": False, "msg": "El video es muy pesado (supera 100mb)"}

        #2
        video_temporal = tempfile.NamedTemporaryFile(delete=False, suffix=".mp4")
        video_temporal.write(video_subido)
        video_temporal.close()
        ruta_video_temporal = video_temporal.name

        #3
        response = await analizarGemini(ruta_video_temporal, ejercicio, start_time, end_time)

        return response

    except Exception as e:
        return {"success": False, "msg": f"Error en el servidor: {str(e)}"}
    
    finally: 
        #4
        if ruta_video_temporal:
            os.unlink(ruta_video_temporal)

class ContactoSchema(BaseModel):
    nombre: str
    email: str
    asunto: str
    mensaje: str

@app.post("/contacto")
async def guardar_contacto(data: ContactoSchema):
    strapi_url = "http://localhost:1337/api/mails"
    payload = {
        "data": {
            "nombre": data.nombre,
            "email": data.email,
            "asunto": data.asunto,
            "mensaje": data.mensaje,
            "leido": False
        }
    }
    async with httpx.AsyncClient() as client:
        res = await client.post(strapi_url, json=payload)
        if res.status_code in [200, 201]:
            return {"ok": True}
        else:
            raise HTTPException(status_code=500, detail="Error guardando en Strapi")



class ContactoSchema(BaseModel):
    nombre: str
    email: str
    asunto: str
    mensaje: str

@app.post("/contacto")
async def guardar_contacto(data: ContactoSchema):
    strapi_url = "http://localhost:1337/api/mails"
    payload = {
        "data": {
            "nombre": data.nombre,
            "email": data.email,
            "asunto": data.asunto,
            "mensaje": data.mensaje,
            "leido": False
        }
    }
    async with httpx.AsyncClient() as client:
        res = await client.post(strapi_url, json=payload)
        if res.status_code in [200, 201]:
            return {"ok": True}
        else:
            raise HTTPException(status_code=500, detail="Error guardando en Strapi")



# http://127.0.0.1:8000
#Docs: http://127.0.0.1:8000/docs
