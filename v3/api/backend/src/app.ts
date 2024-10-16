import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";
import { Project, ProjectSchema } from "../../frontend/src/types/Project"

const app = new Hono();

app.use("/*", cors());
app.use("/*", serveStatic({ root: "./" }));

const projectsData: Project[] = [
    {
        "id": crypto.randomUUID(),
        "projectTitle": "test2",
        "description": "Webapp",
        "githubLink": "Link to github repo",
        "liveDemoLink": "link",
        "imgUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/330px-Unofficial_JavaScript_logo_2.svg.png",
        "createdAt": new Date(2024,8,12),
      },
      {
        "id": crypto.randomUUID(),
        "projectTitle": "Website created with Python and Flask",
        "description": "A simple website with sanity database",
        "githubLink": "Link to github repo",
        "liveDemoLink": "link",
        "imgUrl": "https://blog.appseed.us/content/images/size/w600/2024/01/cover-flask.jpg",
        "createdAt": new Date(2024,6,2), 
      }
];

app.post("/add", async (c) => {
  const newProject = await c.req.json();
  const parseData = ProjectSchema.parse(newProject)
  projectsData.push(parseData);
  return c.json(projectsData, { status: 201 });
});

app.get("/projects", async (c) => {
  return c.json(<Project[]>projectsData);
});

const port = 3999;

console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port
});

export default projectsData;