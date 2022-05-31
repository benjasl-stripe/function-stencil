const Table = require('cli-table')


const table = new Table({
  head: ['name', 'url'],
  style: {
    head: ['green']
  }
})

function showTable (tempList) {
  const list = Object.keys(tempList)
  if (list.length > 0) {
    list.forEach((key) => {
      table.push([key, tempList[key]])
      if (table.length === list.length) {
        console.log(table.toString())
        process.exit()
      }
    })
  } else {
    console.log(table.toString())
    process.exit()
  }
}

exports.showTable = showTable
