

import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { z } from 'zod';

// Validator for unfollow request
const UnfollowValidator = z.object({
  followingId: z.string(),
});

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const { followingId } = UnfollowValidator.parse(body);

    // Check if the follow relationship exists
    const followExists = await db.follows.findFirst({
      where: {
        followerId: session.user.id,
        followingId,
      },
    });

    if (!followExists) {
      return new Response("You're not following this user.", {
        status: 400,
      });
    }

    // Delete the follow record
    await db.follows.delete({
      where: {
        followerId_followingId: {
          followerId: session.user.id,
          followingId,
        },
      },
    });

    return new Response(JSON.stringify({ success: true, followingId }), {
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

    return new Response('Could not process the unfollow request at this time. Please try later', {
      status: 500,
    });
  }
}

