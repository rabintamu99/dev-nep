
import { unstable_noStore as noStore } from "next/cache";
import{ db } from "@/lib/db";
  export default async function getUser(username: string) {
  try {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      include: {
        followedBy: {
          include: {
            follower: {
              include: {
                following: true,
                followedBy: true,
              },
            },
          },
        },
        following: {
          include: {
            following: {
              include: {
                following: true,
                followedBy: true,
              },
            },
          },
        },
      },
    });

    return user;
   
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch profile");
  }
}
