#! /bin/bash

if [ -d "./build" ]; then
  rm -rf ./build
fi

mkdir "./build"

function react_build () {
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

react_build "custom-agent-demo"
copy_build "custom-agent-demo"
react_build "react-example"
copy_build "react-example"

cp -f "./README.md" "./build/"
