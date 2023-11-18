import CardList from "@/components/profile/CardList";
import Chat from "@/components/profile/Chat";

export default function Home() {
  return (
    <main className='profile'>
      <Chat />
      <CardList />
    </main>
  );
}