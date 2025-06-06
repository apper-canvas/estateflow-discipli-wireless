import propertyData from '../mockData/properties.json'

let properties = [...propertyData]

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const propertyService = {
  async getAll() {
    await delay(350)
    return [...properties]
  },

  async getById(id) {
    await delay(200)
    const property = properties.find(p => p.id === id)
    return property ? { ...property } : null
  },

  async create(propertyData) {
    await delay(450)
    const newProperty = {
      id: Date.now().toString(),
      ...propertyData,
      listingDate: new Date().toISOString()
    }
    properties.push(newProperty)
    return { ...newProperty }
  },

  async update(id, updates) {
    await delay(300)
    const index = properties.findIndex(p => p.id === id)
    if (index === -1) throw new Error('Property not found')
    
    properties[index] = { ...properties[index], ...updates }
    return { ...properties[index] }
  },

  async delete(id) {
    await delay(250)
    const index = properties.findIndex(p => p.id === id)
    if (index === -1) throw new Error('Property not found')
    
    const deleted = properties.splice(index, 1)[0]
    return { ...deleted }
  }
}