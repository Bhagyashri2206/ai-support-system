import { Hono } from "hono"
import { prisma } from "../db/prisma"

export const chatRoutes = new Hono()

chatRoutes.post("/messages", async (c) => {
  const { message, conversationId } = await c.req.json()

  // 1️⃣ Create or reuse conversation
  const conversation = conversationId
    ? await prisma.conversation.findUnique({
        where: { id: conversationId }
      })
    : await prisma.conversation.create({ data: {} })

  if (!conversation) {
    return c.json({ error: "Conversation not found" }, 404)
  }

  // 2️⃣ Save user message
  await prisma.message.create({
    data: {
      role: "user",
      content: message,
      conversationId: conversation.id
    }
  })

  // 3️⃣ Simple agent routing
  let agent = "support"
  let response = "Support agent will help you."

  if (message.toLowerCase().includes("order")) {
    const order = await prisma.order.findFirst()
    agent = "order"
    response = `Your order status is: ${order?.status}`
  } 
  else if (
    message.toLowerCase().includes("payment") ||
    message.toLowerCase().includes("refund")
  ) {
    const payment = await prisma.payment.findFirst()
    agent = "billing"
    response = `Payment status: ${payment?.status}`
  }

  // 4️⃣ Save assistant reply
  await prisma.message.create({
    data: {
      role: "assistant",
      content: response,
      conversationId: conversation.id
    }
  })

  return c.json({
    conversationId: conversation.id,
    agent,
    response
  })
})
