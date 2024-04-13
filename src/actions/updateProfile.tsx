"use server";
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { getAuthSession } from '@/lib/auth';
import { toast } from '@/hooks/use-toast'

export async function updateProfile(formData: FormData) {


  // Get the authenticated user's session
  const session = await getAuthSession();

  // Check if the user is authenticated
  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const userId = session.user.id;

  // Get the updated name from the form data
  const name = formData.get("name") as string;
  try {
  // Update the user's name in the database
  await db.user.update({
    where: {
      id: userId,
    },
    data: {
      name: name ?? undefined,
    },
  });

    // Revalidate the cache for the "/" route
    revalidatePath("/", "layout");


    return toast({
        title: 'Something went wrong.',
        description: 'Your username was not updated. Please try again.',
        variant: 'destructive',
      })
    },
    onSuccess: () => {
      toast({
        description: 'Your username has been updated.',
      })
      router.refresh()
    },
  })
}