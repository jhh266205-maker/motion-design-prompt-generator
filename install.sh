#!/usr/bin/env sh
# Installs this skill into a skills directory.
# Usage:
#   ./install.sh                 -> auto-detect DSH, then Claude Code
#   ./install.sh --target dsh
#   ./install.sh --target claude
#   ./install.sh --target custom --dir ~/my/skills

set -eu

name="motion-design-prompt-generator"
source="$(cd "$(dirname "$0")" && pwd)"
target="auto"
dir=""

while [ $# -gt 0 ]; do
  case "$1" in
    --target) target="$2"; shift 2 ;;
    --dir) dir="$2"; shift 2 ;;
    -h|--help) sed -n '2,8p' "$0"; exit 0 ;;
    *) echo "unknown option: $1" >&2; exit 1 ;;
  esac
done

install_to() {
  root="$1"
  dest="$root/$name"
  mkdir -p "$root"
  [ -d "$dest" ] && { echo "updating existing skill at $dest"; rm -rf "$dest"; }
  mkdir -p "$dest"
  cp -R "$source/SKILL.md" "$source/references" "$source/assets" "$dest/"
  echo "installed -> $dest"
}

case "$target" in
  custom)
    [ -n "$dir" ] || { echo "--target custom requires --dir" >&2; exit 1; }
    install_to "$dir"
    ;;
  dsh) install_to "$HOME/.dsh/skills" ;;
  claude) install_to "$HOME/.claude/skills" ;;
  auto)
    install_to "$HOME/.dsh/skills"
    [ -d "$HOME/.claude" ] && install_to "$HOME/.claude/skills"
    ;;
  *) echo "unknown target: $target" >&2; exit 1 ;;
esac

echo
echo "done. most agents pick the skill up without a restart."
