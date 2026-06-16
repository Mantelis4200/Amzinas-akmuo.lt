import { expect, test, vi, beforeEach } from "vitest";
vi.mock("@/lib/db", () => ({ db: { lead: { create: vi.fn(async ({ data }: any) => ({ id: "1", ...data })) } } }));
vi.mock("@/lib/email", () => ({ sendLeadNotification: vi.fn(async () => ({ ok: true })) }));
import { submitLead } from "@/app/actions/submitLead";
import { db } from "@/lib/db";

const fd = (o: Record<string, string>) => { const f = new FormData(); Object.entries(o).forEach(([k, v]) => f.set(k, v)); return f; };
beforeEach(() => vi.clearAllMocks());

test("blogi duomenys => error, DB nekviečiamas", async () => {
  const r = await submitLead({ ok: false }, fd({ name: "", phone: "", serviceType: "ANTKAPIS", message: "", website: "" }));
  expect(r.ok).toBe(false);
  expect(db.lead.create).not.toHaveBeenCalled();
});
test("geri duomenys => DB create + ok", async () => {
  const r = await submitLead({ ok: false }, fd({ name: "Jonas", phone: "+37060000000", serviceType: "ANTKAPIS", message: "Domina", source: "/antkapiai", website: "" }));
  expect(db.lead.create).toHaveBeenCalledOnce();
  expect(r.ok).toBe(true);
});
test("email kritimas neblokuoja leado", async () => {
  const { sendLeadNotification } = await import("@/lib/email");
  (sendLeadNotification as any).mockResolvedValueOnce({ ok: false });
  const r = await submitLead({ ok: false }, fd({ name: "Jonas", phone: "+37060000000", serviceType: "ANTKAPIS", message: "x", website: "" }));
  expect(r.ok).toBe(true);
});
