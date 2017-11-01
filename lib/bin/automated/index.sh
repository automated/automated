#!/bin/sh

export NODE_ENV="automated"

pwd=`pwd`;
pluginScript='/node_modules/@automated/[plugin-]*/index.sh'

for plugin in `ls -d $pwd$pluginScript`
do
  sh $plugin
done
