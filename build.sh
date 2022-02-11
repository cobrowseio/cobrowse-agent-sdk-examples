#! /bin/bash

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

build "custom-agent-demo"
copy_build "custom-agent-demo"
build "react-example"
copy_build "react-example"

cp -f "./README.md" "./build/"
