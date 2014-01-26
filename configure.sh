#!/bin/sh

#install meteor
curl https://install.meteor.com | /bin/sh

#install grunt-cli
npm install -g grunt-cli

#installing meteorite
npm install -g meteorite

#run meteor project
cd app;mrt
