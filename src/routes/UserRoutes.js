const { Router } = require("express");
const { ListUser, CreateUser, UpdateUser } = require("../controllers/User");

const route = Router();

route.get("/users", ListUser);
route.post("/users", CreateUser);
route.put('/users/:id', UpdateUser);

module.exports = route;