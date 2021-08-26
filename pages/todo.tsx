import { createClient, Provider } from 'urql'
import TodoApp from '../components/TodoApp'

const client = createClient({
  url: '/api/graphql'
})

export default function(): JSX.Element {
  return (
    <Provider value={ client }>
      <TodoApp />
    </Provider>
  )
}
