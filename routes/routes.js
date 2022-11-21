const express = require('express');
const documentController = require('../controller/document.controller')
const userController = require('../controller/user.controller');
const router = express.Router();
const auth = require('../middlewares/auth');

// document routes
router.post('/createDocument', documentController.createDocument);
router.post('/createDocumentForAuthUser', auth, documentController.createDocumentForAuthUser);
router.post('/deleteDocumentForAuthUser', auth, documentController.deleteDocumentForAuthUser);
router.get('/display/doc/:id', documentController.displayDocById);
router.get('/display/codes/user', auth, documentController.displayDocOfAuthuser);


// user authentication routesr
router.post('/signin', userController.signInUser);
router.get('/getuser', auth, userController.getUser);


module.exports = router;