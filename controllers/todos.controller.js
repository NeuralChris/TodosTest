import Todo from '../models/todos.model';

const controller = {};

controller.getAll = async (req, res) => {
    try {
        const todos = await Todo.getAll();
        console.log('Sending all todos.');
        res.status(200).json({
            message: 'Todos retrieved successfully',
            todos,
        });
    } catch(err) {
        console.error('Error getting todos', err);
        res.status(500).json({
            message: 'Error retrieving all todos',
            error: error,
        });
    }
};

controller.getTodosByKey = async (req, res) => {
    try {
        const key = req.params.key;
        const todos = await Todo.getTodosByKey(key);
        console.log('Retreiving todos for', key);
        res.status(200).json({
            message: `Todos retrieved for user ${key} successfully.`,
            todos,
        });
    } catch (error) {
        console.error(`Error getting todos for key ${req.params.key}`, error);
        res.status(500).json({
            message: `Error retrieving todos for key ${req.params.key}`,
            error: error,
        });
    }
};

controller.addTodo = async (req, res) => {
    // Check to make sure we have our required fields.
    if (!req.body.key ||
        !req.body.title ||
        !req.body.description ||
        !req.body.duedate) {
        res.status(400).json({
            message: 'Missing required fields',
        });
        return;
    }
    let todo = Todo({
        key: req.body.key,
        title: req.body.title,
        description: req.body.description,
        due: req.body.duedate,
    });
    try {
        const savedTodo = await Todo.addTodo(todo);
        console.log('Adding todo.', todo);
        res.status(200).json({
            message: 'Added: ' + savedTodo,
        });
    } catch(err) {
        console.error('Error adding todo', err);
        res.status(500).json({
            message: 'Error adding new todo',
            error: error,
        });
    }
};

controller.deleteTodo = async (req, res) => {
    let todoTitle = req.body.title;
    try{
        const removedTodo = await Todo.removedTodo(todoTitle);
        console.log('Deleted Todo- ' + removedTodo);
        res.status(200).json({
            message: 'Todo successfully deleted'
        });
    } catch(err) {
        console.error('Error deleting todo', err);
        res.status(500).json({
            message: 'Error deleting todo',
            error: error,
        });
    }
};

export default controller;
