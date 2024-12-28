# Proyecto NOC

Seguimiento de tareas

# dev

1. Clonar el archivo .env.template a .env
2. Configurar las variables de entorno
```
PORT=8000

MAILER_SERVICE=gmail
MAILER_EMAIL=dsmith.mr@gmail.com
MAILER_SECRET_KEY=123456789

PROD=false

MONGO_URL=mongodb://duvan:123456@localhost:27017
MONGO_DB_NAME=NOC
MONGO_USER=duvan
MONGO_PASS=123456

POSTGRES_URL="postgresql://postgres:123456@localhost:5432/NOC?schema=public"
POSTGRES_USER=postgres
POSTGRES_DB=NOC
POSTGRES_PASSWORD=123456
```

3. Ejecutar el comando ``` npm install ```

4. Contraseñas de aplicaciones: https://myaccount.google.com/u/0/apppasswords?pli=1&rapt=AEjHL4MpBi3TY_qMpnOXJMcIr3oLcD3PNuZAYtH_92KgX2rklmyN6Pcb3lbOSyxvc_twBdMDUDePrYi3hLv715RR67oxJ9igncT4ijwJDND9aYXpihxEulQ

5. Ejecutar el comando docker para pruebas de mongo ``` docker compose up -d ```