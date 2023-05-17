const express = require("express");
const { Pool } = require("pg");
const db = new Pool({
  connectionString:
    "postgres://bczzpnnq:sVV77LoawyWzEOvkablYt2KFc5oWFW_8@horton.db.elephantsql.com/bczzpnnq",
});
const app = express();
const port = 3000;

async function secure(req, res) {
  let token = req.params.token;
  const { rows: tokens } = await db.query(
    "SELECT * FROM token WHERE value=$1",
    [token]
  );
  if (tokens.length) {
    const { rows: users } = await db.query(
      "SELECT * FROM users WHERE token_id=$1",
      [tokens[0].id]
    );
    if (users.length) res.send(`<h1>Welcome back, ${users[0].name}</h1>`);
    else res.status(401).send("No user with this token");
  } else res.status(401).send("Invalid token");
}

async function createUser(req, res) {}

async function createTokenForUser(req, res) {}

app.get("/verify/:token", secure);
app.get("/", (req, res) => {
  res.send("Validate your token here: /verify/:tokenvalue");
});
app.post("/users", createUser);
app.post("/users/:user/:tokenvalue", createTokenForUser);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
