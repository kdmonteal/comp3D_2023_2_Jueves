<?php
    include_once('../configuration.php');

    // Model - entity
    require_once('../model/user_entity.php');
    // Controller - Funciones de Consulta
    require_once('../controller/user_dao.php');

    $alm   = new User();
    $model = new UserDao();

    if(isset($_REQUEST['action'])){

        switch ($_REQUEST['action']) {
            case 'insert': // OK
                # code...
                $alm->__SET('nickname', $_REQUEST['nickname']);
                $alm->__SET('points',   $_REQUEST['points']);

                $model->insert($alm); // DEBERIA TENER UN P DE ENTRADA
                // header('Location: http://localhost/dbClass/views/playScreen.html');

            break;
            case 'select': // OK
                # code...
                $allData = $model->select();
                
                for ($i=0; $i<count($allData); $i++) { 
                    // var_dump($allData);
                    echo $allData[$i]->__GET('nickname').','.$allData[$i]->__GET('points').'/'.'</br>';
                }
            break;
            case 'update':
                # code...
                $alm->__SET('points', $_REQUEST['points']);
                $nickGet = $_REQUEST['nickname'];
                $model->update($alm, $nickGet); // 2 entradas
            break;
            case 'delete':
                # code...
                $model->delete();
            break;
        }
    }
?>