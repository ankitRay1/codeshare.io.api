const express = require('express');
const documentController = require('../controller/document.controller')
const userController = require('../controller/user.controller');
const router = express.Router();
const auth = require('../middlewares/auth');

// document routes
router.post('/createDocument', documentController.createDocument);
router.get('/display/doc/:id', documentController.displayDocById);


// user authentication routes
router.post('/signin', userController.signInUser);
router.get('/getuser', auth, userController.getUser);


module.exports = router;