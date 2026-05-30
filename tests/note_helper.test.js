const { generateId, isValidNote } = require('../utils/note_helper')

test('generateId liefert 1 bei leerer Liste', () => {
  expect(generateId([])).toBe(1)
})

test('generateId liefert die hoechste ID + 1', () => {
  const notes = [{ id: 3 }, { id: 7 }, { id: 5 }]
  expect(generateId(notes)).toBe(8)
})

test('isValidNote erkennt fehlenden Inhalt korrekt', () => {
  expect(isValidNote({ important: true })).toBe(false)
  expect(isValidNote({ content: 'Hallo' })).toBe(true)
})
