<?php
// insert, select, update, delete
require_once('../dao.php'); 

class UserDao extends DAO{
    //Metodo constructor de la clase User
	public function __CONSTRUCT(){
		//llamado al constructor de la clase padre DAO
        parent::__construct();
	}
	/*
	*	Se debe usar try/catch para detectar errores en tiempo de ejecucion en todos los metodos.
    */
    public function insert(User $data){
        // echo 'insert';
        try{
            $sql = "INSERT INTO user(nickname, 
                                     points) 
                    VALUES (?,?)";

            $this->pdo->prepare($sql)->execute(
                // nickname points
                array(
                    $data->__GET('nickname'),  // GET 
                    $data->__GET('points')     // GET 
                )
            );
        }catch(Exception $e){
            die($e->getMessage());
        }
    }

    public function select(){
        // echo 'select';
        try{
            $result = array();
            $sql = "SELECT * 
                    FROM user 
                    ORDER BY points DESC";

            $stm = $this->pdo->prepare($sql);
            $stm->execute();
            
            // 1. Pegar el codigo
            foreach($stm->fetchAll(PDO::FETCH_OBJ) as $r){
				$std = new User(); // 2. cambiar por User
				$std->__SET('iduser',   $r->iduser);
				$std->__SET('nickname', $r->nickname);
				$std->__SET('points',   $r->points);

				$result[] = $std;
			}
            return $result;  // 3. Retornar el result
        }catch(Exception $e){
            die($e->getMessage());
        }

    }

    public function update(User $data, $nicknameSet){
        // echo 'update';
        try{
            $sql = "UPDATE user
                    SET points = ?
                    WHERE nickname= '".$nicknameSet."'";

            $this->pdo->prepare($sql)->execute(
                // nickname points
                array(
                    $data->__GET('points')
                )
            );
        }catch(Exception $e){
            die($e->getMessage());
        }
    }

    public function delete(){
        // echo 'delete';
    }
}