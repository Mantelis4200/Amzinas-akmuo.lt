import { expect, test } from "vitest";
import { leadSchema } from "@/lib/validation";

test("priima teisingą leadą", () => {
  const r = leadSchema.safeParse({ name:"Jonas", phone:"+37060000000", serviceType:"ANTKAPIS", message:"Domina", website:"" });
  expect(r.success).toBe(true);
});
test("atmeta be telefono", () => {
  const r = leadSchema.safeParse({ name:"Jonas", phone:"", serviceType:"ANTKAPIS", message:"x", website:"" });
  expect(r.success).toBe(false);
});
test("honeypot užpildytas => atmeta", () => {
  const r = leadSchema.safeParse({ name:"J", phone:"+37060000000", serviceType:"ANTKAPIS", message:"x", website:"bot" });
  expect(r.success).toBe(false);
});
