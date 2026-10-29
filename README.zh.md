# Motion Design Prompt Generator（动效提示词生成器）

**把一句话变成帧级运动规格书**——分镜节拍、镜头、缓动、时长，直接投喂 Sora / Veo / Kling / 即梦 / Runway。

[![License: MIT](https://img.shields.io/badge/license-MIT-7c5cff.svg)](LICENSE)
[![DSH](https://img.shields.io/badge/DeepSeek%20Harness-skill-39d0d8.svg)](#deepseek-harness)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-skill-7c5cff.svg)](#claude-code)
[![English](https://img.shields.io/badge/English-README-8b90a0.svg)](README.md)

![demo](assets/demo.gif)

大多数 AI 视频提示词是在堆形容词。这一份是规格书。

## 安装

### DeepSeek Harness（DSH）

```powershell
# Windows
git clone https://github.com/jhh266205-maker/motion-design-prompt-generator.git "$env:USERPROFILE\.dsh\skills\motion-design-prompt-generator"
```

```bash
# macOS / Linux
git clone https://github.com/jhh266205-maker/motion-design-prompt-generator.git ~/.dsh/skills/motion-design-prompt-generator
```

DSH 会监听技能目录，**无需重启**。也可以等 npm 发布后按插件装：

```bash
dsh plugin --profile web add dsh-skill-motion-design-prompt-generator
```

### Claude Code

```bash
git clone https://github.com/jhh266205-maker/motion-design-prompt-generator.git ~/.claude/skills/motion-design-prompt-generator
```

### Cursor / Codex / Windsurf

克隆到对应客户端的技能根目录（`~/.cursor/skills/`、`~/.codex/skills/`、`~/.codeium/windsurf/skills/`），或项目内的 `.agents/skills/`。

### 其他 Agent

把 `SKILL.md` 放到你的 Agent 读取技能的位置，或直接粘进 system prompt——整套方法自包含在一个文件里。`references/` 和 `assets/` 是可选的深度。

### 一键安装（克隆之后）

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\install.ps1   # Windows
```

```bash
./install.sh                 # macOS / Linux：有 DSH 和 Claude Code 就都装
./install.sh --target dsh    # 只装 DSH
```

## 怎么用

技能靠意图触发，不用点名：

> 把这个 brief 变成动效提示词：一个哑光黑立方体展开成产品页。

> 给我一条 9:16 的 Kling 提示词，做 logo 演绎，折纸鸟，5 秒。

> 给我 Remotion 规格，发布会大屏用的柱状图动画。

> 把「一杯冰美式」做成 8 秒竖版动效提示词，要克制、别网红。

## 产出什么

| 产出 | 形态 | 用途 |
|---|---|---|
| 主提示词 | 80–160 词 | 直接粘进 Sora / Veo / Kling / 即梦 |
| 分镜节拍表 | 带时间码的 Markdown 表格 | 剪辑卡点、客户评审、拍摄计划 |
| 平台变体包 | 每个模型一条改写版 | 同一创意跨模型复用 |
| 动效规格 | JSON（附 schema） | Remotion / HyperFrames / GSAP / Lottie |
| 负向与锚点块 | 文本 | 降废片率、多镜头一致性 |

## 为什么有效

普通提示词长这样：*"高级、丝滑、电影感、4K"*。模型只能拿训练数据的平均值来回答，于是成片像素材库。这个技能把形容词换成**可观测事实**：焦段、距离、时长、缓动、角度、材质、一个物理细节、一条负向约束。

```
之前  一个震撼的电影感动画，丝滑运动，4K，未来感界面
之后  100mm 微距，5 秒内从 40cm 推到 15cm，24fps 一镜到底，
      面板过冲 5° 后锁死，单侧冷光，无镜头光晕
```

## 目录结构

```
SKILL.md                        # 方法主体：5 步流程、9 槽位提示词解剖、质量门槛
references/motion-grammar.md    # 缓动曲线、spring 参数、时长基线、镜头/转场词表
references/platform-presets.md  # 6 个平台的提示词骨架与翻车点
references/examples.md          # 4 个完整案例：产品片、logo 演绎、动态字体、数据可视化
assets/prompt-card.md           # 交付模板
assets/spec.schema.json         # 代码动效规格的 JSON Schema
assets/demo.html                # GIF 背后的动画源码（打开就能改）
```

## 设计原则

1. **没有测量就不写形容词。** "电影感光影" 改成 `single hard key from camera-left, 45°, deep falloff, no fill`。
2. **每 2 秒一个运动事件。** 静止是手段，不是意外。
3. **负向约束是提示词的一部分。** 不该出现什么，和该出现什么一样重要。
4. **一致性靠锚点。** 每个主体一段固定描述块，跨镜头逐字复用。
5. **平台是方言。** 同一创意按模型重写，不复制粘贴。

## 二次开发

```bash
node test/smoke.mjs                                  # 插件冒烟测试
node scripts/render-demo.mjs                         # 重渲染演示帧（需要 Chrome）
python scripts/build-assets.py --width 880 --fps 12  # 重建 assets/demo.gif 与封面
```

## 许可

MIT，见 [LICENSE](LICENSE)。拿去用、拿去改、拿去发。
