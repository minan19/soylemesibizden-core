import { redirect } from 'next/navigation';

/**
 * /auth — kaldirildi, /login'e yonlendiriliyor · 14.08.2026 (TRT)
 *
 * Bu sayfa daha once parola alani olan ama HICBIR DOGRULAMA YAPMAYAN
 * bir giris ekraniydi: input'larin onChange'i yoktu, "SESSION BASLAT"
 * dugmesi bir <Link href="/dashboard"> idi. Kullanici gercek parolasini
 * yazip dogrudan iceri giriyordu. Ayrica sahte kriptografi notasyonu
 * gosteriyordu: "V_gate = Hash(ID + Key) = Authorized".
 *
 * Guvenlik iddiasi tasiyan bir yuzeyin sifir guvenlik uygulamasi, bu
 * platformun konumlandirmasiyla bagdasmaz. Gercek giris akisi /login
 * altinda NextAuth ile zaten mevcut.
 */
export default function AuthPage(): never {
  redirect('/login');
}
