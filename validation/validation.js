const {login} = require('./schema');
const {user} = require('./schema');
const {todo} = require('./schema');

module.exports = {
	addLoginValidation:async (req,res, next) =>{
		const value = await login.validate(req.body);
		if(value.error){
			res.status(404).json({
				success: 0,
				message: value.error.details[0].message	
			})
		}else{
			next();
		}
	},

	addTodoValidation:async (req,res, next) =>{
		const value = await todo.validate(req.body);
		if(value.error){
			res.status(404).json({
				success: 0,
				message: value.error.details[0].message	
			})
		}else{
			next();
		}
	},

	addUserValidation:async (req,res, next) =>{
		const value = await user.validate(req.body);
		if(value.error){
			res.status(404).json({
				success: 0,
				message: value.error.details[0].message	
			})
		}else{
			next();
		}
	}
};