import koa from 'koa'
import koaRouter from 'koa-router'
import koaBody from 'koa-bodyparser'
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa'

import prepareSchema from './prepareSchema'

const main = async () => {
    const schema = await prepareSchema()
    const app = new koa()
    const router = new koaRouter()
    const { PORT = 3001 } = process.env
    
    app.use(koaBody())
    
    router.post('/graphql', graphqlKoa({ schema }))
    router.get('/graphql', graphqlKoa({ schema }))
    if (process.env.NODE_ENV !== 'production') router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }))
    
    app.use(router.routes())
    app.use(router.allowedMethods())
    app.listen(PORT)
}

export default main