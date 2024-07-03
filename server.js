const express = require("express");
const connectDB = require("./config/db")
const userRoutes = require("./routes/userRoutes")
const libraryRouter = require("./routes/libraryRoutes");
const auth = require("./middleware/auth");
const app = express();
require("dotenv").config();

const port = process.env.PORT

app.use(express.json());
app.use(userRoutes);
app.use("/library", auth,libraryRouter);
app.get("/",(req, res)=>{
    res.send("This is home server")
})

app.listen(port, async()=>{
    try{
        await connectDB;
        console.log("Server is running on localhost:"+port);
    }
    catch(err){
        console.log(err);
    }
})
