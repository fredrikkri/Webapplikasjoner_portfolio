import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";
import { Project, ProjectSchema } from "../../frontend/src/features/types/Project"
import { myProjects } from "../../frontend/src/data/myProjects"
import { isNameValid } from "./lib/validator";

const app = new Hono();

app.use("/*", cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use("/*", serveStatic({ root: "./" }));

const projectsData: Project[] = myProjects

app.post("/add", async (c) => {
  const newProject = await c.req.json();
  const parseData = ProjectSchema.parse(newProject)
  projectsData.push(parseData);
  return c.json(projectsData, { status: 201 });
});

app.get("/projects", async (c) => {
  return c.json(<Project[]>projectsData, {status: 200});
});

app.get("/projects/:id", async (c) => {
  const id = c.req.param("id")
  const projects = projectsData.filter((thisProject) => thisProject.id === id)
  return c.json(projects, {status: 200});
});

/* 
const handleDelete = async (id: string) => {
  const response = await fetch(https://serverurl/api/projects/${id}, {metod: 'DELETE'})
  const result = await response.json()
  setStudentList(result)
}
*/
app.delete("/projects/:id", async (c) => {
  const id = c.req.param("id")
  const projects = projectsData.filter((thisProject) => thisProject.id !== id);
    return c.json(projects, {status: 200});
});

/* 
fetch(https://serverurl/api/projects/${id}, {metod: 'PATCH', body: JSON.stringify(data)})
*/
app.patch("/projects/:id", async (c) => {
  const id = c.req.param("id");
  const {projectTitle} = await c.req.json();
  if (!isNameValid(projectTitle)) {
    return c.json({error: "Invalid name"}, {status: 400})
  }
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