import React from "react";
import { Card, CardMedia, CardActions, CardContent, Button, Typography } from "@mui/material";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import useStyles from './styles'; // Import your makeStyles styles
import moment from 'moment';

const VideoPlayer = ({ selectedFile }) => {
    return (
        <div style={{ width: '100%', height: '0', paddingBottom: '56.25%', position: 'relative' }}>
            <video
                controls
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                }}
            >
                <source src={selectedFile} type="video/mp4" />
                <p style={{ color: 'red' }}>Your browser does not support the video tag.</p>
            </video>
        </div>
    );
};

const Post = ({ post, handleLike, handleDelete, setCurrentId }) => {
    const classes = useStyles(); // Apply the styles

    

    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.media}
                title={post.title}
                style={{ position: 'relative' }}
            >
                {post.selectedFile.startsWith("data:image/") ? (
                    <div style={{ position: 'relative' }}>
                        <img
                            src={post.selectedFile}
                            alt={post.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
          <div style={{ position: 'relative', textAlign: 'center', background: 'white', padding: '10px' }}>
  <Typography variant="h6" className={classes.titleText} style={{ fontFamily: 'Montserrat, sans-serif' }}>
    <b> @{post.creator}</b>
  </Typography>







                            {/* <Button style={{ position: 'absolute', top: '05px', left: '220px', padding: '5px', borderRadius: '5px', background: 'rgba(0, 0, 0, 0.6)' }}
 size="big" onClick={() => setCurrentId(post._id)}>
    <MoreHorizIcon fontSize="default" />
</Button> */}
                        </div>
                    </div>
                ) : post.selectedFile.startsWith("data:video/") ? (
                    <VideoPlayer selectedFile={post.selectedFile} />
                ) : (
                    <p>Unsupported media format</p>
                )}
            </CardMedia>

            <div className={classes.overlay}>
                <Typography variant="h6">{post.title}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
           

            </div>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">
                    {post.tags.map((tag) => `#${tag} `)}
                </Typography>
            </div>
            <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={() => handleLike(post._id)}>
                    <ThumbUpAltIcon fontSize="small" />
                    Like
                    {post.likeCount}
                </Button>
                {/* <Button size="small" color="primary" onClick={() => handleDelete(post._id)}>
                    <DeleteIcon fontSize="small" style={{marginLeft:'270px'}} />
                    Delete
                </Button> */}
            </CardActions>
        </Card>
    );
}

export default Post;
