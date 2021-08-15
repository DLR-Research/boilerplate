/** @jsxImportSource @emotion/react */
import { useState, useEffect, useRef } from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { PlusIcon, XIcon, CheckIcon } from '@heroicons/react/solid'
import { Row, Column, Cell, weight } from '../components/flex'
import cuid from 'cuid'

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

interface IconContainerProps {
  hoverColor: string
}

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

type TodoItem = {
  title: string
  completed: boolean
}

interface TodoItemProps {
  todo: TodoItem
  onDelete: () => void
  onToggleComplete: () => void
}

function TodoItemComponent(props: TodoItemProps) {
  return (
    <TodoItemContainer>
      <div css={ [weight(), props.todo.completed && css`text-decoration: line-through`] }>
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

const initial_todos = [
  { title: 'laundry', completed: false, id: cuid() },
  { title: 'run 5k', completed: true, id: cuid() },
  { title: 'marinate ribs', completed: false, id: cuid() }
]

export default function TodoApp(): JSX.Element {
  const title_ref = useRef<HTMLInputElement>(null)

  const [todos, set_todos] = useState(initial_todos)
  const [new_todo_title, set_new_todo_title] = useState('')

  useEffect(() => {
    if (title_ref != null && title_ref.current != null) {
      title_ref.current.focus()
    }
  }, [title_ref])

  function add_new_todo() {
    if (new_todo_title === '') return

    const new_todo = {
      title: new_todo_title,
      completed: false,
      id: cuid()
    }

    set_new_todo_title('')
    set_todos([new_todo, ...todos])
  }

  function title_input_keypress(e: React.KeyboardEvent) {
    if (e.keyCode === 13) {
      add_new_todo()
    }
  }

  function handle_delete_todo(id: string) {
    set_todos(todos.filter(t => t.id !== id))
  }

  function handle_toggle_complete_todo(id: string) {
    set_todos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  return (
    <Row justify='center'>
      <TodoAppContainer>
        <Row>
          <TitleInput
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
        { todos.map(t => <TodoItemComponent todo={ t } key={ t.id } onDelete={ () => handle_delete_todo(t.id) } onToggleComplete={ () => handle_toggle_complete_todo(t.id) } />) }
      </TodoAppContainer>
    </Row>
  )
}

