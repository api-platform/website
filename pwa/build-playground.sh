docker rm php-wasm
rm -rf core
mkdir php-wasm
docker build ~/projects/php-wasm -t php-wasm:latest --build-arg OPTIMIZE=-O1
docker create --name=php-wasm php-wasm
docker cp php-wasm:/build/php-web.mjs ./php-wasm
docker cp php-wasm:/build/php-web.wasm ./php-wasm
git clone https://github.com/api-platform/core --depth=1
cd core/docs && composer install
cd ../../
docker run -v $(pwd)/core/docs:/src -v $(pwd)/php-wasm:/dist -w /dist php-wasm python3 /emsdk/upstream/emscripten/tools/file_packager.py php-web.data --use-preload-cache --lz4 --preload "/src" --js-output=php-web.data.js --no-node --exclude '*Tests*' 'composer.lock' 'adr' '*features*' '*dist*' '*/.*' --export-name=createPhpModule
cp php-wasm/php-web.data php-wasm/php-web.wasm public/
# for webpack it needs to exist although this is supposedly only used on the frontend
cp php-wasm/php-web.wasm app/playground/utils/
sed '/--pre-js/r php-wasm/php-web.data.js' php-wasm/php-web.mjs > app/playground/utils/php-web.mjs
