#!/bin/sh

export NODE_ENV="automated"

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

pwd=`pwd`;
pluginScript='/node_modules/@automated/[plugin-]*/index.sh'

for plugin in `ls -d $pwd$pluginScript`
do
  sh $plugin $cliArgs
done
