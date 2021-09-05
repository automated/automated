#!/bin/sh

# RUNNER_ROOT=$(pwd);

# AUTOMATED_ROOT="~/sync/homedir/git/automated/automated"

if [ "$1" = "jest" ]; then


  all_args=("$@")
  rest_args=("${all_args[@]:1}")

  IS_JEST=true \
  /Users/kirkstrobeck/sync/homedir/git/automated/automated/example/node_modules/.bin/jest \
  ${rest_args[@]}

elif [ "$1" = "storybook" ]; then


# console.log('isJest', isJest);
# console.log('isStorybook', isStorybook);




  export STORYBOOK_IS_STORYBOOK=true

  STORYBOOK_IS_STORYBOOK=true \
  /Users/kirkstrobeck/sync/homedir/git/automated/automated/node_modules/.bin/start-storybook \
  --config-dir="/Users/kirkstrobeck/sync/homedir/git/automated/automated/.storybook" \
  --port 3144
fi;
