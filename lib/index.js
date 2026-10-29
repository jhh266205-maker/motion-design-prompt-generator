/**
 * dsh-skill-motion-design-prompt-generator
 *
 * Serves the `motion-design-prompt-generator` skill that ships in this package
 * to the DSH skill catalog, so `npm install` + one profile line is enough —
 * no manual copy into ~/.dsh/skills.
 *
 * The skill directory is the package root: SKILL.md, references/ and assets/
 * are published next to lib/. `resourceBase` points at that DIRECTORY (not the
 * SKILL.md) because the skill's own instructions reference files relative to
 * the bundle.
 *
 * @module dsh-skill-motion-design-prompt-generator
 */

import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

/** Stable Cordis plugin name. */
export const name = "motion-design-prompt-generator";

/** Skill id; must match the `name` field inside SKILL.md. */
const SKILL_NAME = "motion-design-prompt-generator";

/** Provider identity echoed on every candidate; the registry validates it. */
const PROVIDER = "motion-design-prompt-generator";

/** Precedence rank: 100 project, 200 project-agents, 300 custom, 400 user, 600 bundled. */
const RANK = 560;

const SKILL_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SKILL_FILE = join(SKILL_ROOT, "SKILL.md");

/**
 * Minimal frontmatter reader.
 *
 * Deliberately dependency-free: this package exists to deliver one file, and a
 * YAML parser would be the only runtime dependency it ever had. It understands
 * the subset a SKILL.md actually uses — `key: value`, `key: "value"`,
 * `key: 'value'` — and ignores everything else, including nested maps.
 *
 * @param {string} raw full SKILL.md text.
 * @returns {{ data: Record<string, string>, body: string } | null}
 */
export function parseFrontmatter(raw) {
  const text = raw.replace(/^\uFEFF/, "");
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(text);
  if (!match) return null;
  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const kv = /^([A-Za-z0-9_-]+)\s*:\s*(.*)$/.exec(line.trim());
    if (!kv) continue;
    let value = kv[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"') && value.length > 1) ||
      (value.startsWith("'") && value.endsWith("'") && value.length > 1)
    ) {
      value = value.slice(1, -1);
    }
    data[kv[1]] = value;
  }
  return { data, body: text.slice(match[0].length) };
}

/** Read SKILL.md and turn it into a catalog candidate, or null when unreadable. */
async function readCandidate() {
  let raw;
  try {
    raw = await readFile(SKILL_FILE, "utf8");
  } catch {
    return null;
  }
  const parsed = parseFrontmatter(raw);
  if (parsed === null) return null;
  const description = parsed.data.description;
  if (!description) return null;
  return {
    name: parsed.data.name || SKILL_NAME,
    description,
    ...(parsed.data.whenToUse ? { whenToUse: parsed.data.whenToUse } : {}),
    invocation: { modelInvocable: true, userInvocable: true },
    source: "custom",
    provider: PROVIDER,
    rank: RANK,
    resourceBase: { kind: "directory", path: SKILL_ROOT },
    path: SKILL_FILE,
    locator: { path: SKILL_FILE, directory: SKILL_ROOT },
  };
}

/** Skill provider serving the one bundle in this package. */
class MotionDesignSkillProvider {
  constructor(logger) {
    this.name = PROVIDER;
    this.logger = logger;
  }

  async list() {
    const candidate = await readCandidate();
    if (candidate === null) {
      this.logger?.warn?.(`[motion-design-prompt-generator] cannot read ${SKILL_FILE}`);
      // Incomplete, not empty: the registry caches complete observations, so
      // reporting a transient read failure as "no skills" would pin emptiness.
      return { candidates: [], complete: false };
    }
    return [candidate];
  }

  async get(candidate) {
    let raw;
    try {
      raw = await readFile(candidate.locator.path, "utf8");
    } catch {
      return undefined;
    }
    const parsed = parseFrontmatter(raw);
    if (parsed === null) return undefined;
    return {
      name: candidate.name,
      description: candidate.description,
      ...(candidate.whenToUse ? { whenToUse: candidate.whenToUse } : {}),
      invocation: candidate.invocation,
      source: candidate.source,
      provider: PROVIDER,
      resourceBase: { kind: "directory", path: candidate.locator.directory },
      path: candidate.locator.path,
      content: parsed.body.trim(),
    };
  }
}

/**
 * Register the provider on the skills service.
 *
 * `skills` is read through `ctx.get` rather than declared in `inject`: a
 * profile without the service should leave this plugin dormant, not park it in
 * "waiting" forever.
 */
export function apply(ctx, config = {}) {
  if (config.enabled === false) return;

  let skills;
  try {
    skills = ctx.get("skills");
  } catch {
    skills = undefined;
  }
  if (!skills) {
    ctx.logger?.warn?.("[motion-design-prompt-generator] skills service absent; skill not registered");
    return;
  }

  ctx.effect(
    () => skills.registerProvider(() => new MotionDesignSkillProvider(ctx.logger)),
    "motion-design-prompt-generator.registerProvider()",
  );
}

export default { name, apply };
