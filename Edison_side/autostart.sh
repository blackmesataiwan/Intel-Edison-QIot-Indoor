#!/bin/sh
cd /home/root/Edison_Inbox
forever start -s --killSignal SIGINT boot.js