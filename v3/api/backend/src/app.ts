import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";
import { Project, ProjectSchema } from "../../frontend/src/features/types/Project"
import { myProjects } from "../../frontend/src/data/myProjects"

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
  return c.json(<Project[]>projectsData);
});

const port = 3999;

console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port
});

export default projectsData;