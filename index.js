import express from "express";
import pg from "pg";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();
const port = 5000;

//MIDDLEWARE
app.use(cors());
app.use(express.json());
const jsonParser = bodyParser.json();
//DATABASE CONNECTION
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  password: "12345",
  port: 5432,
  database: "newTodo",
});

db.connect();

/*ROUTES*/
//Create a todo
app.post("/todos", jsonParser, async (req, res) => {
  try {
    console.log(req.body);
    const { description } = req.body;
    console.log(description);

    const newTodo = await db.query(
      "INSERT INTO todos (description) VALUES ($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});
//get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await db.query("SELECT * FROM todos");
    res.json(allTodos.rows);
  } catch (error) {
    console.error(error.message);
  }
});
//get a particular todo
app.get("/todos/:id", async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  console.log(id);
  const todo = await db.query("SELECT * FROM  todos WHERE todo_id=$1", [id]);
  res.json(todo.rows[0]);
});
//update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updatedTodo = await db.query(
      "UPDATE todos SET description=$1 WHERE todo_id=$2",
      [description, id]
    );
    res.json("todo was updated");
  } catch (error) {
    console.error(error.message);
  }
});
//delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedtodo = await db.query("DELETE FROM todos WHERE todo_id=$1", [
      id,
    ]);
    res.redirect("/todos");
  } catch (error) {
    console.error(error.message);
  }
});
app.listen(port, () => {
  console.log(`SERVER HAS BEEN STARTED ON PORT ${port}`);
});
