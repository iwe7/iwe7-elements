#!/usr/bin/env bash
readonly currentDir=$(cd $(dirname $0); pwd)
cd ${currentDir}
rm -rf dist
git add .
git commit -m '更新'
git push origin master

$(npm bin)/ng-packagr -p ./projects/elements/ng-package.json

cp -r projects/elements/src dist/elements/src

cd dist/elements

npm publish
