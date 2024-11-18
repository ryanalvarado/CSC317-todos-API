const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());


// Question 1: Add a "Priority" Field to the To-Do API
// Sample data
let todos = [
  { id: 1, task: "Learn Node.js", completed: false, priority: "medium" },
  { id: 2, task: "Build a REST API", completed: false, priority: "medium" }
];

// GET /todos - Retrieve all to-do items
app.get('/todos', (req, res) => {
  //  extracting completed property from req.query object
  const { completed } = req.query;

  if (completed !== undefied) {
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
    priority: medium
  };
  todos.push(201).json(newTodo);
});

/*
// POST /todos - Add a new to-do item
app.post('/todos', (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    task: req.body.task,
    completed: false
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
}); */

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
  // todos.map() iterates todos array
  // creates new object with copy of todo
  // ... is "spread operator" - it expands arrays into single elements
  // each element will individually set to completed 'true'
  todos = todos.map(todo => ({ ...todo, completed: true }));
  
  // status 200 = success
  // .json(todos) updates todos array back to my client
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
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
