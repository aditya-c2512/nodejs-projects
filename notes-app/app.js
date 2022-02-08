const chalk = require('chalk')
const getNotes = require('./notes.js')
const msg = getNotes()
console.log(chalk.white.bgBlue.italic(msg))