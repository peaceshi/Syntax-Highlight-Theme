#!/bin/bash
find . -name "*.js"  -print0 | xargs -0 rm -f
find . -name "*.d.ts" -print0 | xargs -0 rm -f
find . -name "*.map" -print0 | xargs -0 rm -f