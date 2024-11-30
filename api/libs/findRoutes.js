import path from "node:path";

export function findRoutes(route) {
  if (route) {
    const routeBuild = path.join(process.cwd(), route);
    return routeBuild;
  } else {
    const routeBuild = process.cwd();
    return routeBuild;
  }
}

/* findRoutes() */
