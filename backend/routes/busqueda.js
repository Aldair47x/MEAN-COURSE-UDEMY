var express = require('express');
var router = express.Router();

var Hospital = require('../models/hospital');
var Medico = require('../models/medico');
var Usuario = require('../models/user');

/* GET specifics search. */

router.get('/coleccion/:tabla/:busqueda', function(req, res, next) {

    var busqueda = req.params.busqueda;
    var regex = new RegExp(busqueda, 'i');

    var tabla = req.params.tabla;
    var promesa;


    switch( tabla ){
        case 'usuarios':
            promesa = buscarUsuarios( busqueda, regex);
        break;

        case 'medicos':
            promesa = buscarMedicos( busqueda, regex);
        break;

        case 'hospitales':
            promesa = buscarHospitales( busqueda, regex);
        break;


        default: 
            return res.status(400).json({
                ok: false,
                mensaje: 'Bad request'
            });

    }

    promesa.then( resultado => {
        res.status(200).json({
            ok: true,
            [tabla]: resultado
        });
    });


});




/* GET General search. */
router.get('/todo/:busqueda', function (req, res, next) {

    var busqueda = req.params.busqueda;
    var regex = new RegExp(busqueda, 'i');

    Promise.all([
            buscarHospitales(busqueda, regex),
            buscarMedicos(busqueda, regex),
            buscarUsuarios(busqueda, regex),

        ])
        .then(respuestas => {
            res.status(200).json({
                ok: true,
                hospitales: respuestas[0],
                medicos: respuestas[1],
                usuarios: respuestas[2]
            });
        });
});


function buscarHospitales(busqueda, regex) {

    return new Promise((resolve, reject) => {
        Hospital.find({ nombre: regex })
            .populate('usuario', 'name email')
            .exec((err, hospitales) => {
                if (err) {
                    reject('Error al cargar hospitales');
                } else {
                    resolve(hospitales);
                }
            });
    });
}

function buscarMedicos(busqueda, regex) {

    return new Promise((resolve, reject) => {
        Medico.find({nombre: regex})
            .populate('usuario', 'name email')
            .populate('hospital')
            .exec((err, medicos) => {
                if (err) {
                    reject('Error al cargar medicos');
                } else {
                    resolve(medicos);
                }
        });
    });
}

function buscarUsuarios(busqueda, regex) {

    return new Promise((resolve, reject) => {
        Usuario.find({}, 'name email role')
            .or([{
                'name': regex
            }, {
                'email': regex
            }])
            .exec((err, usuarios) => {

                if (err) {
                    reject('Error al cargar usuarios', err);
                } else {
                    resolve(usuarios);
                }
            });
    });
}

module.exports = router;