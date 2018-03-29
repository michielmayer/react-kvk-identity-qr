#!/usr/bin/env bash

npm run build
git add .
git commit -m 'changes'
git push origin master
npm version patch
git push origin master
npm publish
