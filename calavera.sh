#!/bin/sh

# Equivalent to Python's os.path.relpath
# http://stackoverflow.com/a/12498485/1352334
function relpath
{
    source=$1
    target=$2

    common_part=$source # for now
    result="" # for now

    while [[ "${target#$common_part}" == "${target}" ]]; do
        # no match, means that candidate common part is not correct
        # go up one level (reduce common part)
        common_part="$(dirname $common_part)"
        # and record that we went back, with correct / handling
        if [[ -z $result ]]; then
            result=".."
        else
            result="../$result"
        fi
    done

    if [[ $common_part == "/" ]]; then
        # special case for root (no common path)
        result="$result/"
    fi

    # since we now have identified the common part,
    # compute the non-common part
    forward_part="${target#$common_part}"

    # and now stick all parts together
    if [[ -n $result ]] && [[ -n $forward_part ]]; then
        result="$result$forward_part"
    elif [[ -n $forward_part ]]; then
        # extra slash removal
        result="${forward_part:1}"
    fi

    return $result
}

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
ln -s ../index.html doc/index.html

# Cleanup Go stuffes

rm -Rf $GOPATH
