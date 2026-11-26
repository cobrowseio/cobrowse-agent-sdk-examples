#! /bin/bash

set -e

if [ -d "./build" ]; then
  rm -rf ./build
fi

mkdir "./build"

function build () {
  PWD_CACHE="$PWD"
  cd $1
  npm install
  npm run build
  cd $PWD_CACHE
}

function copy_build () {
  mkdir -p "./build/${1}"
  cp -rf "./${1}/build/." "./build/${1}/"
}

function copy_static () {
  mkdir -p "./build/${1}"
  cp -rf "./${1}/." "./build/${1}/"
}

build "custom-agent-demo"
copy_build "custom-agent-demo"
build "react-example"
copy_build "react-example"
copy_static "agent-present"
copy_static "custom-data"

cp -f "./README.md" "./build/"
