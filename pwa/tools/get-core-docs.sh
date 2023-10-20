#!/bin/bash
# This script fetches api-platform/core to retrieve guides and references
root=$(pwd)
IFS=$'\n' read -d '' -r -a versions < docs-versions.txt

phive install --trust-gpg-keys 62D05354C61458CB8378FD323F82299C64F51AD2 --copy php-documentation-generator/php-documentation-generator
rm -rf core.temp
git clone -b main --single-branch --depth=1 https://github.com/api-platform/core core.temp
cd core.temp

export PDG_AUTOLOAD=$root/core.temp/vendor/autoload.php

mkdir -p $root/data/docs/changelog
for version in "${versions[@]}"
do
	git clean -f
	git restore .
	git fetch --depth=1 origin $version
	git checkout FETCH_HEAD -b $version-temp
	cp $root/core.temp/CHANGELOG.md $root/data/docs/changelog/$version.mdx
	if [[ -d $root/core.temp/docs/guides ]];
	then
		composer install
		mkdir -p $root/data/docs/{guides,reference}/$version
		cd $root/core.temp/docs
		cp $root/pdg.config.yaml pdg.config.yaml
		$root/tools/pdg guides $root/data/docs/guides/$version
		$root/tools/pdg references $root/core.temp/src $root/data/docs/reference/$version --base-url /docs/v$version/reference
	fi
done
