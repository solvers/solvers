#!/bin/sh

#install meteor
curl https://install.meteor.com | /bin/sh

#install grunt-cli
npm install -g grunt-cli

#installing meteorite
npm install -g meteorite

#install all meteor deps
cd app
mrt install
mrt --settings settings_test.json &

#give it 5 seconds to load before testing
sleep 5
