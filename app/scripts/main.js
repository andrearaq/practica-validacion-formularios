'use strict';
// primero limpiamos el formulario por si hay campos con algun texto
$('#miFormu').each (function(){
  this.reset();
});

// aplicar el plugin chosen al select de Como nos has conocido?
//$(".chosen-select").chosen({allow_single_deselect: true, disable_search_threshold: 5});
//('#conocido').chosen();

// cargamos las provincias usando ajax
$('#provincia').load("php/provincias.php");

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
            minlength: 4,
            remote: 'php/validar_email.php'
        },
        remail: {
        	equalTo: '#email'
        },
        title: 'required',
        nif_cif: {
            required: true,
            minlength: 9,
            remote: 'php/validar_nif.php',
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
        var cod = parseInt(caracteres.substring(0,2));  // obtengo el codigo de la provincia segun el cp introducido

       // se rellena la provincia con el nombre segun los dos primeros digitos del codigo postal
        $("#provincia option[value="+cod+"]").attr("selected",true);

    // se rellena también la localidad con el nombre de la provincia y se permite luego modificarla
    // sea o no Zaragoza
        $("#localidad").val($("#provincia option:selected").html());

    // si el codigo está entre 1 y 53 el país es España en caso contrario se introducirá
        if ( cod>0 && cod<53) {
            $("#pais").val('España');
        } else {
            $("#pais").val('');
            $("#localidad").val('');
            $("#provincia option[value=0]").attr("selected",true);
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
    "use strict";

    var num = [], controlDigit, sum, i, count, tmp, secondDigit;
    value = value.toUpperCase();

    // Quick format test
    if ( !value.match( "((^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$|^[T]{1}[A-Z0-9]{8}$)|^[0-9]{8}[A-Z]{1}$)" ) ) {
        return false;
    }
    for ( i = 0; i < 9; i++ ) {
        num[ i ] = parseInt( value.charAt( i ), 10 );
    }
    // Algorithm for checking CIF codes
    sum = num[ 2 ] + num[ 4 ] + num[ 6 ];
    for ( count = 1; count < 8; count += 2 ) {
        tmp = ( 2 * num[ count ] ).toString();
        secondDigit = tmp.charAt( 1 );
        sum += parseInt( tmp.charAt( 0 ), 10 ) + ( secondDigit === "" ? 0 : parseInt( secondDigit, 10 ) );
    }

    /* The first (position 1) is a letter following the following criteria:
     *  A. Corporations
     *  B. LLCs
     *  C. General partnerships
     *  D. Companies limited partnerships
     *  E. Communities of goods
     *  F. Cooperative Societies
     *  G. Associations
     *  H. Communities of homeowners in horizontal property regime
     *  J. Civil Societies
     *  K. Old format
     *  L. Old format
     *  M. Old format
     *  N. Nonresident entities
     *  P. Local authorities
     *  Q. Autonomous bodies, state or not, and the like, and congregations and religious institutions
     *  R. Congregations and religious institutions (since 2008 ORDER EHA/451/2008)
     *  S. Organs of State Administration and regions
     *  V. Agrarian Transformation
     *  W. Permanent establishments of non-resident in Spain
     */
    if ( /^[ABCDEFGHJNPQRSUVW]{1}/.test( value ) ) {
        sum += "";
        controlDigit = 10 - parseInt( sum.charAt( sum.length - 1 ), 10 );
        value += controlDigit;
        return ( num[ 8 ].toString() === String.fromCharCode( 64 + controlDigit ) || num[ 8 ].toString() === value.charAt( value.length - 1 ) );
    }
    return false;
});

