/** @jsxImportSource @emotion/react */
import { useState, useEffect, useRef } from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { PlusIcon, XIcon, CheckIcon } from '@heroicons/react/solid'
import { Row, Column, Cell, weight } from '../components/flex'
import cuid from 'cuid'
import Head from 'next/head'
import { TodoItem } from '../types/todo'
import { useQuery, useMutation } from 'urql'

const TodosQuery = `
  query {
    todos {
      id,
      title,
      completed
    }
  }
`

const CreateTodo = `
  mutation ($title: String!) {
    createTodo (title: $title) {
      id,
      title,
      completed
    }
  }
`

const UpdateTodo = `
  mutation ($id: ID!, $title: String, $completed: Boolean) {
    updateTodo (id: $id, title: $title, completed: $completed) {
      id,
      title,
      completed
    }
  }
`

const DeleteTodo = `
  mutation ($id: ID!) {
    deleteTodo (id: $id) {
      id,
      title,
      completed
    }
  }
`

interface IconContainerProps {
  hoverColor: string
}

interface TodoItemProps {
  todo: TodoItem
  onDelete: () => void
  onToggleComplete: () => void
}

const TodoAppContainer = styled.div`
font-family: 'Fira Code';

input {
  font-family: 'Fira Code';
}

width: 800px;
margin-top: 8rem;
`

const TitleInput = styled.input`
font-size: 2rem;
border: 0;

&:focus {
  outline: 0;
}

&::placeholder {
  color: #ddd;
}
`

const IconContainer = styled(Row)<IconContainerProps>`
color: #ddd;
width: 2rem;
cursor: pointer;

&:hover {
  color: ${ props => props.hoverColor }
}

transition: .3s;
`

const TodoItemContainer = styled(Row)`
color: #888;
font-size: 2rem;
font-weight: 300;
cursor: pointer;

&:hover {
  color: #aaa;
}
`

function TodoItemComponent(props: TodoItemProps) {
  return (
    <TodoItemContainer>
      <div
        css={ [weight(), props.todo.completed && css`text-decoration: line-through`] }
        className='TodoItemTitle'>
        { props.todo.title }
      </div>
      <IconContainer onClick={ props.onDelete } hoverColor='#f64d4d'>
        <XIcon />
      </IconContainer>
      <IconContainer onClick={ props.onToggleComplete } hoverColor='#54df8f'>
        <CheckIcon />
      </IconContainer>
    </TodoItemContainer>
  )
}

export default function TodoApp(): JSX.Element {
  const title_ref = useRef<HTMLInputElement>(null)

  const [new_todo_title, set_new_todo_title] = useState('')

  useEffect(() => {
    if (title_ref != null && title_ref.current != null) {
      title_ref.current.focus()
    }
  }, [title_ref])

  const [todosQueryResult, reexecTodosQuery] = useQuery({
    query: TodosQuery
  })

  const [createTodoResult, createTodo] = useMutation(CreateTodo)
  const [updateTodoResult, updateTodo] = useMutation(UpdateTodo)
  const [deleteTodoResult, deleteTodo] = useMutation(DeleteTodo)

  if (todosQueryResult.fetching) return <p>Loading...</p>;
  if (todosQueryResult.error) return <p>Oh no... {todosQueryResult.error.message}</p>;

  const todos: TodoItem[] = todosQueryResult.data.todos

  function add_new_todo() {
    if (new_todo_title === '') return

    set_new_todo_title('')
    createTodo({ title: new_todo_title })
  }

  function title_input_keypress(e: React.KeyboardEvent) {
    if (e.keyCode === 13) {
      add_new_todo()
    }
  }

  function handleToggleDelete(t: TodoItem) {
    deleteTodo({ id: t.id })
  }

  function handleToggleComplete(t: TodoItem) {
    updateTodo({ id: t.id, completed: !t.completed })
  }

  return (
    <div>
      <Head>
        <title>DeSci &middot; Todo</title>
      </Head>
      <Row justify='center'>
      <TodoAppContainer>
          <Row>
            <TitleInput className='TitleInput'
              value={ new_todo_title }
              onChange={ e => set_new_todo_title(e.target.value) }
              onKeyDown={ title_input_keypress }
              ref={ title_ref }
              css={ weight() }
              placeholder='I have to do...' />
            <IconContainer onClick={ add_new_todo } align='center' hoverColor='#33a9ee'>
              <PlusIcon />
            </IconContainer>
          </Row>
          <div id='TodoList'>
            { todos.map(t => <TodoItemComponent todo={ t } key={ t.id } onDelete={ () => handleToggleDelete(t) } onToggleComplete={ () => handleToggleComplete(t) } />) }
          </div>
      </TodoAppContainer>
      </Row>
    </div>
  )
}

