import {
  makeStyles,
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Theme,
  AppBar,
  Toolbar,
  Avatar,
} from '@material-ui/core';
import { AddCircleOutlineOutlined, SubjectOutlined } from '@material-ui/icons';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { format } from 'date-fns';

type LayoutProps = {
  children: React.ReactNode;
};

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
  /**
   * here we specify a display of flex to counter that the drawer is on top of the content,
   * by specifying display flex, we distribute the space and make the drawer on the left, and content on the right without overlapping
   */
  root: {
    display: 'flex',
  },
  page: {
    background: '#f9f9f9',
    width: '100%',
    padding: theme.spacing(3),
  },
  drawer: {
    width: drawerWidth,
  },
  /**
   * drawerWrapper is used to overwrite the class of 'paper' for the drawer,
   * Since we specifiy the 'drawer' width = drawerWidth, the 'paper' for the drawer is still small,
   * therefore this class is needed to push it.
   */
  drawerPaper: {
    width: drawerWidth,
  },
  /**
   * Active classes for the background of 'ListItem'
   */
  active: {
    background: '#f4f4f4',
  },
  title: {
    padding: theme.spacing(2),
  },
  appbar: {
    width: `calc(100% - ${drawerWidth}px)`,
  },
  toolbar: theme.mixins.toolbar, // this is used to push the content down below the toolbar
  date: {
    flexGrow: 1,
  },
  avatar: {
    marginLeft: theme.spacing(2),
  },
}));

export const Layout = ({ children }: LayoutProps): JSX.Element => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  // listItem
  const menuItems = [
    {
      text: 'My Notes',
      icon: <SubjectOutlined color="secondary" />,
      path: '/',
    },
    {
      text: 'Create Note',
      icon: <AddCircleOutlineOutlined color="secondary" />,
      path: '/create',
    },
  ];

  return (
    <div className={classes.root}>
      {/* AppBar */}
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar>
          <Typography className={classes.date}>
            Today is the {format(new Date(), 'do MMMM Y')}
          </Typography>
          <Typography>SusuMantan</Typography>
          <Avatar className={classes.avatar} src="/avatar.png" />
        </Toolbar>
      </AppBar>

      {/* Side drawer */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div>
          <Typography className={classes.title} variant="h5">
            {`<Icon /> Notes`}
          </Typography>
        </div>

        {/* list / links */}
        <List>
          {menuItems.map((item) => (
            <ListItem
              button // this is used to create hover effect like a button
              key={item.text}
              onClick={() => history.push(item.path)}
              className={
                location.pathname === item.path ? classes.active : null
              }
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <div className={classes.page}>
        <div className={classes.toolbar} />
        {children}
      </div>
    </div>
  );
};
