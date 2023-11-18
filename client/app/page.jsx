import Link from "next/link";
import Header from "@/components/Header";

export default function Home() {
  return (
    <main className='main'>
      <Header/>
      <h1 className="main__title">Свайп вправо</h1>
      <Link className='main__link' style={{marginBottom: "12px"}} href='/profile'>Профиль</Link>
      <Link className='main__link' href='/signup'>Регистрация</Link>
    </main>
  );
}
