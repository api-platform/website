#!/bin/bash

git clone https://github.com/api-platform/core /api-platform/core

PDG_AUTOLOAD=/api-platform/core/vendor/autoload.php
versions=("3.1" "main")
for version in "${versions[@]}"
do
	cd /api-platform/core
	git checkout $version
	composer install
	composer require webonyx/graphql-php
	cp /pdg.config.yaml /api-platform/core/docs
	mkdir -p /data/docs/{guides,reference}/$version
	cd /api-platform/core/docs && /api-platform/tools/pdg guides /data/docs/guides/$version
	cd /api-platform/core/docs && /api-platform/tools/pdg references ../src /data/docs/reference/$version
done
