// app/api/follow/status.ts

import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response(JSON.stringify({ isFollowing: false }), { status: 401 });
    }

    const url = new URL(req.url);
    const followingId = url.searchParams.get('followingId');

    if (!followingId) {
      return new Response(JSON.stringify({ error: 'Following ID is required' }), { status: 400 });
    }

    const followExists = await db.follows.findFirst({
      where: {
        followerId: session.user.id,
        followingId,
      },
    });

    return new Response(JSON.stringify({ isFollowing: !!followExists }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error checking follow status:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
