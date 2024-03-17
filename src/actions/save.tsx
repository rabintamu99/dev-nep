"use server"
import {db} from "@/lib/db"
import { getAuthSession } from '@/lib/auth';

export const CheckSaved = async (questionId:string) => {
    const session = await getAuthSession();

  
    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }


  
    try {
        const userId = session.user.id; 
        const saved = await db.save.findFirst({
            where:{
                questionId,
                userId
            }
        })
        
        return {Status: !!saved}
    } catch (error) {
        return {Status: false}
    }
}


