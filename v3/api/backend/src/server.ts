import { serve } from "@hono/node-server";
import { Hono, type Context } from "hono";
import { cors } from "hono/cors";
import { bearerAuth } from "hono/bearer-auth";
import { projectController } from "./features/projects/project.controller";
import { HTTPException } from "hono/http-exception";
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
      "projectStatus": "New",
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
      "projectStatus": "In Progress",
      "isPublic": "false"
    }
];

// @@@@@@@@@@@@@@@@@@@@@@@ GET @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// app.get("/projects", async (c) => {
//   const user = getUser(c.req.raw);

//   if (!user) {
//     return new Response("Ingen tilgang", {
//       status: 401,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
    
//   }
//   const userProjects = projectsData.filter((project) => {
//     return project.userId === user.id || user.role === 'admin'
//   });
//   return c.json(<Project[]>userProjects, {status: 200});
// });

app.get("/projects", (c) => {
  return c.json(projectsData);
});
// @@@@@@@@@@@@@@@@@@@@@@@ GET @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// @@@@@@@@@@@@@@@@@@@@@@@ POST @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// app.post("/add", async (c) => {
//   try {
//     const newProject = await c.req.json()
//     const parseData = ProjectSchema.parse(newProject)
//     projectsData.push(parseData);

//     return c.json(projectsData, { status: 201 });
// } catch (error) {
//     return c.json({ error: error }, { status: 400 });
//     }
// });

app.post("/add", async (c) => {
  const { project } = await c.req.json();
  if (!project)
    return c.json({
      success: false,
      error: "Cloud not add project",
      status: 400,
    });
  projectsData.push(project);
  return c.json({ data: projectsData, success: true, status: 201 });
});
// @@@@@@@@@@@@@@@@@@@@@@@ POST @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// @@@@@@@@@@@@@@@@@@@@@@@ DELETE @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// app.delete("/projects/:id", async (c) => {
//   const id = c.req.param("id")
//   projectsData = projectsData.filter((thisProject) => thisProject.id !== id);
//     return c.json(projectsData, {status: 200});
// });

app.delete(
  "/projects/:id",
  bearerAuth({
    verifyToken: async (token, c) => {
      const value = Buffer.from(token, "base64").toString("utf-8");
      return value.split(":").length === 2;
    },
    invalidTokenMessage: {
      success: false,
      error: "Invalid token",
    },
    noAuthenticationHeaderMessage: {
      success: false,
      error: "Missing token",
    },
  }),
  async (c) => {
    const id = c.req.param("id");
    const projectExist = projectsData.some((project) => project.id === id);
    if (!projectExist) {
      return c.json({
        error: "Project not found",
        status: 404,
        success: false,
      });
    }
    projectsData = projectsData.filter((project) => project.id !== id);
    return c.json({ data: projectsData, success: true });
  }
);
// @@@@@@@@@@@@@@@@@@@@@@@ Delete @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


app.get("/projects/:id", async (c) => {
  const id = c.req.param("id")
  const projects = projectsData.filter((thisProject) => thisProject.id === id)
  return c.json(projects, {status: 200});
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