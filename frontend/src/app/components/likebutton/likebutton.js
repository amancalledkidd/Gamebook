import React, { useState, useEffect } from "react";
import styles from './likebutton.module.css'
import { ReactComponent as RedHeartIcon } from '../../../images/red-heart.svg';
import { ReactComponent as BlackHeartIcon } from '../../../images/heart.svg';

const LikeButton = ({ post, token, setToken }) => {
    const [likes, setLikes] = useState(post.likes);
    const [liked, setLiked] = useState(false);


    const handleLike = async (event) => {
        event.preventDefault();

        if (token && !liked) {
            fetch("/posts/" + post._id + "/like", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => {
                    // Check the response status code
                    if (response.status === 201) {
                        console.log("Post liked successfully");
                    } else {
                        console.log("Post not liked");
                    }
                    return response.json(); // Parse the response as JSON
                })
                .then(async (data) => {
                    window.localStorage.setItem("token", data.token);
                    setToken(data.token); // Update the token using setToken
                    setLikes(data.likes);
                    setLiked(true);
                })
                .catch((error) => {
                    console.error("Error submitting post:", error);
                });
        } else if (token && liked) {
            fetch("/posts/" + post._id + "/unlike", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => {
                    // Check the response status code
                    if (response.status === 201) {
                        console.log("Post unliked successfully");
                    } else {
                        console.log("Post not unliked");
                    }
                    return response.json(); // Parse the response as JSON
                })
                .then(async (data) => {
                    window.localStorage.setItem("token", data.token);
                    setToken(data.token); // Update the token using setToken
                    setLikes(data.likes);
                    setLiked(false);
                })
                .catch((error) => {
                    console.error("Error submitting post:", error);
                });
            }
    }

    return (
        <div id='like-container' className={"like-container"}>
    <button id='like-button' className={styles.likeButton} onClick={handleLike}>
        {liked ? (
            <RedHeartIcon className={styles.redheartbutton} />
        ) : (
            <BlackHeartIcon />
        )}
    </button>
</div>

    );
}

export default LikeButton;