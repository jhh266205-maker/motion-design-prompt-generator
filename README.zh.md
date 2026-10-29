# Motion Design Prompt Generator（动效提示词生成器）

一个 Agent 技能：把**一句话的想法**变成**帧级可执行的动效简报**——能直接粘进 Sora / Veo / Kling / 即梦 / Runway 的主提示词、剪辑能对着卡点的分镜表、渲染器能直接跑的 JSON 规格。

支持 DeepSeek Harness（DSH）、Claude Code、Codex、Cursor，以及任何读取 `SKILL.md` 的 Agent。

---

## 它解决什么问题

大多数 AI 视频提示词是在堆形容词：*高级、丝滑、电影感、4K*。模型只能用训练数据的平均值来回答，于是成片看起来像通用素材库。

这个技能把形容词换成**可观测的事实**：焦段、距离、时长、缓动、角度、材质、一个物理细节、一条负向约束。提示词从此是规格书——可复现、可评审、废片率大幅下降。

## 前后对比

**你说：**

> 给我们新的协作工具做一个 15 秒开场，冷静、高级。

**没有技能时：**

> 一个震撼的电影感动画，现代协作工具，丝滑运动，高质量，4K，未来感界面，唯美光影。

**有技能时：**

```
假设：15s / 16:9 / 无人物 / 冷色调

分镜节拍
0.0–1.5s  三粒冷光在虚空中加速下坠
1.5–4s    汇聚成一条线，展开成磨砂玻璃面板
4–9s      面板裂开，分层界面以 6mm 视差滑出
9–12s     沿接缝硬切，镜头推进顶层
12–15s    logo 落版，静止 0.5s

主提示词
Three points of cold blue light fall through a black void, accelerating,
then converge into a single horizontal line that unfolds into a floating
pane of frosted glass. The pane splits along a seam and layers of
translucent interface panels slide out from behind each other with 6 mm
parallax. All motion decelerates hard in the last 20%, with a slight
mechanical overshoot where panels lock. 15 seconds, 24 fps, match cuts on
the panel seams. Single cold key from above, cyan rim light, volumetric
haze, brushed glass micro-texture. No people, no readable text, no lens flare.
```

## 安装

技能就是一个文件夹，复制到你的 Agent 技能目录即可。

### DeepSeek Harness（DSH）

```powershell
# Windows
git clone https://github.com/jhh266205-maker/motion-design-prompt-generator.git "$env:USERPROFILE\.dsh\skills\motion-design-prompt-generator"
```

```bash
# macOS / Linux
git clone https://github.com/jhh266205-maker/motion-design-prompt-generator.git ~/.dsh/skills/motion-design-prompt-generator
```

DSH 会监听技能目录，**无需重启**即可生效。

### Claude Code

```bash
git clone https://github.com/jhh266205-maker/motion-design-prompt-generator.git ~/.claude/skills/motion-design-prompt-generator
```

### 一键安装（克隆之后）

```powershell
# Windows（执行策略可能拦截未签名脚本，单次绕过即可）
powershell -NoProfile -ExecutionPolicy Bypass -File .\install.ps1
```

```bash
# macOS / Linux
./install.sh                 # 有 DSH 和 Claude Code 就都装
./install.sh --target dsh    # 只装 DSH
```

### Cursor / Codex / Windsurf

克隆到对应客户端的技能根目录（`~/.cursor/skills/`、`~/.codex/skills/`、`~/.codeium/windsurf/skills/`），或项目内的 `.agents/skills/`。

### 其他 Agent

把 `SKILL.md` 放到你的 Agent 读取技能的位置，或直接粘进 system prompt——整套方法都自包含在这一个文件里。`references/` 和 `assets/` 是可选深度。

## 怎么用

技能靠意图触发，不用点名：

> 把这个 brief 变成动效提示词：一个哑光黑立方体展开成产品页。

> 给我一条 9:16 的 Kling 提示词，做 logo 演绎，折纸鸟，5 秒。

> 给我 Remotion 规格，发布会大屏用的柱状图动画。

> 把「一杯冰美式」做成 8 秒竖版动效提示词，要克制、别网红。

也可以显式调用：

> 用 motion-design-prompt-generator 给这个分镜写提示词。

## 产出什么

| 产出 | 形态 | 用途 |
|---|---|---|
| 主提示词 | 80–160 词 | 直接粘进 Sora / Veo / Kling / 即梦 |
| 分镜节拍表 | 带时间码的 Markdown 表格 | 剪辑卡点、客户评审、拍摄计划 |
| 平台变体包 | 每个模型一条改写版 | 同一创意跨模型复用 |
| 动效规格 | JSON（附 schema） | Remotion / HyperFrames / GSAP / Lottie |
| 负向与锚点块 | 文本 | 降废片率、多镜头一致性 |

## 目录结构

```
SKILL.md                        # 方法主体：5 步流程、9 槽位提示词解剖、质量门槛
references/motion-grammar.md    # 缓动曲线、spring 参数、时长基线、镜头/转场词表
references/platform-presets.md  # 6 个平台的提示词骨架与翻车点
references/examples.md          # 4 个完整案例：产品片、logo 演绎、动态字体、数据可视化
assets/prompt-card.md           # 交付模板
assets/spec.schema.json         # 代码动效规格的 JSON Schema
```

## 设计原则

1. **没有测量就不写形容词。** "电影感光影" 改成 `single hard key from camera-left, 45°, deep falloff, no fill`。
2. **每 2 秒一个运动事件。** 静止是手段，不是意外。
3. **负向约束是提示词的一部分。** 不该出现什么，和该出现什么一样重要。
4. **一致性靠锚点。** 每个主体一段固定描述块，跨镜头逐字复用。
5. **平台是方言。** 同一创意按模型重写，不复制粘贴。

## 许可

MIT，见 [LICENSE](LICENSE)。拿去用、拿去改、拿去发。
