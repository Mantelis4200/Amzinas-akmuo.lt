import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendLeadNotification(l: {
  name: string;
  phone: string;
  email?: string | null;
  serviceType: string;
  message: string;
  source: string;
}) {
  try {
    await resend.emails.send({
      from: process.env.LEAD_NOTIFY_FROM!,
      to: process.env.LEAD_NOTIFY_TO!.split(","),
      subject: `Naujas leadas: ${l.name} (${l.serviceType})`,
      text: `Vardas: ${l.name}\nTel: ${l.phone}\nEl.p: ${l.email || "-"}\nPaslauga: ${l.serviceType}\nŠaltinis: ${l.source}\n\n${l.message}`,
    });
    return { ok: true };
  } catch (e) {
    console.error("Resend fail", e);
    return { ok: false };
  }
}
