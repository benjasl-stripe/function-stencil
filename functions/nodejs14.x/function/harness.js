// Mock event

const environmentVars = require('./env.json')
process.env.localTest = true

// Lambda handler
const { handler } = require('./app')
const main = async () => {
  console.time('localTest')
  console.dir(await handler({"anything":"here"}))
  console.timeEnd('localTest')
}
main().catch(error => console.error(error))