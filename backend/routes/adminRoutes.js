const express = require("express");
const router = express.Router();


const { adminRegister, adminLogin} = require('../controllers/authController');
const { getAllUsers, getAllRestaurants, deleteUser, deleteRestaurant } = require("../controllers/adminController");
const { verifyAdmin } = require("../middlewares/authenticateMiddleware");

router.post('/register',adminRegister);
router.post('/login', adminLogin);  
router.get('/viewUsers',verifyAdmin, getAllUsers);  
router.get('/viewRestaurants', verifyAdmin,getAllRestaurants);  
router.delete('/deleteUser/:id',verifyAdmin, deleteUser);  
router.delete('/deleteRestaurant/:id',verifyAdmin, deleteRestaurant);  



module.exports = router;