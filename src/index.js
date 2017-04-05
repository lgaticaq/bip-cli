#!/usr/bin/env node

'use strict';

const program = require('commander');
const bip = require('bip');
const pkg = require('../package.json');
const updateNotifier = require('update-notifier');
const chalk = require('chalk');

updateNotifier({pkg}).notify();

const getBalance = number => {
  bip(number).then(data => {
    console.log(chalk.green(`Número: ${data.number}`));
    console.log(chalk.green(`Saldo: $${data.balance}`));
    if (data.date) {
      const pattern = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):\d{2}\.\d+Z/;
      let hour = data.date.toISOString().replace(pattern, '$4') - 3;
      if (hour < 10) hour = `0${hour}`;
      const date = data.date.toISOString().replace(pattern, `$3/$2/$1 ${hour}:$5`);
      console.log(chalk.green(`Fecha de saldo: ${date}`));
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
