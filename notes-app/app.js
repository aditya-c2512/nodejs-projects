const chalk = require('chalk')
const yargs = require('yargs')
const getNotes = require('./notes.js')

const processMsg = chalk.white.bgGreen.bold

// add, remove, read, list
yargs.command
(
    {
        command : 'add',
        describe : 'Add a new note',
        builder :
        {
            title :
            {
                describe : 'Note Title',
                demandOption : true,
                type : 'string'
            },
            body :
            {
                describe : 'Note Body',
                demandOption : true,
                type : 'string'
            }
        },
        handler : function(argv)
        {
            console.log(processMsg('Adding Note : '), chalk.bold(argv.title))
            console.log(chalk.italic(argv.body))
        }
    }
)
yargs.command
(
    {
        command : 'remove',
        describe : 'Remove a note',
        handler : function()
        {
            console.log(processMsg('Removing Note'))
        }
    }
)
yargs.command
(
    {
        command : 'read',
        describe : 'Read a note',
        handler : function()
        {
            console.log(processMsg('Reading Note'))
        }
    }
)
yargs.command
(
    {
        command : 'list',
        describe : 'List all notes',
        handler : function()
        {
            console.log(processMsg('List of Notes'))
        }
    }
)

yargs.parse()