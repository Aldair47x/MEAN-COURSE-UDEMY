var express = require('express');
var router = express.Router();
var verificaToken = require('../middleware/auth');
var Medico = require('../models/medico');

/* GET medicos listing. */
router.get('/', function (req, res, next) {
    Medico.find({}, 'nombre img usuario medico')
        .populate('usuario', 'name email')
        .populate('hospital')
        .exec(
            (err, medicos) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando medicos',
                        errors: err
                    });
                }

                res.status(200).json({
                    ok: true,
                    medicos
                });
            });
});

/* POST new medico. */



router.post('/', verificaToken.verificaToken, function (req, res, next) {
    var body = req.body;

    var medico = new Medico({
        nombre: body.nombre,
        usuario: req.user._id,
        hospital: body.hospital
    });

    medico.save((err, medicoGuardado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al crear medico',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            medico: medicoGuardado,
            medicoToken: req.medico
        });
    });

});


/* PUT an medico. */

router.put('/:id', verificaToken.verificaToken, function (req, res, next) {

    var id = req.params.id;
    var body = req.body;

    //medico es un objeto de moongose
    Medico.findById(id, (err, medico) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar medico',
                errors: err
            });
        }

        if (!medico) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error, no existe',
                errors: err
            });
        }

        medico.nombre = body.nombre;
        medico.usuario = req.user._id;
        medico.hospital = body.hospital;

        medico.save((err, medicoGuardado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al actualizar medico',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                medico: medicoGuardado
            });

        });

    });

});


/* Delete an medico. */

router.delete('/:id', verificaToken.verificaToken, function (req, res, next) {

    var id = req.params.id;

    Medico.findByIdAndRemove(id, (err, medico) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar medico',
                errors: err
            });
        }

        if (!medico) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error, no existe medico con ese id',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            medico
        });

    });

});


module.exports = router;