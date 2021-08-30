#!/bin/sh

# RUNNER_ROOT=$(pwd);

# AUTOMATED_ROOT="~/sync/homedir/git/automated/automated"

# START_STORYBOOK_BIN="/Users/kirkstrobeck/sync/homedir/git/automated/automated/node_modules/.bin/start-storybook"

if [ "$1" = "jest" ]; then
  all_args=("$@")
  rest_args=("${all_args[@]:1}")

  /Users/kirkstrobeck/sync/homedir/git/automated/automated/example/node_modules/.bin/jest ${rest_args[@]}
else
  echo 321;
  # $START_STORYBOOK_BIN --config-dir="/Users/kirkstrobeck/sync/homedir/git/automated/automated/.storybook"
fi;
