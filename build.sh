#!/usr/bin/env bash
readonly currentDir=$(cd $(dirname $0); pwd)
cd ${currentDir}
$(npm bin)/ng-packagr -p ./projects/elements/ng-package.json
