const express = require("express");
const router = express.Router();
const {verifyRestaurant} = require("../middlewares/authenticateMiddleware");
const { restaurantRegister, restaurantLogin } = require("../controllers/authController");
const { getRestaurantProfile, updateRestaurant, addFoodItem, getRestaurantOrders, updateOrderStatus } = require("../controllers/restaurantController");


router.post('/register',restaurantRegister)
router.post('/login',restaurantLogin)
router.get("/profile", verifyRestaurant, getRestaurantProfile);
router.put("/profile", verifyRestaurant, updateRestaurant);
router.post("/menu", verifyRestaurant, addFoodItem);
router.get("/orders", verifyRestaurant, getRestaurantOrders);
router.patch("/orders/:orderId/status", verifyRestaurant, updateOrderStatus);

module.exports = router;