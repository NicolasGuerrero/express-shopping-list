const express = require('express');
const items = require('./fakeDb');
const itemRoutes = require("./routes");
const ExpressError = require("./expressError");

const app = express();

app.use(express.json());

app.use("/items", itemRoutes);

app.use(function(req, res, next) {
  const notFoundError = new ExpressError("Not Found", 404);
  return next(notFoundError);
})

app.use(function(err, req, res, next) {
  let status = err.status || 500;
  let message = err.message;

  return res.status(status).json({
    error: { message, status }
  });
});

app.listen(3000, function() {
  console.log("Server listening on port 3000");
});