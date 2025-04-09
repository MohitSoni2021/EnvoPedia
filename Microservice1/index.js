import express from "express";

const app=express();

const PORT=8080


// Using routes 
// app.use("/api/user",userRoute);


app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
})