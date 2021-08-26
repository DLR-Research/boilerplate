import { TodoItem } from '../types/todo'
import cuid from 'cuid'

const todos: TodoItem[] = [
  { title: 'laundry', completed: false, id: cuid() },
  { title: 'run 5k', completed: true, id: cuid() },
  { title: 'marinate ribs', completed: false, id: cuid() }
]

export default {
  todos
}
