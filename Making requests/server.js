const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
require("express-async-errors");

const app = express();
dotenv.config();

let planets = [
  {
    id: 1,
    name: "Earth",
  },
  {
    id: 2,
    name: "Mars",
  },
];

app.use(express.json());

app.use(morgan("dev"));

app.get("/api/planets", (req, res) => {
  res.json(planets);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
