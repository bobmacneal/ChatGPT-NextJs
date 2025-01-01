import Chat from "@/app/components/Chat"
import { auth as getServerSession } from "@/auth";

export default async function Home() {
  const session = await getServerSession()
  return (
    <div>
      <h1 className="text-xl font-bold mb-3">Chatterbox</h1>
      {
        (session?.user)
          ? <Chat />
          : <div>You must sign in to access chat.</div>
      }
    </div>
  );
}
