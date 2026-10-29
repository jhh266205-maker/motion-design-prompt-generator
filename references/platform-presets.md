# 平台提示词预设（Platform Presets）

同一创意在不同模型上要**改写**，不是复制。下面每个平台给：骨架 → 示例 → 常见翻车点 → 参数。

---

## 1. Sora 2（OpenAI）

**语言**：英文 ｜ **偏好**：连贯叙述，像给摄影师讲戏 ｜ **长度**：80–180 词

**骨架**
```
[主体+材质细节] + [一个明确的物理动作] + [镜头/焦段/运动] + [时长与帧率] +
[光线与材质] + [风格与质感] + [负向约束] + [声音]
```

**示例**
> A matte-black aluminum cube, 12 cm, sharp bevels, rests on seamless graphite. It splits into eight panels that unfold like petals, each rotating 45° with a slight mechanical overshoot before locking. Macro lens, 100 mm, slow dolly-in from 40 cm to 15 cm, 5 seconds, 24 fps, one continuous take. Single soft key from top-left, cool rim light, brushed-metal micro-texture, shallow depth of field, subtle grain. No text, no people, no reflections of the crew.

**翻车点**
- 写成清单（`1. 2. 3.`）→ 模型会平均化，变成四不像
- 多个机位并存（`dolly in and orbit`）→ 运镜抖动
- 抽象风格词过多 → 质感丢失

**参数**：16:9 / 9:16，5–20s，1080p

---

## 2. Veo 3（Google）

**语言**：英文 ｜ **偏好**：画面 + 声音分行 ｜ **长度**：100–200 词

**骨架**
```
Visual: [主体/场景/动作/镜头/光/风格]
Audio: [环境音] + [动作音] + [音乐/对白]
```

**示例**
> Visual: A single drop of amber liquid falls onto a polished obsidian plate in slow motion, spreading into a perfect ring, 60 fps, macro 100 mm, static camera with 2 cm push-in. Hard key from camera-right, deep falloff, warm rim. Product-film realism, shallow DOF, no grain.
> Audio: quiet room tone, a soft viscous "plip", then a low sustained hum. No music.

**翻车点**
- 不写 Audio → 自动配音效，常常喧宾夺主
- 对白写太长 → 口型对不上，单条不超过 8 词

**参数**：16:9，8s 为主，1080p/4K

---

## 3. Kling 2.x（可灵）

**语言**：中文更稳 ｜ **偏好**：主体 → 动作 → 运镜 → 风格 ｜ **长度**：60–120 字

**骨架**
```
[主体 + 外观细节]，[一个动作，幅度写小]，[运镜方式]，[光线/环境]，[风格]，[画质约束]
```

**示例**
> 一个哑光黑色铝制立方体，边长 12 厘米，边缘有 2 毫米倒角，放在深灰色无缝台面上。立方体沿隐藏缝隙分成八片，像花瓣一样向外展开 45 度后停住。微距镜头缓慢推近，浅景深。左上方单侧柔光，冷色轮廓光，金属拉丝质感。产品广告风格，画面干净，无文字、无人物。

**翻车点**
- 动作幅度写太大 → 形变
- 多人交互 → 手指/肢体崩坏（尽量单人单动作）
- 不写运镜 → 默认静止

**参数**：16:9 / 9:16，5s / 10s，1080p

---

## 4. 即梦 / Seedance（字节）

**语言**：中文 ｜ **偏好**：首帧图 + 运镜 + 风格词 ｜ **长度**：40–100 字

**骨架**
```
首帧：[完整构图描述]；运镜：[推/拉/摇/环绕]；动作：[主体做什么]；
风格：[胶片/3D/实拍]；约束：[不出现什么]
```

**要点**
- **首帧决定一切**：先把首帧当海报写（构图、光源、色调、留白）
- 运动幅度比 Kling 再小一档
- 竖版优先：9:16，8s

---

## 5. Runway Gen-4

**语言**：英文 ｜ **偏好**：短句 + 参考图 ｜ **长度**：20–60 词

**骨架**
```
[参考图说明] + [主体] + [动作] + [镜头] + [光]
```

**示例**
> The product from the reference image rotates slowly on a turntable, soft studio light, static camera, shallow depth of field, 4 seconds.

**翻车点**：提示词过长会覆盖参考图特征；**细节交给图，提示词只写动作与镜头**。

---

## 6. Remotion / HyperFrames / GSAP（代码动效）

**不给形容词，给参数。**

```json
{
  "composition": { "id": "ProductReveal", "fps": 30, "durationInFrames": 150, "width": 1920, "height": 1080 },
  "tracks": [
    { "target": "cube", "from": 0, "to": 45,
      "props": { "scale": [0.8, 1], "rotateY": [-12, 0] },
      "easing": "spring", "spring": { "stiffness": 220, "damping": 26 } },
    { "target": "headline", "from": 30, "to": 60,
      "props": { "opacity": [0, 1], "translateY": [24, 0] },
      "easing": "cubic-bezier(0.16, 1, 0.3, 1)" }
  ],
  "audio": { "src": "bed.mp3", "volume": 0.6 }
}
```

**注意**
- `durationInFrames = fps × 秒数`，所有时间码以帧为单位
- 文字动画用 `translateY + opacity`，不要用 `letterSpacing`（性能差）
- 导出前跑一次 `prefers-reduced-motion` 降级分支

---

## 7. 跨平台复用表

| 元素 | Sora | Veo | Kling | 即梦 | Runway | 代码 |
|---|---|---|---|---|---|---|
| 镜头 | 必写 | 必写 | 必写 | 必写 | 必写 | 不需要 |
| 时长 | 必写 | 必写 | 选写 | 选写 | 必写 | 帧数 |
| 声音 | 选写 | 必写 | 不支持 | 不支持 | 不支持 | 音轨 |
| 负向 | 必写 | 必写 | 必写 | 必写 | 弱 | 不适用 |
| 参考图 | 支持 | 支持 | 支持 | 强依赖 | 强依赖 | 不适用 |
