const express = require("express");
const app = express();
const port = 3000;

const secure = (req, res, next) => {
  const token = req.query.token;
  if (token) next();
  else res.status(403).send("Access denied, please specify a token");
};

app.use(secure);
app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
