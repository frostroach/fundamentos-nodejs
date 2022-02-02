const express = require("express");
const { json } = require("express/lib/response");

const app = express();

app.use(express.json());

//localhost:3333
app.listen(3333);

app.get("/courses", (request, response) => {
  const query = request.query;
  console.log(query);
  const body = ["Curso 1", "Curso 2", "Curso 3"];
  return response.json(body).message;
});

app.post("/courses", (request, response) => {
  //const body = ["Curso 1", "Curso 2", "Curso 3", "Curso 4"];
  const body = request.body;
  console.log(body);
  return response.json(body);
});

app.put("/courses/:id", (request, response) => {
  const { id } = request.params;
  console.log(id);
  const body = ["Curso 6", "Curso 2", "Curso 3", "Curso 4"];
  if (body[id]) {
    return response.json(body[id]);
  } else {
    return response.json("Nenhum item encontrado");
  }
});

app.patch("/courses/:id", (request, response) => {
  const body = ["Curso 6", "Curso 7", "Curso 3", "Curso 4"];
  return response.json(body);
});

app.delete("/courses/:id", (request, response) => {
  const body = ["Curso 6", "Curso 3", "Curso 4"];
  return response.json(body);
});
