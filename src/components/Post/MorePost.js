import useSearchPost from "../../hooks/useSearchPost";
import PostList from "../core/PostList";

function MorePost() {

    const search = useSearchPost('findAll');

    return (
        <PostList 
            { ...search }  
            title='Cho thuê nhà đất trên toàn quốc' 
        />
    )
}

export default MorePost;