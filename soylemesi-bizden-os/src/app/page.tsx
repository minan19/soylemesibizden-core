import { redirect } from 'next/navigation';

export default function Home() {
  // Ana kapıya geleni doğrudan panele yönlendir (Panel de yetki yoksa Auth'a atacaktır)
  redirect('/dashboard/listings');
}
