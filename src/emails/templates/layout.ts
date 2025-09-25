type LayoutParams = {
  title: string;
  previewText?: string;
  heading: string;
  body: string;
  ctaText?: string;
  ctaUrl?: string;
  footerText?: string;
};

export function renderLayout(params: LayoutParams): string {
  const { title, previewText, heading, body, ctaText, ctaUrl, footerText } = params;
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${title}</title>
      <style>
        body{font-family:Arial,Helvetica,sans-serif;background:#f6f9fc;color:#0f172a;margin:0;padding:24px}
        .card{max-width:600px;margin:0 auto;background:#ffffff;border-radius:8px;padding:24px;border:1px solid #e2e8f0}
        h1{font-size:20px;margin:0 0 16px}
        p{line-height:1.6;margin:0 0 12px}
        .btn{display:inline-block;background:#2563eb;color:#fff !important;text-decoration:none;padding:10px 16px;border-radius:6px;margin-top:12px}
        .footer{color:#64748b;font-size:12px;margin-top:24px}
      </style>
    </head>
    <body>
      ${previewText ? `<div style="display:none;visibility:hidden;opacity:0;height:0;width:0">${previewText}</div>` : ''}
      <div class="card">
        <h1>${heading}</h1>
        <div>${body}</div>
        ${ctaText && ctaUrl ? `<a class="btn" href="${ctaUrl}">${ctaText}</a>` : ''}
        <div class="footer">${footerText || 'If you did not request this, you can ignore this email.'}</div>
      </div>
    </body>
  </html>`;
}
