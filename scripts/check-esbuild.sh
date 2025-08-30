#!/bin/bash
# Esbuild version checker script
# Helps diagnose and suggest fixes for esbuild version mismatches

echo "🔍 Checking esbuild configuration..."

# Check current esbuild version in package.json
PACKAGE_VERSION=$(grep '"esbuild"' package.json | sed 's/.*"esbuild": *"\([^"]*\)".*/\1/')
echo "📦 package.json esbuild version: $PACKAGE_VERSION"

# Check installed esbuild version  
if command -v node >/dev/null 2>&1; then
  INSTALLED_VERSION=$(node -e "try { console.log(require('esbuild').version); } catch (e) { console.log('Not installed or error loading'); }")
  echo "⚙️  Installed esbuild version: $INSTALLED_VERSION"
  
  # Check if they match
  if [ "$PACKAGE_VERSION" = "$INSTALLED_VERSION" ]; then
    echo "✅ Versions match - no action needed"
  else
    echo "⚠️  Version mismatch detected!"
    echo ""
    echo "🔧 Suggested fixes:"
    echo "   1. Reinstall dependencies: bun install"
    echo "   2. Clear node_modules and reinstall: rm -rf node_modules && bun install"
    echo "   3. If issues persist, try: bun remove esbuild && bun add -D esbuild@$PACKAGE_VERSION"
  fi
else
  echo "❌ Node.js not found - cannot check installed version"
fi

# Check system compatibility
OS=$(uname -s)
ARCH=$(uname -m)
echo ""
echo "🖥️  System info: $OS $ARCH"

if [ "$OS" = "Darwin" ] && [ "$ARCH" = "arm64" ]; then
  echo "🍎 Detected Apple Silicon Mac - ensure esbuild binary compatibility"
elif [ "$OS" = "Linux" ] && [ "$ARCH" = "x86_64" ]; then
  echo "🐧 Detected Linux x64 - standard configuration"
else
  echo "⚠️  Unusual system configuration - may need platform-specific esbuild binary"
fi

echo ""
echo "📚 For more info on esbuild host/binary mismatches, see:"
echo "   https://esbuild.github.io/getting-started/#install-esbuild"