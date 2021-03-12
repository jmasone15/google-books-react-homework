const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://guarded-brook-67536.herokuapp.com"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// app.use(cors({
//     origin: ["https://guarded-brook-67536.herokuapp.com"],
//     credentials: true,
// }));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// DB connection
mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/googleBooksUsers',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
);

// Routes
app.use("/user", require("./routers/userRoutes"));
app.use("/api", require("./routers/bookRoutes"));
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Start server
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));