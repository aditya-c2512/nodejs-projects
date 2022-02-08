const fs = require('fs')

const loadNotes = function()
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
const saveNotes = function(notes)
{
    fs.writeFileSync('notes.json',JSON.stringify(notes))
}
const getNotes = function () 
{
    return 'Your notes...'
}
const addNote = function(title, body)
{
    const notes = loadNotes()
    const duplicates = notes.filter(
        function(note)
        {
            return note.title === title
        }
    )

    if(duplicates.length === 0)
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
const removeNote = function(title)
{
    const notes = loadNotes()
    const filtered = notes.filter(
        function(note)
        {
            return note.title !== title
        }
    )
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

module.exports = {
    getNotes : getNotes,
    addNote : addNote,
    removeNote : removeNote
}