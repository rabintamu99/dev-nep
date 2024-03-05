import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { db } from '@/lib/db';
  import { getAuthSession } from '@/lib/auth';
  
  import { revalidatePath, unstable_noStore as noStore } from "next/cache";
  
  async function getData(userId: string) {
    noStore();
    const data = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        name: true,
        email: true,
      },
    });
  
    return data;
  }
  
  export default async function SettingPage() {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }
  
    const authorId = session.user.id;
  
    async function postData(formData: FormData) {
      "use server";
  
      const name = formData.get("name") as string;
      const email = formData.get("email") as string;
  
      await db.user.update({
        where: {
            authorId: authorId,
        },
        data: {
          name: name ?? undefined,
       
        },
      });
  
      revalidatePath("/", "layout");
    }
  
    return (
      <div className="grid items-start gap-8">
        <div className="flex items-center justify-between px-2">
          <div className="grid gap-1">
            <h1 className="text-3xl md:text-4xl">Settings</h1>
            <p className="text-lg text-muted-foreground">Your Profile settings</p>
          </div>
        </div>
  
        <Card>
          <form action={postData}>
            <CardHeader>
              <CardTitle>General Data</CardTitle>
              <CardDescription>
                Please provide general information about yourself. Please dont
                forget to save
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="space-y-1">
                  <Label>Your Name</Label>
                  <Input
                    name="name"
                    type="text"
                    id="name"
                    placeholder="Your Name"
                    defaultValue={data?.name ?? undefined}
                  />
                </div>
                <div className="space-y-1">
                  <Label>Your Email</Label>
                  <Input
                    name="email"
                    type="email"
                    id="email"
                    placeholder="Your Email"
                    disabled
                  
                  />
                </div>
  
              </div>
            </CardContent>
  
            <CardFooter>
              <Button />
            </CardFooter>
          </form>
        </Card>
      </div>
    );
  }