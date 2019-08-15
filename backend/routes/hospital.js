var express = require('express');
var router = express.Router();
var verificaToken = require('../middleware/auth');
var Hospital = require('../models/hospital');

/* GET hospitals listing. */
router.get('/', function (req, res, next) {
    Hospital.find({}, 'nombre hospital img')
        .populate('usuario', 'name email')
        .exec(
            (err, hospitales) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando hospitales',
                        errors: err
                    });
                }

                res.status(200).json({
                    ok: true,
                    hospitales
                });
            });
});

/* POST new hospital. */



router.post('/', verificaToken.verificaToken, function (req, res, next) {
    var body = req.body;

    var hospital = new Hospital({
        nombre: body.nombre,
        usuario: req.user._id
    });

    hospital.save((err, hospitalGuardado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al crear hospital',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            hospital: hospitalGuardado,
            hospitalToken: req.hospital
        });
    });

});


/* PUT an hospital. */

router.put('/:id', verificaToken.verificaToken, function (req, res, next) {

    var id = req.params.id;
    var body = req.body;

    //hospital es un objeto de moongose
    Hospital.findById(id, (err, hospital) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar hospital',
                errors: err
            });
        }

        if (!hospital) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error, no existe',
                errors: err
            });
        }

        hospital.nombre = body.nombre;
        hospital.usuario = req.user._id;

        hospital.save((err, hospitalGuardado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al actualizar hospital',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                hospital: hospitalGuardado
            });

        });

    });

});


/* Delete an hospital. */

router.delete('/:id', verificaToken.verificaToken, function (req, res, next) {

    var id = req.params.id;

    Hospital.findByIdAndRemove(id, (err, hospital) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar hospital',
                errors: err
            });
        }

        if (!hospital) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error, no existe hospital con ese id',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            hospital
        });

    });

});


module.exports = router;