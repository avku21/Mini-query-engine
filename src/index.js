import express from "express";
import authroutes from "./routes/auth.routes.js"
import queryroutes from "./routes/query.routes.js"
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());
app.use("/api/auth" , authroutes);
app.use("/api" , queryroutes)

app.listen(5001, () => {
    console.log("Server is running on port 5001");
    
});