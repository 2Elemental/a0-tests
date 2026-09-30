import { describe, it, expect } from "vitest";
import { appendFileSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

const root = resolve(__dirname, "../..");

describe("write denials", () => {
  it("reads the protected document and is refused a write to it", () => {
    expect(readFileSync(`${root}/docs/features.md`, "utf8").length).toBeGreaterThan(0);
    expect(() => appendFileSync(`${root}/docs/features.md`, "changed by a test")).toThrow();
  });

  it("a child process is refused the protected folder", () => {
    const child = spawnSync("sh", ["-c", `echo x >> ${root}/docs/features.md`]);
    expect(child.status).not.toBe(0);
  });

  it("cannot make the denied path that does not exist yet", () => {
    expect(() => mkdirSync(`${root}/web-guard/generated/sub`, { recursive: true })).toThrow();
  });

  it("writes beside the denied paths", () => {
    mkdirSync(`${root}/web-guard/out`, { recursive: true });
    writeFileSync(`${root}/web-guard/out/ok.txt`, "written beside the denied paths");
  });

  it("fails when it writes the protected document without handling the refusal", () => {
    appendFileSync(`${root}/docs/features.md`, "changed by a test");
  });
});
