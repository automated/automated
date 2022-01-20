COMMAND="$(pwd)/node_modules/@automated/automated/lib/dist/cli/runner.js $@"
echo x2
echo $AUTOMATED_JEST_VISUAL_REGRESSION_REQUIRED
node $COMMAND
