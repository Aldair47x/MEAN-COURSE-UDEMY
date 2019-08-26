var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var seed = require('../config/config').SEED;
var Usuario = require('../models/user');

router.post('/', function(req, res, next){
    var body = req.body;

    Usuario.findOne({ email: body.email }, (err, user) => {
        //Error by defoult
        if (err) {
            return res.status(500).json({
              ok: false,
              mensaje: 'Error al buscar usuario',
              errors: err
            });
          }
        
        //Error de que no existe el usuario
        if (!user) {
            return res.status(400).json({
              ok: false,
              mensaje: 'Credenciales incorrectas - email',
              errors: err
            });
        } 

        //Error de contraseña
        if( !bcrypt.compareSync( body.password, user.password)){
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - password',
                errors: err
            });
        }

        user.password = ':)';
        var token = jwt.sign({user: user}, seed, { expiresIn: 144000000009 });


      
        res.status(200).json({
            ok: true,
            usuario: user,
            body,
            id: user._id,
            token
        });


    });
});

module.exports = router;