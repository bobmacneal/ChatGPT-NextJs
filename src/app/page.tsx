import Chat from "@/app/components/Chat"
import { auth as getServerSession } from "@/auth"

export default async function Home() {
  const session = await getServerSession()
  return (
    <div>
      <h1 className='mb-3 text-xl font-bold'>Chat Box</h1>
      {session?.user ? <Chat /> : <div>You must sign in to access chat.</div>}
    </div>
  )
}
