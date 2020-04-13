var bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models').user;
const Todo = require('../models').todo;

module.exports ={
	get(req, res) {
		res.redirect('/login');
	},

	Login(req, res) {
	message = '';
   	if(req.method == "POST"){	
		var Password = req.body.password;
    return User
      .findOne({
      	where:{ email: req.body.email }
      })
      .then(user => {
        if (!user) {
          message = 'Email Salah.';
          res.render('index.ejs',{message: message});
        }
        var id = user.id;
        var email = user.email;
        const hash = user.password;
        bcrypt.compare(Password, hash)     
        .then(results =>{
        	if(results === true){ 
        	req.session.loggedin =true;
            req.session.userId = id;
            res.redirect('/dashboard');

        		}else{
        			message= 'Password Salah';
              res.render('index.ejs',{message: message});
            }
        	})
   		.catch((error) => { res.status(400).send(error); });
    })
  }else{
  		if (req.session.loggedin){
  			res.redirect('/dashboard')
  		}else{
		res.render('index.ejs',{message: message});		
	 }
  }
  },

  logout(req, res) {
		if (req.session.loggedin) {    

      req.session.destroy(function(err) {
         res.redirect("/login");
         })
	} else {	
		
	}
	},

	register(req, res) {
		if(req.method == "POST"){
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
      	.then(() => {
        	message = "Succesfully! Your account has been created.";
            res.render('user/register.ejs',{message: message});
      	})
      	.catch((error) => res.status(400).send(error));
      	})
		}else{
			var message = '';
			if(req.session.loggedin){
				res.redirect('/dashboard');
			}else{
				res.render('user/register',{message: message});
			}
		}
	}
}