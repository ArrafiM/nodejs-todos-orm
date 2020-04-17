var express = require('express');
var router = express.Router();

const todoController = require('../controllers').todo;
const userController = require('../controllers').user;
const loginController = require('../controllers').login;
const loginViews = require('../controllers').loginView;
const dashboardViews = require('../controllers').dashboard;

/* GET home page. */


const {addTodoValidation} = require('../validation/validation');
const {addUserValidation} = require('../validation/validation');
const {addLoginValidation} = require('../validation/validation');

/* Login API Router */
router.post('/api/login',addLoginValidation,loginController.Login);

/* User API Router */
router.get('/api/model/:id',userController.model);
router.get('/api/user', userController.list);
router.get('/api/user/:id', userController.getById);
router.post('/api/user', addUserValidation,userController.add);
router.put('/api/user/:id', addUserValidation,userController.update);
router.delete('/api/user/:id', userController.delete);

/* Todo API Router */

router.get('/api/todos', todoController.list);
router.get('/api/todo/:id', todoController.getById);
router.post('/api/todos',addTodoValidation,todoController.add);
router.put('/api/todo/:id', addTodoValidation,todoController.update);
router.delete('/api/todo/:id', todoController.delete);

/* Login, Register View Routes */
router.get('/',loginViews.get);
router.get('/login',loginViews.Login);
router.post('/login',loginViews.Login);
router.get('/logout',loginViews.logout);
router.get('/register',loginViews.register);
router.post('/register',loginViews.register);
// router.get('/dashboard',loginViews.home);


/* Views on Dashboard Routes */
router.get('/dashboard',dashboardViews.home);
router.get('/dashboard/tambah',dashboardViews.add);
router.post('/dashboard/tambah',dashboardViews.add);
/* Edit Views Routes*/
router.get('/dashboard/update/:id',dashboardViews.edit);
router.post('/dashboard/update/:id',dashboardViews.edit);

/* Hapus Views Routes*/
router.get('/dashboard/hapus',dashboardViews.hapus);
router.get('/dashboard/hapus/:id',dashboardViews.delete);

/* Data Profile dan Edit */
router.get('/dashboard/profile',dashboardViews.profile);
router.get('/dashboard/profile/edit',dashboardViews.editProfile);
router.post('/dashboard/profile/update',dashboardViews.editProfile);


// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


module.exports = router; 