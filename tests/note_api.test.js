const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('GET /api/notes liefert JSON mit Status 200', async () => {
  const response = await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(Array.isArray(response.body)).toBe(true)
})

test('POST /api/notes legt eine neue Notiz an', async () => {
  const neueNotiz = { content: 'Integrationstest Notiz', important: true }

  const response = await api
    .post('/api/notes')
    .send(neueNotiz)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body.content).toBe('Integrationstest Notiz')
})
