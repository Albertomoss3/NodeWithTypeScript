import mysql = require('mysql');


export default class MySQL {

	private static _intance: MySQL;

	cnn: mysql.Connection;
	conectado: boolean = false;


	constructor(){
		console.log('Clase Inicializada');
		// Establecer conexion con MySQL
		this.cnn = mysql.createConnection({
			host: 'localhost',
			user: 'node_user',
			password:'123456',
			database:'node_db'
		});
		
		this.conectarDB();
	}

	public static get intance() {
		return this._intance || ( this._intance = new this() );
	}

	static ejecutarQuery( query: string, calback: Function ) {
	
		this.intance.cnn.query(query, ( err, results: Object[], fields ) => {
			
			if ( err ) {
				console.log('Error en Query');
				console.log( err );
				return;
			}
			if ( results.length === 0 ) {
				calback('El registro solicitado no existe');
			} else {
				calback( null, results );
			}
		});
	}

	private conectarDB() {
		this.cnn.connect( ( err: mysql.MysqlError ) => {
			if ( err ) {
				console.log('Salio Error =>', err.message );
				return;
			} 
			this.conectado = true;
			console.log('Base de Datos Online!!!');
		});
	}
}