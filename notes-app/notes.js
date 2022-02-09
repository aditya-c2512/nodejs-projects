const fs = require('fs')
const chalk = require('chalk')

const loadNotes = () =>
{
    try
    {
        return JSON.parse(fs.readFileSync('notes.json').toString())
    }
    catch(e)
    {
        return []
    }
}
const saveNotes = (notes) =>
{
    fs.writeFileSync('notes.json',JSON.stringify(notes))
}

const addNote = (title, body) =>
{
    const notes = loadNotes()
    const duplicate = notes.find((note) => note.title === title)

    if(!duplicate)
    {
        notes.push(
            {
                title : title,
                body : body
            }
        )
        saveNotes(notes)
        return true
    }
    else
    {
        return false
    }
}
const removeNote = (title) =>
{
    const notes = loadNotes()
    const filtered = notes.filter((note) => note.title !== title)
    if(notes.length > filtered.length)
    {
        saveNotes(filtered)
        return true
    }
    else
    {
        return false
    }
}
const readNote = (title) =>
{
    const notes = loadNotes()
    const noteToRead = notes.find((note) => note.title === title)
    if(noteToRead)
    {
        console.log(chalk.bold.white.inverse(noteToRead.title))
        console.log(noteToRead.body)
        return true
    }
    else
    {
        return false
    }
}
const listNotes = () =>
{
    const notes = loadNotes()
    notes.forEach((note) =>
        {
            console.log(note.title)
        }
    )
}
module.exports = {
    addNote : addNote,
    removeNote : removeNote,
    readNote : readNote,
    listNotes : listNotes
}