if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i '' 's|"@automated/automated": "file:.yalc/@automated/automated",||g' example/package.json
else
  sed -i 's|"@automated/automated": "file:.yalc/@automated/automated",||g' example/package.json
fi
