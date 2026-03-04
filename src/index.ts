import { Elysia } from "elysia";
import { CloudflareAdapter } from "elysia/adapter/cloudflare-worker";
import { cors } from "@elysiajs/cors";
import { openapi } from "@elysiajs/openapi";
import { database } from "./ctx/database";
import { cfBindings } from "~/ctx/cf-bindings";
import { betterAuth } from "~/ctx/better-auth";
import { OpenAPI } from "./lib/auth";

export default new Elysia({
  adapter: CloudflareAdapter,
})
  .use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  )
  .use(cfBindings)
  .use(betterAuth)
  .use(database)
  .use(
    openapi({
      documentation: {
        components: await OpenAPI.components,
        paths: await OpenAPI.getPaths(),
      },
    })
  )
  .get("/", () => "Hello, Elysia on Cloudflare Workers!")
  .compile();
