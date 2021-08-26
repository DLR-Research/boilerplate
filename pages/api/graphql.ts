import { graphqlHTTP } from 'express-graphql'
import schema from '../../schema/schema'
import context from '../../db/context'

export default graphqlHTTP({ schema, graphiql: true, context })
