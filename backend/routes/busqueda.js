var express = require('express');
var router = express.Router();
var Hospital = require('../models/hospital');
var Medico = require('../models/medico');

/* GET hospitals listing. */
router.get('/todo/:busqueda', function (req, res, next) {

    var busqueda = req.params.busqueda;
    var regex = new RegExp(busqueda, 'i');


    buscarHospitales(busqueda, regex)
        .then(hospitales => {
            res.status(200).json({
                ok: true,
                hospitales
            });
        });
       

    

});


function buscarHospitales(busqueda, regex) {

    return new Promise((resolve, reject) => {
        Hospital.find({
            nombre: regex
        }, (err, hospitales) => {
            if (err) {
                reject('Error al cargar hospitales');
            } else {
                resolve(hospitales);
            }
        });
    });
}


module.exports = router;