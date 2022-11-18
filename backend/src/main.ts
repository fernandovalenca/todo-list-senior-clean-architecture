import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

type ToDo = {
  id: string;
  description: string;
  done: boolean;
};

const todos: Array<ToDo> = [
  {
    id: "1",
    description: "Estudar React",
    done: false,
  },
];

app.get("/todos", function (req, res) {
  console.log("GET");

  res.status(200).json({ todos });
});

app.post("/todos", function (req, res) {
  const todo = req.body;

  console.log("POST");

  todos.push(todo);

  res.status(201).end();
});

app.put("/todos/:id", function (req, res) {
  const todo = todos.find((todo: any) => todo.id === req.params.id);

  console.log("PUT");

  if (todo) {
    todos[todos.indexOf(todo)] = { ...req.body, done: !req.body.done };
  }

  res.end();
});

app.delete("/todos/:id", function (req, res) {
  const todo = todos.find((todo: any) => todo.id === req.params.id);

  console.log("DELETE");

  if (todo) {
    todos.splice(todos.indexOf(todo), 1);
  }
  res.end();
});

app.listen(3000, () => console.log("listening on port 3000"));
