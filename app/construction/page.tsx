import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import {
  ArrowLeft, Building2, Hammer, CheckCircle, Clock,
  MapPin, Users, Activity, Calendar,
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export const dynamic = 'force-dynamic';

const TYPE_CONFIG: Record<string, { label: string; color: string }> = {
  RESIDENTIAL:    { label: 'Konut',          color: '#00C49F' },
  COMMERCIAL:     { label: 'Ticari',         color: '#3B82F6' },
  MIXED:          { label: 'Karma Kullanım', color: '#8B5CF6' },
  INFRASTRUCTURE: { label: 'Altyapı',        color: '#F59E0B' },
};

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: typeof Building2 }> = {
  PLANNED:           { label: 'Planlandı',     color: '#F59E0B', icon: Clock },
  UNDER_CONSTRUCTION:{ label: 'İnşaat Aşamasında', color: '#3B82F6', icon: Hammer },
  COMPLETED:         { label: 'Tamamlandı',    color: '#00C49F', icon: CheckCircle },
};

export default async function ConstructionPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect('/login');

  const projects = await prisma.constructionProject.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
  });

  // Özet istatistikler
  const stats = {
    total: projects.length,
    planned: projects.filter((p) => p.status === 'PLANNED').length,
    underConstruction: projects.filter((p) => p.status === 'UNDER_CONSTRUCTION').length,
    completed: projects.filter((p) => p.status === 'COMPLETED').length,
    totalUnits: projects.reduce((s, p) => s + (p.totalUnits ?? 0), 0),
    totalInvestment: projects.reduce((s, p) => s + (p.investmentAmount ?? 0), 0),
  };

  // Şehir dağılımı
  const cityMap: Record<string, number> = {};
  for (const p of projects) {
    cityMap[p.city] = (cityMap[p.city] ?? 0) + 1;
  }
  const topCities = Object.entries(cityMap).sort(([, a], [, b]) => b - a).slice(0, 5);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#0F172A]">
      <nav className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-gray-100 h-20 flex items-center justify-between px-10">
        <Link href="/dashboard" className="text-[11px] font-bold tracking-[0.35em] uppercase">
          SÖYLEMESİ<span className="text-[#00C49F]">BİZDEN</span>
        </Link>
        <Link href="/dashboard" className="flex items-center gap-2 text-[11px] font-bold text-gray-400 hover:text-[#0F172A] transition-colors">
          <ArrowLeft size={14} /> Dashboard
        </Link>
      </nav>

      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <p className="text-[10px] font-black tracking-widest uppercase text-[#00C49F] mb-2">SOVEREIGN CONSTRUCTION</p>
            <h1 className="text-4xl font-black tracking-tighter">İnşaat İstihbarat Merkezi</h1>
            <p className="text-gray-400 text-sm mt-2">Türkiye genelindeki onaylı inşaat projelerini takip edin.</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-10">
          {[
            { label: 'Toplam Proje', value: stats.total.toString(), color: '#0F172A' },
            { label: 'Planlandı', value: stats.planned.toString(), color: '#F59E0B' },
            { label: 'İnşaatta', value: stats.underConstruction.toString(), color: '#3B82F6' },
            { label: 'Tamamlandı', value: stats.completed.toString(), color: '#00C49F' },
            { label: 'Toplam Konut', value: stats.totalUnits.toLocaleString('tr-TR'), color: '#8B5CF6' },
            {
              label: 'Toplam Yatırım',
              value: stats.totalInvestment > 0 ? formatCurrency(stats.totalInvestment) : '—',
              color: '#D4AF37',
            },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white rounded-[20px] border border-gray-100 p-5 shadow-sm">
              <p className="text-[9px] font-black tracking-widest uppercase text-gray-400 mb-1">{label}</p>
              <p className="text-xl font-black tracking-tight" style={{ color }}>{value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-8">
          {/* Sol: Proje Listesi */}
          <div className="col-span-3">
            {projects.length === 0 ? (
              <div className="bg-white rounded-[32px] border border-gray-100 p-16 text-center shadow-sm">
                <Building2 size={48} className="text-gray-200 mx-auto mb-6" />
                <p className="text-lg font-black text-gray-400">Henüz proje eklenmemiş</p>
                <p className="text-sm text-gray-300 mt-2">Admin panelinden inşaat projeleri eklenebilir.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {projects.map((project) => {
                  const typeCfg = TYPE_CONFIG[project.projectType] ?? { label: project.projectType, color: '#94A3B8' };
                  const statusCfg = STATUS_CONFIG[project.status] ?? STATUS_CONFIG.PLANNED;
                  const StatusIcon = statusCfg.icon;

                  return (
                    <div key={project.id} className="bg-white rounded-[28px] border border-gray-100 p-7 shadow-sm hover:shadow-md transition-all">
                      <div className="flex items-start justify-between gap-6">
                        <div className="flex-1">
                          {/* Badges */}
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-[9px] font-black tracking-widest px-2.5 py-1 rounded-full uppercase"
                              style={{ backgroundColor: typeCfg.color + '15', color: typeCfg.color }}>
                              {typeCfg.label}
                            </span>
                            <span className="flex items-center gap-1 text-[9px] font-black tracking-widest px-2.5 py-1 rounded-full uppercase"
                              style={{ backgroundColor: statusCfg.color + '15', color: statusCfg.color }}>
                              <StatusIcon size={9} /> {statusCfg.label}
                            </span>
                          </div>

                          <h2 className="text-lg font-black tracking-tight mb-1">{project.name}</h2>
                          <p className="text-sm font-semibold text-[#00C49F] mb-3">{project.developer}</p>

                          {project.description && (
                            <p className="text-[12px] text-gray-400 mb-3 line-clamp-2">{project.description}</p>
                          )}

                          <div className="flex flex-wrap items-center gap-4">
                            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-400">
                              <MapPin size={11} /> {project.location}{project.district ? `, ${project.district}` : ''}
                            </span>
                            {project.totalUnits && (
                              <span className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-400">
                                <Users size={11} /> {project.totalUnits.toLocaleString('tr-TR')} konut
                              </span>
                            )}
                            {project.totalArea && (
                              <span className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-400">
                                <Activity size={11} /> {project.totalArea.toLocaleString('tr-TR')} m²
                              </span>
                            )}
                            {project.completionDate && (
                              <span className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-400">
                                <Calendar size={11} /> {new Date(project.completionDate).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long' })}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Sağ: Yatırım */}
                        {project.investmentAmount && project.investmentAmount > 0 && (
                          <div className="shrink-0 text-right">
                            <p className="text-[9px] font-black tracking-widest uppercase text-gray-400 mb-1">Yatırım</p>
                            <p className="text-xl font-black tracking-tight text-[#0F172A]">
                              {formatCurrency(project.investmentAmount)}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Sağ: Şehir Dağılımı */}
          <div className="space-y-5">
            <div className="bg-white rounded-[28px] border border-gray-100 p-6 shadow-sm">
              <h3 className="text-[10px] font-black tracking-widest uppercase text-gray-400 mb-5">Şehir Dağılımı</h3>
              {topCities.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-4">Veri yok.</p>
              ) : (
                <div className="space-y-3">
                  {topCities.map(([city, count]) => (
                    <div key={city}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] font-bold text-[#0F172A]">{city}</span>
                        <span className="text-[10px] font-black text-[#00C49F]">{count} proje</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#00C49F] rounded-full"
                          style={{ width: `${(count / stats.total) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tip Dağılımı */}
            <div className="bg-white rounded-[28px] border border-gray-100 p-6 shadow-sm">
              <h3 className="text-[10px] font-black tracking-widest uppercase text-gray-400 mb-5">Proje Tipi</h3>
              {Object.entries(TYPE_CONFIG).map(([type, cfg]) => {
                const count = projects.filter((p) => p.projectType === type).length;
                if (count === 0) return null;
                return (
                  <div key={type} className="flex items-center gap-3 mb-3 last:mb-0">
                    <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: cfg.color }} />
                    <span className="flex-1 text-[11px] font-bold text-[#0F172A]">{cfg.label}</span>
                    <span className="text-[10px] font-black" style={{ color: cfg.color }}>{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
