import React from 'react';
import PropTypes from 'prop-types';

PostList.propTypes = {
    posts: PropTypes.array,
    loading: PropTypes.bool,
};
PostList.default ={
    posts: [],
    loading: false
}

function PostList(props) {
    const {posts, loading}= props;
    if(loading){
       return <h3 className="text-center">loading...</h3>
    }
    return (
        <>
        
        <ul>
            {posts.map((post, index) => (
                <li key={index}>{post.title}</li>
            ))}
        </ul>
        </>
    );
}

export default PostList;