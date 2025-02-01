// import { User } from "@prisma/client";
// import { DB } from "./db/db";
// import { ServerEnv } from "./lib/env";
// import { Hono } from "hono";

// type ContextVariables = {
//     user: User | null;
//   };
  
//   export type ServiceContext = {
//     db: DB;
//   };
  
//   export type HonoEnv = {
//     Bindings: ServerEnv;
//     Variables: {
//       services: ServiceContext;
//     } & ContextVariables;
//   };
  
//   const app = new Hono<HonoEnv>();