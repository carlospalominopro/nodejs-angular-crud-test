
# DOCUMENTACION PRUEBA TÉCNICA


## INSTALACION - FRONTEND

Framework : Angular

Nota: Se debe tener instalado Angular 12.

1. npm install
2. ng serve
3. Acceder desde el navegador http://localhost:4200


API EXTERNA (ROL USER): http://my-json-server.typicode.com/carlospalominopro/nodejs-angular-crud-test/articles 

RUTAS FRONTEND: 

1. /login : Inicio de sesión
2. /users : Administración de usuarios
3. /news : Articulos (API EXTERNA)


## INSTALACION BASE DE DATOS

Gestor BD: MySQL(8+)

Nota: Es requerido que exista la conexión local para el funcionamiento del proyecto.

- Usuario: root 
- Contraseña: 12345
- Puerto : 3306
- Host : 127.0.0.1

## INSTALACION - BACKEND

Node.JS

Framework: Express.js
ORM: Sequelize

Nota: se debe tener instalado Node.js (14+), si no se desea crear las migraciones y saltar el proceso, la base de datos queda exportada en la carpeta "database" del backend.

1. npm install
2. npx sequelize-cli db:create (Crea base de datos configurada en backend)
3. npx sequelize-cli db:migrate (Migra tablas necesarias)
4. npx sequelize-cli db:seed:all (Ejecuta sembrador para usuario inicial admin y roles)
5. npm run dev (Inicializa proyecto backend)
6. Ruta api http://localhost:8081/api


RUTAS BACKEND API: 

1. /api/login : Iniciar sesión
1. /api/user/list : Listar usuarios
1. /api/user/create : Crear usuario
1. /api/user/update : Actualizar usuario
1. /api/user/delete/:id : Eliminar usuario
1. /api/user/changeStatus : Cambiar estado usuario

# Nota

Al ejecutar los sembradores, la tabla "users" tendrá un usuario por defecto con las siguientes credenciales

1. Usuario: admin
2. Constraseña: 123123

## BIBLOTECAS USADAS

1. Angular Material
2. Bootstrap
3. Express.js
4. Sequelize ORM
5. JWT

### Hecho por: Carlos Palomino Ortiz @ 2021
