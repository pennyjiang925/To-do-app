import  { useState } from 'react'
import axios from 'axios'
import { TextField, Button, Snackbar, Alert } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import './login.css'

const LoginForm = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')

  const login = async () => {
    const data = {
      email: email,
      password: password
    }
    await axios
      .post('https://api-nodejs-todolist.herokuapp.com/user/login', data)
      .then(res => {
        localStorage.setItem('token', res.data.token)
        navigate('/')
      })
      .catch(() => {
        setOpen(true)
        setMessage('The user name or password is incorrect')
      })
  }

  return (
    <div className='login'>
      <div className='wrap'>
        <h2 className='title'>Login Page</h2>
        <TextField
          fullWidth
          label='email'
          type='text'
          onChange={e => setEmail(e.target.value)}
          className='form-control'
        />
        <br />
        <TextField
          fullWidth
          type='password'
          label='password'
          onChange={e => setPassword(e.target.value)}
          className='form-control'
        />
        <br />
        <Button onClick={login} fullWidth variant='contained'>
          Login
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

export default LoginForm
