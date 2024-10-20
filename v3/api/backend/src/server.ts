import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";
import { Project, ProjectSchema } from "../../frontend/src/features/types/types"
// import { isNameValid } from "./lib/validator";
import { getUser } from "../../frontend/src/features/utils/auth"

const app = new Hono();

app.use("/*", cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use("/*", serveStatic({ root: "./" }));

let projectsData: Project[] =  [
  {
      "id": "1",
      "userId": "1",
      "projectTitle": "test2",
      "description": "Webapp",
      "githubLink": "Link to github repo",
      "liveDemoLink": "link",
      "imgUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/330px-Unofficial_JavaScript_logo_2.svg.png",
      "createdAt": new Date(2024,8,12),
      "status": "New",
      "isPublic": "true"
    },
    {
      "id": "2",
      "userId": "2",
      "projectTitle": "Website created with Python and Flask",
      "description": "A simple website with sanity database",
      "githubLink": "Link to github repo",
      "liveDemoLink": "link",
      "imgUrl": "https://blog.appseed.us/content/images/size/w600/2024/01/cover-flask.jpg",
      "createdAt": new Date(2024,6,2), 
      "status": "In Progress",
      "isPublic": "false"
    }
];

app.post("/add", async (c) => {
  try {
    const newProject = await c.req.json()
    const parseData = ProjectSchema.parse(newProject)
    projectsData.push(parseData);

    return c.json(projectsData, { status: 201 });
} catch (error) {
    return c.json({ error: error }, { status: 400 });
    }
});

app.get("/projects", async (c) => {
  const user = getUser(c.req.raw);

  if (!user) {
    return new Response("Ingen tilgang", {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
    
  }
  const userProjects = projectsData.filter((project) => {
    return project.userId === user.id || user.role === 'admin'
  });
  return c.json(<Project[]>userProjects, {status: 200});
});

app.get("/projects/:id", async (c) => {
  const id = c.req.param("id")
  const projects = projectsData.filter((thisProject) => thisProject.id === id)
  return c.json(projects, {status: 200});
});

app.delete("/projects/:id", async (c) => {
  const id = c.req.param("id")
  projectsData = projectsData.filter((thisProject) => thisProject.id !== id);
    return c.json(projectsData, {status: 200});
});

app.patch("/projects/:id", async (c) => {
  const id = c.req.param("id");
  const projects = projectsData.map((thisProject) => thisProject.id === id ? {...projectsData, name} : thisProject);
    return c.json(projects, {status: 200});
});

const port = 3999;

console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port
});

export default projectsData;