const fs = require('fs');
const chalk = require('chalk')
//fs.writeFileSync('note.txt', 'This is my first file with node js.');
//fs.appendFileSync('note.txt',  '\nThis new line show append to the file work');
const file = './data/notes.json';
const log = console.log;

const getNote = (title)=>{
    const notes = loadNotes();
    const note = notes.find((note) => note.title === title)

    if (note) 
        log(chalk.inverse(note.title), note.body);
    else
        log(chalk.red('Note not found.'))
}

const addNote =  (title, body) => {

    const notes = loadNotes();

    const duplicteNote = notes.find((note) => note.title === title)

    if (!duplicteNote) {

        notes.push({
            title: title,
            body: body
        });

        saveNotes(notes);
        log(chalk.green( "Data saved"))
    } else {
        log(chalk.red("Title already exist."))
    }

}

const saveNotes =  (notes) => {
    const dataNotes = JSON.stringify(notes);
    fs.writeFileSync(file, dataNotes)
}


const removeNote =  (title) => {
    const notes = loadNotes();

    const notesToKeep = notes.filter(function (note) {
        return note.title !== title
    })
    if (notes.length > notesToKeep.length) {
        saveNotes(notesToKeep);
        log(chalk.green("Note removed: "), title);
    } else {
        log(chalk.red("Title Not found"))
    }
}

const listNotes = () => {
    const notes = loadNotes();
    log(chalk.inverse("your Notes"))

    notes.forEach((note) => {
        log(note.title, note.body);
    })
}
const loadNotes = ()=> {
    try {
        const dataBuffer = fs.readFileSync(file)
        const dataJSON = dataBuffer.toString();
        const dataParsed = JSON.parse(dataJSON);
        return dataParsed;
    } catch (e) {
        return [];
    }
}

module.exports = { getNote, addNote, removeNote, listNotes }