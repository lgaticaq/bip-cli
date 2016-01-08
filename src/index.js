#!/usr/bin/env node

'use strict';

import program from 'commander';
import bip from 'bip';
import moment from 'moment';
import pkg from '../package.json';

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