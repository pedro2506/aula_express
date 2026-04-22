const { Router } = require("express");
const { ListUser, CreateUser } = require("../controllers/User");

const route = Router();

route.get("/users", ListUser);
route.post("/users", CreateUser);

module.exports = route;