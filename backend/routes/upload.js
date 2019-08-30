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
    var nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extensionArchivo}`;

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
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar usuario',
                    errors: err
                });
            }

            if (!usuario) {
                return res.status(400).json({
                    ok: false,
                    mensaje: `El usuario con el id ${id} no existe`,
                    errors: { message: 'No existe un usuario con ese ID' }
                });
            }

            var pathViejo = './uploads/usuarios/' + usuario.img;

            
            //Si existe, elimina la imagen anterior
            if (fs.existsSync(pathViejo)) {
                fs.unlink(pathViejo, (error) => {
                    console.log(error);
                });
            }

            usuario.img = nombreArchivo;

            usuario.save((err, usuarioActualizado) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al actualizar usuario',
                        errors: err
                    });
                }
                usuarioActualizado.password = ':)';

                return res.status(200).json({
                    ok: true,
                    mensaje: 'Imagen de usuario actualizada',
                    usuario
                });
            });

        });
    }

    if( tipo === 'medicos' ) {
        Medico.findById( id, (err, medico) => {

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
                    mensaje: `El medico con el id ${id} no existe`,
                    errors: { message: 'No existe un medico con ese ID' }
                });
            }

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
                    medico
                });
            });

        });
    }

    if( tipo === 'hospitales' ){
        Hospital.findById( id, (err, hospital) => {

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
                    mensaje: `El hospital con el id ${id} no existe`,
                    errors: { message: 'No existe un hospital con ese ID' }
                });
            }

            var pathViejo = './uploads/hospitales/' + hospital.img;
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
                    hospital
                });
            });

        });
    }

}

module.exports = router;


// var serveIndex = require('serve-index');
// app.use(express.static(__dirname + '/'))
// app.use('/uploads', serveIndex(__dirname + '/uploads')); 