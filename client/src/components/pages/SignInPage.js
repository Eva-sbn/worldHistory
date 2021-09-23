import React, { useState } from 'react'
import { Avatar, Button, Container, CssBaseline, Grid, makeStyles, TextField, Typography } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { doLogin } from '../../redux/features/users';




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

function SignInPage () {
  const dispatch = useDispatch()
  const classes = useStyles();
  const [login, setLogin] = useState("")
  const [password,setPassword] = useState("")



  const handleReadLogin = (e) => {
    setLogin(e.target.value)
  }
  const handleReadPassword = (e) => {
    setPassword(e.target.value)
  }


  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>

          </Avatar>
          <Typography component="h1" variant="h5">
            Войти
          </Typography>
          <form onSubmit={(e) => e.preventDefault()}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleReadLogin}
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
                  onChange={handleReadPassword}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => dispatch(doLogin(login, password))}
            >
              Войти
            </Button>
          </form>
        </div>
      </Container>
    </div>
  )
}

export default SignInPage