# 完整案例（Worked Examples）

四个案例覆盖：产品片、logo 演绎、动态字体、数据可视化。
每个案例都从「一句话」走到「可交付提示词」，注意中间的**决策**而不是结果。

---

## 案例 1 · SaaS 产品 15 秒开场（Sora / Veo）

**输入**：`给我们新的协作工具做一个 15 秒开场，要高级、冷静`

**Step 1 取材（推断，不追问）**
- 主体：抽象化的工作流（不做实拍 UI 录屏，避免过时）
- 动作：粒子汇聚成一块玻璃面板，面板裂开露出界面层
- 场景：无重力黑色空间
- 假设：15s / 16:9 / 无人物 / 冷蓝 + 玻璃

**Step 3 节拍**

| 时间 | 画面 | 运动 | 声音 |
|---|---|---|---|
| 0–1.5s | 黑场中 3 粒光点 | 从静止突然加速下坠 | 低频脉冲起 |
| 1.5–4s | 光点汇聚成一条线 | 汇聚，速度递减 | 一声清脆合成音 |
| 4–9s | 线展开成玻璃面板 | 面板展开 + 轻微过冲 | 玻璃摩擦质感 |
| 9–12s | 面板裂开，露出分层 UI | 硬切 + 层次推近 | 卡点硬切 |
| 12–15s | 落版 logo + 一句话 | 从下 8px 上浮，0.5s 后静止 | 余音衰减 |

**Step 4 主提示词**

> Three points of cold blue light fall through a black void, accelerating, then converge into a single horizontal line that unfolds into a floating pane of frosted glass. The pane splits along a seam and layers of translucent interface panels slide out from behind each other, stacked with 6 mm parallax. All motion starts fast and decelerates hard in the last 20%, with a slight mechanical overshoot where panels lock. 15 seconds, 24 fps, five shots, match cuts on the panel seams. Single cold key from above, thin cyan rim light, soft volumetric haze, brushed glass micro-texture, shallow depth of field. Product-film realism, minimal, no people, no readable text, no lens flares.

**负向**：`no text, no people, no UI mockup text, no warm tones, no lens flare`

**为什么这样写**：用"落版前留 0.5s 静止"保证 logo 可读；用"6mm 视差"给 3D 层次一个可测的量，比写 "layered" 有效。

---

## 案例 2 · Logo 演绎 5 秒（Kling / 即梦）

**输入**：`logo 是一个折纸风格的鸟，想做一个 5 秒的出场`

**Step 1**
- 锚点：`[BIRD] 折纸风格的鸟，三角面，哑光米白纸张，边缘 1mm 折痕阴影`
- 动作：纸鸟从折叠态展开成完整形态，翅膀最后一下
- 假设：5s / 1:1 / 纯色浅灰背景

**Step 2 首帧（即梦强依赖）**

> 正中央一只折纸风格的鸟，三角面构成，哑光米白纸张，翼展占画面 60%，浅灰无缝背景，顶部柔和射灯，右下方淡淡投影，极简产品摄影风格。

**Step 3 提示词（Kling）**

> [BIRD]，纸张从折叠状态展开，翅膀先展开 30 度，停顿 0.3 秒，再完全展开并轻微回弹。镜头固定，微距，浅景深。顶部柔光，纸张纤维质感清晰，折痕处有细微阴影。极简产品广告风格，无文字、无人物、无背景杂物。

**翻车点**：这类"形变+材质"的活最容易糊，**动作必须拆成两次**（先 30°，停，再展开），一次写完必糊。

---

## 案例 3 · 动态字体 8 秒（Sora / Remotion）

**输入**：`给一个电子音乐节做 kinetic type，要躁`

**Step 3 节拍**（120 BPM，每 0.5s 一拍）

| 拍 | 文字 | 运动 |
|---|---|---|
| 1–2 | `NO` | 从画面外砸入，落地压缩 8% |
| 3–4 | `SLEEP` | 逐字横向滑入，每个错开 1 帧 |
| 5–8 | `UNTIL` | 放大到溢出，边缘被裁切 |
| 9–12 | `THE` | 反向旋转 90°，硬切 |
| 13–16 | `SUN` | 全部字母聚合，光晕爆闪，落版 |

**提示词**

> Bold condensed sans-serif typography slams into frame on every beat, 120 BPM. Letters enter from off-screen at high speed, compress 8% on impact then snap back, each letter offset by one frame. On beat 9 the whole word rotates 90° counter-clockwise in a hard cut. The camera stays locked; only the type moves. High-contrast monochrome with a single acid-yellow accent, heavy motion blur on entry, 24 fps, 8 seconds. No gradients, no 3D extrusion, no background imagery.

**代码版要点**：用 `spring(stiffness 400, damping 12)` 做砸入，`clip-path` 做溢出裁切，**不要**用 `scale` 做"砸"的效果。

---

## 案例 4 · 数据可视化动效（代码 / After Effects 规格）

**输入**：`把我们季度增长的柱状图做成动效，放在发布会大屏`

**Step 3**
1. 坐标轴先淡入（200ms，opacity 0→1）
2. 柱子从基线生长，逐个延迟 60ms，ease-out-expo，320ms
3. 数值标签跟随柱顶，延迟 80ms，opacity + 4px 上浮
4. 高亮柱：颜色过渡 + 一次 1.04 倍脉冲，200ms
5. 结尾：整组轻微上移 8px，留白

**规格**

```json
{
  "canvas": { "w": 3840, "h": 2160, "fps": 60 },
  "sequence": [
    { "id": "axes", "startMs": 0, "durationMs": 200, "easing": "linear", "props": { "opacity": [0, 1] } },
    { "id": "bars", "startMs": 200, "staggerMs": 60, "durationMs": 320,
      "easing": "cubic-bezier(0.16, 1, 0.3, 1)", "props": { "scaleY": [0, 1] }, "transformOrigin": "bottom" },
    { "id": "labels", "startMs": 280, "staggerMs": 60, "durationMs": 240,
      "easing": "cubic-bezier(0.16, 1, 0.3, 1)", "props": { "opacity": [0, 1], "y": [4, 0] } },
    { "id": "highlight", "startMs": 1200, "durationMs": 200, "props": { "scale": [1, 1.04, 1] } },
    { "id": "group", "startMs": 1600, "durationMs": 400, "props": { "y": [0, -8] } }
  ]
}
```

**为什么是 60fps**：大屏远距离观看，30fps 的柱体边缘会抖。

---

## 复用清单

写新案例时对照：

- [ ] 每个案例都能回答"为什么是这个参数"
- [ ] 动作被拆成可数的事件（不是"动态展开"）
- [ ] 每条提示词都有一个可测的物理量（角度、毫米、毫秒、BPM）
- [ ] 负向约束针对该案例最可能出现的错误，而不是通用套话
