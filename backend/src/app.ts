import { Hono } from "hono"
import { serve } from "@hono/node-server"
import { cors } from "hono/cors"

const app = new Hono()

// ✅ Proper CORS handling
app.use(
  "*",
  cors({
    origin: "http://localhost:5173",
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type"]
  })
)



// ✅ Health check
app.get("/api/health", (c) => {
  return c.json({ status: "ok" })
})

// ✅ Agents endpoint
app.get("/api/agents", (c) => {
  return c.json([
    { type: "support", description: "General support queries" },
    { type: "order", description: "Order related queries" },
    { type: "billing", description: "Billing and payment queries" }
  ])
})

// ✅ Chat endpoint (placeholder for now)
app.post("/api/chat/messages", async (c) => {
  let body

  try {
    body = await c.req.json()
  } catch {
    return c.json({ error: "Invalid JSON" }, 400)
  }

  const message = body.message?.toLowerCase() || ""
  let agent = "support"

  if (
    message.includes("order") ||
    message.includes("delivery") ||
    message.includes("shipment")
  ) {
    agent = "order"
  } else if (
    message.includes("bill") ||
    message.includes("payment") ||
    message.includes("refund") ||
    message.includes("invoice")
  ) {
    agent = "billing"
  }

  return c.json({
    agent,
    response: `Handled by ${agent} agent`
  })
})


serve({
  fetch: app.fetch,
  port: 3000
})

console.log("Server running on http://localhost:3000")
