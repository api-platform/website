#!/bin/sh

set -e

# Install the API Platform CLI from a precompiled static binary.
#
# Usage as a one-liner:
#     curl -fsSL https://api-platform.com/install.sh | sh
# Custom install directory:
#     curl -fsSL https://api-platform.com/install.sh | BIN_DIR=/usr/local/bin sh

REPO="api-platform/api-platform"

if [ -z "${BIN_DIR}" ]; then
	BIN_DIR="${HOME}/.api-platform"
fi

DEST="${BIN_DIR}/api-platform"

OS=$(uname -s)
ARCH=$(uname -m)
THE_ARCH_BIN=""

if ! command -v curl >/dev/null 2>&1; then
	echo "❗ Please install curl to download the API Platform CLI"
	exit 1
fi

if type "tput" >/dev/null 2>&1; then
	bold=$(tput bold || true)
	italic=$(tput sitm || true)
	normal=$(tput sgr0 || true)
fi

case ${OS} in
Linux*)
	case ${ARCH} in
	aarch64 | arm64)
		THE_ARCH_BIN="api-platform-linux-aarch64"
		;;
	x86_64 | amd64)
		THE_ARCH_BIN="api-platform-linux-x86_64"
		;;
	esac
	;;
Darwin*)
	case ${ARCH} in
	arm64 | aarch64)
		THE_ARCH_BIN="api-platform-macos-aarch64"
		;;
	x86_64 | amd64)
		THE_ARCH_BIN="api-platform-macos-x86_64"
		;;
	esac
	;;
esac

if [ -z "${THE_ARCH_BIN}" ]; then
	echo "❗ Precompiled binaries are not available for ${ARCH}-${OS}"
	echo "❗ On Windows, install the CLI from inside WSL (it runs as Linux)."
	exit 1
fi

echo "📦 Downloading the ${bold}API Platform CLI${normal} for ${OS} (${ARCH})..."

mkdir -p "${BIN_DIR}"

BASE_URL="https://github.com/${REPO}/releases/latest/download/${THE_ARCH_BIN}"

if ! curl -f -L --progress-bar "${BASE_URL}" -o "${DEST}"; then
	echo "❗ Download failed. Check your connection or grab a binary manually from:"
	echo "   https://github.com/${REPO}/releases/latest"
	exit 1
fi

# Verify the SHA-256 checksum published alongside the binary.
EXPECTED=$(curl -fsSL "${BASE_URL}.sha256" | awk '{print $1}')
if [ -z "${EXPECTED}" ]; then
	rm -f "${DEST}"
	echo "❗ Could not fetch the checksum for ${THE_ARCH_BIN}. Aborting for safety."
	exit 1
fi

if command -v sha256sum >/dev/null 2>&1; then
	ACTUAL=$(sha256sum "${DEST}" | awk '{print $1}')
elif command -v shasum >/dev/null 2>&1; then
	ACTUAL=$(shasum -a 256 "${DEST}" | awk '{print $1}')
else
	rm -f "${DEST}"
	echo "❗ Neither sha256sum nor shasum is available to verify the download. Aborting."
	exit 1
fi

if [ "${EXPECTED}" != "${ACTUAL}" ]; then
	rm -f "${DEST}"
	echo "❗ Checksum mismatch — the download may be corrupted or tampered with. Aborting."
	echo "   expected: ${EXPECTED}"
	echo "   actual:   ${ACTUAL}"
	exit 1
fi

chmod +x "${DEST}"

echo
echo "🥳 API Platform CLI installed to ${italic}${DEST}${normal}"

case ":$PATH:" in
*":${BIN_DIR}:"*) ;;
*)
	echo "🔧 Add ${italic}${BIN_DIR}${normal} to your ${italic}PATH${normal} to run ${bold}api-platform${normal} globally:"
	echo "	${bold}export PATH=\"${BIN_DIR}:\$PATH\"${normal}"
	;;
esac

echo
echo "⭐ If you like API Platform, please give it a star on GitHub: ${italic}https://github.com/${REPO}${normal}"
