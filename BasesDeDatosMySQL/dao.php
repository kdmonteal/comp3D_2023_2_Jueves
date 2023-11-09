<?php

class DAO{
	//El atributo $pdo es de caracter protegido, para que pueda usarlo la clase heredada
	protected $pdo;
	/*
	*	El constructor del DAO se encarga de inicializar la cadena de conexión 
	*	hacia MySQL y esta instancia es guardada en la variable $pdo que es de tipo private. 
	*	De esta manera en cada método de la clase puedo hacer referencia a la instancia de 
	*	la conexión a MySQL.
	*/
	public function __CONSTRUCT(){
		require ('configuration.php');
		try{
			$this->pdo = new PDO("mysql:host=".$host.";dbname=".$db, $user, $password);
			$this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			/*
			*	PDO es una capa abstracta para PHP que nos permite realizar consultas a 
			*	la base de datos y entre sus motores soporta mysql, sqlserver, oracle etc.
			*/	        
		}
		catch(Exception $e){
			die($e->getMessage());
		}
	}
}
?>