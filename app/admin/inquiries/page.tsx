import prisma from '@/lib/prisma';
import Link from 'next/link';
import { ArrowLeft, MessageSquare, Mail, Phone, Calendar } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminInquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      listing: { select: { id: true, title: true } },
      user: { select: { name: true, email: true } },
    },
  });

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto px-8 py-10 space-y-8">

        <div>
          <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-3">
            <ArrowLeft size={14} /> Admin Panel
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Başvurular</h1>
              <p className="text-sm text-gray-400 mt-0.5">{inquiries.length} başvuru</p>
            </div>
            <div className="flex gap-3">
              <span className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-semibold text-gray-600">
                Bugün: {inquiries.filter(i => {
                  const d = new Date(i.createdAt);
                  const today = new Date();
                  return d.toDateString() === today.toDateString();
                }).length}
              </span>
            </div>
          </div>
        </div>

        {inquiries.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-gray-200 py-20 text-center">
            <MessageSquare size={32} className="text-gray-300 mx-auto mb-3" />
            <p className="text-gray-400 text-sm">Henüz başvuru bulunmuyor.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {inquiries.map(inquiry => (
              <div key={inquiry.id} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-[#F0FDF8] flex items-center justify-center text-[#00C49F] text-xs font-bold">
                        {inquiry.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{inquiry.name}</p>
                        <p className="text-xs text-gray-400">
                          {inquiry.user ? `Kayıtlı kullanıcı` : 'Misafir'}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-3 leading-relaxed">{inquiry.message}</p>

                    <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                      <a href={`mailto:${inquiry.email}`} className="flex items-center gap-1.5 hover:text-[#00C49F] transition-colors">
                        <Mail size={12} /> {inquiry.email}
                      </a>
                      {inquiry.phone && (
                        <a href={`tel:${inquiry.phone}`} className="flex items-center gap-1.5 hover:text-[#00C49F] transition-colors">
                          <Phone size={12} /> {inquiry.phone}
                        </a>
                      )}
                      <span className="flex items-center gap-1.5">
                        <Calendar size={12} /> {new Date(inquiry.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <Link
                      href={`/listing/${inquiry.listing.id}`}
                      className="text-xs font-semibold text-[#00C49F] hover:underline line-clamp-2 max-w-[200px]"
                    >
                      {inquiry.listing.title}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
