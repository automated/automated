#!/bin/sh

title="Without args"

pwd=`pwd`

testA=$(sh lib/bin/automated/index.sh)
args=${@}
argsChar='${@}'

if [ "$args" == "$testA$argsChar" ]
then
  echo "SUCCESS: ${title}"
  exit 0
else
  echo "FAIL: ${title}"
  exit 1
fi
