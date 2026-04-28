const { Router } = require("express");
const { ListUser, ListDeletedUsers, GetUserById, CreateUser, UpdateUser, DeleteUser, SoftDeleteUser } = require("../controllers/User");

const route = Router();

route.get("/users", ListUser);
route.get("/users/deleted", ListDeletedUsers);
route.get("/users/:id", GetUserById);
route.post("/users", CreateUser);
route.put("/users/:id", UpdateUser);
route.delete("/users/:id", DeleteUser);
route.patch("/users/:id/delete", SoftDeleteUser);

module.exports = route;