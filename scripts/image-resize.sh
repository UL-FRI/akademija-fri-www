#!/usr/bin/env bash

# DEPENDENCIES
# * ImageMagick (commands identify and mogrify)

# ./image-resize.sh "<path_to_images>"
# Resizes all images with the .jpg extension to MIN_SIZE with a JPG compression quality of QUALITY.
# The quotes are NECESSARY for wildcard expansion to work properly.
# Images that are smaller than MIN_SIZE will not be touched.

# Adapted from: https://askubuntu.com/a/708801

# We use this script, opposed to using "mogrify -resize '1920>' *.jpg" because the latter command
# opens and saves all files - including images smaller than 1920. This makes it slow.
# Our script filters all the images that are larger than the specified size then runs mogrify.

MIN_SIZE=1920
QUALITY=93

if [[ $# -eq 0 ]] ; then
    echo "First argument must be INPUT_FILE"
    exit 0
fi

PATTERN=$(printf '%s%s%s' '$1>' "$MIN_SIZE" '{print$3}')

identify -format '%w %h %i\n' $1 | awk $PATTERN | xargs -L 1 mogrify -quality $QUALITY -resize $MIN_SIZE
