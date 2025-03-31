import Post from "../Post/Post";
import './styles.css';

const Feed = ({ posts, isOwner, onEdit, onDelete }) => {
  return (
    <>
      {posts.map((post) => (
        <Post 
            key={post.id} 
            post={post} 
            isOwner={isOwner}
            onEdit={onEdit}
            onDelete={onDelete}
        />
      ))}
    </>
  );
};

export default Feed;