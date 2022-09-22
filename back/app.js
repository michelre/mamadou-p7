require("dotenv").config();
const express = require("express");
const app = express();
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");

// Cors (need to create a config file for better lisibility)
app.use((req, res, next) => {
    // const corsWhitelist = ["http://localhost:3000", "http://localhost:4200"];
    // if (corsWhitelist.indexOf(req.headers.origin) !== -1) {
    //     res.header("Access-Control-Allow-Origin", req.headers.origin);
    //     res.header(
    //         "Access-Control-Allow-Headers",
    //         "Origin, X-Requested-With, Content-Type, Accept,Authorization"
    //     );
    // }
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");
    // res.setHeader("credentials: true, origin: true");
    // res.setHeader("Cross-Origin-Resource-Policy: same-site");
    next();
});
// Middlewares always executed
// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(express.json());
app.use(cookieParser());

// Routes files
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const authRoutes = require("./routes/auth.routes");
const commentRoutes = require("./routes/comment.routes");

// Middlewares always executed
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use("/images", express.static(path.join(__dirname, "images")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

module.exports = app;
