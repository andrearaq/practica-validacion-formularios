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
            rangelength: [4, 5]
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
      			rangelength: "Introduce un codigo de 4 o 5 digitos."
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

// rellenar nombre con el nombre y los apellidos
$("#apellidos").focusout(function() {
    var nomape=$("#nombre").val()+" "+$("#apellidos").val();
    $("#nom_fact").val(nomape);
});


