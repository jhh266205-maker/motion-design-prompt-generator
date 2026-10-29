"""Assemble the demo GIF and the social cover from Chrome-rendered frames.

Usage:  python scripts/build-assets.py [--width 960] [--fps 15]
"""
from pathlib import Path
import argparse
import sys

from PIL import Image, ImageSequence

ROOT = Path(__file__).resolve().parent.parent
FRAMES = ROOT / ".render"
ASSETS = ROOT / "assets"


def build_gif(width: int, fps: int, colors: int = 128, dither: bool = True) -> Path:
    files = sorted(FRAMES.glob("f*.png"))
    if not files:
        sys.exit("no frames found — run scripts/render-demo.mjs first")

    first = Image.open(files[0]).convert("RGB")
    height = round(first.height * width / first.width)
    size = (width, height)

    # One global palette for the whole animation. Per-frame adaptive palettes
    # look marginally better but block GIF delta encoding, which roughly
    # doubles the file for a loop this long.
    poster = Image.open(files[len(files) // 2]).convert("RGB").resize(size, Image.LANCZOS)
    palette = poster.quantize(colors=colors, method=Image.MEDIANCUT)

    mode = Image.FLOYDSTEINBERG if dither else Image.NONE
    frames = []
    for path in files:
        img = Image.open(path).convert("RGB").resize(size, Image.LANCZOS)
        frames.append(img.quantize(palette=palette, dither=mode))

    out = ASSETS / "demo.gif"
    frames[0].save(
        out,
        save_all=True,
        append_images=frames[1:],
        duration=round(1000 / fps),
        loop=0,
        # Delta frames + a shared palette: without dithering, thin antialiased
        # elements (the beat bars) snap to the dark track colour and vanish, so
        # dithering stays on and the size is paid back by the shared palette.
        optimize=True,
        disposal=1,
    )
    return out


def build_cover() -> Path | None:
    src = FRAMES / "cover.png"
    if not src.exists():
        print("cover.png missing — render assets/cover.html first", file=sys.stderr)
        return None
    img = Image.open(src).convert("RGB")
    if img.size != (1280, 640):
        img = img.resize((1280, 640), Image.LANCZOS)
    out = ASSETS / "cover.png"
    img.save(out, optimize=True)
    return out


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--width", type=int, default=880)
    ap.add_argument("--fps", type=int, default=15)
    ap.add_argument("--colors", type=int, default=128)
    ap.add_argument("--no-dither", action="store_true", help="flat gradients instead of dither noise")
    args = ap.parse_args()

    gif = build_gif(args.width, args.fps, args.colors, dither=not args.no_dither)
    with Image.open(gif) as probe:
        print(f"gif   {gif}  {gif.stat().st_size / 1024:.0f} KB  {probe.n_frames} frames  {probe.size}")

    cover = build_cover()
    if cover:
        print(f"cover {cover}  {cover.stat().st_size / 1024:.0f} KB  {Image.open(cover).size}")
