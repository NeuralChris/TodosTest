import express from "express";
import todoController from "../controllers/todos.controller"
const router = express.Router()

router.get('/alltodos', (req, res) => {
    todoController.getAll(req, res);
});

router.get('/key/:key', (req, res) => {
    todoController.getTodosByKey(req, res);
});

router.post('/addtodo', (req, res) => {
    todoController.addTodo(req, res);
});

router.delete('/deletetodo', (req, res) => {
    todoController.deleteTodo(req, res);
});

export default router;
