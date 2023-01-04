import { useEffect, useState } from 'react';

function useCachePost() {

    const [post, setPost] = useState(null);
    const [posts, setPosts] = useState(() => {
        return JSON.parse(localStorage.getItem('posts') ?? '[]');
    });

    useEffect(() => {
        if (!post) return;
        const existPost = posts.find(p => p.id === post.id);
        if (existPost) return;
        posts.push(post);
        setPosts(preState => {
            preState.push(post);
            return [...preState];
        });
    }, [post]);

    useEffect(() => {
        const _posts = [...new Map(posts.map(item => [item.id, item])).values()];
        localStorage.setItem('posts', JSON.stringify(_posts));
    }, [posts])

    return {
        posts,
        addPost: setPost,
    }

}

export default useCachePost;