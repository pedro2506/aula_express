const { Router } = require("express");
const { ListUser, CreateUser, UpdateUser, DeleteUser } = require("../controllers/User");

const route = Router();

route.get("/users", ListUser);
route.get("/users/:id", ListUser);
route.post("/users", CreateUser);
route.put("/users/:id", UpdateUser);
route.delete("/users/:id", DeleteUser);


module.exports = route;