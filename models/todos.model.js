import mongoose from 'mongoose';
import keyConfig from '../config/keys.config';

const TodoSchema = mongoose.Schema({
    key: {
        type: String,
        required: true,
        index: true,
    },
    title: {
        type: String,
        required: true,
        index: true,
    },
    description: {
        type: String,
        required: false,
    },
    due: {
        type: Date,
        required: false,
    },
    complete: {
        type: Boolean,
        required: true,
        default: false,
    }
}, {collection : 'Todo'});

let TodosModel = mongoose.model('Todo', TodoSchema);

/**
 * Gets all todos for all users. (Used for debugging)
 *
 * @returns     {Array<Todo>}      An array of all of the Todo objects.
 */
TodosModel.getAll = () => {
    return TodosModel.find({});
};

/**
 * Gets todos based on configuration by key. (Main route)
 *
 * @param   {string}      key       The user's API key
 *
 * @returns     {Array<Todo}        An array of this user's todo objects based on their config.
 */
TodosModel.getTodosByKey = (key) => {
    // First, let's grab the configuration for this key.
    if (Object.keys(keyConfig).includes(key)) {
        const userConfig = keyConfig[key];

        // Add the key to the where.
        const where = Object.assign({ key }, userConfig.where);

        return TodosModel.find(where, userConfig.fields, {
            limit: userConfig.limit,
            sort: userConfig.sort,
        });
    } else {
        throw "Key doesn't exist in config";
    }
};

/**
 * Adds a new todo
 *
 * @param   {Todo}      todo        The todo object with all required fields.
 *
 * @returns {Todo}                  The saved todo object.
 */
TodosModel.addTodo = (todo) => {
    return todo.save();
};

/**
 * Deletes an existing todo.
 *
 * @param   {string}    todoTitle   The title of the todo.
 *
 * @returns {Todo}                  The todo object that was deleted from the DB.
 */
TodosModel.removeTodo = (todoTitle) => {
    return TodosModel.remove({title: todoTitle});
};

export default TodosModel;
