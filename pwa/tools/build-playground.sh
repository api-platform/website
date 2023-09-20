#!/bin/bash
# This builds the API Platform WASM playground and preloads data
docker rm php-wasm
rm -rf core
docker pull soyuka/php-wasm:8.2.9
docker rm php-wasm
docker create --name=php-wasm soyuka/php-wasm:8.2.9
mkdir -p php-wasm
docker cp php-wasm:/build/php-web.mjs ./php-wasm
docker cp php-wasm:/build/php-web.wasm ./php-wasm
git clone https://github.com/api-platform/core --depth=1
cd core/docs && composer install
cd ../../
docker run -v $(pwd)/core/docs:/src -v $(pwd)/php-wasm:/dist -w /dist soyuka/php-wasm:8.2.9 python3 /emsdk/upstream/emscripten/tools/file_packager.py php-web.data --use-preload-cache --lz4 --preload "/src" --js-output=php-web.data.js --no-node --exclude '*Tests*' 'composer.lock' 'adr' '*features*' '*dist*' '*/.*' --export-name=createPhpModule
cp php-wasm/php-web.data php-wasm/php-web.wasm public/
# for webpack it needs to exist although this is supposedly only used on the frontend
cp php-wasm/php-web.wasm app/playground/utils/
sed '/--pre-js/r php-wasm/php-web.data.js' php-wasm/php-web.mjs > app/playground/utils/php-web.mjs
