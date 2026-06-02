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

test('GET / liefert die HTML-Startseite', async () => {
  const response = await api
    .get('/')
    .expect(200)

  expect(response.text).toContain('Hello from MCCE Group 7')
})

test('GET /api/notes/:id liefert eine einzelne Notiz', async () => {
  const response = await api
    .get('/api/notes/1')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body.id).toBe(1)
})

test('GET /api/notes/:id liefert 404 bei unbekannter ID', async () => {
  await api
    .get('/api/notes/9999')
    .expect(404)
})

test('POST /api/notes liefert 400 bei fehlendem content', async () => {
  const response = await api
    .post('/api/notes')
    .send({ important: true })
    .expect(400)
    .expect('Content-Type', /application\/json/)

  expect(response.body.error).toBe('content missing')
})

test('DELETE /api/notes/:id loescht eine Notiz (204)', async () => {
  await api
    .delete('/api/notes/2')
    .expect(204)
})