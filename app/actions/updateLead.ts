"use server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import type { LeadStatus } from "@prisma/client";

export async function updateLeadStatus(id: string, status: LeadStatus) {
  await db.lead.update({ where: { id }, data: { status } });
  revalidatePath("/admin");
}

export async function updateLeadNotes(id: string, notes: string) {
  await db.lead.update({ where: { id }, data: { notes } });
  revalidatePath("/admin");
}
