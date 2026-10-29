# 运动语法参考（Motion Grammar）

写提示词时从这里取**数值**，不要取形容词。

---

## 1. 缓动与曲线

### 1.1 CSS / JS 常用曲线

```css
--ease-out-expo:   cubic-bezier(0.16, 1, 0.3, 1);      /* 入场首选 */
--ease-out-quart:  cubic-bezier(0.25, 1, 0.5, 1);
--ease-in-expo:    cubic-bezier(0.7, 0, 0.84, 0);      /* 退场 */
--ease-in-out:     cubic-bezier(0.65, 0, 0.35, 1);
--ease-out-back:   cubic-bezier(0.34, 1.56, 0.64, 1);  /* 轻微过冲 */
--ease-spring:     linear(0, 0.009, 0.035 2.1%, 0.141 4.4%,
                   0.723 12.9%, 0.938 16.7%, 1.017, 1.077 20.4%,
                   1.121, 1.149 24.3%, 1.159, 1.163, 1.161,
                   1.154 29.9%, 1.129 32.8%, 1.051 39.6%,
                   1.017 43.1%, 0.991, 0.977 51%, 0.974 53.8%,
                   0.975 57.1%, 0.997 69.8%, 1.003 76.9%, 1);
```

### 1.2 Spring 参数（Framer Motion / React Spring）

| 感觉 | stiffness | damping | mass |
|---|---|---|---|
| 干脆（开关、弹窗） | 320 | 30 | 1 |
| 标准（卡片、抽屉） | 220 | 24 | 1 |
| 柔和（大面积面板） | 160 | 22 | 1 |
| 有生命（拖拽回弹） | 260 | 14 | 1.1 |

判断口诀：**damping 越低越"弹"，stiffness 越高越"快"；两个一起调不会更高级，只会更吵。**

### 1.3 视频模型里的缓动怎么写

模型不懂 bezier，要写成运动描述：

- 入场：`starts fast and decelerates hard in the last 20%`
- 退场：`accelerates out of frame, no ease at the end`
- 过冲：`overshoots by ~5° then settles back`
- 停顿：`holds still for 0.4s before the cut`
- 惯性：`the panels keep drifting 2cm after the mechanism locks`

---

## 2. 时长与节奏

### 2.1 UI 基线

| 元素 | 时长 | 备注 |
|---|---|---|
| Hover / 按压反馈 | 80–120ms | 超过 150ms 会觉得"黏" |
| Toggle / Checkbox | 120–180ms | 位移 + 颜色分开计时 |
| Tooltip / Popover | 150–200ms | 只做透明度 + 4px 位移 |
| 卡片展开 | 240–320ms | 高度动画用 clip 而非 height |
| 底部抽屉 | 300–380ms | 加 0.4 透明度遮罩，240ms |
| 页面转场 | 320–450ms | 超过 500ms 用户会等待 |
| 品牌 loading | 800–1500ms | 需可循环、可中断 |

### 2.2 视频节奏

| 类型 | 镜头时长 | 每 10 秒运动事件 |
|---|---|---|
| 信息流广告 | 1.0–1.8s | 6–9 |
| 产品片 | 2.0–4.0s | 3–5 |
| 品牌片 | 4.0–8.0s | 2–3 |
| 展会大屏 | 6.0–12.0s | 1–2 |

**卡点**：如果有音乐，运动事件落在小节线上；提示词里写 `cuts land on the beat, 120 BPM`。

---

## 3. 镜头词表

### 3.1 机位与运动

