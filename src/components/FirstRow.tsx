import DeleteIcon from '@mui/icons-material/Delete'
import { Button } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import { useContext } from 'react'
import { TodosContext } from '../TodosContextProvider'
import { Todo } from '../types'
import './FirstRow.css'


export const FirstRow = ({ id, task, isCompleted }: Todo) => {
  const { handleCheckTodo, handleDeleteTodo } = useContext(TodosContext)

  return (
    <div className='container'>
      <div className='row'>
        <p className='task-name'>{task}</p>

        <div>
          <Checkbox
            checked={isCompleted}
            onChange={() => handleCheckTodo(id)}
            inputProps={{ 'aria-label': 'controlled' }}
          />

          <Button
            onClick={() => handleDeleteTodo(id)}
            variant='outlined'
            startIcon={<DeleteIcon />}
            size='small'
            color='error'
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}
