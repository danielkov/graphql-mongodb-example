import { readFile } from 'fs'
import { join, dirname } from 'path'

const importGql = (path) => new Promise((resolve, reject) => readFile(join(dirname(require.main.filename), path + '.graphql'), 'utf8', (err, data) => err ? reject(err) : resolve(data)))

export default importGql

