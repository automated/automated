#!/bin/sh

export NODE_ENV="automated"

echo $(find ./plugins -type d)

# for plugin in `find ../../../plugins -type d`
# do
#     //Do whatever you need with D
# done

#pwd=`pwd`;
#binPath='/node_modules/automated/node_modules/.bin/';
#
#
#
# echo $(pwd)
# # jest="jest \
# #   --testRegex=__tests__/jest/.*.js$ \
# # ";
# #
# # echo $pwd$binPath$jest;
# #
# # $pwd$binPath$jest;
