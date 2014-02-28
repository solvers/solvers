#!/bin/sh

#install meteor
curl https://install.meteor.com | /bin/sh

#install grunt-cli
npm install -g grunt-cli

#installing meteorite
npm install -g meteorite

#run meteor project
cd app;mrt --settings settings_test.json &

#give it 3 seconds to load before testing
sleep 3
