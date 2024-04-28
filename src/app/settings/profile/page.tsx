import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { db } from '@/lib/db';
import { getAuthSession } from '@/lib/auth';
import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import { Button } from "@/components/ui/Button";
import  Sidebar  from "@/components/setting/SidebarNav";

async function getData(userId: string) {
  noStore();
  const data = await db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      name: true,
      email: true,
      username: true,
      bio: true,
    },
  });
  return data;
}

export default async function SettingPage() {
  const session = await getAuthSession();
  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const userId = session?.user.id;
  const data = await getData(userId);

  async function postData(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const bio = formData.get("bio") as string;
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        name: name ?? undefined,
        email: email ?? undefined,
        bio: bio ?? undefined,
      },
    });
    revalidatePath("/", "layout");
  }

  return (
    <div className="grid grid-cols-[240px_1fr] gap-8 my-5 justify-center">
  <div>
    <Sidebar />
  </div>
  <div className="grid gap-8">
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
                defaultValue={data?.email ?? undefined}
              />
            </div>
            <div className="space-y-1">
              <Label>Your Bio</Label>
              <Input
                name="bio"
                type="text"
                id="bio"
                placeholder="Your bio..."
                defaultValue={data?.bio ?? undefined}
              />
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <Button type="submit">Save</Button>
        </CardFooter>
      </form>
    </Card>
  </div>
</div>
  );
}