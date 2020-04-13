const joi = require ('@hapi/joi');

const schema ={
	todo: joi.object({
		title: joi.string().required(),
		iduser: joi.number().integer().required(),
	}),
	user: joi.object({
		nama_depan: joi.string().required(),
		nama_belakang: joi.string().required(),
		level: joi.string().required(),
		email: joi.string().email().required(),
		password: joi.string().min(3).max(8).required(),
	}),
	login: joi.object({
		email: joi.string().email().required(),
		password: joi.string().min(3).max(8).required(),
	})
};

module.exports = schema