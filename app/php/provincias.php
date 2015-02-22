<?php  
// Cargar provincias
    //Cadena de conexión seleccionando bd:
    @$userv = new mysqli("localhost", "magutierrez_adm", "admindaw2015", "magutierrez_fut");
   
    $errorbd = $userv -> connect_errno;
    // si la conexión con la base de datos NO da error
    if ($errorbd==null) {  

        //inicializamos el cliente en utf-8:
        $userv->set_charset("utf8");

        //creamos la consulta sobre la tabla usuarios_serv
        $sql = "SELECT id_provincia, provincia FROM provincias";
        $resultado = $userv->query($sql);
        // obtenemos los datos 
        $data="<option value='0'>Elige provincia...</option>";
        while ($row = $resultado->fetch_assoc()) {
            $data .="<option value='".$row['id_provincia']."'>".$row['provincia']."</option>";
        } 
    }
    else {     // si la conexión da error
        print "Imposible conectar con la bbdd de provincias";
    }  
   $userv->close();
   unset($userv);
   echo $data;
?>