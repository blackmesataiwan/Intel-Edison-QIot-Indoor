#!/bin/sh
# run srcipt in non-stop mode
which forever
if [ $? -ne 0 ]; then
  npm install -g forever
fi
forever start -s --killSignal SIGINT boot.js