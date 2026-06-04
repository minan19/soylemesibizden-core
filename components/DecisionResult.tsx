'use client';

import { DecisionResult } from '@/services/decision/types';
import { AlertCircle, CheckCircle2, Clock } from 'lucide-react';

interface Props {
  decision: DecisionResult;
}

export default function DecisionResultComponent({ decision }: Props) {
  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case 'AL':
        return 'bg-green-50 border-green-200';
      case 'BEKLE':
        return 'bg-yellow-50 border-yellow-200';
      case 'PAS':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getRecommendationText = (rec: string) => {
    switch (rec) {
      case 'AL':
        return '✅ AL';
      case 'BEKLE':
        return '⏳ BEKLE';
      case 'PAS':
        return '❌ PAS';
      default:
        return rec;
    }
  };

  const getRiskColor = (impact: string) => {
    switch (impact) {
      case 'HIGH':
        return 'text-red-600 bg-red-50';
      case 'MEDIUM':
        return 'text-yellow-600 bg-yellow-50';
      case 'LOW':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-8 max-w-2xl">
      {/* Main Score Card */}
      <div className={`rounded-2xl border-2 p-8 ${getRecommendationColor(decision.recommendation)}`}>
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Karar Skoru</p>
            <p className="text-5xl font-black text-[#0F172A]">{decision.score}/100</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-black">{getRecommendationText(decision.recommendation)}</p>
            <p className="text-sm text-gray-600 mt-2">Güven: {decision.confidence}%</p>
          </div>
        </div>
      </div>

      {/* Component Scores */}
      <div className="bg-white rounded-2xl border border-gray-100 p-8">
        <h3 className="text-sm font-black tracking-widest uppercase mb-6 text-gray-500">Bileşen Skorları</h3>
        <div className="space-y-4">
          {Object.entries(decision.scores).map(([key, value]) => (
            <div key={key}>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">
                  {key.replace(/_/g, ' ').charAt(0).toUpperCase() + key.replace(/_/g, ' ').slice(1)}
                </span>
                <span className="text-sm font-bold text-[#0F172A]">{value}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-[#00C49F] h-2 rounded-full" style={{ width: `${value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Reasons */}
      <div className="bg-white rounded-2xl border border-gray-100 p-8">
        <h3 className="text-sm font-black tracking-widest uppercase mb-6 text-gray-500">Neden Bu Skor?</h3>
        <div className="space-y-3">
          {decision.reasons.map((reason, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <CheckCircle2 size={20} className="text-[#00C49F] mt-1 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{reason.reason}</p>
                <p className="text-xs text-gray-500 mt-1">Ağırlık: {reason.weight}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Risks */}
      <div className="bg-white rounded-2xl border border-gray-100 p-8">
        <h3 className="text-sm font-black tracking-widest uppercase mb-6 text-gray-500">Top Riskler</h3>
        <div className="space-y-3">
          {decision.risks.map((risk, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <AlertCircle size={20} className="text-red-600 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{risk.risk}</p>
                <p className={`text-xs mt-1 px-2 py-1 rounded ${getRiskColor(risk.impact)}`}>
                  {risk.impact}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button className="flex-1 bg-[#0F172A] text-white py-3 rounded-full font-bold text-sm hover:bg-[#1E293B] transition">
          Kaydeti
        </button>
        <button className="flex-1 border-2 border-gray-200 text-gray-700 py-3 rounded-full font-bold text-sm hover:border-gray-300 transition">
          Geri Dön
        </button>
      </div>
    </div>
  );
}
