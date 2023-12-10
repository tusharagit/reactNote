import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

// Components for different pages
import CreateNote from './component/CreateNote';
import Notes from './component/Notes'; // Assume you have a Notes component
import Profile from './component/Profile'; // Assume you have a Profile component
import Category from './component/Category'; // Assume you have a Category component

import {Amplify} from 'aws-amplify';
import awsExports from './aws-exports';
//import { withAuthenticator } from "aws-amplify-react";
Amplify.configure(awsExports);

function App() {

  const drawerWidth = 240;
  const sideMenuItem = ['Create Note', 'Notes', 'Profile', 'Category'];

  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Function to handle item click
  const handleListItemClick = (event, index, path) => {
    setSelectedIndex(index);
    // Navigation is now handled by <Link> component
  };

  // Paths that will be used in Route components and Links
  const paths = ['/create-note', '/notes', '/profile', '/category'];

  return (
    <Router>
      <div className="App">
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
              <Typography variant="h6" noWrap component="div">
                Clipped drawer
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)' },
            }}
          >
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
              <List id="menuItem">
                {sideMenuItem.map((text, index) => (
                  <ListItem>
                    <Link to={paths[index]} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <ListItemButton>
                        <ListItemIcon>
                          {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItemButton>
                    </Link>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            {/* Define routes here using Routes instead of Switch */}
            <Routes >
              <Route path="/create-note" element={<CreateNote />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/category" element={<Category />} />
              {/* Redirect to /create-note as the default route */}
              <Route path="/" element={<CreateNote />} />
            </Routes>
          </Box>
        </Box>
      </div>
    </Router>
  );
}

export default App;
