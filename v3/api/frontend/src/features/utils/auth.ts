import type { MiddlewareHandler } from "hono";
import { HTTPException } from "hono/http-exception";
import { users } from "../../data/users";
import type { User } from "../types/types";


const parseCookie = (cookie: string) => {
    return Object.fromEntries(
      cookie.split(";").map((cookie) => cookie.trim().split("="))
    );
  };

export const authenticate = (): MiddlewareHandler => {
  return async function authenticate(c, next) {
    const user = getUser(c.req.raw);
    if (!user) throw new HTTPException(401);
    c.set("user", user);
    await next();
  };
};

export function getUser(request: Request): User | null {
    const cookies = parseCookie(request.headers.get("Cookie") ?? "");
    // Henter ut user.id cookie verdi
    const id = cookies["user.id"];
    return users.find((user) => user.id === id) ?? null;
  }
