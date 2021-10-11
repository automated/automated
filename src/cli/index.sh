#!/bin/sh

echo "automated ⚙️"

ROOT="$(pwd)";

AUTOMATED_ROOT=$ROOT/node_modules/@automated/automated;
BIN=$AUTOMATED_ROOT/node_modules/.bin;
DIST=$AUTOMATED_ROOT/dist;

ALL_ARGS=("$@")
REST_ARGS=("${ALL_ARGS[@]:1}")

if [ "$1" = "jest" ]; then

  export STORYBOOK_URL="http://localhost:3144"
  if [ "$(curl -s -o /dev/null -w "%{http_code}" $STORYBOOK_URL)" = "200" ]; then
      STORYBOOK_IS_RUNNING=true
  fi
  export STORYBOOK_IS_RUNNING

  export JEST_IMAGE_SNAPSHOT_TRACK_OBSOLETE=1
  $BIN/jest \
    --rootDir=$ROOT \
    --config="$DIST/jest/jest.config.js" \
    ${REST_ARGS[@]}

elif [ "$1" = "storybook" ]; then

  $BIN/start-storybook \
    --config-dir="$DIST/storybook/config" \
    --port 3144 \
    ${REST_ARGS[@]}

elif [ "$1" = "init" ]; then


  node $AUTOMATED_ROOT/dist/tools/init.js

elif [ "$1" = "combine-coverage" ]; then

  $BIN/istanbul-merge \
    --out "$ROOT/coverage-combined/coverage-final.json" \
    "$ROOT/coverage/coverage-final.json" \
    "$ROOT/coverage-from-automated/coverage-final.json' &" \

  $BIN/istanbul report \
    --include "$ROOT/coverage-combined/coverage-final.json" \
    --dir "$ROOT/coverage-combined/lcov-report" \
    html

fi;
