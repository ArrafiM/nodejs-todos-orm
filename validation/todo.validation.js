const {todo} = require('./schema');

module.exports = {
	addTodoValidation:async (req,res, next) =>{
		const value = await todo.validate(req.body);
		if(value.error){
			res.json({
				success: 0,
				message: value.error.details[0].message	
			})
		}else{
			next();
		}
	}
};