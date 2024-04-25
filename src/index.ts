import express from "express"
import mongoose from "mongoose";
import router from "./routes";
import dotenv from "dotenv";
import cors from "cors"
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors({ origin: 'http://localhost:4200' }));
// app.use(cors({
//     origin: 'http://localhost:4200',
//     methods: ['POST','GET','PUT',"DELETE"],
//     allowedHeaders: ['authorization','content-type'],
//   }));


mongoose.connect(process.env.MONGO_URL as string,{dbName:"crud-app"})
    .then(()=>{
        console.log("Database connected");
        
    }).catch((error)=>{
        console.log(error);
        
    })


app.use('/api',router)


app.listen(4000,()=>{
    console.log("Server running on http://localhost:4000");
    
})