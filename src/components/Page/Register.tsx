import { useState } from 'react'
import axios from 'axios'
import { TextField, Button, Snackbar, Alert } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import './register.css'

const Register = () => {
  const navigate = useNavigate()

  const [info, setInfo] = useState<{ name: string; email: string; password: string; age: number }>({
    name: '',
    email: '',
    password: '',
    age: 0
  })

  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')

  const Register = async () => {
    await axios
      .post('https://api-nodejs-todolist.herokuapp.com/user/register',info)
      .then(res => {
        localStorage.setItem('token', res.data.token)
        navigate('/')
      })
      .catch(() => {
        setOpen(true)
        setMessage('Register failed')
      })
  }

  return (
    <div className='register'>
      <div className='wrap'>
        <h2 className='title'>Register Page</h2>
        <TextField
          fullWidth
          label='name'
          type='text'
          onChange={e => setInfo({ ...info, name: e.target.value })}
          className='form-control'
        />

        <TextField
          fullWidth
          type='email'
          label='email'
          onChange={e => setInfo({ ...info, email: e.target.value })}
          className='form-control'
        />

        <TextField
          fullWidth
          type='password'
          label='password'
          onChange={e => setInfo({ ...info, password: e.target.value })}
          className='form-control'
        />

        <TextField
          fullWidth
          type='number'
          label='age'
          onChange={e => setInfo({ ...info, age: Number(e.target.value) })}
          className='form-control'
        />

        <Button onClick={Register} fullWidth variant='contained'>
          Register
        </Button>

        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={open}
          message={message}
        >
          <Alert severity='error'>{message}</Alert>
        </Snackbar>
      </div>
    </div>
  )
}

export default Register
