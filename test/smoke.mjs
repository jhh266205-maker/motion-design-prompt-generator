/**
 * Smoke test: loads the plugin with a fake cordis context, asserts the skill
 * candidate is well-formed and that the body can be loaded and points at real
 * resource files.
 *
 * Run: node test/smoke.mjs
 */
import { strict as assert } from "node:assert";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const plugin = await import("../lib/index.js");

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// --- frontmatter -----------------------------------------------------------
const parsed = plugin.parseFrontmatter('---\nname: demo\ndescription: "a: b"\n---\n\n# Body\n');
assert.equal(parsed.data.name, "demo");
assert.equal(parsed.data.description, "a: b");
assert.equal(parsed.body.trim(), "# Body");

// --- registration ----------------------------------------------------------
let factory = null;
const registered = [];
const ctx = {
  logger: { warn() {}, info() {} },
  get(service) {
    if (service !== "skills") throw new Error("unexpected service " + service);
    return {
      registerProvider(fn) {
        factory = fn;
        return () => {};
      },
    };
  },
  effect(fn) {
    registered.push(fn());
    return () => {};
  },
};

plugin.apply(ctx, {});
assert.ok(factory, "apply() must register a provider");
assert.equal(registered.length, 1);

const provider = factory();
assert.equal(provider.name, "motion-design-prompt-generator");

// --- list ------------------------------------------------------------------
const listed = await provider.list();
const candidates = Array.isArray(listed) ? listed : listed.candidates;
assert.equal(candidates.length, 1);

const candidate = candidates[0];
assert.equal(candidate.name, "motion-design-prompt-generator");
assert.ok(candidate.description.length > 40, "description should be the real one");
assert.ok(candidate.whenToUse, "whenToUse should survive the round trip");
assert.deepEqual(candidate.invocation, { modelInvocable: true, userInvocable: true });
assert.equal(candidate.provider, "motion-design-prompt-generator");
assert.equal(candidate.source, "custom");
assert.equal(typeof candidate.rank, "number");
assert.equal(candidate.resourceBase.kind, "directory");
assert.ok(existsSync(candidate.path), "SKILL.md must exist at the advertised path");
assert.ok(existsSync(join(candidate.resourceBase.path, "references", "motion-grammar.md")));

// --- get -------------------------------------------------------------------
const full = await provider.get(candidate);
assert.ok(full, "get() must return the skill");
assert.ok(full.content.length > 2000, "body should be the full SKILL.md");
assert.ok(full.content.includes("9 槽位"), "body must carry the method, not just a stub");
assert.equal(full.provider, "motion-design-prompt-generator");

// --- disabled --------------------------------------------------------------
let skipped = false;
plugin.apply(
  {
    logger: { warn() {} },
    get() {
      skipped = true;
      return null;
    },
    effect() {},
  },
  { enabled: false },
);
assert.equal(skipped, false, "enabled:false must not touch the skills service");

console.log("ok — 1 skill, body", full.content.length, "chars, dir", candidate.resourceBase.path);
