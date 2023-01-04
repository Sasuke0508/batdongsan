import React from "react";
import useSearchPost from "../../hooks/useSearchPost";
import PostList from "../core/PostList";

function PostSaved(props) {
    
    const search = useSearchPost('favouritePost');

    return (
        <PostList 
            { ...search }  
            title='Danh sách yêu thích' 
        />
    )
}

export default PostSaved;
