import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST ?? 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

function isEmailConfigured(): boolean {
  return Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);
}

const FROM = process.env.SMTP_FROM ?? 'Söylemesi Bizden <noreply@soylemesibizden.com>';

// ── Şablonlar ───────────────────────────────────────────────

function baseTemplate(content: string): string {
  return `
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { margin: 0; padding: 0; background: #F8FAFC; font-family: -apple-system, sans-serif; }
    .container { max-width: 600px; margin: 40px auto; background: white; border-radius: 24px; overflow: hidden; border: 1px solid #E2E8F0; }
    .header { background: #0F172A; padding: 32px 40px; }
    .logo { font-size: 14px; font-weight: 900; letter-spacing: 4px; color: white; }
    .logo span { color: #00C49F; }
    .body { padding: 40px; }
    .badge { display: inline-block; background: #F0FDF8; color: #00C49F; font-size: 11px; font-weight: 900; letter-spacing: 2px; padding: 4px 12px; border-radius: 20px; text-transform: uppercase; margin-bottom: 24px; }
    h1 { font-size: 24px; font-weight: 900; color: #0F172A; margin: 0 0 16px; letter-spacing: -1px; }
    p { font-size: 14px; color: #64748B; line-height: 1.7; margin: 0 0 16px; }
    .highlight { background: #F8FAFC; border-radius: 16px; padding: 20px; margin: 24px 0; border: 1px solid #E2E8F0; }
    .highlight-label { font-size: 10px; font-weight: 900; color: #94A3B8; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 4px; }
    .highlight-value { font-size: 22px; font-weight: 900; color: #0F172A; }
    .btn { display: inline-block; background: #00C49F; color: white; font-size: 12px; font-weight: 900; letter-spacing: 2px; padding: 14px 28px; border-radius: 12px; text-decoration: none; text-transform: uppercase; margin-top: 8px; }
    .footer { background: #F8FAFC; padding: 24px 40px; border-top: 1px solid #E2E8F0; }
    .footer p { font-size: 11px; color: #94A3B8; margin: 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">SÖYLEMESİ<span>BİZDEN</span></div>
    </div>
    <div class="body">${content}</div>
    <div class="footer">
      <p>Bu e-posta Sovereign Intelligence Platform tarafından gönderilmiştir.</p>
      <p style="margin-top:4px;">© ${new Date().getFullYear()} Söylemesi Bizden. Tüm hakları saklıdır.</p>
    </div>
  </div>
</body>
</html>`.trim();
}

// ── Fonksiyonlar ─────────────────────────────────────────────

export async function sendNewOfferEmail(params: {
  ownerEmail: string;
  ownerName: string;
  listingTitle: string;
  listingId: string;
  offerAmount: number;
  buyerName: string;
}) {
  if (!isEmailConfigured()) {
    console.log('[Email] SMTP yapılandırılmamış. Mock:', params);
    return;
  }

  const formattedAmount = params.offerAmount.toLocaleString('tr-TR');
  const url = `${process.env.NEXTAUTH_URL ?? 'http://localhost:3000'}/listing/${params.listingId}`;

  const html = baseTemplate(`
    <div class="badge">🏷️ Yeni Teklif Alındı</div>
    <h1>İlanınıza Yeni Teklif Geldi!</h1>
    <p>Merhaba <strong>${params.ownerName}</strong>,</p>
    <p><strong>${params.buyerName}</strong> adlı kullanıcı <strong>${params.listingTitle}</strong> ilanınıza aşağıdaki teklifi verdi:</p>
    <div class="highlight">
      <div class="highlight-label">Teklif Tutarı</div>
      <div class="highlight-value">₺ ${formattedAmount}</div>
    </div>
    <p>Teklifi kabul etmek, reddetmek veya karşı teklif yapmak için ilanınızı ziyaret edin.</p>
    <a href="${url}" class="btn">Teklifi İncele</a>
  `);

  await transporter.sendMail({
    from: FROM,
    to: params.ownerEmail,
    subject: `Yeni Teklif: ${params.listingTitle} — ₺${formattedAmount}`,
    html,
  });
}

