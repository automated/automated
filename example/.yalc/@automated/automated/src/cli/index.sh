#!/bin/sh

# RUNNER_ROOT=$(pwd);

# AUTOMATED_ROOT="~/sync/homedir/git/automated/automated"

if [ "$1" = "jest" ]; then

  echo "automated:jest"

  all_args=("$@")
  rest_args=("${all_args[@]:1}")

  export IS_JEST=true

  STORYBOOK_URL="http://localhost:3144"
  if [ "$(curl -s -o /dev/null -w "%{http_code}" $STORYBOOK_URL)" = "200" ]; then
      STORYBOOK_IS_RUNNING=true
  fi
  export STORYBOOK_IS_RUNNING

  IS_JEST=true \
  /Users/kirkstrobeck/sync/homedir/git/automated/automated/example/node_modules/.bin/jest \
  ${rest_args[@]}

elif [ "$1" = "storybook" ]; then

  echo "automated:storybook"

  export STORYBOOK_IS_STORYBOOK=true

  STORYBOOK_IS_STORYBOOK=true \
  /Users/kirkstrobeck/sync/homedir/git/automated/automated/node_modules/.bin/start-storybook \
  --config-dir="/Users/kirkstrobeck/sync/homedir/git/automated/automated/.storybook" \
  --port 3144
fi;
