import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(6),
  email: z.email().optional().or(z.literal("")),
  serviceType: z.enum(["ANTKAPIS", "RESTAURAVIMAS", "KAPAVIETES_IRENGIMAS", "KITA"]),
  message: z.string().min(1),
  source: z.string().default("/"),
  website: z.literal(""),   // honeypot: must be empty
});

export type LeadInput = z.infer<typeof leadSchema>;
