#!/usr/bin/env node

'use strict';

const program = require('commander');
const bip = require('bip');
const moment = require('moment');
const pkg = require('../package.json');
const updateNotifier = require('update-notifier');

updateNotifier({pkg}).notify();

const getBalance = (number) => {
  bip(number).then((data) => {
    console.log(`Número: ${data.number}`);
    console.log(`Saldo: $${data.balance}`);
    if (data.date) {
      console.log(`Fecha de saldo: ${moment(data.date).format('DD/MM/YYYY HH:mm')}`);
    }
    console.log(`Mensaje: ${data.message}`);
  }).catch((err) => console.log(err.message));
};

program
  .version(pkg.version)
  .usage('<numero tarjeta bip>')
  .description('Obtener saldo de tarjeta bip')
  .action(getBalance)
  .parse(process.argv);

if (program.args.length === 0) {
  program.help();
}
