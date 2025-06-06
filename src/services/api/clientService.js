import clientData from '../mockData/clients.json'

let clients = [...clientData]

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const clientService = {
  async getAll() {
    await delay(280)
    return [...clients]
  },

  async getById(id) {
    await delay(200)
    const client = clients.find(c => c.id === id)
    return client ? { ...client } : null
  },

  async create(clientData) {
    await delay(400)
    const newClient = {
      id: Date.now().toString(),
      ...clientData,
      viewedProperties: [],
      favoriteProperties: []
    }
    clients.push(newClient)
    return { ...newClient }
  },

  async update(id, updates) {
    await delay(300)
    const index = clients.findIndex(c => c.id === id)
    if (index === -1) throw new Error('Client not found')
    
    clients[index] = { ...clients[index], ...updates }
    return { ...clients[index] }
  },

  async delete(id) {
    await delay(250)
    const index = clients.findIndex(c => c.id === id)
    if (index === -1) throw new Error('Client not found')
    
    const deleted = clients.splice(index, 1)[0]
    return { ...deleted }
  }
}