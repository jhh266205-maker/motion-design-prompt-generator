# Installs this skill into the DSH and/or Claude Code skills directory.
# Usage:  .\install.ps1              -> auto-detect DSH, then Claude Code
#         .\install.ps1 -Target dsh
#         .\install.ps1 -Target claude
#         .\install.ps1 -Target custom -Dir "D:\my\skills"

param(
  [ValidateSet('auto', 'dsh', 'claude', 'custom')]
  [string]$Target = 'auto',
  [string]$Dir
)

$ErrorActionPreference = 'Stop'
$name = 'motion-design-prompt-generator'
$source = $PSScriptRoot

function Install-To([string]$root) {
  $dest = Join-Path $root $name
  New-Item -ItemType Directory -Force -Path $root | Out-Null
  if (Test-Path $dest) {
    Write-Host "updating existing skill at $dest"
    Remove-Item -Recurse -Force $dest
  }
  New-Item -ItemType Directory -Force -Path $dest | Out-Null
  Copy-Item -Path (Join-Path $source 'SKILL.md'), (Join-Path $source 'references'), (Join-Path $source 'assets') -Destination $dest -Recurse -Force
  Write-Host "installed -> $dest"
}

switch ($Target) {
  'custom' {
    if (-not $Dir) { throw '-Target custom requires -Dir <skills root>' }
    Install-To $Dir
  }
  'dsh'    { Install-To (Join-Path $env:USERPROFILE '.dsh\skills') }
  'claude' { Install-To (Join-Path $env:USERPROFILE '.claude\skills') }
  default {
    Install-To (Join-Path $env:USERPROFILE '.dsh\skills')
    if (Test-Path (Join-Path $env:USERPROFILE '.claude')) {
      Install-To (Join-Path $env:USERPROFILE '.claude\skills')
    }
  }
}

Write-Host ''
Write-Host 'done. most agents pick the skill up without a restart.'
