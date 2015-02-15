'use strict';
// primero limpiamos el formulario por si hay campos con algun texto
$('#miFormu').each (function(){
  this.reset();
});

// validacion del formulario
$("#miFormu").validate({
    rules: {
        nombre: "required",
        apellidos: "required",
        telefono: {
            required: true,
            digits: true,
            minlength: 9,
            maxlength: 9
        },
        email: {
            required: true,
            minlength: 4
        },
        remail: {
        	equalTo: email
        },
        title: "required",
        nif_cif: {
            required: true
        },
        nom_fact: "required",
        direccion: "required",
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
            iban: true,
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
            
        },
     	submitHandler: function() {
            alert("¡Enviado!");
        }
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

$("#limpiar").click(function(){
    $("#nom_fact").attr('disabled', true);
});
