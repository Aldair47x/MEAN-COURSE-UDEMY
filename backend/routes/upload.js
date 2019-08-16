var express = require('express');
var router = express.Router();

var fs = require('fs');

var Hospital = require('../models/hospital');
var Medico = require('../models/medico');
var Usuario = require('../models/user');

var fileUpload = require('express-fileupload');


router.use(fileUpload());

router.put('/:tipo/:id', function(req, res, next){

    var tipo = req.params.tipo;
    var id = req.params.id;
    
    var tiposValidos = ['hospitales', 'medicos', 'usuarios'];

    if(tiposValidos.indexOf( tipo ) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Tipo de colección no valida'
        });
    }
 

    if(!req.files){
        return res.status(400).json({
            ok: false,
            mensaje: 'No seleccionó nada',
            errors: err
        });
    }

    // get name of the file
    var archivo = req.files.imagen;
    var nombreCortado = archivo.name.split('.');
    var extensionArchivo = nombreCortado[ nombreCortado.length - 1 ];


    var extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

    if( extensionesValidas.indexOf(extensionArchivo) < 0 ){
        return res.status(400).json({
            ok: false,
            mensaje: 'Extension no valida'
        });
    }

    // Nombre de archivo personalizado
    var nombreArchivo = ` ${id}-${new Date().getMilliseconds()}.${extensionArchivo}`;

    var path = `./uploads/${tipo}/${nombreArchivo}`;

    archivo.mv( path, err => {
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al mover archivo',
                errors: err
            });
        }
    });

    subirPorTipo(tipo, id, nombreArchivo, res);

    // res.status(200).json({
    //     ok: true
    // });

});


function subirPorTipo( tipo, id, nombreArchivo, res) {
    if( tipo === 'usuarios' ){
        Usuario.findById( id, (err, usuario) => {

            var pathViejo = './uploads/usuarios/' + usuario.img;
            //Si existe, elimina la imagen anterior
            if(fs.existsSync(pathViejo)){
                fs.unlink(pathViejo);
            }

            usuario.img = nombreArchivo;

            usuario.save((err, usuarioActualizado) => {
                if(err){
                    res.status(500).json({
                        ok: false,
                        message: 'No se pudo actualizar el usuario',
                        errors: err
                    });
                }
                return res.status(200).json({
                    ok: true,
                    mensaje: 'Imagen de usuario actualizada',
                    usuarioActualizado
                });
            });

        });
    }

    else if( tipo === 'medicos' ) {
        Medico.findById( id, (err, medico) => {

            var pathViejo = './uploads/medicos/' + medico.img;
            //Si existe, elimina la imagen anterior
            if(fs.existsSync(pathViejo)){
                fs.unlink(pathViejo);
            }

            medico.img = nombreArchivo;

            medico.save((err, medicoActualizado) => {
                if(err){
                    res.status(500).json({
                        ok: false,
                        message: 'No se pudo actualizar el medicos',
                        errors: err
                    });
                }
                return res.status(200).json({
                    ok: true,
                    mensaje: 'Imagen de medicos actualizada',
                    medicoActualizado
                });
            });

        });
    }

    else if( tipo === 'hospitales' ){
        Hospital.findById( id, (err, hospital) => {

            var pathViejo = './uploads/hospitals/' + hospital.img;
            //Si existe, elimina la imagen anterior
            if(fs.existsSync(pathViejo)){
                fs.unlink(pathViejo);
            }

            hospital.img = nombreArchivo;

            hospital.save((err, hospitalActualizado) => {
                if(err){
                    res.status(500).json({
                        ok: false,
                        message: 'No se pudo actualizar el hospital',
                        errors: err
                    });
                }
                return res.status(200).json({
                    ok: true,
                    mensaje: 'Imagen de hospital actualizada',
                    hospitalActualizado
                });
            });

        });
    }

    else {
        res.status(500).json({
            ok: false,
            message: 'No se reconoce el tipo, solo son permitidos usuarios, medicos y hospitales',
            errors: err
        });
    }
}

module.exports = router;


// var serveIndex = require('serve-index');
// app.use(express.static(__dirname + '/'))
// app.use('/uploads', serveIndex(__dirname + '/uploads'));