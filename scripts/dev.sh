#!/bin/bash
# Development script wrapper with default PORT handling
# Usage: bun run dev [additional vite options]

# Set default PORT if not provided
if [ -z "$PORT" ]; then
  PORT=5173
  echo "No PORT specified, defaulting to $PORT"
fi

# Pass through all arguments to vite
exec vite --port "$PORT" "$@"