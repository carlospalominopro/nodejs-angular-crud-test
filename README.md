
# DOCUMENTACION PRUEBA TÉCNICA


## INSTALACION - FRONTEND

Framework : Angular

Nota: Se debe tener instalado Angular 12.

1. npm install
2. ng serve

Acceder desde el navegador http://localhost:4200

## INSTALACION BASE DE DATOS

Gestor BD: MySQL(8+)

Usuario: root 
Contraseña: 12345
Puerto : 3306
Host : 127.0.0.1


## INSTALACION - BACKEND

Node.JS
Framework: Express.js
ORM: Sequelize

Nota: se debe tener instalado Node.js (14+)

1. npm install
2. npx sequelize-cli db:create (Crea base de datos configurada en backend)
3. npx sequelize-cli db:migrate (Migra tablas necesarias)
4. npx sequelize-cli db:seed:all (Ejecuta sembrador para usuario inicial admin)
5. npm run dev (Inicializa proyecto backend)

