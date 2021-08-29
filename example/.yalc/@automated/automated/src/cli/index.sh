#!/bin/sh

RUNNER_ROOT=$(pwd);

AUTOMATED_ROOT="~/sync/homedir/git/automated/automated"

START_STORYBOOK_BIN="/Users/kirkstrobeck/sync/homedir/git/automated/automated/node_modules/.bin/start-storybook"

$START_STORYBOOK_BIN --config-dir="/Users/kirkstrobeck/sync/homedir/git/automated/automated/.storybook"
