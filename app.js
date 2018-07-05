const express = require("express");

const app = express();

let data = require("./utils/data.json");
// console.log(data);

const bodyParser = require("body-parser");

app.use(express.json());

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-sample.json");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// TODO: Create CRUD endpoints for your data!

app.get("/", (req, res) => {
  res.json("hello childcares");
});

app.get("/childcares", (req, res) => {
  console.log("/childcares -->", req.query);
  res.json(data);
});

app.get("/childcares/search", (req, res) => {
  console.log("/childcares/search -->", req.query);
  const childcare = data.filter(
    childcare => childcare.centre_name === req.query.centre_name
  );
  res.json(childcare);
});

app.get("/childcares/search", (req, res) => {
  console.log("/childcares/search -->", req.query);
  const childcare = data
    .filter(childcare => childcare.centre_name === req.query.centre_name)
    .filter(childcare => {
      console.log(Number(childcare.amount))
      return Number(childcare.amount) > Number(req.query.amount);
    });

  res.json(childcare);
});

app.get("/childcares/:centre_code", (req, res) => {
  const childcare = data.find(
    childcare => childcare.centre_code === req.params.centre_code
  );
  res.json(childcare);
});

app.post("/childcares", (req, res) => {
  childcares = [...data, req.body];
  res.json(childcares);
});

app.put("/childcares/:centre_code", (req, res) => {
  const updatedChildcare = data.map(childcare => {
    if (childcare.centre_code === req.params.centre_code) {
      return { ...data, ...req.body };
    } else return childcare;
  });
});

module.exports = app;
