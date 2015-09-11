#!/bin/sh

# Cleanup previous build

rm -Rf gowrkspc/ app/doc/

# Install calavera

export GOPATH=$PWD/gowrkspc
mkdir -p gowrkspc/src/github.com/dunglas
cd gowrkspc/src/github.com/dunglas
git clone git@github.com:dunglas/calavera.git
cd calavera
go get
go install

# Clone the doc

cd $GOPATH/..
mkdir app/doc
cd app/doc
git clone -b 1.0 git@github.com:api-platform/doc.git 1.0
cd 1.0

# Generate JSON-LD files

$GOPATH/bin/calavera . .

# Generate symlinks

find . -name "*.jsonld" -type f | while read NAME ; do ln -sf `python -c "import os.path; print os.path.relpath('../../index.html', '${NAME}/..')"` "${NAME%.jsonld}.html" ; done
cd $GOPATH/../app
ln -s index.html download.html
ln -s index.html doc.html
ln -s index.html news.html
ln -s index.html support.html
ln -s index.html demo.html
ln -s index.html news.html
ln -s ../index.html doc/index.html

# Cleanup Go stuffes

rm -Rf $GOPATH
