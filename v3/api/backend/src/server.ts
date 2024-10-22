import { serve } from "@hono/node-server";
import { Hono, type Context } from "hono";
import { cors } from "hono/cors";
import { projectController } from "./features/projects/project.controller";
import { serveStatic } from "@hono/node-server/serve-static";
import { env } from "./lib/env";

const app = new Hono();

app.use("/*", cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use("/*", serveStatic({ root: "./" }));

app.route("api/v1", projectController)


const port = env.PORT;

console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port
});