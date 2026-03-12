# KINEXT - formAI

Plataforma de análisis biomecánico con IA + MediaPipe.

## Stack
- Frontend: Astro v5 + Tailwind CSS
- Backend/CMS: Strapi v5 (SQLite)
- AI Service: FastAPI + Google Gemini + MediaPipe
- Servidor: AWS EC2 t3.micro + Nginx + PM2

## Estructura
- `/frontend` — páginas Astro
- `/backend` — Strapi CMS
- `/ai-service` — FastAPI + Gemini + MediaPipe

---

## ⚠️ PARA RELANZAR LA APP

### Lo que está en GitHub:
- Todo el código fuente
- `backend/.tmp/data.db` — todos los datos de Strapi (entrenadores, blogs, usuarios, planes...)

### Lo que NO está en GitHub (está en OneDrive local):
- `backend/public/uploads/` — 45 imágenes del proyecto
- `ai-service/.env` — API keys de Gemini y Strapi
- `backend/.env` — credenciales de Strapi

### Pasos para relanzar:
1. Crear nueva instancia AWS EC2 t3.micro (Ubuntu)
2. Instalar Node.js, Python, Nginx, PM2
3. Clonar este repositorio: `git clone https://github.com/DaaniMM/formAI.git`
4. Copiar `ai-service/.env` y `backend/.env` desde OneDrive local al servidor
5. Copiar carpeta `backend/public/uploads/` desde OneDrive local al servidor
6. Instalar dependencias: `npm install` en `/backend` y `/frontend`
7. Instalar dependencias Python: `pip install -r requirements.txt` en `/ai-service`
8. Configurar Nginx con el archivo `/etc/nginx/sites-available/formia` (ver configuración anterior)
9. Lanzar con PM2: `pm2 start ecosystem.config.js`