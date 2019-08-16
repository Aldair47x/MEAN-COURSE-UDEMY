var express = require('express');
var router = express.Router();

var path = require('path');
var fs = require('fs');


router.get('/:tipo/:img', function (req, res, next) {

        var tipo = req.params.tipo;
        var img = req.params.img;

        var pathImagen = path.resolve(__dirname, `../uploads/${tipo}/${img}`);

        if( fs.existsSync( pathImagen )){
            res.sendFile( pathImagen );
        } else {
            var pathNoImagen = path.resolve(__dirname, '../assets/no-img.jpg' );
            res.sendFile(pathNoImagen);
        }

        // res.status(200).json({
        //     ok: true,
        //     mensaje: 'Petición realizada correctamente'
        // })

});


module.exports = router;
