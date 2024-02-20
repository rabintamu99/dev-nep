import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function createQuestion(req, res) {
  if (req.method === 'POST') {
    const { text, authorId } = req.body;
    try {
      const newQuestion = await prisma.question.create({
        data: {
          text,
          authorId
        },
      });
      res.status(200).json(newQuestion);
    } catch (error) {
      res.status(500).json({ error: 'Error creating question' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
