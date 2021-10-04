#!/bin/sh

echo "automated"

ROOT="$(pwd)/../../";

ALL_ARGS=("$@")
REST_ARGS=("${ALL_ARGS[@]:1}")

if [ "$1" = "jest" ]; then

  echo "jest"

  export STORYBOOK_URL="http://localhost:3144"
  if [ "$(curl -s -o /dev/null -w "%{http_code}" $STORYBOOK_URL)" = "200" ]; then
      STORYBOOK_IS_RUNNING=true
  fi
  export STORYBOOK_IS_RUNNING

  $ROOT/node_modules/.bin/jest \
  ${REST_ARGS[@]}

elif [ "$1" = "storybook" ]; then

  echo "storybook"

  $ROOT/node_modules/.bin/start-storybook \
  --config-dir="/Users/kirkstrobeck/sync/homedir/git/automated/automated/.storybook" \
  --port 3144 \
  ${REST_ARGS[@]}

elif [ "$1" = "init" ]; then

  echo "init"

  ./ts-node src/tools/init.ts

fi;
