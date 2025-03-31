import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import './styles.css';

const NewPost = () => {
    const { user } = useAuth();
    const [content, setContent] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5108/api/Posts", {
                method: "POST",
                credentials: "include",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({
                content: content,
                createdAt: new Date().toISOString(),
                userId: user.user.id
                }),
            });
            if (!response.ok) {
                throw new Error("Error at creating a new post.");
            }
            setContent("");
            navigate("/home");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <main className="NewPost">
            <h1>Create a new post</h1>
            <form className="newPostForm" onSubmit={handleSubmit}>
                <textarea
                id="postContent"
                required
                value={content}
                placeholder="Content"
                onChange={(e) => setContent(e.target.value)}
                />
                <button type="submit">Submit</button>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </main>
    );
};

export default NewPost;