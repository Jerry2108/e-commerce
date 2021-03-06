import express from "express";
import mongoose from "mongoose";
import path from "path";
import User from "./models/User.js";
import Item from "./models/Item.js";
import authRouter from "./routes/auth.js";
import itemRouter from "./routes/item.js";
import cartRouter from "./routes/cart.js";
import orderRouter from "./routes/order.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
const app = express();
const __dirname = path.resolve();
dotenv.config();

//Middleware
//app.use(cors());
app.use(express.json());
//app.use(express.static(__dirname + "/client/public"));
app.use("/uploads", express.static("uploads"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(authRouter);
app.use(itemRouter);
app.use(cartRouter);
app.use(orderRouter);

if (process.env.NODE_ENV === "production") {
app.use(express.static(path.join(__dirname,"my-app","build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname,"my-app","build","index.html"));
    //res.send("Hello World");
  });
}

const port = process.env.PORT || 4000;

//connect to mongoDB Atlast db
const user = process.env.USER;
const password = process.env.PASSWORD;
const dbURL = `mongodb+srv://${user}:${password}@cluster0.vcuxt.mongodb.net/ecommerce?retryWrites=true&w=majority`;
console.log(user);
mongoose
  .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(port);
    console.log(`app is running on ${port}`);
  })
  .catch((error) => console.log(error));

