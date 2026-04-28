const { Router } = require("express");
const { ListUser, ListDeletedUsers, CreateUser, UpdateUser, DeleteUser, SoftDeleteUser } = require("../controllers/User");

const route = Router();

route.get("/users", ListUser);
route.get("/users/:id", ListUser);
route.get("/users/deleted", ListDeletedUsers);
route.post("/users", CreateUser);
route.put("/users/:id", UpdateUser);
route.delete("/users/:id", DeleteUser);
route.patch("/users/:id/delete", SoftDeleteUser);

module.exports = route;