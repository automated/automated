#!/bin/bash

title="With plugin args"

pwd=`pwd`

testArgs='--bar --car'
testA=$(sh lib/bin/automated/index.sh foo\[$testArgs\])

args=${@}
argsSubStr=${args:0:18}

if [ "$testA" == "$argsSubStr$testArgs" ]
then
  echo "SUCCESS: ${title}"
  exit 0
else
  echo "FAIL: ${title}"
  exit 1
fi