export async function sendOfferConfirmationEmail(params: {
  buyerEmail: string;
  buyerName: string;
  listingTitle: string;
  listingId: string;
  offerAmount: number;
}) {
  if (!isEmailConfigured()) {
    console.log('[Email] SMTP yapılandırılmamış. Mock:', params);
    return;
  }

  const formattedAmount = params.offerAmount.toLocaleString('tr-TR');
  const url = `${process.env.NEXTAUTH_URL ?? 'http://localhost:3000'}/listing/${params.listingId}`;

  const html = baseTemplate(`
    <div class="badge">✅ Teklif Gönderildi</div>
    <h1>Teklifiniz İletildi</h1>
    <p>Merhaba <strong>${params.buyerName}</strong>,</p>
    <p><strong>${params.listingTitle}</strong> ilanı için teklifiniz başarıyla iletildi. İlan sahibi en kısa sürede size geri dönecektir.</p>
    <div class="highlight">
      <div class="highlight-label">Gönderdiğiniz Teklif</div>
      <div class="highlight-value">₺ ${formattedAmount}</div>
    </div>
    <a href="${url}" class="btn">İlanı Görüntüle</a>
  `);

  await transporter.sendMail({
    from: FROM,
    to: params.buyerEmail,
    subject: `Teklifiniz İletildi — ${params.listingTitle}`,
    html,
  });
}

export async function sendOfferStatusEmail(params: {
  buyerEmail: string;
  buyerName: string;
  listingTitle: string;
  listingId: string;
  offerAmount: number;
  newStatus: 'ACCEPTED' | 'REJECTED';
}) {
  if (!isEmailConfigured()) {
    console.log('[Email] SMTP yapılandırılmamış. Mock:', params);
    return;
  }

  const isAccepted = params.newStatus === 'ACCEPTED';
  const formattedAmount = params.offerAmount.toLocaleString('tr-TR');
  const url = `${process.env.NEXTAUTH_URL ?? 'http://localhost:3000'}/listing/${params.listingId}`;

  const html = baseTemplate(`
    <div class="badge">${isAccepted ? '🎉 Teklif Kabul Edildi' : '❌ Teklif Reddedildi'}</div>
    <h1>${isAccepted ? 'Teklifiniz Kabul Edildi!' : 'Teklifiniz Reddedildi'}</h1>
    <p>Merhaba <strong>${params.buyerName}</strong>,</p>
    <p><strong>${params.listingTitle}</strong> ilanı için verdiğiniz <strong>₺${formattedAmount}</strong> tutarındaki teklifiniz ${isAccepted ? '<strong style="color:#00C49F">kabul edildi</strong>' : 'reddedildi'}.</p>
    ${isAccepted ? '<p>İlan sahibiyle iletişime geçerek süreci tamamlayabilirsiniz.</p>' : '<p>Farklı bir teklifle yeniden deneyebilirsiniz.</p>'}
    <a href="${url}" class="btn">İlanı Görüntüle</a>
  `);

  await transporter.sendMail({
    from: FROM,
    to: params.buyerEmail,
    subject: `Teklifiniz ${isAccepted ? 'Kabul Edildi' : 'Reddedildi'} — ${params.listingTitle}`,
    html,
  });
}

export async function sendWelcomeEmail(params: {
  userEmail: string;
  userName: string;
}) {
  if (!isEmailConfigured()) {
    console.log('[Email] SMTP yapılandırılmamış. Mock:', params);
    return;
  }

  const html = baseTemplate(`
    <div class="badge">🚀 Hoş Geldiniz</div>
    <h1>Sovereign Platforma Hoş Geldiniz!</h1>
    <p>Merhaba <strong>${params.userName || 'Değerli Üyemiz'}</strong>,</p>
    <p>Söylemesi Bizden Sovereign Intelligence Platformuna kayıt olduğunuz için teşekkürler. Artık Türkiye'nin en gelişmiş gayrimenkul ekosisteminin bir parçasısınız.</p>
    <div class="highlight">
      <div class="highlight-label">Hesabınız</div>
      <div class="highlight-value" style="font-size:16px;">${params.userEmail}</div>
    </div>
    <a href="${process.env.NEXTAUTH_URL ?? 'http://localhost:3000'}/dashboard" class="btn">Platforma Giriş Yap</a>
  `);

  await transporter.sendMail({
    from: FROM,
    to: params.userEmail,
    subject: 'Sovereign Platforma Hoş Geldiniz — Söylemesi Bizden',
    html,
  });
}
