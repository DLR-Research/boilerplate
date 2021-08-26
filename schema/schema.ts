import { createTypesFactory, buildGraphQLSchema } from 'gqtx'
import cuid from 'cuid'
import { TodoItem } from '../types/todo'

type AppContext = {
  todos: TodoItem[]
}

const t = createTypesFactory<AppContext>()

const TodoItemType = t.objectType<TodoItem>({
  name: 'TodoItem',
  description: 'A todo item',
  fields: () => [
    t.field({ name: 'id', type: t.NonNull(t.ID) }),
    t.field({ name: 'title', type: t.NonNull(t.String) }),
    t.field({ name: 'completed', type: t.NonNull(t.Boolean) })
  ]
})

const Query = t.queryType({
  fields: () => [
    t.field({
      name: 'todoById',
      type: TodoItemType,
      args: {
        id: t.arg(t.NonNullInput(t.ID))
      },
      resolve: (_, args, ctx) => {
        const user = ctx.todos.find(u => u.id === args.id)
        return user || null
      }
    }),
    t.field({
      name: 'todos',
      type: t.List(TodoItemType),
      resolve: (_, args, ctx) => ctx.todos
    })
  ]
})

const Mutation = t.mutationType({
  fields: () => [
    t.field({
      name: 'createTodo',
      type: TodoItemType,
      args: {
        title: t.arg(t.NonNullInput(t.String))
      },
      resolve: (_, args, ctx) => {
        const new_todo = {
          title: args.title,
          completed: false,
          id: cuid()
        }
        ctx.todos.unshift(new_todo)
        return new_todo
      }
    }),
    t.field({
      name: 'updateTodo',
      type: TodoItemType,
      args: {
        id: t.arg(t.NonNullInput(t.ID)),
        title: t.arg(t.String),
        completed: t.arg(t.Boolean)
      },
      resolve: (_, args, ctx) => {
        const t = ctx.todos.find(t => t.id === args.id)

        if (t == null) return null

        if (args.title != null) t.title = args.title
        if (args.completed != null) t.completed = args.completed

        return t
      }
    }),
    t.field({
      name: 'deleteTodo',
      type: TodoItemType,
      args: {
        id: t.arg(t.NonNullInput(t.ID))
      },
      resolve: (_, args, ctx) => {
        const t = ctx.todos.find(t => t.id === args.id)
        ctx.todos = ctx.todos.filter(t => t.id !== args.id)
        return t
      }
    })
  ]
})

export default buildGraphQLSchema({
  query: Query,
  mutation: Mutation
})

