const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Sample data
let todos = [
  { id: 1, task: "Learn Node.js", completed: false, priority: "medium" },
  { id: 2, task: "Build a REST API", completed: false, priority: "medium" }
];

// GET /todos - Retrieve all to-do items
app.get('/todos', (req, res) => {
  //  extracting completed property from req.query object
  const { completed } = req.query;

  if (completed !== undefined) {
    const filteredTodos = todos.filter(todo => todo.completed.toString() === completed);
    return res.json(filteredTodos);
  }
  res.json(todos);
});

// Add this route to handle the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the To-Do API!');
});

// POST /todos - Add new to-do item
app.post('/todos', (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    task: req.body.task,
    completed: false,
    priority: "medium"
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT /todos/:id - Update an existing to-do item
app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);
  if (!todo) {
    return res.status(404).send("To-Do item not found");
  }
  todo.task = req.body.task || todo.task;
  todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;
  res.json(todo);
});

// PUT /todos/complete-all - Mark all to-do items as completed
app.put('/todos/complete-all', (req, res) => {
  todos = todos.map(todo => ({ ...todo, completed: true }));
  res.status(200).json(todos);
});

// DELETE /todos/:id - Delete a to-do item
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);
  if (index === -1) {
    return res.status(404).send("To-Do item not found");
  }
  todos.splice(index, 1);
  res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});