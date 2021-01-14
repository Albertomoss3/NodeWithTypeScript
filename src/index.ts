import Server from './server/server';
import router from './router/router';
import MySQL from './mysql/mysql';
const express = require('express');

const app = express();
app.use(express.json());

const  server = Server.init( 3000 );

//Rutas
server.app.use( router );

//Intancia de la Base de datos
MySQL.intance;

server.start( () => {
	console.log('Servidor corriendo en el puerto 3000');
	
})