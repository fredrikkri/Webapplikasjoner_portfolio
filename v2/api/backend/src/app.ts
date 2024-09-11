import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

app.use("/*", cors());

app.get("/projects", (c) => {
  return c.json({
    data: [
        {
        "id": crypto.randomUUID(),
        "projectTitle": "test2",
        "description": "Webapp",
        "githubLink": "Link to github repo",
        "liveDemoLink": "link",
        "imgUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/330px-Unofficial_JavaScript_logo_2.svg.png",
        "createdAt": new Date(),
      },
      {
        "id": crypto.randomUUID(),
        "projectTitle": "Website created with Python and Flask",
        "description": "A simple website with sanity database",
        "githubLink": "Link to github repo",
        "liveDemoLink": "link",
        "imgUrl": "https://blog.appseed.us/content/images/size/w600/2024/01/cover-flask.jpg",
        "createdAt": new Date(),
        }
    ],
  });
});

export default app;