import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { makeStyles} from "@material-ui/core";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    appbar:{
        backgroundColor:"#90EE90"
    },
    link: {
       textDecoration: "none",
       color: "#000",

    }
}))

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

function Header () {
    const data = useSelector(state => state.users.data)
    const dispatch = useDispatch()



    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };


    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const clearDataUser = () => {
        localStorage.clear()
        dispatch(({type: "clear/user/rejected"}))
    }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
          {data ?
            <MenuItem className={classes.link} onClick={clearDataUser}>
                Выйти
            </MenuItem> :
            <>
            <MenuItem>
                <Link className={classes.link} to={"/authorization"}>Регистрация</Link>
            </MenuItem>

              <MenuItem>
              <Link className={classes.link} to={"/login"}>Войти</Link>
              </MenuItem>
            </>
          }
          {/*<MenuItem onClick={handleMenuClose}>Мои данные</MenuItem>*/}

      </Menu>
    );

    return (
      <Box sx={{ flexGrow: 1 }} >
          <Box
            className={classes.appbar}
          >
              <Toolbar >
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ display: { xs: 'none', sm: 'block' } }}
                  >
                      История Грозного
                  </Typography>
                  <Search>
                      <SearchIconWrapper>
                          <SearchIcon />
                      </SearchIconWrapper>
                      <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                      />
                  </Search>
                  <Box sx={{ flexGrow: 1 }} />
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ display: { xs: 'none', sm: 'block' } }}
                  >
                      {data ? `${data.firstName} ${data.lastName}` : "Войдите в систему"}
                  </Typography>
                  <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                      <IconButton
                        size="large"
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                        color="inherit"
                      >
                          <AccountCircle />
                      </IconButton>
                  </Box>
              </Toolbar>
          </Box>
          {renderMenu}
      </Box>
    );
}

export default Header