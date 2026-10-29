# Motion Design Prompt Generator锛堝姩鏁堟彁绀鸿瘝鐢熸垚鍣級

涓€涓?Agent 鎶€鑳斤細鎶?*涓€鍙ヨ瘽鐨勬兂娉?*锛屽彉鎴?*甯х骇鍙墽琛岀殑鍔ㄦ晥绠€鎶?*鈥斺€旇兘鐩存帴绮樿繘 Sora / Veo / Kling / 鍗虫ⅵ / Runway 鐨勪富鎻愮ず璇嶃€佸壀杈戣兘瀵圭潃鍗＄偣鐨勫垎闀滆〃銆佹覆鏌撳櫒鑳界洿鎺ヨ窇鐨?JSON 瑙勬牸銆?
鏀寔 DeepSeek Harness锛圖SH锛夈€丆laude Code銆丆odex銆丆ursor锛屼互鍙婁换浣曡鍙?`SKILL.md` 鐨?Agent銆?
---

## 瀹冭В鍐充粈涔堥棶棰?
澶у鏁?AI 瑙嗛鎻愮ず璇嶆槸鍦ㄥ爢褰㈠璇嶏細*楂樼骇銆佷笣婊戙€佺數褰辨劅銆?K*銆傛ā鍨嬪彧鑳界敤璁粌鏁版嵁鐨勫钩鍧囧€兼潵鍥炵瓟锛屼簬鏄垚鐗囩湅璧锋潵鍍忛€氱敤绱犳潗搴撱€?
杩欎釜鎶€鑳芥妸褰㈠璇嶆崲鎴?*鍙娴嬬殑浜嬪疄**锛氱劍娈点€佽窛绂汇€佹椂闀裤€佺紦鍔ㄣ€佽搴︺€佹潗璐ㄣ€佷竴涓墿鐞嗙粏鑺傘€佷竴鏉¤礋鍚戠害鏉熴€傛彁绀鸿瘝浠庢鏄鏍间功鈥斺€斿彲澶嶇幇銆佸彲璇勫銆佸簾鐗囩巼澶у箙涓嬮檷銆?
## 鍓嶅悗瀵规瘮

**浣犺锛?*

> 缁欐垜浠柊鐨勫崗浣滃伐鍏峰仛涓€涓?15 绉掑紑鍦猴紝鍐烽潤銆侀珮绾с€?
**娌℃湁鎶€鑳芥椂锛?*

> 涓€涓渿鎾肩殑鐢靛奖鎰熷姩鐢伙紝鐜颁唬鍗忎綔宸ュ叿锛屼笣婊戣繍鍔紝楂樿川閲忥紝4K锛屾湭鏉ユ劅鐣岄潰锛屽敮缇庡厜褰便€?
**鏈夋妧鑳芥椂锛?*

```
鍋囪锛?5s / 16:9 / 鏃犱汉鐗?/ 鍐疯壊璋?
鍒嗛暅鑺傛媿
0.0鈥?.5s  涓夌矑鍐峰厜鍦ㄨ櫄绌轰腑鍔犻€熶笅鍧?1.5鈥?s    姹囪仛鎴愪竴鏉＄嚎锛屽睍寮€鎴愮（鐮傜幓鐠冮潰鏉?4鈥?s      闈㈡澘瑁傚紑锛屽垎灞傜晫闈互 6mm 瑙嗗樊婊戝嚭
9鈥?2s     娌挎帴缂濈‖鍒囷紝闀滃ご鎺ㄨ繘椤跺眰
12鈥?5s    logo 钀界増锛岄潤姝?0.5s

涓绘彁绀鸿瘝
Three points of cold blue light fall through a black void, accelerating,
then converge into a single horizontal line that unfolds into a floating
pane of frosted glass. The pane splits along a seam and layers of
translucent interface panels slide out from behind each other with 6 mm
parallax. All motion decelerates hard in the last 20%, with a slight
mechanical overshoot where panels lock. 15 seconds, 24 fps, match cuts on
the panel seams. Single cold key from above, cyan rim light, volumetric
haze, brushed glass micro-texture. No people, no readable text, no lens flare.
```

## 瀹夎

鎶€鑳藉氨鏄竴涓枃浠跺す锛屽鍒跺埌浣犵殑 Agent 鎶€鑳界洰褰曞嵆鍙€?
### DeepSeek Harness锛圖SH锛?
```powershell
# Windows
git clone https://github.com/jhh266205-maker/motion-design-prompt-generator.git "$env:USERPROFILE\.dsh\skills\motion-design-prompt-generator"
```

```bash
# macOS / Linux
git clone https://github.com/jhh266205-maker/motion-design-prompt-generator.git ~/.dsh/skills/motion-design-prompt-generator
```

DSH 浼氱洃鍚妧鑳界洰褰曪紝**鏃犻渶閲嶅惎**鍗冲彲鐢熸晥銆?
### Claude Code

```bash
git clone https://github.com/jhh266205-maker/motion-design-prompt-generator.git ~/.claude/skills/motion-design-prompt-generator
```

### Cursor / Codex / Windsurf

