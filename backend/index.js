const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const {connectDB,prisma} =require('./config/db');
connectDB();

const adminRouter = require('./routes/adminRoutes');
const userRouter =require('./routes/userRoutes')
const restaurantRouter = require('./routes/restaurantRoutes')


app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173", "https://foodie-hub-ordering.vercel.app"]
}))

app.get('/',(req,res)=>{
    res.status(200).send({message:"API Working..."})
})

app.use('/api/admin',adminRouter)
app.use('/api/user',userRouter)
app.use('/api/restaurant',restaurantRouter)



const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server Running at http://localhost:${PORT}`);
})