import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import { Grid } from '@mui/material';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import Grow from '@mui/material/Grow';
import './styles.css';

import { getPosts } from './actions/posts';
import { useDispatch } from 'react-redux';
import memories from './images/memories.png'
import insta from './images/insta.png';

const App = () => {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Container maxWidth="lg">
      <AppBar className="appBar" position="static" color="inherit">
        <img src={insta} alt="insta" height="30" className="leftImage" />
        <span className="rightText">ka70_red_fevrr</span>
        <img src={memories} alt="memories" height="140" width="460" className="centerImage" />
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
