#!/bin/sh

title="Without args"

pwd=`pwd`

testA=$(sh lib/bin/automated/index.sh 2>&1 >/dev/null)
testB="ls: ${pwd}/node_modules/@automated/[plugin-]*: No such file or directory"

if [ "$testA" = "$testB" ]
then
  echo "SUCCESS: ${title}"
  exit 0
else
  echo "FAIL: ${title}"
  exit 1
fi
