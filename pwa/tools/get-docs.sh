#!/bin/bash
# This script fetches api-platform/docs
root=$(pwd)

IFS=$'\n' read -d '' -r -a versions < docs-versions.txt

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

cd $root

rm -rf core.temp
git clone -b main --single-branch --depth=1 https://github.com/api-platform/core core.temp
cd core.temp

mkdir -p $root/data/docs/changelog
for version in "${versions[@]}"
do
	git clean -f
	git restore .
	git fetch --depth=1 origin $version
	git checkout FETCH_HEAD -b $version-temp
	cp $root/core.temp/CHANGELOG.md $root/data/docs/changelog/$version.mdx
done

find $root/data/docs -depth -name "*.md" -exec sh -c 'mv "$1" "${1%.md}.mdx"' _ {} \;
npm run prettier:docs
find $root/data/docs -name "*.mdx" | xargs sed -i "s/><br>/\/><br \/>/g"
find $root/data/docs -name "*.mdx" | xargs sed -i "s/<br>/<br \/>/g"
find $root/data/docs -name "*.mdx" | xargs sed -i "s/><\/a>/\/><\/a>/g"
