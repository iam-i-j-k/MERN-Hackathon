const { prisma } = require("../config/db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const db = require("mongodb")

dotenv.config()

exports.adminRegister = async (req,res) =>{
    const {name,email,password} = req.body;
    const hashPassword = await bcrypt.hash(password,10);
    try {
        const UserData = await prisma.user.create({
            data:{
                name,
                email,
                role: 'ADMIN',
                password:hashPassword
            }
        });
        res.status(201).send({message:"Created Admin",status:true,UserData})
    } catch (error) {
        console.log("Admin Register Error:",error.message);
        res.status(500).send({message:error.message,status:false})
    }

}

exports.adminLogin = async (req,res) =>{
    const {email,password} = req.body;
    try{
      const validUser = await prisma.user.findFirst({where:{email:email,role:'ADMIN'}});
      if(!validUser)return res.status(400).send({message:`User Doesn't exist`});
      const validPass =await bcrypt.compare(password,validUser.password);
      if(!validPass)return  res.status(400).send({message:`Wrong Password`});
      //we will generate token here and send it as response
      const token = jwt.sign(
        {id:validUser.id,email:email,role:'ADMIN'},
        process.env.JWT_SECRET_TOKEN,
        {expiresIn:'6h'});
      res.status(200).send({message:`Admin Login Successfull:`,token:token});
    }catch(err){ 
        res.status(400).send({message:err});

    }

}

exports.userRegister = async (req,res) =>{
    const {name,email,password,role} = req.body;
    const hashPassword = await bcrypt.hash(password,10);
    try {
        const UserData = await prisma.user.create({
            data:{
                name,
                email,
                password:hashPassword,
                role: "USER"
            }
        });
        res.status(201).send({message:"Created user",status:true})
    } catch (error) {
        console.log("User Register Error:",error.message);
        res.status(500).send({message:error.message,status:false})
    }
}

exports.userLogin = async (req,res)=>{
    console.log(req.body);
    const {email,password} = req.body;
    try{
        const validUser = await prisma.user.findFirst({where:{email:email,role:'USER'}});
        if(!validUser) return res.status(400).send({message:`User Does'nt exist`});
        const validPass =await bcrypt.compare(password,validUser.password);
        if(!validPass) return res.status(400).send({message:`Wrong Password`});
        const token = jwt.sign(
                {id:validUser.id,email:email,role:'USER'},
                process.env.JWT_SECRET_TOKEN,
                {expiresIn: '6h'}
        )
        res.status(200).send({message:`Login Successful`,token:token});
    }
    catch(err){
        res.status(500).send({message:err});
    }
}

exports.restaurantRegister = async (req, res) => {
  const { name, email, password, cuisine, location, image } = req.body;

  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const restaurant = await prisma.restaurant.create({
      data: {
        name,
        email,
        password: hashedPassword, // Use the hashed password
        cuisine,
        location,
        image,
      },
    });

    res.status(201).send({
      message: "Restaurant created successfully",
      status: true,
      restaurant,
    });
  } catch (error) {
    console.error("Restaurant Register Error:", error.message);
    res.status(500).send({ message: error.message, status: false });
  }
};



exports.restaurantLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find restaurant by email
    const restaurant = await prisma.restaurant.findUnique({
      where: { email: email },
    });

    if (!restaurant) {
      return res.status(400).send({ message: "Restaurant not found", status: false });
    }

    // 2. Compare password
    const validPassword = await bcrypt.compare(password, restaurant.password);
    if (!validPassword) {
      return res.status(400).send({ message: "Incorrect password", status: false });
    }

    // 3. Generate JWT token
    const token = jwt.sign(
      {
        id: restaurant.id,
        email: restaurant.email,
        name: restaurant.name
      },
      process.env.JWT_SECRET_TOKEN,
      { expiresIn: "6h" }
    );

    // 4. Send response with token
    res.status(200).send({
      message: "Login successful",
      status: true,
      token: token,
    });

  } catch (error) {
    console.error("Restaurant Login Error:", error.message);
    res.status(500).send({ message: error.message, status: false });
  }
};