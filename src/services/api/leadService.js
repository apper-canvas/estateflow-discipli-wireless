import leadData from '../mockData/leads.json'

let leads = [...leadData]

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const leadService = {
  async getAll() {
    await delay(300)
    return [...leads]
  },

  async getById(id) {
    await delay(200)
    const lead = leads.find(l => l.id === id)
    return lead ? { ...lead } : null
  },

  async create(leadData) {
    await delay(400)
    const newLead = {
      id: Date.now().toString(),
      ...leadData,
      createdAt: new Date().toISOString(),
      lastContact: new Date().toISOString()
    }
    leads.push(newLead)
    return { ...newLead }
  },

  async update(id, updates) {
    await delay(300)
    const index = leads.findIndex(l => l.id === id)
    if (index === -1) throw new Error('Lead not found')
    
    leads[index] = { ...leads[index], ...updates }
    return { ...leads[index] }
  },

  async delete(id) {
    await delay(250)
    const index = leads.findIndex(l => l.id === id)
    if (index === -1) throw new Error('Lead not found')
    
    const deleted = leads.splice(index, 1)[0]
    return { ...deleted }
  }
}