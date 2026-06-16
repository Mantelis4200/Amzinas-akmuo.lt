import { expect, test } from "vitest";
import { calcPrice } from "@/lib/pricing";

test("tūrio formulė: 100x50x10 cm, pilkas", () => {
  // 1.0*0.5*0.1=0.05 m³; stone=0.05*3200=160; work=160*0.9=144; base=180; =484 -> apvalinta iki 10 => 480
  expect(calcPrice({ l:100, w:50, t:10, stone:"pilkas" })).toBe(480);
});
test("juodas brangesnis už pilką tiems patiems matmenims", () => {
  const dims = { l:80, w:60, t:8 } as const;
  expect(calcPrice({ ...dims, stone:"juodas" })).toBeGreaterThan(calcPrice({ ...dims, stone:"pilkas" }));
});
