const express = require("express");
const app = express();

const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const userRouter = require("./routes/user.routes");
const blogRouter = require("./routes/blog.routes");
const connectDb = require("./connectDB");
const { countAPI } = require("./middlewares/apiCallCount");

// app.use() is a middleware

//express.json() let express know that the data format is in JSON, because express doesmn't know in which data format does the data
// from frontend comes in the request
app.use(express.json());
app.use(cors());
app.use(express.static(`${__dirname}/upload`));

console.log(__dirname);

const PORT = process.env.PORT || 3000;

app.use(countAPI);

app.get("/", (req, res) => {
  res.send("home route");
});

//middleware provided by express for setting the routing and other validation checks or logic
app.use("/user", userRouter);
app.use("/api", blogRouter);

connectDb();
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
