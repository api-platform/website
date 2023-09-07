#!/bin/bash
# This script fetches api-platform/docs
root=$(pwd)

readarray -t versions < docs-versions.txt

rm -rf docs.temp
git clone --depth=1 https://github.com/api-platform/docs docs.temp
cd docs.temp

for version in "${versions[@]}"
do
	git remote set-branches --add origin $version
done

git fetch --no-tags --depth=1 --multiple

for version in "${versions[@]}"
do
	if [[ -d $root/data/docs/$version ]]; then
		rm -r $root/data/docs/$version
	fi

	git worktree add $root/data/docs/$version origin/$version
done
