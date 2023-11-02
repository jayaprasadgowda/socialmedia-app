import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Card } from "@mui/material";
import FileBase from 'react-file-base64';
import { useDispatch } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { styled } from "@mui/material/styles";

const useStyles = styled((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    transition: "0.3s",
    '&:hover': {
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    },
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginBottom: 10,
  },
}));

const FullForm = ({ currentId, setCurrentId }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [postData, setPostData] = useState({
    creator: '',
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  });
  const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      dispatch(createPost(postData));
    }
    clear();
  }

  const clear = () => {
    setCurrentId(null);
    setPostData({
      creator: '',
      title: '',
      message: '',
      tags: '',
      selectedFile: ''
    })
  };

  return (
    <Card
    className={classes.paper}
    elevation={3}
    style={{
      backgroundColor: '#f0f0f0', 
      borderRadius: '10px',      
      padding: '20px',           
      border: '2px solid #ccc', 
    }}
  >
     <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit} style={{ margin: '0 auto', maxWidth: '90%' }}>
      <Typography variant="h6" style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '20px' }}>
  {currentId ? 'Editing' : 'Creating'} a Memory
</Typography>

        <TextField
          name="creator"
          variant="outlined"
          label="Name"
          fullWidth
          value={postData.creator}
          onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
          style={{ marginBottom: "4px" }}
        />
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
          style={{ marginBottom: "4px" }}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) => setPostData({ ...postData, message: e.target.value })}
          style={{ marginBottom: "4px" }}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
          style={{ marginBottom: "14px" }}
        />
        <div className={classes.fileInput} style={{ marginBottom: "14px" }} >
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
            style={{ marginBottom: "4px" }}
          />
        </div>
        <div style={{ display: 'flex', marginBottom: "18px", justifyContent: 'space-between' }}>
  <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>
    Submit
  </Button>
  <Button style={{ marginLeft: '8px' }} variant="contained" color="secondary" size="small" onClick={clear} fullWidth>
    Clear
  </Button>
</div>


      </form>
    </Card>
  );
};

export default FullForm;
