import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, MapPin, Phone, Mail, Clock, MessageSquare, Building2, Users } from 'lucide-react';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'İletişim | Söylemesi Bizden',
  description: 'Söylemesi Bizden gayrimenkul platformuyla iletişime geçin. 7/24 destek, uzman danışmanlık.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">
        <div>
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-3">
            <ArrowLeft size={14} /> Ana Sayfa
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Bize Ulaşın</h1>
          <p className="text-gray-500 mt-2 max-w-xl">
            Gayrimenkul danışmanlığı, ilan desteği veya platform hakkında sorularınız için bizimle iletişime geçin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Contact Info */}
          <div className="space-y-4">
            {[
              {
                icon: <Phone size={18} />,
                title: 'Telefon',
                value: '+90 212 123 45 67',
                sub: 'Pazartesi – Cuma, 09:00–18:00',
                href: 'tel:+902121234567',
                color: 'text-[#00C49F]',
                bg: 'bg-[#F0FDF8]',
              },
              {
                icon: <Mail size={18} />,
                title: 'E-posta',
                value: 'info@soylemesibizden.com',
                sub: '24 saat içinde yanıt',
                href: 'mailto:info@soylemesibizden.com',
                color: 'text-blue-600',
                bg: 'bg-blue-50',
              },
              {
                icon: <MapPin size={18} />,
                title: 'Adres',
                value: 'Maslak, Sarıyer',
                sub: 'İstanbul, Türkiye',
                href: undefined,
                color: 'text-purple-600',
                bg: 'bg-purple-50',
              },
              {
                icon: <Clock size={18} />,
                title: 'Çalışma Saatleri',
                value: 'Pazartesi – Cumartesi',
                sub: '09:00 – 19:00',
                href: undefined,
                color: 'text-amber-600',
                bg: 'bg-amber-50',
              },
            ].map(item => (
              <div key={item.title} className="bg-white rounded-2xl border border-gray-100 p-5 flex items-start gap-4">
                <div className={`w-10 h-10 ${item.bg} rounded-xl flex items-center justify-center ${item.color} shrink-0`}>
                  {item.icon}
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-1">{item.title}</p>
                  {item.href ? (
                    <a href={item.href} className={`text-sm font-semibold ${item.color} hover:underline`}>{item.value}</a>
                  ) : (
                    <p className="text-sm font-semibold text-gray-800">{item.value}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-0.5">{item.sub}</p>
                </div>
              </div>
            ))}

            {/* Quick links */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-3">
              <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Hızlı Erişim</p>
              {[
                { href: '/listings', label: 'İlanları Gözat', icon: <Building2 size={13} /> },
                { href: '/concierge', label: 'Danışmanlık Talebi', icon: <MessageSquare size={13} /> },
                { href: '/valuation', label: 'Değerleme Aracı', icon: <Users size={13} /> },
              ].map(l => (
                <Link key={l.href} href={l.href} className="flex items-center gap-2 text-sm font-semibold text-[#00C49F] hover:underline">
                  {l.icon} {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}
