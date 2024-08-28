// Importerer nødvendige moduler
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";
import { Project } from "./types";

// Oppretter en ny Hono-applikasjon
const app = new Hono();

// Aktiverer CORS (Cross-Origin Resource Sharing) for alle ruter
app.use("/*", cors());

// Setter opp statisk filbetjening for filer i "static" mappen
app.use("/static/*", serveStatic({ root: "./" }));

// Initialiserer en liste med vaner (habits)
const projects: Project[] = [
    // {
    //     "id": "1",
    //     "title": "test2",
    //     "description": "Webapp",
    //     "githubLink": "Link to github repo",
    //     "liveDemoLink": "link",
    //     "imgUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/330px-Unofficial_JavaScript_logo_2.svg.png",
    //     "createdAt": new Date(),
    //   },
    //   {
    //     "id": "2",
    //     "title": "Website created with Python and Flask",
    //     "description": "A simple website with sanity database",
    //     "githubLink": "Link to github repo",
    //     "liveDemoLink": "link",
    //     "imgUrl": "https://blog.appseed.us/content/images/size/w600/2024/01/cover-flask.jpg",
    //     "createdAt": new Date(),
    //   }
];

// Definerer en POST-rute for å legge til nye vaner
app.post("/add", async (c) => {
  const newProject = await c.req.json();
  console.log(newProject);
  // Legger til den nye vanen i listen med en unik ID og tidsstempel
  projects.push({ id: crypto.randomUUID(), createdAt: new Date(), ...newProject });

  // Returnerer den oppdaterte listen med vaner og en 201 (Created) statuskode
  return c.json(projects, { status: 201 });
});

// Definerer en GET-rute for å hente alle vaner
app.get("/", (c) => {
  return c.json(projects);
});

// Definerer porten serveren skal lytte på
const port = 3999;

console.log(`Server is running on port ${port}`);

// Starter serveren
serve({
  fetch: app.fetch,
  port,
});