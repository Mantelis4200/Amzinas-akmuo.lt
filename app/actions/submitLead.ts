"use server";
import { leadSchema } from "@/lib/validation";
import { db } from "@/lib/db";
import { sendLeadNotification } from "@/lib/email";

export type LeadState = { ok: boolean; error?: string };

export async function submitLead(_prev: LeadState, fd: FormData): Promise<LeadState> {
  const parsed = leadSchema.safeParse(Object.fromEntries(fd));
  if (!parsed.success) return { ok: false, error: "Patikrinkite laukus." };
  const { website, ...data } = parsed.data;
  await db.lead.create({ data: { ...data, email: data.email || null } });
  await sendLeadNotification(data);
  return { ok: true };
}
