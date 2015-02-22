<?php  
// Validacion del email
    
    header("Access-Control-Allow-Origin: *");  // permite usar CORS
    //Cadena de conexión seleccionando bd:
    @$userv = new mysqli("localhost", "magutierrez_adm", "admindaw2015", "magutierrez_fut");
   
    //guardamos email enviado desde el formulario
    $email=trim(strtolower($_REQUEST['email']));

    $errorbd = $userv -> connect_errno;
    // si la conexión con la base de datos NO da error
    if ($errorbd==null) {  

        //inicializamos el cliente en utf-8:
        $userv->set_charset("utf8");

        //creamos la consulta sobre la tabla usuarios_serv
        $sql = "SELECT nif_cif, email FROM usuarios_serv";
        $resultado = $userv->query($sql);
        $data = array();
        // obtenemos los datos y comparamos el nif:
        $salida='true';
        while ($row = $resultado->fetch_assoc()) {
            if ( $row['email']==$email){
                $salida='"Ese Usuario ya está registrado."';
            }
        } 
    }
    else {     // si la conexión da error
        print "Imposible conectar con la bbdd de usuarios";
    }  
   $userv->close();
   unset($userv);
   echo $salida;
?>