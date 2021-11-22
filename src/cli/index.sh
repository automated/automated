#!/bin/sh

echo "automated ⚙️"

PROJECT_ROOT="$(pwd)";
AUTOMATED_ROOT=$PROJECT_ROOT/node_modules/@automated/automated;

PROJECT_BIN=$PROJECT_ROOT/node_modules/.bin;
AUTOMATED_BIN=$AUTOMATED_ROOT/node_modules/.bin;

AUTOMATED_DIST=$AUTOMATED_ROOT/dist;

ALL_ARGS=("$@")
REST_ARGS=("${ALL_ARGS[@]:1}")

derive_bin() {
  if [ -f "$AUTOMATED_BIN/$1" ]; then
      echo "$AUTOMATED_BIN/$1"
  else
      echo "$PROJECT_BIN/$1"
  fi
}

if [ "$1" = "jest" ]; then

  export STORYBOOK_URL="http://localhost:3144"
  if [ "$(curl -s -o /dev/null -w "%{http_code}" $STORYBOOK_URL)" = "200" ]; then
      STORYBOOK_IS_RUNNING=true
  fi
  export STORYBOOK_IS_RUNNING

  export JEST_IMAGE_SNAPSHOT_TRACK_OBSOLETE=1

  $(derive_bin jest) \
    --rootDir=$PROJECT_ROOT \
    --config="$AUTOMATED_DIST/jest/jest.config.js" \
    ${REST_ARGS[@]}

elif [ "$1" = "storybook" ]; then

  $(derive_bin start-storybook) \
    --config-dir="$AUTOMATED_DIST/storybook/config" \
    --port 3144 \
    ${REST_ARGS[@]}

elif [ "$1" = "build-storybook" ]; then

  $(derive_bin build-storybook) \
    --config-dir="$AUTOMATED_DIST/storybook/config" \
    --output-dir=$PROJECT_ROOT/tmp/automated/storybook \
    ${REST_ARGS[@]}

elif [ "$1" = "init" ]; then

  node $AUTOMATED_ROOT/dist/tools/init.js

elif [ "$1" = "combine-coverage" ]; then

  $(derive_bin istanbul-merge) \
    --out "$PROJECT_ROOT/coverage-combined/coverage-final.json" \
    "$PROJECT_ROOT/coverage/coverage-final.json" \
    "$PROJECT_ROOT/coverage-from-automated/coverage-final.json' &" \

  $(derive_bin istanbul) report \
    --include "$ROOT/coverage-combined/coverage-final.json" \
    --dir "$ROOT/coverage-combined/lcov-report" \
    html

fi;
