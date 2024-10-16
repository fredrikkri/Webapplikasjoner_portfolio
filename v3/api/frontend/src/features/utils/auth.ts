import { users } from "../../data/users";
import type { User } from "../types/user";

const parseCookie = (cookie: string) => {
  return Object.fromEntries(
    cookie.split(";").map((cookie) => cookie.trim().split("="))
  );
};

export function getUser(request: Request): User | null {
  const cookies = parseCookie(request.headers.get("Cookie") ?? "");
  const id = cookies["user.id"];
  return users.find((user) => user.id === id) ?? null;
}