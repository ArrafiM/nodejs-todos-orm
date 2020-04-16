var bcrypt = require('bcrypt');
const saltRounds = 10;

const User = require('../models').user;

module.exports = {
  list(req, res) {
    return User
      .findAll({
        include: [],
        order: [
          ['createdAt', 'DESC'],
        ],
      })
      .then((users) => {
        res.status(200).json({
          message:'Semua Data User',
          users
        })
    })
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    return User
      .findByPk(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(400).send({
            message: 'User Not Found',
          });
        }
    return User
      .findByPk(req.params.id,{
        include: [],
        order: [
          ['createdAt', 'DESC'],
        ],
      })
      .then(() =>{
        res.status(200).json({
          message:'Data Anda',
          user
        })
      })
      .catch((error) => { res.status(400).send(error); });
    })
  },

  add(req, res) {
    var Password = req.body.password;
    bcrypt.hash(Password, saltRounds, function(err, hash){
    return User
      .create({
        nama_depan: req.body.nama_depan,
        nama_belakang: req.body.nama_belakang,
        level: req.body.level,
        email: req.body.email,
        password: hash,
      })
      .then((data) => {
        res.status(200).json({
          message:'Data user Berhasil Disimpan',
          data
        })
      })
      .catch((error) => res.status(400).send(error));
      })
  },

  update(req, res) {
    var Password = req.body.password;
    bcrypt.hash(Password, saltRounds, function(err, hash){
    return User
      .findByPk(req.params.id)      
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        return user
          .update({
            nama_depan: req.body.nama_depan || user.nama_depan,
            nama_belakang: req.body.nama_belakang || user.nama_depan,
            level: req.body.level || user.level,
            email: req.body.email || user.email,
            password: hash || user.password,
          })
          .then(() => {
            res.status(200).json({
              message:'Data Berhasil Diedit',
              user
            })
          })
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
    })
  },

  delete(req, res) {
    return User
      .findByPk(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(400).send({
            message: 'User Not Found',
          });
        }
        return user
          .destroy()
          .then(() => {
            res.json({
              message:'Data Berhasil Dihapus',
            })
          })
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};

