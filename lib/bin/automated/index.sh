#!/bin/sh

export NODE_ENV="automated"

# echo $(find ./plugins -type d)

# for plugin in `find ../../../plugins -type d`
# do
#     //Do whatever you need with D
# done

pwd=`pwd`;

pluginPath='/node_modules/@automated/plugin-jest/index.sh';

# echo $pwd$pluginPath

sh $pwd$pluginPath;
