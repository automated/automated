pwd=`pwd`

for file in `find "${pwd}/tests/cases" -maxdepth 1 -type f`
do
  sh $file
done
