import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import * as elements from "typed-html";

const app = new Elysia()
    .use(html())
    .get("/", ({ html }) =>
        html(
            <BaseHtml>
            <body
            class="bg-green-500"
            hx-get="/todos"
            hx-trigger="load"
            hx-swap="innerHTML"
            />
            </BaseHtml>
        )
    )
    .get("/todos", () => <TodoList todos={db} />)
    .listen(8080);

console.log(
    `elysia running at http://${app.server?.hostname}:${app.server?.port}`
);

const BaseHtml = ({ children }: elements.Children) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="https://unpkg.com/htmx.org@1.9.10" integrity="sha384-D1Kt99CQMDuVetoL1lrYwg5t+9QdHe7NLX/SoJYkXDFfX37iInKRy5xLSi8nO7UC" crossorigin="anonymous"></script>

    </head>
    ${children}
  `;
  type Todo = {
      id: number;
      content: string;
      completed: boolean;
  }
const db: Todo[] = [
    {id: 1, content: "cool task", completed: true}
];
function TodoItem({ id,content, completed}:Todo) {

    return(
        <div>
            <p>{content}</p>
            <input type="checkbox" checked={completed}/>
            <button class="text-red-500">X</button>
        </div>
    );
}
function TodoList({ todos }: {todos: Todo[]}) {

    return(
        <div>
        {todos.map((todo) => (
        <TodoItem {...todo} />
        ))}
        </div>
    );
}
