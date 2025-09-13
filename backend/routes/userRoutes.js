const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');
const { userRegister, userLogin } = require("../controllers/authController");
const { authenticateToken } = require("../middlewares/authMiddleware");

module.exports = router;

router.post('/register',userRegister)
router.post('/login',userLogin)
router.get('/restaurants', authenticateToken, userController.getAllRestaurants);
router.get('/restaurants/:id', authenticateToken, userController.getRestaurantDetails);
router.post('/orders', authenticateToken, userController.placeOrder);
router.get('/orders/my', authenticateToken, userController.getUserOrders);

module.exports = router;