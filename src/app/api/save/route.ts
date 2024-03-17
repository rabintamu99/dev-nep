import { db } from "@/lib/db";
import { getAuthSession } from '@/lib/auth';
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // Fixed: Pass the request object to getAuthSession
  const session = await getAuthSession();
  const userId = session?.user?.id;

  // Check for valid session and userId
  if (!session || !userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { questionId } = await request.json();

    console.log(questionId)
    const questionExist = await db.question.findUnique({
      where: {
        id: questionId,
      },
    });

    if (!questionExist) {
      return NextResponse.json({ error: 'Question does not exist' }, { status: 404 });
    }

    const savedCheck = await db.save.findFirst({
      where: {
        questionId,
        userId,
      },
    });

    if (savedCheck) {
      await db.save.delete({
        where: {
          id: savedCheck.id,
        },
      });

      return NextResponse.json({ message: 'Question removed from saved stories' });
    } else {
      const saveQuestion = await db.save.create({
        data: {
          userId: userId,
          questionId: questionExist.id,
        },
      });

      return NextResponse.json(saveQuestion);
    }
  } catch (error) {
    console.error('Error:', error);
    // Improved error response to the client
    return NextResponse.json({ error: 'An error occurred while processing your request' }, { status: 500 });
  }
}
