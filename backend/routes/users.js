var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var verificaToken = require('../middleware/auth');

var Usuario = require('../models/user');


/* GET users listing. */
router.get('/', function (req, res, next) {
  Usuario.find({}, 'nombre email img role')
    .exec(
      (err, usuarios) => {
        if (err) {
          return res.status(500).json({
            ok: false,
            mensaje: 'Error cargando usuarios',
            errors: err
          });
        }

        res.status(200).json({
          ok: true,
          usuarios
        });
      });
});

/* POST new user. */

router.post('/', verificaToken.verificaToken, function ( req, res, next) {
  var body = req.body;
  
  var usuario = new Usuario({
    name: body.name,
    email: body.email,
    password: bcrypt.hashSync(body.password,10),
    img: body.img,
    role: body.role
  });

  usuario.save( (err, usuarioGuardado ) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: 'Error al crear usuario',
        errors: err
      });
    }

    res.status(201).json({
      ok: true,
      usuario: usuarioGuardado,
      usuarioToken: req.user
    });
  });

});


/* PUT an user. */

router.put('/:id', function(req, res, next) {

  var id = req.params.id;
  var body = req.body;

  //user es un objeto de moongose
  Usuario.findById( id, (err, user) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: 'Error al buscar usuario',
        errors: err
      });
    }

    if (!user) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Error no existe',
        errors: err
      });
    }

    user.name = body.name;
    user.email = body.email;
    user.role = body.role;

    user.save( (err, usuarioGuardado) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: 'Error al actualizar usuario',
          errors: err
        });
      }

      usuarioGuardado.password = ':)';
  
      res.status(200).json({
        ok: true,
        usuario: usuarioGuardado
      });

    });

  });

});


/* Delete an user. */

router.delete('/:id', function(req, res, next){

  var id = req.params.id;

  Usuario.findByIdAndRemove(id, (err, user)=> {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: 'Error al borrar usuario',
        errors: err
      });
    }

    if (!user) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Error, no existe usuario con ese id',
        errors: err
      });
    }

    res.status(200).json({
      ok: true,
      usuario: user
    });

  });

});






module.exports = router;