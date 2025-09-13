const { prisma } = require("../config/db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

dotenv.config()

exports.adminRegister = async (req,res) =>{
    const {first_name,last_name,email,password} = req.body;
    const hashPassword = await bcrypt.hash(password,10);
    try {
        const UserData = await prisma.user.create({
            data:{
                first_name,
                last_name,
                email,
                role: "ADMIN",
                password:hashPassword
            }
        });
        res.status.send({message:"Created Admin",status:true})
    } catch (error) {
        console.log("Admin Register Error:",error.message);
        res.status(500).send({message:error.message,status:false})
    }

}
