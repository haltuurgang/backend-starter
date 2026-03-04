import { Elysia } from "elysia";
import { env } from "cloudflare:workers";

export const cfBindings = new Elysia({ name: "@[cf-bindings]" }).decorate("cf", {
  env,
  bindings: {
    DB: env.DB,
    BUCKET: env.BUCKET,
    CACHE: env.CACHE,
  },
});
