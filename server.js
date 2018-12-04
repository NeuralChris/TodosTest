import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import config from './core/config/config.dev';
import todoRoutes from './routes/todos.route';
import Todo from './models/todos.model';
import connectToDb from './db/connect';

const port = config.serverPort;

connectToDb();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/todos', todoRoutes);

//Index route
app.get('/', (req, res) => {
    res.send('Invalid endpoint!');
});

app.listen(port, () => {
    console.info('server started - ', port);
});

// Let's check and see if we have any todos, if not, let's hydrate the DB.
async function checkTodos() {
    try {
        const todos = await Todo.getAll();
        if (todos && todos.length === 0) {
            // Our collection is empty, let's throw in some examples.
            console.log('Hydrating empty DB with todos.');

            // Todos for ABC
            const pastDate = new Date();
            const futureDate = new Date();
            pastDate.setDate(pastDate.getDate() - 5);
            futureDate.setDate(futureDate.getDate() + 5);
            Todo({
                key: "abc",
                title: "Past Todo",
                description: "This todo's due date is in the past.",
                due: pastDate.toISOString(),
            }).save();
            Todo({
                key: "abc",
                title: "Upcoming Todo 1",
                description: "This is an upcoming todo.",
                due: futureDate.toISOString(),
            }).save();
            Todo({
                key: "abc",
                title: "Upcoming Todo 2",
                description: "This is an upcoming todo.",
                due: futureDate.toISOString(),
            }).save();
            Todo({
                key: "abc",
                title: "Upcoming Todo 3",
                description: "This is an upcoming todo.",
                due: futureDate.toISOString(),
            }).save();
            Todo({
                key: "abc",
                title: "Upcoming Todo 4",
                description: "This is an upcoming todo.",
                due: futureDate.toISOString(),
            }).save();
            Todo({
                key: "abc",
                title: "Upcoming Todo 5",
                description: "This is an upcoming todo.",
                due: futureDate.toISOString(),
            }).save();
            Todo({
                key: "abc",
                title: "Upcoming Todo 6",
                description: "This is an upcoming todo.",
                due: futureDate.toISOString(),
            }).save();

            // Todos for DEF
            Todo({
                key: "def",
                title: "Random Todo 1",
                description: "This is a todo with a random due date.",
                due: new Date(+(new Date()) - Math.floor(Math.random()*10000000000)).toISOString(),
            }).save();
            Todo({
                key: "def",
                title: "Random Todo 2",
                description: "This is a todo with a random due date.",
                due: new Date(+(new Date()) - Math.floor(Math.random()*10000000000)).toISOString(),
            }).save();
            Todo({
                key: "def",
                title: "Random Todo 3",
                description: "This is a todo with a random due date.",
                due: new Date(+(new Date()) - Math.floor(Math.random()*10000000000)).toISOString(),
            }).save();
            Todo({
                key: "def",
                title: "Random Todo 4",
                description: "This is a todo with a random due date.",
                due: new Date(+(new Date()) - Math.floor(Math.random()*10000000000)).toISOString(),
            }).save();
            Todo({
                key: "def",
                title: "Random Todo 5",
                description: "This is a todo with a random due date.",
                due: new Date(+(new Date()) - Math.floor(Math.random()*10000000000)).toISOString(),
            }).save();
            Todo({
                key: "def",
                title: "Random Todo 6",
                description: "This is a todo with a random due date.",
                due: new Date(+(new Date()) - Math.floor(Math.random()*10000000000)).toISOString(),
            }).save();
            Todo({
                key: "def",
                title: "Random Todo 7",
                description: "This is a todo with a random due date.",
                due: new Date(+(new Date()) - Math.floor(Math.random()*10000000000)).toISOString(),
            }).save();

            // Todos for GHI
            Todo({
                key: "ghi",
                title: "Complete Todo 1",
                description: "This is a completed todo.",
                complete: true,
                due: new Date(+(new Date()) - Math.floor(Math.random()*10000000000)).toISOString(),
            }).save();
            Todo({
                key: "ghi",
                title: "Incomplete Todo 1",
                description: "This is a todo with a random due date.",
                due: new Date(+(new Date()) - Math.floor(Math.random()*10000000000)).toISOString(),
            }).save();
            Todo({
                key: "ghi",
                title: "Incomplete Todo 2",
                description: "This is a todo with a random due date.",
                due: new Date(+(new Date()) - Math.floor(Math.random()*10000000000)).toISOString(),
            }).save();
            Todo({
                key: "ghi",
                title: "Incomplete Todo 3",
                description: "This is a todo with a random due date.",
                due: new Date(+(new Date()) - Math.floor(Math.random()*10000000000)).toISOString(),
            }).save();
        }
    } catch (error) {
        console.error('Error hydrating DB', error);
    }
}
checkTodos();
