#!/bin/bash
set -xe

root=$(pwd)
rm -rf core.temp
git clone -b main --single-branch --depth=1 https://github.com/api-platform/core core.temp
cd core.temp

export PDG_AUTOLOAD=$root/core.temp/vendor/autoload.php

versions=("3.1" "main")
for version in "${versions[@]}"
do
	git clean -f
	git restore .
	git fetch --depth=1 origin $version
	git checkout FETCH_HEAD -b $version-temp
	composer install
	mkdir -p $root/data/docs/{guides,reference}/$version
	cd $root/core.temp/docs
	cp $root/pdg.config.yaml pdg.config.yaml
	$root/tools/pdg guides $root/data/docs/guides/$version
	$root/tools/pdg references $root/core.temp/src $root/data/docs/reference/$version --base-url /docs/v$version/reference
done

cp -r $root/data/docs/guides/3.1/* $root/data/docs/guides/
cp -r $root/data/docs/reference/3.1/* $root/data/docs/reference/
