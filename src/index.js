#!/usr/bin/env node

'use strict';

const program = require('commander');
const bip = require('bip');
const format = require('date-fns/format');
const pkg = require('../package.json');
const updateNotifier = require('update-notifier');
const chalk = require('chalk');

updateNotifier({pkg}).notify();

const getBalance = number => {
  bip(number).then(data => {
    console.log(chalk.green(`Número: ${data.number}`));
    console.log(chalk.green(`Saldo: $${data.balance}`));
    if (data.date) {
      console.log(chalk.green(`Fecha de saldo: ${format(data.date, 'DD/MM/YYYY HH:mm')}`));
    }
    console.log(chalk.green(`Mensaje: ${data.message}`));
  }).catch(err => console.log(chalk.red(err.message)));
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
