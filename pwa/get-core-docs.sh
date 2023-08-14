#!/bin/sh

git clone https://github.com/api-platform/core /api-platform/core
cd /api-platform/core
composer install --no-dev
composer require webonyx/graphql-php

PDG_AUTOLOAD=/api-platform/core/vendor/autoload.php
versions=("3.1", "main")
for version in "${versions[@]}"
do
	git checkout $version
	cp pdg.config.yaml /api-platform/core/docs
	cd /api-platform/core/docs && /api-platform/tools/pdg guides
	cd /api-platform/core/docs && /api-platform/tools/pdg references
done
