#!/bin/bash

grep -rn "$1" ./* --exclude-dir={node_modules,dist}
