#!/bin/bash
find . -name "*.js" | xargs rm -f
find . -name "*.d.ts" | xargs rm -f
find . -name "*.map" | xargs rm -f