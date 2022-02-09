const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')

const processMsg = chalk.white.bgGreen.bold
const successMsg = chalk.black.bgGreen.bold
const failureMsg = chalk.white.bgRed.bold

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
        handler(argv)
        {
            if(notes.addNote(argv.title, argv.body))
            {
                console.log(successMsg('New Note Added'))
            }
            else
            {
                console.log(failureMsg('Note with same title exists'))
            }
        }
    }
)
yargs.command
(
    {
        command : 'remove',
        describe : 'Remove a note',
        builder :
        {
            title :
            {
                describe : 'Note Title',
                demandOption : true,
                type : 'string'
            }
        },
        handler(argv)
        {
            if(notes.removeNote(argv.title))
            {
                console.log(successMsg('Note with title ' + argv.title + ' Removed!'))
            }
            else
            {
                console.log(failureMsg('No such note exists'))
            }
        }
    }
)
yargs.command
(
    {
        command : 'read',
        describe : 'Read a note',
        builder :
        {
            title :
            {
                describe : 'Note Title',
                demandOption : true,
                type : 'string'
            }
        },
        handler(argv)
        {
            if(!notes.readNote(argv.title))
            {
                console.log(failureMsg('No such note exists'))
            }
        }
    }
)
yargs.command
(
    {
        command : 'list',
        describe : 'List all notes',
        handler()
        {
            console.log(chalk.white.bold.inverse('YOUR NOTES : '))
            notes.listNotes()
        }
    }
)

yargs.parse()