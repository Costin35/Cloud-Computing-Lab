import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useState } from 'react';
import './styles.css';

export default function Post({ post, isOwner, onEdit, onDelete }) {
  const dateText = new Date(post.createdAt).toLocaleString();

  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content);

  const handleSave = () => {
    onEdit(post.id, editContent);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
    setEditContent(post.content);
  };

  return (
    <article className="post">
      <Link to={`/profile/${post.userId}`} className="postUser">{post.username}</Link>
      <p className="postDate">{dateText}</p>
      <p className="postBody">{post.content}</p>
      {!editing && <p className="postBody">{post.content}</p>}

      {editing && (
        <div className="editArea">
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            rows={3}
            style={{ width: "100%" }}
          />
          <div style={{ marginTop: "0.5rem" }}>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel} style={{ marginLeft: "0.5rem" }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {isOwner && !editing && (
        <div className="postActions">
          <button onClick={() => setEditing(true)} className="editBtn" title="Edit Post">
            <FaEdit />
          </button>
          <button
            onClick={() => onDelete(post.id)}
            className="deleteBtn"
            title="Delete Post"
          >
            <FaTrash />
          </button>
        </div>
      )}
    </article>
  );
}