import { NextResponse } from 'next/server';
import { appendFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import nodemailer from 'nodemailer';

// Quote requests are emailed over SMTP. Defaults target a local Postfix on the server
// (localhost:25, no auth). To relay through a real mailbox instead, set in .env.local:
//   SMTP_HOST, SMTP_PORT, SMTP_SECURE=true, SMTP_USER, SMTP_PASS
// Optional:
//   QUOTE_TO_EMAIL   – inbox that receives requests (default service@akproperty-solutions.com)
//   QUOTE_FROM_EMAIL – sender (default "A&K Website <noreply@akproperty-solutions.com>")
// Every request is also appended to data/quotes.jsonl as a backup, so none are lost if mail fails.

const FIELDS = ['name', 'email', 'phone', 'company', 'service', 'propertyType', 'size', 'frequency', 'message'] as const;

const LABELS: Record<(typeof FIELDS)[number], string> = {
  name: 'Full Name',
  email: 'Email',
  phone: 'Phone',
  company: 'Community / Company',
  service: 'Service Needed',
  propertyType: 'Property Type',
  size: 'Doors / Units',
  frequency: 'Service Frequency',
  message: 'Additional Details',
};

const LOG_FILE = path.join(process.cwd(), 'data', 'quotes.jsonl');

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'localhost',
  port: Number(process.env.SMTP_PORT || 25),
  secure: process.env.SMTP_SECURE === 'true',
  auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
  // Local Postfix uses a self-signed cert for STARTTLS.
  tls: { rejectUnauthorized: !!process.env.SMTP_USER },
});

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Honeypot: bots fill the hidden "website" field; pretend success.
  if (typeof body.website === 'string' && body.website.trim()) {
    return NextResponse.json({ ok: true });
  }

  const data = Object.fromEntries(
    FIELDS.map((k) => [k, typeof body[k] === 'string' ? (body[k] as string).trim().slice(0, 5000) : ''])
  ) as Record<(typeof FIELDS)[number], string>;

  if (!data.name || !data.service || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  let logged = false;
  try {
    await mkdir(path.dirname(LOG_FILE), { recursive: true });
    await appendFile(LOG_FILE, JSON.stringify({ at: new Date().toISOString(), ...data }) + '\n');
    logged = true;
  } catch (err) {
    console.error('[quote] could not write backup log', err);
  }

  const filled = FIELDS.filter((k) => data[k]);
  const rows = filled
    .map(
      (k) =>
        `<tr><td style="padding:6px 12px;font-weight:600;vertical-align:top">${LABELS[k]}</td>` +
        `<td style="padding:6px 12px;white-space:pre-wrap">${escapeHtml(data[k])}</td></tr>`
    )
    .join('');

  try {
    await transporter.sendMail({
      from: process.env.QUOTE_FROM_EMAIL || 'A&K Website <noreply@akproperty-solutions.com>',
      to: process.env.QUOTE_TO_EMAIL || 'service@akproperty-solutions.com',
      replyTo: data.email,
      subject: `New proposal request – ${data.company || data.name}`,
      html: `<h2>New proposal request</h2><table style="border-collapse:collapse;font-family:sans-serif">${rows}</table>`,
      text: filled.map((k) => `${LABELS[k]}: ${data[k]}`).join('\n'),
    });
  } catch (err) {
    console.error('[quote] email failed', err);
    // Still saved in the backup log, so the lead isn't lost.
    return NextResponse.json({ ok: logged }, { status: logged ? 200 : 502 });
  }

  return NextResponse.json({ ok: true });
}
