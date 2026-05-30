const generateId = (notes) => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}

const isValidNote = (note) => {
  return Boolean(note && note.content)
}

module.exports = { generateId, isValidNote }
