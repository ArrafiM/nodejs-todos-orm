const User = require('../models').user;
const Todo = require('../models').todo;
var bcrypt = require('bcrypt');

module.exports ={


	Login(req, res) {
		var Password = req.body.password;
    return User
      .findOne({
      	where:{ email: req.body.email }
      })
      .then(user => {
        if (!user) {
          return res.status(400).send({ message: 'Email salah' });
        }
        var id = user.id;
        var email = user.email;
        const hash = user.password;
        bcrypt.compare(Password, hash)     
        .then(results =>{
        	if(results === true){          
            return Todo
            .findAll({
              where:{ iduser:id },
                attributes:['id','title'],
                include: [],
                  order: [ ['id', 'DESC'] ],
                })
        		 .then((todos) => {
              res.json({ message:'Berhasil Login',id,email,todos })
             })
        		}else{
              res.json({ message:'Password Salah',})
            }
        	})
   		.catch((error) => { res.status(400).send(error); });
    })
  },
}