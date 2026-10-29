# Motion Design Prompt Generator

An agent skill that turns **one line of intent** into a **frame-accurate motion brief**: a master prompt you can paste into Sora / Veo / Kling / Seedance / Runway, a beat sheet your editor can cut to, and a JSON spec your renderer can execute.

Works with DeepSeek Harness (DSH), Claude Code, Codex, Cursor, and any agent that reads `SKILL.md` files.

> 涓枃璇存槑瑙?[README.zh.md](README.zh.md)銆?
---

## The problem

Most AI-video prompts are piles of adjectives 鈥?*cinematic, stunning, smooth, high quality*. A model can only answer that with the average of its training data, which is why the output looks like generic stock footage.

This skill replaces adjectives with **observable facts**: lens, distance, duration, easing, angle, material, a physical detail, and a negative constraint. Prompts become specifications 鈥?reproducible, reviewable, and far less likely to produce unusable takes.

## Before / after

**You say:**

> Make a 15-second opening for our new collaboration tool. Calm, premium.

**Without the skill:**

> A stunning cinematic animation of a modern collaboration tool, smooth motion, high quality, 4K, futuristic UI, beautiful lighting.

**With the skill:**

```
Assumption: 15s / 16:9 / no people / cool palette

Beat sheet
0.0鈥?.5s  3 points of light fall through a void, accelerating
1.5鈥?s    they converge into a line, then a frosted glass pane unfolds
4鈥?s      the pane splits, layered UI panels slide out with 6 mm parallax
9鈥?2s     hard cut on a seam, camera pushes into the top layer
12鈥?5s    logo lands, 0.5s hold

Master prompt
Three points of cold blue light fall through a black void, accelerating,
then converge into a single horizontal line that unfolds into a floating
pane of frosted glass. The pane splits along a seam and layers of
translucent interface panels slide out from behind each other with 6 mm
parallax. All motion decelerates hard in the last 20%, with a slight
mechanical overshoot where panels lock. 15 seconds, 24 fps, match cuts on
the panel seams. Single cold key from above, cyan rim light, volumetric
haze, brushed glass micro-texture. No people, no readable text, no lens flare.
```

## Install

The skill is a single folder. Copy it into your agent's skills directory.

### DeepSeek Harness (DSH)

```powershell
# Windows
git clone https://github.com/jhh266205-maker/motion-design-prompt-generator.git "$env:USERPROFILE\.dsh\skills\motion-design-prompt-generator"
```

```bash
# macOS / Linux
git clone https://github.com/jhh266205-maker/motion-design-prompt-generator.git ~/.dsh/skills/motion-design-prompt-generator
```

DSH watches the skills directory and picks it up without a restart.

### Claude Code

```bash
git clone https://github.com/jhh266205-maker/motion-design-prompt-generator.git ~/.claude/skills/motion-design-prompt-generator
```

### One-command install (from a clone)

```powershell
# Windows (execution policy may block unsigned scripts 鈥?bypass for this run)
powershell -NoProfile -ExecutionPolicy Bypass -File .\install.ps1
```

```bash
# macOS / Linux
./install.sh                 # DSH + Claude Code, whichever exists
./install.sh --target dsh    # DSH only
```

### Cursor / Codex / Windsurf

Clone into that client's skills root (`~/.cursor/skills/`, `~/.codex/skills/`, `~/.codeium/windsurf/skills/`), or into a project-level `.agents/skills/`.

### Any other agent

Drop `SKILL.md` wherever your agent looks for skills, or paste it into a system prompt 鈥?the whole method is self-contained in one file. `references/` and `assets/` are optional depth.

## Use it

The skill activates on intent; you never need to name it:

> Turn this brief into motion prompts: a matte-black cube that unfolds into a product page.

> I need a 9:16 Kling prompt for a logo reveal. Origami bird, 5 seconds.

> Give me a Remotion spec for a bar chart animation on a keynote screen.

> 鎶娿€屼竴鏉啺缇庡紡銆嶅仛鎴?8 绉掔珫鐗堝姩鏁堟彁绀鸿瘝锛岃鍏嬪埗銆佸埆缃戠孩銆?
You can also invoke it explicitly:

> Use motion-design-prompt-generator to write the prompt for this storyboard.

## What you get

| Output | Shape | Use |
|---|---|---|
| Master prompt | 80鈥?60 words | Paste into Sora / Veo / Kling / Seedance |
| Beat sheet | Markdown table, time-coded | Editing, client review, shot planning |
| Platform variants | One rewrite per model | Same idea across models |
| Motion spec | JSON (schema included) | Remotion / HyperFrames / GSAP / Lottie |
| Negative + anchor block | Text | Fewer wasted takes, consistent subject |

## What's inside

```
SKILL.md                        # the method: 5-step workflow, 9-slot prompt anatomy, QA gate
references/motion-grammar.md    # easing curves, spring params, duration baselines, lens/transition vocabulary
references/platform-presets.md  # prompt skeletons + failure modes for 6 platforms
references/examples.md          # 4 worked cases: product film, logo reveal, kinetic type, data viz
assets/prompt-card.md           # delivery template
assets/spec.schema.json         # JSON Schema for code-based motion specs
```

## Design principles

1. **No adjectives without a measurement.** "Cinematic lighting" becomes `single hard key from camera-left, 45掳, deep falloff, no fill`.
2. **One motion event every 2 seconds.** Stillness is a tool, not an accident.
3. **Negative constraints are part of the prompt.** What must not appear matters as much as what must.
4. **Consistency needs an anchor.** Every subject gets a fixed description block reused verbatim across shots.
5. **Platforms are dialects.** The same idea is rewritten per model, not copy-pasted.

## License

MIT 鈥?see [LICENSE](LICENSE). Use it, fork it, ship it.
