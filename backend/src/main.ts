import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

function sleep(ms = 1000): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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

app.get("/todos", function (_, res) {
  console.log("GET");

  res.status(200).json({ todos });
});

app.post("/todos", async function (req, res) {
  const todo = req.body;

  console.log("POST");

  todos.push(todo);

  res.status(201).end();
});

app.put("/todos/:id", function (req, res) {
  const todo = todos.find((todo: ToDo) => todo.id === req.params.id);

  console.log("PUT");

  if (todo) {
    todos[todos.indexOf(todo)] = { ...req.body, done: !req.body.done };
  }

  res.end();
});

app.delete("/todos/:id", function (req, res) {
  const todo = todos.find((todo: ToDo) => todo.id === req.params.id);

  console.log("DELETE");

  if (todo) {
    todos.splice(todos.indexOf(todo), 1);
  }
  res.end();
});

const PORT = 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
