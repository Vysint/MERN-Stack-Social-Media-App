import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";

import "./Posts.css";
import { getTimelinePosts } from "../../actions/postAction";
const Posts = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);
  const params = useParams();

  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, [dispatch, user._id]);
  if (!posts) return "no posts";
  if (params.id) posts = posts.filter((post) => post.userId === params.id);
  return (
    <div className="Posts">
      {loading
        ? "Fetching Posts...."
        : posts.map((post, id) => {
            return <Post data={post} id={id} />;
          })}
    </div>
  );
};

export default Posts;
