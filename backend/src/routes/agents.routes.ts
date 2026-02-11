import { Hono } from "hono"

export const agentsRoutes = new Hono()

agentsRoutes.get("/", (c) => {
  return c.json([
    {
      type: "support",
      description: "Handles general support and FAQs"
    },
    {
      type: "order",
      description: "Handles order related queries"
    },
    {
      type: "billing",
      description: "Handles billing and payment issues"
    }
  ])
})
