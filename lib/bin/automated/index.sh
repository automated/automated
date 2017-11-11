#!/bin/bash

export NODE_ENV="automated"

### Get cli arguments
# maintain arg quotes - https://stackoverflow.com/a/24179878/537998
function requote() {
  local res=""
  for x in "${@}" ; do
      # try to figure out if quoting was required for the $x:
      grep -q "[[:space:]]" <<< "$x" && res="${res} '${x}'" || res="${res} ${x}"
  done
  # remove first space and print:
  sed -e 's/^ //' <<< "${res}"
}
cliArgs=$(requote "${@}")
###

pwd=`pwd`;
pluginDirSearch='/node_modules/@automated/[plugin-]*'

for pluginDir in `ls -d $pwd$pluginDirSearch`
do
  # look for something like `jest[`
  pluginWithBraket=$(echo $pluginDir | pcregrep -o1 'plugin-(.*)')\\[

  if [[ $cliArgs == *$pluginWithBraket* ]]; then
    # run with args
    pluginArgs=$(echo $cliArgs | pcregrep -o1 "$pluginWithBraket(.*)\]")
    cmd=$(echo $pluginDir/index.sh $pluginArgs)
    # echo $cmd
    sh $cmd
  else
    # run without args
    cmd=$(echo $pluginDir/index.sh)
    # echo $cmd
    sh $cmd
  fi
done
