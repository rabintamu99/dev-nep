import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { UsernameValidator } from '@/lib/validators/username' 
import { BioValidator } from '@/lib/validators/bio' 
import { z } from 'zod'

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const { name, bio } = z.object({ // Validate both username and bio
      name: UsernameValidator,
      bio: BioValidator // Define BioValidator in your validators
    }).parse(body)

    // Check if username is taken
    const username = await db.user.findFirst({
      where: {
        username: name,
      },
    })

    if (username) {
      return new Response('Username is taken', { status: 409 })
    }

    // Update username and bio
    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        username: name,
       // Include bio in the update
      },
    })

    return new Response('OK')
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }

    return new Response(
      'Could not update username and bio at this time. Please try later',
      { status: 500 }
    )
  }
}
