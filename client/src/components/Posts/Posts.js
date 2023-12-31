import React from "react";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import Post from './Post/Post';

const useStyles = styled((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: 'center',
  },
}));

const Posts = ({setCurrentId}) => {
    const posts = useSelector((state) => state.posts);
    const classes = useStyles();

    return (
        !posts.length ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {posts.map((post) => ( 
                    <Grid key={post.id} item xs={12} sm={6}>
                        <Post post={post} setCurrentId={setCurrentId} /> 
                    </Grid>
                ))}
            </Grid>
        )
    );
}

export default Posts;
