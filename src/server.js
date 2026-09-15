import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import { store } from './data/store.js'

const app = express()
const port = Number(process.env.PORT || 3000)
const adminEmail = process.env.ADMIN_EMAIL || 'admin@maycult.fr'
const adminPassword = process.env.ADMIN_PASSWORD || 'change-me'

app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }))
app.use(express.json())

function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function requireAdmin(request, response, next) {
  const authorization = request.get('authorization') || ''
  if (authorization !== `Bearer ${process.env.ADMIN_TOKEN || 'dev-admin-token'}`) {
    return response.status(401).json({ message: 'Accès administrateur requis.' })
  }
  next()
}

app.get('/api/health', (_request, response) => response.json({ status: 'ok' }))

app.post('/api/admin/login', (request, response) => {
  const { email, password } = request.body
  if (email !== adminEmail || password !== adminPassword) {
    return response.status(401).json({ message: 'Identifiants administrateur incorrects.' })
  }
  response.json({ token: process.env.ADMIN_TOKEN || 'dev-admin-token', user: { email, role: 'admin' } })
})

app.get('/api/events', (_request, response) => response.json(store.events))
app.post('/api/events', requireAdmin, (request, response) => {
  const event = { id: createId('event'), ...request.body }
  store.events.push(event)
  response.status(201).json(event)
})
app.put('/api/events/:id', requireAdmin, (request, response) => {
  const index = store.events.findIndex((event) => event.id === request.params.id)
  if (index === -1) return response.status(404).json({ message: 'Événement introuvable.' })
  store.events[index] = { ...store.events[index], ...request.body, id: request.params.id }
  response.json(store.events[index])
})
app.delete('/api/events/:id', requireAdmin, (request, response) => {
  const index = store.events.findIndex((event) => event.id === request.params.id)
  if (index === -1) return response.status(404).json({ message: 'Événement introuvable.' })
  const [deletedEvent] = store.events.splice(index, 1)
  response.json(deletedEvent)
})

app.get('/api/contributions', requireAdmin, (_request, response) => response.json(store.contributions))
app.post('/api/contributions', (request, response) => {
  const contribution = { id: createId('contribution'), status: 'À relire', ...request.body }
  store.contributions.push(contribution)
  response.status(201).json(contribution)
})
app.patch('/api/contributions/:id/status', requireAdmin, (request, response) => {
  const contribution = store.contributions.find((item) => item.id === request.params.id)
  if (!contribution) return response.status(404).json({ message: 'Contribution introuvable.' })
  contribution.status = request.body.status
  response.json(contribution)
})
app.put('/api/contributions/:id', requireAdmin, (request, response) => {
  const index = store.contributions.findIndex((item) => item.id === request.params.id)
  if (index === -1) return response.status(404).json({ message: 'Contribution introuvable.' })
  store.contributions[index] = { ...store.contributions[index], ...request.body, id: request.params.id }
  response.json(store.contributions[index])
})
app.delete('/api/contributions/:id', requireAdmin, (request, response) => {
  const index = store.contributions.findIndex((item) => item.id === request.params.id)
  if (index === -1) return response.status(404).json({ message: 'Contribution introuvable.' })
  const [deletedContribution] = store.contributions.splice(index, 1)
  response.json(deletedContribution)
})

app.get('/api/contributors', (_request, response) => response.json(store.contributors))
app.use((_request, response) => response.status(404).json({ message: 'Route introuvable.' }))

app.listen(port, () => console.log(`CulVite backend listening on http://localhost:${port}`))
