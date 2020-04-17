const User = require('../models').user;
const Todo = require('../models').todo;
var bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
	home(req, res) {
	var userId= req.session.userId;
	if(req.session.loggedin){
    return User
      .findAll({
        where:{ id:userId },
          attributes:['todos.id','todos.title'],
          include: [{
            model: Todo,
            as: 'todos'
          }],
        })
        .then((todos) => {
            res.render('user/dashboard.ejs',{data:todos}); 
             
        })
      .catch((error) => { res.status(400).send(error); });
  	}else{
  		res.redirect('/login');
  	}
  },

  add(req, res){
  	if(req.method == "POST"){
  	var data = req.body;
  	var userId= req.session.userId;
      return Todo
      .create({
        title: data.title,
        iduser: userId,
      })
      .then((data) => {
        res.redirect('/dashboard');
      })
      .catch((error) => res.status(400).send(error));
  	}else{
	  	var message = '';
	   	if (req.session.loggedin) {
	   
	      res.render('user/tambah.ejs',{message: message});	
	 	} else {			
	      res.redirect('/login');
	 	}
  	}
  },

  edit(req, res){
  	if(req.method == "POST"){
  		var userId = req.session.userId;
  		return Todo
  		.findByPk(req.params.id)
  		.then(todo => {
  		return todo
          .update({
            title: req.body.title || todo.title,
            iduser: userId || todo.iduser,
          })
          .then(() => {
           res.redirect('/dashboard');
         })
          .catch((error) => res.status(400).send(error));
      })
  	}else{
  		if (req.session.loggedin) {
  			var Id = req.params.id;
  			console.log(Id);
  			return Todo
  			.findAll({
      		where:{ id:  Id}
      		})

      		.then((todos) => {
              res.render('user/update.ejs',{data:todos});
             })
  		}
  	}
  },

  hapus(req, res){
  	var userId= req.session.userId;
  	if(req.session.loggedin){
      User.findAll({
        where:{ id:userId },
        attributes:['todos.id','todos.title'],
        include: [{
          model: Todo,
          as: 'todos'
        }],
          })
          .then((todos) => {
            var results = todos;
              res.render('user/hapus.ejs',{data:results});
            })
      .catch((error) => { res.status(400).send(error); });
  	}else{
  		res.redirect('/login');
  	}
  	
  },
  delete(req, res){
  	return Todo
      .findByPk(req.params.id)
      .then(todo => {       
        return todo
          .destroy()
          .then(() => {
           res.redirect('/dashboard');
         })
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  profile(req,res){
  	if(req.session.loggedin){
  	var userId = req.session.userId;
    return User
      .findAll({
      	where:{ id: userId }
     })
     .then((todos) => {
            var results = todos;
            res.render('user/profile.ejs',{data:results});
            })
      .catch((error) => { res.status(400).send(error); });
  }else{
  	res.redirect('/login');
  }
  },

  editProfile(req,res){
  	if(req.method == "POST"){
  	var userId = req.session.userId;
  	var Password = req.body.password;
    bcrypt.hash(Password, saltRounds, function(err, hash){
    return User
      .findOne({
      	where:{ id: userId }
     })      
      .then(user => {
      	return user
          .update({
            nama_depan: req.body.nama_depan || user.nama_depan,
            nama_belakang: req.body.nama_belakang || user.nama_depan,
            password: hash || user.password,
          })
          .then(() => {
            res.redirect('/dashboard/profile');
          })
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
    })
  	}else{
  		if(req.session.loggedin){
  		var userId = req.session.userId;
    	return User
      	.findAll({
      		where:{ id: userId }
     		})
     	.then((todos) => {
            	var results = todos;
            	res.render('user/edit.ejs',{data:results});
            	})
      		.catch((error) => { res.status(400).send(error); });
  		}else{
  			res.redirect('/login');
  		}
  		
  	}
  },



}