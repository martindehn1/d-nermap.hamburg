#!/bin/bash
# Installs rtk (https://github.com/rtk-ai/rtk) for Claude Code on the web
# sessions, if it isn't already present. rtk is a CLI proxy that filters
# and compresses command output to reduce agent token usage; it is a dev
# productivity tool, not a project dependency, so a missing/failed install
# must never block or fail the session.
set -uo pipefail

echo '{"async": true, "asyncTimeout": 420000}'

# Only run in Claude Code on the web (remote) sessions.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

# Already installed (e.g. cached container state from a prior session).
if command -v rtk >/dev/null 2>&1; then
  exit 0
fi

# Needs a Rust toolchain to build from source; skip quietly otherwise.
if ! command -v cargo >/dev/null 2>&1; then
  exit 0
fi

# The official install.sh downloads pre-built binaries directly from
# github.com/api.github.com, which this session's proxy blocks. `cargo
# install --git` instead does a plain git clone, which the proxy's
# anonymous read channel does allow, then builds locally.
cargo install --git https://github.com/rtk-ai/rtk --locked >/tmp/rtk-install.log 2>&1 || true
