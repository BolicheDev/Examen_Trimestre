window.onload = iniciar;

var arrGlo = {
    "miBd": {},
    "conn": "",
    "imagen": ""
};

var galeria = {
    'fotos': [],
    'cantidad': '',
    'indice': '',
    'aleatorio': function() {
        let random = Math.floor(Math.random() * this.cantidad);
        this.indice = random;
        return this.fotos[random].img_animal;
    },
    'ultima': function() {
        this.indice = Number(this.cantidad) - 1;
        return this.fotos[Number(this.cantidad) - 1].img_animal;
    },
    'primera': function() {
        this.indice = 0;
        return this.fotos[0].img_animal;
    },
    'anterior': function() {
        this.indice = Number(this.indice) - 1;
        return this.fotos[this.indice].img_animal;
    },
    'siguiente': function() {
        this.indice = Number(this.indice) + 1;
        return this.fotos[this.indice].img_animal;
    },
    'guardar': function() {
        var obj = { "foto": this.fotos[this.indice].img_animal + ".jpg" };
        añadir_foto(obj);
    },
    'rotar': function() {
        document.getElementById("div-visor").style.animationName = "animacion";
    }
};

var botonera = {
    'nombres': [],
    'crear': function() {
        this.nombres.forEach(element => {
            var boton = document.createElement("button");
            boton.classList.add("botones-funcionales");
            boton.setAttribute("name", "botones");
            boton.setAttribute("id", element);
            boton.addEventListener("click", eval("this." + element));
            boton.innerHTML = element;
            document.getElementById("div-botones").append(boton);
        })
    },
    'primera': function() {
        document.getElementById("div-visor").style.backgroundImage = "url(img/" + galeria.primera() + ".jpg)";
        comprobar_botones();
        document.getElementById("anterior").disabled = true;
        document.getElementById("primera").disabled = true;
    },
    'anterior': function() {
        document.getElementById("div-visor").style.backgroundImage = "url(img/" + galeria.anterior() + ".jpg)";
        comprobar_botones();
    },
    'siguiente': function() {
        document.getElementById("div-visor").style.backgroundImage = "url(img/" + galeria.siguiente() + ".jpg)";
        comprobar_botones();
    },
    'ultima': function() {
        document.getElementById("div-visor").style.backgroundImage = "url(img/" + galeria.ultima() + ".jpg)";
        comprobar_botones();
        document.getElementById("siguiente").disabled = true;
        document.getElementById("ultima").disabled = true;
    },
    'guardar': function() {
        galeria.guardar();
    },
    'rotar': function() {
        galeria.rotar();
    }
}

function primera() {
    console.log("Esta no es");
}

function iniciar() {
    añadir_funciones();
    crearBD();
}

function añadir_funciones() {
    document.getElementById("visor").addEventListener("click", ver_visor);
    document.getElementById("ocultar").addEventListener("click", ocultar);
}

function ver_visor() {
    crear_botones();
    cargar_fotos();
    document.getElementById("div-visor").style.animationName = "";
    document.getElementById("div-visor").classList.remove("oculto");
}

function ocultar() {
    document.getElementById("div-visor").classList.add("oculto");
}

function crear_botones() {
    var div = document.createElement("div");
    div.setAttribute("id", "div-botones");
    div.classList.add("div-botones");
    document.getElementById("div-visor").append(div);
    /* -------- */
    var arrayBotones = ['primera', 'anterior', 'siguiente', 'ultima', 'guardar', 'rotar'];
    botonera.nombres = arrayBotones;
    botonera.crear();
}

function cargar_fotos() {
    $.ajax({
        url: 'php/cargar.php',
        cache: false,
        method: 'POST',
        type: 'json',
        success: function(result) {
            var resultado = JSON.parse(result);
            resultado.forEach(element => {
                galeria.fotos.push(element);
            });
            galeria.cantidad = galeria.fotos.length;
            /* ---- */
            document.getElementById("div-visor").style.backgroundImage = "url(img/" + galeria.aleatorio() + ".jpg)";
            comprobar_botones();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("error " + jqXHR.status + " " + errorThrown);
        }
    });
}

function comprobar_botones() {
    var array = document.getElementsByName("botones");
    array.forEach(element => {
        element.disabled = false;
    })
    if (galeria.fotos[galeria.indice + 1] == undefined) {
        document.getElementById("siguiente").disabled = true;
        document.getElementById("ultima").disabled = true;
    }
    if (galeria.fotos[galeria.indice - 1] == undefined) {
        document.getElementById("anterior").disabled = true;
        document.getElementById("primera").disabled = true;
    }
}