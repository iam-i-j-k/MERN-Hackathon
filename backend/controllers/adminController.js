const { prisma } = require("../config/db")



exports.getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            where: {
                role: 'USER'
            },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true
            }
        });
        res.status(200).send({ message: "Users fetched successfully", users });
    } catch (error) {
        console.error("Get Users Error:", error);
        res.status(500).send({ message: "Internal Server Error",error:error.message });
    }
};
exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await prisma.restaurant.findMany({
      include: {
        menu: true,
      },
    });
    res.status(200).json({ restaurants });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await prisma.user.delete({
            where: {
                id
            }
        });
        res.status(200).send({ message: "User deleted successfully" ,deletedUser});
    } catch (error) {
        console.error("Delete User Error:", error);
        res.status(500).send({ message: "Internal Server Error" ,error:error.message});
    }
};

exports.deleteRestaurant = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRestaurant = await prisma.restaurant.delete({
            where: {
                id
            }
        });
        res.status(200).send({ message: "Restaurant deleted successfully" ,deletedRestaurant});
    } catch (error) {
        console.error("Delete Restaurant Error:", error);
        res.status(500).send({ message: "Internal Server Error" ,error:error.message});
    }
};

