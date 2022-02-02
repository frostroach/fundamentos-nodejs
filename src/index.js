const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(express.json());

let customers = [];

const verifyAccountExistance = (request, response, next) => {
  const { cpf } = request.headers;

  const customer = customers.find((item) => item.cpf === cpf);

  if (!customer) {
    return response.status(400).json({ error: "No customer found." });
  }

  request.customer = customer;

  return next();
};

const getCustomerBalance = (statement) => {
  const balance = statement.reduce((acc, operation) => {
    if (operation.type === "credit") {
      return acc + operation.amount;
    } else {
      return acc - operation.amount;
    }
  }, 0);
  return balance;
};

app.post("/account", (request, response) => {
  const { cpf, name } = request.body;
  const foundCpf = customers.some((item) => item.cpf === cpf);

  if (foundCpf) {
    return response.status(400).json({ error: "Customer already exists." });
  }

  const body = { cpf, name, id: uuidv4(), statement: [], balance: 0 };
  customers.push(body);
  //return response.json(body); - retornaria o body da request;
  return response.status(201).send();
});

app.get("/account", (request, response) => {
  if (customers.length) {
    return response.json(customers);
  } else {
    return response.json("Nenhuma conta encontrada");
  }
});

app.get("/statement/:cpf", verifyAccountExistance, (request, response) => {
  const { customer } = request;
  return response.json(customer.statement);
});

app.post("/deposit", verifyAccountExistance, (request, response) => {
  const { amount, description } = request.body;

  const { customer } = request;

  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: "credit",
  };

  const customersUpdated = customers.map((item) =>
    item.cpf === customer.cpf
      ? {
          ...item,
          balance: item.balance + amount,
        }
      : item
  );

  customers = customersUpdated;

  customer.statement.push(statementOperation);

  return response.status(201).send();
});

app.post("/withdraw", verifyAccountExistance, (request, response) => {
  const { amount } = request.body;
  const { customer } = request;

  const balance = getCustomerBalance(customer.statement);

  if (balance < amount) {
    return response.status(400).json({ error: "Insufficient funds" });
  }

  const statementOperation = {
    amount,
    created_at: new Date(),
    type: "debit",
  };

  const customersUpdated = customers.map((item) =>
    item.cpf === customer.cpf
      ? { ...item, balance: item.balance - amount }
      : item
  );

  customers = customersUpdated;

  customer.statement.push(statementOperation);

  return response.status(201).send();
});

app.get("/statement/date", verifyAccountExistance, (request, response) => {
  const { customer } = request;
  const { date } = request.query;

  const dateFormat = new Date(date + " 00:00");

  const statement = customer.statement.filter(
    (item) => item.created_at.toDateString() === dateFormat.toDateString()
  );

  return response.json(statement);
});

app.put("/account", verifyAccountExistance, (request, response) => {
  const { name } = request.body;
  const { customer } = request;

  customer.name = name;
  return response.status(201).send();
});

app.delete("/account", verifyAccountExistance, (request, response) => {
  const { customer } = request;

  customers.splice(customer, 1);

  return response.status(200).json(customers);
});

//localhost:3333
app.listen(3333);
