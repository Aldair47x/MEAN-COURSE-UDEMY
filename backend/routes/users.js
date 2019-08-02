var express = require('express');
var router = express.Router();

var Usuario = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Usuario.find({}, (err, usuarios) => {
    if( err ){
      return res.status(500).json({
        ok: false,
        mensaje: "Error cargando usuario",
        errors: err
      });
    }

    res.status(200).json({
      ok: true,
      usuarios: usvarios
    });

  });
});

module.exports = router;
