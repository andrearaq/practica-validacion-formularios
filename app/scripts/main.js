$("#miFormu").validate({
    rules: {
        nombre: {
            required: true
        },
        apellidos: {
            required: true
        },
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
        title: {
            required: true
        },
        nif_cif: {
            required: true
        },
        nom_fact: {
            required: true
        },
        direccion: {
            required: true
        },
        cp: {
            required: true,
            digits: true,
            rangelength: [4, 5]
        },
        localidad: {
            required: true
        },
        provincia: {
            required: true
        },
        pais: {
            required: true
        },
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
            required: true
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
      		}
        },
        errorPlacement: function( error, element ) {
			error.insertAfter( element.parent() );
		},
		submitHandler: function() {
            alert("¡Envíado!");
        }
    }
});


