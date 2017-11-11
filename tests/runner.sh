pwd=`pwd`

# add mock plugin
testEcho='Wow! Coverage! ⚙️ ${@}'

pluginDir="node_modules/@automated/plugin-foo"
mkdir -p $pluginDir
echo "echo \"${testEcho}\"" > "${pluginDir}/index.sh"

for file in `find "${pwd}/tests/cases" -maxdepth 1 -type f`; do
  sh $file $testEcho
done

# remove mock plugin
# rm -rf "node_modules"
