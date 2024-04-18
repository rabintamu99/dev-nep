// app/api/follow/route.ts

import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { z } from 'zod';

// Assuming you have a validator for follow request
const FollowValidator = z.object({
  followingId: z.string(),
});

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();



    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const body = await req.json();

    const { followingId } = FollowValidator.parse(body);

    console.log(followingId,session.user);
    // Check if user is already following the target user
    const followExists = await db.follows.findFirst({
      where: {
        followingId,
        followerId: session.user.id,
      },
    });

    if (followExists) {
      return new Response("You're already following this user", { status: 400 });
    }

    // Create a new follow record
    await db.follows.create({
      data: {
        followerId: session.user.id,
        followingId,
      },
    });

    const followersCount = await db.follows.count({
      where: {
        followingId: followingId,
      },
    });

    return new Response(JSON.stringify({ success: true, followingId, followersCount }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response('Could not process the follow request at this time. Please try later', {
      status: 500,
    });
  }
}
