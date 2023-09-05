#!/bin/bash

versions=("3.1" "main")
for version in "${versions[@]}"
do
	cd /api-platform/core
	git fetch --depth=1 origin $version
	git checkout FETCH_HEAD $version
	git clean -fd
	composer require webonyx/graphql-php -W
	mkdir -p /data/docs/{guides,reference}/$version
	cd /api-platform/core/docs
	cp /pdg.config.yaml pdg.config.yaml
	PDG_AUTOLOAD=/api-platform/core/vendor/autoload.php /api-platform/tools/pdg guides /data/docs/guides/$version
	PDG_AUTOLOAD=/api-platform/core/vendor/autoload.php /api-platform/tools/pdg references /api-platform/core/src /data/docs/reference/$version --base-url /docs/v$version/reference
done
