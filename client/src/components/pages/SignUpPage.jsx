import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  makeStyles,
  TextField,
  Typography
} from '@material-ui/core'
import { auth } from '../../redux/features/users';
import { useHistory } from "react-router-dom"



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignUpPage (props) {
  const classes = useStyles();
  const error = useSelector(state => state.users.error)
  const dispatch = useDispatch()
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const history = useHistory()


  const showHomePage = () => {
    dispatch(auth(firstName, lastName, login, password))
    if(error) {
      history.push("/")
    }
  }




  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Регистрация
          </Typography>
          <form onSubmit={(e) => e.preventDefault()}
                className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Login / Email"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setLogin(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            {!error ? "" : error.map((item) => {
              return (
                <p style={{fontSize: "18px", color: "red"}}>{item.msg}</p>
              )
            })}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => showHomePage()}
            >
              Зарегистрироваться
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Уже есть аккаунт? Войти
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  )
}

export default SignUpPage