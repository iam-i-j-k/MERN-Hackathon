
const { prisma } = require("../config/db");

// -------------------- Get Restaurant Profile --------------------
exports.getRestaurantProfile = async (req, res) => {
  const restaurantId = req.restaurant.id; 

  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: restaurantId },
      include: { menu: true, reviews: true },
    });

    if (!restaurant) 
      return res.status(404).send({ message: "Restaurant not found", status: false });

    res.status(200).send({ restaurant, status: true });
  } catch (error) {
    res.status(500).send({ message: error.message, status: false });
  }
};

// -------------------- Update Restaurant Info --------------------
exports.updateRestaurant = async (req, res) => {
  const restaurantId = req.restaurant.id;
  const { name, cuisine, location, image } = req.body;

  try {
    const updatedRestaurant = await prisma.restaurant.update({
      where: { id: restaurantId },
      data: { name, cuisine, location, image },
    });

    res.status(200).send({ message: "Profile updated", status: true, restaurant: updatedRestaurant });
  } catch (error) {
    res.status(500).send({ message: error.message, status: false });
  }
};

// -------------------- Add Food Item --------------------
exports.addFoodItem = async (req, res) => {
  const restaurantId = req.restaurant.id;
  const { name, description, price, image, available } = req.body;

  try {
    const foodItem = await prisma.foodItem.create({
      data: { restaurantId, name, description, price, image, available },
    });

    res.status(201).send({ message: "Food item added", status: true, foodItem });
  } catch (error) {
    res.status(500).send({ message: error.message, status: false });
  }
};

// -------------------- Get Restaurant Orders --------------------
exports.getRestaurantOrders = async (req, res) => {
  const restaurantId = req.restaurant.id;

  try {
    const orders = await prisma.order.findMany({
      where: { restaurantId },
      include: { items: true, user: true },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).send({ orders, status: true });
  } catch (error) {
    res.status(500).send({ message: error.message, status: false });
  }
};

// -------------------- Update Order Status --------------------
exports.updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body; // Must be one of OrderStatus enum
  const restaurantId = req.restaurant.id;

  try {
    const order = await prisma.order.findUnique({ where: { id: orderId } });

    if (!order || order.restaurantId !== restaurantId) {
      return res.status(404).send({ message: "Order not found", status: false });
    }

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });

    res.status(200).send({ message: "Order status updated", status: true, order: updatedOrder });
  } catch (error) {
    res.status(500).send({ message: error.message, status: false });
  }
};