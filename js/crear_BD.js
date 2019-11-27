'use strict'

var baseDatos = {
    'indexedDB': '',
    'IDBKeyRange': '',
    'IDBKeyTransaction': '',
    'conn': '',
    'nombre': '',
    'crear': function(nombre, arrayTablas) {
        this.indexedDB = window.indexedDB;
        this.IDBKeyRange = window.IDBKeyRange;
        this.IDBKeyTransaction = window.IDBKeyTransaction;

        this.conn = this.indexedDB.open(nombre);

        this.nombre = nombre;

        this.conn.onupgradeneeded = function() {
            arrayTablas.forEach(tabla => {
                this.result.createObjectStore(tabla[0], {
                    keyPath: "id" + tabla[0],
                    autoIncrement: tabla[1]
                });
            });
        }
    },
}

function crearBD() {
    arrGlo.miBd.indexedDB = window.indexedDB;
    arrGlo.miBd.IDBKeyRange = window.IDBKeyRange;
    arrGlo.miBd.IDBKeyTransaction = window.IDBKeyTransaction;

    arrGlo.conn = arrGlo.miBd.indexedDB.open("MiZoo");

    arrGlo.conn.onupgradeneeded = function() {
        this.result.createObjectStore("Fotos", { keyPath: "idFoto", autoIncrement: true });
    }
}

function añadir_foto(obj) {
    arrGlo.conn = arrGlo.miBd.indexedDB.open("MiZoo");
    arrGlo.conn.onsuccess = function() {
        this.result.transaction("Fotos", "readwrite").objectStore("Fotos").add(obj).onsuccess = function() {
            alert("Imagen guardada");
        };
    };
}