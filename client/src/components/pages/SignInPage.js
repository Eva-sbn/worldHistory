import React, { useState } from 'react'
import { Avatar, Button, Container, CssBaseline, Grid, makeStyles, TextField, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { doLogin } from '../../redux/features/users';
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

function SignInPage () {
  const { error, token } = useSelector(state => state.users)
  const dispatch = useDispatch()
  const classes = useStyles();
  const [login, setLogin] = useState("")
  const [password,setPassword] = useState("")
  const history = useHistory()



  const handleReadLogin = (e) => {
    setLogin(e.target.value)
  }
  const handleReadPassword = (e) => {
    setPassword(e.target.value)
  }

  const showHomePage = () => {
    dispatch(doLogin(login, password))
  }

  if(token) {
    history.push("/")
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
            <p style={{fontSize: "20px", color: "red", marginTop: "15px"}}>{error}</p>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => showHomePage()}
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