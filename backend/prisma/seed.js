const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function main() {
  await prisma.order.createMany({
    data: [
      { status: "processing" },
      { status: "shipped" },
      { status: "delivered" }
    ]
  })

  await prisma.payment.createMany({
    data: [
      { amount: 499, status: "paid" },
      { amount: 999, status: "refunded" }
    ]
  })
}

main()
  .then(() => console.log("Database seeded"))
  .catch(console.error)
  .finally(() => prisma.$disconnect())