| 中文 | 英文 | 视觉后果 |
|---|---|---|
| 推 | dolly in / push in | 亲密感、聚焦 |
| 拉 | dolly out | 揭示环境、疏离 |
| 摇 | pan | 横向信息扫描 |
| 俯仰 | tilt up / down | 权力关系、体量 |
| 环绕 | orbit / arc | 立体感、产品全貌 |
| 跟随 | tracking / follow | 代入、速度感 |
| 手持 | handheld | 真实、纪录片 |
| 升降 | crane / jib | 史诗感 |
| 微距 | macro | 材质、精密 |
| 俯视 | top-down / overhead | 秩序、图表 |
| 低角度 | low angle | 压迫、英雄感 |
| 变焦 | zoom | 突兀、复古；**与 dolly 不同** |
| 希区柯克变焦 | dolly zoom | 眩晕、认知崩塌 |

### 3.2 焦段与光

- 广角 24–35mm：空间夸张、边缘畸变
- 标准 50mm：接近人眼，最"安全"
- 中长 85–135mm：压缩背景，人像/产品高级感的默认解
- 微距 100mm：材质特写
- 光位写法：`hard key from camera-left 45°, no fill, deep falloff` / `large soft source overhead, 1:4 ratio, cool rim from behind`

### 3.3 摄影机参数（写进提示词能显著提升质感）

`24fps`（电影感）· `30fps`（通用）· `60fps`（慢动作素材）· `180° shutter`（自然运动模糊）· `f/1.8`（浅景深）· `anamorphic flare`（宽银幕）· `16mm grain`（胶片）

---

## 4. 转场词表

| 中文 | 英文 | 适用 |
|---|---|---|
| 动作匹配剪辑 | match cut | 两镜头动作连续，最"贵"的转场 |
| 甩镜 | whip pan | 快节奏、能量 |
| 遮罩揭示 | mask reveal / wipe | UI、图形化 |
| 形变 | morph | 同源物体变形 |
| 硬切 | hard cut | 卡点、干脆 |
| 漏光 | light leak | 情绪过渡 |
| 物体擦除 | object wipe | 前景遮挡切换 |
| 缩放穿透 | zoom through | 进入微观/界面 |
| 胶片烧灼 | film burn | 复古 |

写提示词时**一条片子只指定一种主转场**，多了模型会平均化。

---

## 5. 迪士尼 12 原则 → 现代动效

| 原则 | 现代用法 | 代码里怎么落 |
|---|---|---|
| Squash & Stretch | 落地、撞击 | scaleX/scaleY 反向补偿 |
| Anticipation | 按钮按下前的 2px 回拉 | 前置 60ms 反向位移 |
| Staging | 一次只有一个焦点 | 用暗角/景深压掉次要信息 |
| Straight Ahead / Pose to Pose | 关键帧 vs 程序化 | 关键帧做表演，程序做环境 |
| Follow Through | 拖尾、余动 | 子元素延迟 40–80ms |
| Slow In / Slow Out | 缓动 | 见 §1 |
| Arc | 运动走弧线 | 贝塞尔路径而非直线 |
| Secondary Action | 次要元素跟进 | 阴影/粒子/反光 |
| Timing | 节奏 | 见 §2 |
| Exaggeration | 夸张 | 幅度 ×1.2，仅强调时用 |
| Solid Drawing | 体积感 | 透视、接触阴影 |
| Appeal | 讨喜 | 圆角、材质、光线 |

---

## 6. 声音设计（Veo 3 / 有声平台）

写法：`[画面] + Sound: [底层环境] + [动作音] + [收尾音]`

- 底层：`low room tone, -30dB`
- 动作音：`single mechanical click at lock-in` / `soft whoosh on the wipe`
- 音乐：`minimal synth pulse, 120 BPM, no melody`
- 禁止：`epic music`、`cinematic soundtrack`（模型会给你罐头音乐）

---

## 7. 一致性锚点（跨镜头复用）

为每个主体写一段**固定描述块**，逐字复用：

```
[BODY] matte-black aluminum cube, 12cm edge, 2mm bevel, brushed top face,
       seamless front face, no visible screws
```

所有镜头都以 `[BODY]` 开头，只改动作与机位。这是多镜头成片能对上的唯一可靠办法。