鍏嬮殕鍒板搴斿鎴风鐨勬妧鑳芥牴鐩綍锛坄~/.cursor/skills/`銆乣~/.codex/skills/`銆乣~/.codeium/windsurf/skills/`锛夛紝鎴栭」鐩唴鐨?`.agents/skills/`銆?
### 涓€閿畨瑁咃紙鍏嬮殕涔嬪悗锛?
```powershell
# Windows锛堟墽琛岀瓥鐣ュ彲鑳芥嫤鎴湭绛惧悕鑴氭湰锛屽崟娆＄粫杩囧嵆鍙級
powershell -NoProfile -ExecutionPolicy Bypass -File .\install.ps1
```

```bash
# macOS / Linux
./install.sh                 # 鏈?DSH 鍜?Claude Code 灏遍兘瑁?./install.sh --target dsh    # 鍙 DSH
```

### 鍏朵粬 Agent

鎶?`SKILL.md` 鏀惧埌浣犵殑 Agent 璇诲彇鎶€鑳界殑浣嶇疆锛屾垨鐩存帴绮樿繘 system prompt鈥斺€旀暣濂楁柟娉曢兘鑷寘鍚湪杩欎竴涓枃浠堕噷銆俙references/` 鍜?`assets/` 鏄彲閫夋繁搴︺€?
## 鎬庝箞鐢?
鎶€鑳介潬鎰忓浘瑙﹀彂锛屼笉鐢ㄧ偣鍚嶏細

> 鎶婅繖涓?brief 鍙樻垚鍔ㄦ晥鎻愮ず璇嶏細涓€涓搼鍏夐粦绔嬫柟浣撳睍寮€鎴愪骇鍝侀〉銆?
> 缁欐垜涓€鏉?9:16 鐨?Kling 鎻愮ず璇嶏紝鍋?logo 婕旂粠锛屾姌绾搁笩锛? 绉掋€?
> 缁欐垜 Remotion 瑙勬牸锛屽彂甯冧細澶у睆鐢ㄧ殑鏌辩姸鍥惧姩鐢汇€?
> 鎶娿€屼竴鏉啺缇庡紡銆嶅仛鎴?8 绉掔珫鐗堝姩鏁堟彁绀鸿瘝锛岃鍏嬪埗銆佸埆缃戠孩銆?
涔熷彲浠ユ樉寮忚皟鐢細

> 鐢?motion-design-prompt-generator 缁欒繖涓垎闀滃啓鎻愮ず璇嶃€?
## 浜у嚭浠€涔?
| 浜у嚭 | 褰㈡€?| 鐢ㄩ€?|
|---|---|---|
| 涓绘彁绀鸿瘝 | 80鈥?60 璇?| 鐩存帴绮樿繘 Sora / Veo / Kling / 鍗虫ⅵ |
| 鍒嗛暅鑺傛媿琛?| 甯︽椂闂寸爜鐨?Markdown 琛ㄦ牸 | 鍓緫鍗＄偣銆佸鎴疯瘎瀹°€佹媿鎽勮鍒?|
| 骞冲彴鍙樹綋鍖?| 姣忎釜妯″瀷涓€鏉℃敼鍐欑増 | 鍚屼竴鍒涙剰璺ㄦā鍨嬪鐢?|
| 鍔ㄦ晥瑙勬牸 | JSON锛堥檮 schema锛?| Remotion / HyperFrames / GSAP / Lottie |
| 璐熷悜涓庨敋鐐瑰潡 | 鏂囨湰 | 闄嶅簾鐗囩巼銆佸闀滃ご涓€鑷存€?|

## 鐩綍缁撴瀯

```
SKILL.md                        # 鏂规硶涓讳綋锛? 姝ユ祦绋嬨€? 妲戒綅鎻愮ず璇嶈В鍓栥€佽川閲忛棬妲?references/motion-grammar.md    # 缂撳姩鏇茬嚎銆乻pring 鍙傛暟銆佹椂闀垮熀绾裤€侀暅澶?杞満璇嶈〃
references/platform-presets.md  # 6 涓钩鍙扮殑鎻愮ず璇嶉鏋朵笌缈昏溅鐐?references/examples.md          # 4 涓畬鏁存渚嬶細浜у搧鐗囥€乴ogo 婕旂粠銆佸姩鎬佸瓧浣撱€佹暟鎹彲瑙嗗寲
assets/prompt-card.md           # 浜や粯妯℃澘
assets/spec.schema.json         # 浠ｇ爜鍔ㄦ晥瑙勬牸鐨?JSON Schema
```

## 璁捐鍘熷垯

1. **娌℃湁娴嬮噺灏变笉鍐欏舰瀹硅瘝銆?* "鐢靛奖鎰熷厜褰? 鏀规垚 `single hard key from camera-left, 45掳, deep falloff, no fill`銆?2. **姣?2 绉掍竴涓繍鍔ㄤ簨浠躲€?* 闈欐鏄墜娈碉紝涓嶆槸鎰忓銆?3. **璐熷悜绾︽潫鏄彁绀鸿瘝鐨勪竴閮ㄥ垎銆?* 涓嶈鍑虹幇浠€涔堬紝鍜岃鍑虹幇浠€涔堜竴鏍烽噸瑕併€?4. **涓€鑷存€ч潬閿氱偣銆?* 姣忎釜涓讳綋涓€娈靛浐瀹氭弿杩板潡锛岃法闀滃ご閫愬瓧澶嶇敤銆?5. **骞冲彴鏄柟瑷€銆?* 鍚屼竴鍒涙剰鎸夋ā鍨嬮噸鍐欙紝涓嶅鍒剁矘璐淬€?
## 璁稿彲

MIT锛岃 [LICENSE](LICENSE)銆傛嬁鍘荤敤銆佹嬁鍘绘敼銆佹嬁鍘诲彂銆?