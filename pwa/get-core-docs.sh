#!/bin/bash

git clone https://github.com/api-platform/core /api-platform/core

versions=("3.1" "main")
for version in "${versions[@]}"
do
	cd /api-platform/core
	git checkout $version
	composer install --no-dev
	composer require webonyx/graphql-php
	cp /pdg.config.yaml /api-platform/core/docs
	mkdir -p /data/docs/{guides,reference}/v$version
	cd /api-platform/core/docs && PDG_AUTOLOAD=/api-platform/core/vendor/autoload.php /api-platform/tools/pdg guides /data/docs/guides/v$version
	cd /api-platform/core/docs && PDG_AUTOLOAD=/api-platform/core/vendor/autoload.php /api-platform/tools/pdg references /api-platform/core/src /data/docs/reference/v$version
done