/**
* IBAN is the international bank account number.
* It has a country - specific format, that is checked here too
*/
$.validator.addMethod("iban", function(value, element) {
    // some quick simple tests to prevent needless work
    if (this.optional(element)) {
        return true;
    }
    // remove spaces and to upper case
    var iban = value.replace(/ /g, "").toUpperCase(),
    ibancheckdigits = "",
    leadingZeroes = true,
    cRest = "",
    cOperator = "",
    countrycode, ibancheck, charAt, cChar, bbanpattern, bbancountrypatterns, ibanregexp, i, p;
    if (!(/^([a-zA-Z0-9]{4} ){2,8}[a-zA-Z0-9]{1,4}|[a-zA-Z0-9]{12,34}$/.test(iban))) {
        return false;
    }
    // check the country code and find the country specific format
    countrycode = iban.substring(0, 2);
    bbancountrypatterns = {
        "AL": "\\d{8}[\\dA-Z]{16}",
        "AD": "\\d{8}[\\dA-Z]{12}",
        "AT": "\\d{16}",
        "AZ": "[\\dA-Z]{4}\\d{20}",
        "BE": "\\d{12}",
        "BH": "[A-Z]{4}[\\dA-Z]{14}",
        "BA": "\\d{16}",
        "BR": "\\d{23}[A-Z][\\dA-Z]",
        "BG": "[A-Z]{4}\\d{6}[\\dA-Z]{8}",
        "CR": "\\d{17}",
        "HR": "\\d{17}",
        "CY": "\\d{8}[\\dA-Z]{16}",
        "CZ": "\\d{20}",
        "DK": "\\d{14}",
        "DO": "[A-Z]{4}\\d{20}",
        "EE": "\\d{16}",
        "FO": "\\d{14}",
        "FI": "\\d{14}",
        "FR": "\\d{10}[\\dA-Z]{11}\\d{2}",
        "GE": "[\\dA-Z]{2}\\d{16}",
        "DE": "\\d{18}",
        "GI": "[A-Z]{4}[\\dA-Z]{15}",
        "GR": "\\d{7}[\\dA-Z]{16}",
        "GL": "\\d{14}",
        "GT": "[\\dA-Z]{4}[\\dA-Z]{20}",
        "HU": "\\d{24}",
        "IS": "\\d{22}",
        "IE": "[\\dA-Z]{4}\\d{14}",
        "IL": "\\d{19}",
        "IT": "[A-Z]\\d{10}[\\dA-Z]{12}",
        "KZ": "\\d{3}[\\dA-Z]{13}",
        "KW": "[A-Z]{4}[\\dA-Z]{22}",
        "LV": "[A-Z]{4}[\\dA-Z]{13}",
        "LB": "\\d{4}[\\dA-Z]{20}",
        "LI": "\\d{5}[\\dA-Z]{12}",
        "LT": "\\d{16}",
        "LU": "\\d{3}[\\dA-Z]{13}",
        "MK": "\\d{3}[\\dA-Z]{10}\\d{2}",
        "MT": "[A-Z]{4}\\d{5}[\\dA-Z]{18}",
        "MR": "\\d{23}",
        "MU": "[A-Z]{4}\\d{19}[A-Z]{3}",
        "MC": "\\d{10}[\\dA-Z]{11}\\d{2}",
        "MD": "[\\dA-Z]{2}\\d{18}",
        "ME": "\\d{18}",
        "NL": "[A-Z]{4}\\d{10}",
        "NO": "\\d{11}",
        "PK": "[\\dA-Z]{4}\\d{16}",
        "PS": "[\\dA-Z]{4}\\d{21}",
        "PL": "\\d{24}",
        "PT": "\\d{21}",
        "RO": "[A-Z]{4}[\\dA-Z]{16}",
        "SM": "[A-Z]\\d{10}[\\dA-Z]{12}",
        "SA": "\\d{2}[\\dA-Z]{18}",
        "RS": "\\d{18}",
        "SK": "\\d{20}",
        "SI": "\\d{15}",
        "ES": "\\d{20}",
        "SE": "\\d{20}",
        "CH": "\\d{5}[\\dA-Z]{12}",
        "TN": "\\d{20}",
        "TR": "\\d{5}[\\dA-Z]{17}",
        "AE": "\\d{3}\\d{16}",
        "GB": "[A-Z]{4}\\d{14}",
        "VG": "[\\dA-Z]{4}\\d{16}"
    };
    bbanpattern = bbancountrypatterns[countrycode];
    // As new countries will start using IBAN in the
    // future, we only check if the countrycode is known.
    // This prevents false negatives, while almost all
    // false positives introduced by this, will be caught
    // by the checksum validation below anyway.
    // Strict checking should return FALSE for unknown
    // countries.
    if (typeof bbanpattern !== "undefined") {
        ibanregexp = new RegExp("^[A-Z]{2}\\d{2}" + bbanpattern + "$", "");
    if (!(ibanregexp.test(iban))) {
        return false; // invalid country specific format
    }
    }
    // now check the checksum, first convert to digits
    ibancheck = iban.substring(4, iban.length) + iban.substring(0, 4);
    for (i = 0; i < ibancheck.length; i++) {
        charAt = ibancheck.charAt(i);
        if (charAt !== "0") {
            leadingZeroes = false;
        }
        if (!leadingZeroes) {
            ibancheckdigits += "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(charAt);
        }
    }
    // calculate the result of: ibancheckdigits % 97
    for (p = 0; p < ibancheckdigits.length; p++) {
        cChar = ibancheckdigits.charAt(p);
        cOperator = "" + cRest + "" + cChar;
        cRest = cOperator % 97;
    }
    return cRest === 1;
}, "Por favor introduce un IBAN correcto");

//cuando se pulsa el botón Limpiar
$("#limpiar").click(function(){
    $("#nom_fact").attr('disabled', true);
});
