import interactionData from '../mockData/interactions.json'

let interactions = [...interactionData]

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const interactionService = {
  async getAll() {
    await delay(300)
    return [...interactions]
  },

  async getById(id) {
    await delay(200)
    const interaction = interactions.find(i => i.id === id)
    return interaction ? { ...interaction } : null
  },

  async create(interactionData) {
    await delay(400)
    const newInteraction = {
      id: Date.now().toString(),
      ...interactionData,
      date: new Date().toISOString()
    }
    interactions.push(newInteraction)
    return { ...newInteraction }
  },

  async update(id, updates) {
    await delay(300)
    const index = interactions.findIndex(i => i.id === id)
    if (index === -1) throw new Error('Interaction not found')
    
    interactions[index] = { ...interactions[index], ...updates }
    return { ...interactions[index] }
  },

  async delete(id) {
    await delay(250)
    const index = interactions.findIndex(i => i.id === id)
    if (index === -1) throw new Error('Interaction not found')
    
    const deleted = interactions.splice(index, 1)[0]
    return { ...deleted }
  }
}