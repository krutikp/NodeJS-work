const Utils = require('./utils.js')
const Notes = require('./notes.js')
const validator = require('validator')
const yargs = require('yargs')

const log = console.log;

yargs.version('1.1.0') 

yargs.command({
    command: 'add',
    describe: 'add a new note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'

        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler (argv) {
        Notes.addNote(argv.title, argv.body);
    }
})


yargs.command({
    command: 'remove',
    describe: 'add a new note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'

        }
    },
    handler(argv) {
        Notes.removeNote(argv.title)
    }
})

yargs.command({
    command: 'read',
    describe: 'read  note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'

        }
    },
    handler(argv) {
        Notes.getNote(argv.title)
    }
})

yargs.command({
    command: 'list',
    describe: 'list a new note',
    handler() {
        Notes.listNotes()
    }
})

yargs.parse()
