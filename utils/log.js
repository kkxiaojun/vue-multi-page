const chalk = require('chalk')
module.exports = {
  info: (...str) => {
    console.log(chalk.blue(str))
  },
  warn: (...str) => {
    console.log(chalk.yellow(str))
  },
  succes: str => {
    console.log(chalk.green(str))
  },
  error: err => {
    console.log(chalk.red(err))
  }
}