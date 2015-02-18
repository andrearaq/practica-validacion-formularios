'use strict';
// primero limpiamos el formulario por si hay campos con algun texto
$('#miFormu').each (function(){
  this.reset();
});

// aplicar el plugin chosen al select de Como nos has conocido?
$(".chosen-select").chosen({allow_single_deselect: true, disable_search_threshold: 5});
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
        	equalTo: email
        },
        title: 'required',
        nif_cif: {
            required: true
          //  remote: '..php/validar_nif.php'
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
        },
        messages: {
            nif_cif: {
                remote: "Este NIF ya esta en uso."
            },
            email: {
                remote: "Este correo ya esta en uso."
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
            password: {
                minlength: "Contraseña: mínimo 8 caracteres."
            },
            rpassword: "Introduce la misma contraseña."
            
        },  //fin messages
    },   //fin rules
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
        if (caracteres.length == 4)
            $("#cp").val("0" + caracteres);
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

//cuando se pulsa el botón Limpiar
$("#limpiar").click(function(){
    $("#nom_fact").attr('disabled', true);
});
