import express from "express";

const app = express();

const users = [
  { gender: "male", id: 1, name: "eri" },
  { gender: "male", id: 2, name: "augusto" },
  { gender: "male", id: 3, name: "diego" },
  { gender: "male", id: 4, name: "valen" },
  { gender: "female", id: 5, name: "ileana" },
  { gender: "female", id: 6, name: "silvia" },
  { gender: "female", id: 7, name: "andrea" },
  { gender: "female", id: 8, name: "ana" },
];

app.get("/", (req, res) => {
  let gender = req.query.gender;
  if (gender) {
    gender = gender.toLowerCase();
    const userFilter = users.filter((u) => u.gender === gender);
    return res.send(userFilter);
  }
  res.send(users);
});

app.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const user = users.find((u) => u.id === id);

  if (!user) res.send({ error: "user not found" });
  else res.send(user);
});

app.listen(8080);
