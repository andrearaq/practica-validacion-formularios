'use strict';
// primero limpiamos el formulario por si hay campos con algun texto
$('#miFormu').each (function(){
  this.reset();
});

// aplicar el plugin chosen al select de Como nos has conocido?
//$(".chosen-select").chosen({allow_single_deselect: true, disable_search_threshold: 5});
//('#conocido').chosen();

// validacion del formulario
$('#miFormu').validate({
    focusCleanup: true,    //quita los errores al entrar en los campos de nuevo
    rules: {
        nombre: 'required',
        apellidos: 'required',
        telefono: {
            required: true,
            digits: true,
            minlength: 9,
            maxlength: 9
        },
        email: {
            required: true,
            minlength: 4
           // remote: '../php/validar_email.php'
        },
        remail: {
        	equalTo: '#email'
        },
        title: 'required',
        nif_cif: {
            required: true,
            minlength: 9,
            nifES:function(){
                // Si el demandante es particular se comprueba formato nif.
                if ($("#dem1").is(":checked")){
                   $('#nif_cif').val().toUpperCase();
                    return 'nifES';
                }
              },
            cifES: function(){
                // Si el demandante es empresa se comprueba formato cif.
                if ($("#dem2").is(":checked")){
                    $('#nif_cif').val().toUpperCase();
                    return 'cifES';
                }
              }
           //   remote: '..php/validar_nif.php'
        },
        nom_fact: 'required',
        direccion: 'required',
        cp: {
            required: true,
            digits: true,
            minlength: 4,
            maxlength: 5
        },
        localidad: 'required',
        provincia: 'required',
        pais: 'required',
        iban: {
            required: true,
            iban: 'iban',
            minlength: 24,
            maxlength: 24
        },
        usuario: {
            required: true,
            minlength: 4
        },
        password: {
            required: true,
            minlength: 8
        },
        rpassword: {
        	equalTo: password
        }
    },   //fin rules
    messages: {
        nif_cif: {
            remote: "Este NIF ya está en uso."
        },
        email: {
            remote: "Este correo ya está en uso."
        },
        iban: {
    		iban: "Introduzca un IBAN correcto (Para España 24 caracteres y empezando por ES)."
  		},
  		cp: {
  			minlength: "Introduce un codigo de 4 o 5 digitos."
  		},
  		remail: {
  			equalTo: "Introduce el mismo email."
  		},
        rpassword: "Introduce la misma contraseña."
    },  //fin messages
 	submitHandler: function() {
        var usuario = $("#usuario").val();
        var precio = $("input[name='pago']:checked").val();
        var resp = confirm("¡Se va a dar de alta al usuario "+usuario+" cuya cuota es de: "+precio+"€ !");
        if (resp) {
            alert("<< Usuario "+usuario+" dado de alta. >>");
        }
        else {
            alert("<< No se ha realizado el alta del usuario "+usuario+". >>");
        }
        // se de o no de alta el usuario se limpia el formulario
        window.location.reload();
    }
});



// comprobación de la complejidad del password
$("#password").focusin(function () {
    $("#password").complexify({}, function (valid, complexity) {
        $("#barraComp").attr("value",complexity);
    });
});

// rellenar el usuario con el email
$("#email").focusout(function() {
    var email=$("#email").val();
    $("#usuario").val(email);
});

// rellenar nombre de facturacion con el nombre y los apellidos cada vez que se rellena el Nombre
$("#nombre").focusout(function() {
    var nomape=$("#nombre").val()+" "+$("#apellidos").val();
    $("#nom_fact").val(nomape);
});

// rellenar nombre de facturacion con el nombre y los apellidos cada vez que se rellenan los Apellidos
$("#apellidos").focusout(function() {
    var nomape=$("#nombre").val()+" "+$("#apellidos").val();
    $("#nom_fact").val(nomape);
});

// Si el Código Postal se compone de 4 dígitos, se agrega un 0 a la izquierda.
$("#cp").focusout(function() {
    var caracteres = $("#cp").val();
        if (caracteres.length == 4) {
            $("#cp").val("0" + caracteres);
        }
        var cod = caracteres.substring(0,2);
        if (cod === "50") {
            $("#localidad").val('Zaragoza');
            $("#provincia").val('Zaragoza');
        }
});

// Si el input:radio #dem1 (particular) esta marcado: 
$("#dem1").change(function(evento) {
    if ($("#dem1").is(':checked')) {
        $("#etiqueta1").html('NIF');
        $("#etiqueta2").html('Nombre');
        var nomape=$("#nombre").val()+" "+$("#apellidos").val();
        $("#nom_fact").val(nomape);
        $("#nom_fact").attr('disabled', true);
    }
});
// Si el input:radio #dem2 (empresa) esta marcado: 
$("#dem2").change(function(evento) {
    if ($("#dem2").is(':checked')) {
        $("#etiqueta1").html('CIF');
        $("#etiqueta2").html('Empresa');
        $("#nom_fact").val('');
        $("#nom_fact").attr('disabled', false);
    }
});

// Metodo para verificar nif 
jQuery.validator.addMethod("nifES", function(value, element) {
    if(/^([0-9]{8})*[a-zA-Z]+$/.test(value)){
        var dni = value.substr(0,value.length-1);
        var l = value.charAt(value.length-1);
        var pos = dni % 23;
        var letra='TRWAGMYFPDXBNJZSQVHLCKET';
        letra=letra.toUpperCase();
        letra=letra.substring(pos,pos+1);
        if (letra==l.toUpperCase()){
            return true;
        }
        else{
            return false;
        }
    }
});

// Metodo para verificar cif
jQuery.validator.addMethod( "cifES", function ( value, element ) {
     var sum,  num = [],  controlDigit;
     value = value.toUpperCase();
      
     // Basic format test
     if ( !value.match( '((^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$|^[T]{1}[A-Z0-9]{8}$)|^[0-9]{8}[A-Z]{1}$)' ) ) {
      return false;
     }
      
     for ( var i = 0; i < 9; i++ ) {
      num[ i ] = parseInt( value.charAt( i ), 10 );
     }
    // chequear codigo CIF 
     sum = num[ 2 ] + num[ 4 ] + num[ 6 ];
     for ( var count = 1; count < 8; count += 2 ) {
          var tmp = ( 2 * num[ count ] ).toString(),
          secondDigit = tmp.charAt( 1 );
          sum += parseInt( tmp.charAt( 0 ), 10 ) + ( secondDigit === '' ? 0 : parseInt( secondDigit, 10 ) );
     }
      
     // CIF test
     if ( /^[ABCDEFGHJNPQRSUVW]{1}/.test( value ) ) {
      sum += '';
      controlDigit = 10 - parseInt( sum.charAt( sum.length - 1 ), 10 );
      value += controlDigit;
      return ( num[ 8 ].toString() === String.fromCharCode( 64 + controlDigit ) || num[ 8 ].toString() === value.charAt( value.length - 1 ) );
     }
     return false;
});


//cuando se pulsa el botón Limpiar
$("#limpiar").click(function(){
    $("#nom_fact").attr('disabled', true);
});
