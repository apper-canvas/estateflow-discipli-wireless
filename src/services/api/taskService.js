import taskData from '../mockData/tasks.json'

let tasks = [...taskData]

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const taskService = {
  async getAll() {
    await delay(250)
    return [...tasks]
  },

  async getById(id) {
    await delay(200)
    const task = tasks.find(t => t.id === id)
    return task ? { ...task } : null
  },

  async create(taskData) {
    await delay(350)
    const newTask = {
      id: Date.now().toString(),
      ...taskData,
      completed: false
    }
    tasks.push(newTask)
    return { ...newTask }
  },

  async update(id, updates) {
    await delay(300)
    const index = tasks.findIndex(t => t.id === id)
    if (index === -1) throw new Error('Task not found')
    
    tasks[index] = { ...tasks[index], ...updates }
    return { ...tasks[index] }
  },

  async delete(id) {
    await delay(250)
    const index = tasks.findIndex(t => t.id === id)
    if (index === -1) throw new Error('Task not found')
    
    const deleted = tasks.splice(index, 1)[0]
    return { ...deleted }
  }
}