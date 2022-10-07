import chalk from 'chalk';

const PROGRAM_NAME = 'EX03';

export const log = (color, msg, dest) => {
  console.log(
    chalk.dim(new Date().toLocaleTimeString() + ' ') +
      chalk.magentaBright.bold(`[${PROGRAM_NAME}] `) +
      chalk[color](msg + ' ') +
      chalk.dim(dest ?? ''),
  );
};

export const error = (err) => {
  console.log(
    chalk.dim(new Date().toLocaleTimeString() + ' ') +
      chalk.redBright.bold(`[${PROGRAM_NAME}] `) +
      chalk.red('error ') +
      chalk.dim(err.message),
  );
};
