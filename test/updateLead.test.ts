import { expect, test, vi, beforeEach } from "vitest";
vi.mock("@/lib/db", () => ({ db:{ lead:{ update: vi.fn(async ({where,data}:any)=>({id:where.id,...data})) } } }));
vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));
import { updateLeadStatus, updateLeadNotes } from "@/app/actions/updateLead";
import { db } from "@/lib/db";
beforeEach(()=>vi.clearAllMocks());

test("updateLeadStatus updates status", async () => {
  await updateLeadStatus("abc", "SUSISIEKTA");
  expect(db.lead.update).toHaveBeenCalledWith({ where:{id:"abc"}, data:{ status:"SUSISIEKTA" } });
});
test("updateLeadNotes updates notes", async () => {
  await updateLeadNotes("abc", "Vilnius, biudžetas 2000");
  expect(db.lead.update).toHaveBeenCalledWith({ where:{id:"abc"}, data:{ notes:"Vilnius, biudžetas 2000" } });
});
