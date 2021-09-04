#!/bin/sh

# RUNNER_ROOT=$(pwd);

# AUTOMATED_ROOT="~/sync/homedir/git/automated/automated"

if [ "$1" = "jest" ]; then
  all_args=("$@")
  rest_args=("${all_args[@]:1}")

  /Users/kirkstrobeck/sync/homedir/git/automated/automated/example/node_modules/.bin/jest ${rest_args[@]}
elif [ "$1" = "storybook" ]; then
  echo 222;
  /Users/kirkstrobeck/sync/homedir/git/automated/automated/node_modules/.bin/start-storybook --config-dir="/Users/kirkstrobeck/sync/homedir/git/automated/automated/.storybook"
fi;
