#!/bin/sh
if ! which npm || ! which nodejs || ! which node || ! which forever
then
  apt-get update
  apt-get install -y npm nodejs nodejs-legacy
  npm install forever -g
fi

forever stopall
forever start -l /vagrant/info.log -o /vagrant/console.log -e /vagrant/error.log -a /vagrant/app.js