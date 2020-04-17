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
            User.findAll({
              where:{ id:id },
                  attributes:['todos.id','todos.title'],
                  include: [{
                    model: Todo,
                    as: 'todos'
                  }],
                  order: [ ['id', 'DESC'] ],
                })
                
        		 .then((Todo) => {
               
                res.json({ message:'Berhasil Login',Todo })

             })
        		}else{
              res.json({ message:'Password Salah',})
            }
        	})
   		.catch((error) => { res.status(400).send(error); });
    })
  },
}