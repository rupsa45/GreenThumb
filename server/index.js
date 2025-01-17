import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import { connectdb } from "./config/db.js";
import session from "express-session";
import passport from "./config/passport.config.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 5050;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(morgan("dev"));

app.use(session(
  { 
    secret: process.env.SESSION_SECRET, 
    resave: true, 
    saveUninitialized: true 
  }
));
app.use(passport.initialize());
app.use(passport.session());

// Routes
import userRoutes from './routes/user.routes.js'
app.use('/api/users', userRoutes);  

import authRoutes from './routes/auth.routes.js'
app.use('/api/auth', authRoutes);  

connectdb();
app.listen(port, () =>
  console.log(`Server started on PORT:http://localhost:${port}`)
);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the application!");
});

