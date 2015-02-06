console.log('\'Allo \'Allo!');
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
            digits: true;
            minlength: 9,
            maxlength: 9
        },
        email: {
            required: true
        },
        dem1: {
            required: true
        },
        dem2: {
            required: true
        },
        cif: {
            required: true
        },
        nom_dem: {
            required: true
        },
        direccion: {
            required: true
        },
        cp: {
            required: true,
            digits: true,
            minlength: 4,
            maxlength: 5
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
            required: true
        },
        usuario: {
            required: true,
            minlength: 4
        },
        password: {
            required: true
        }
    });


