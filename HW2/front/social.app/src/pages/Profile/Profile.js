import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Feed from "../../componenets/Feed/Feed";
import './styles.css';

const Profile = () => {
    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [editMode, setEditMode] = useState(false);
    const { userId } = useParams();
    const { user : authUser, logout} = useAuth();
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    const isOwner = authUser?.user?.id === userId || authUser?.id === userId;

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const userRes = await fetch(`http://localhost:5108/api/Users/${userId}`, {
                credentials: "include",
                });
        
                if (!userRes.ok) {
                    throw new Error(`Error fetching user ${userId}: ${userRes.status}`);
                }
        
                const userData = await userRes.json();
                setProfileData(userData);
                
                const postsRes = await fetch(`http://localhost:5108/api/Posts/user/${userId}`, {
                    credentials: "include",
                });
                if (!postsRes.ok) 
                    throw new Error("Error at loading posts");
                const postsData = await postsRes.json();
                setPosts(postsData);
            } catch (err) {
                setError(err.message);
            }
        };
    
        fetchProfile();
    }, [userId]);

    const handleEdit = async (postId, updatedContent) => {
        try{
            const editRes = await fetch(`http://localhost:5108/api/Posts/${postId}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
                body: JSON.stringify({
                    content: updatedContent,
                }),
            });
            if(!editRes.ok){
                throw new Error(`Update failed: ${editRes.status}`);
            }
            setPosts((prevPosts) =>
                prevPosts.map((p) =>
                    p.id === postId ? { ...p, content: updatedContent } : p
                )
            );
        } catch(error){
            console.error(error.message);
        }
    };
    
    const handleDelete = async (postId) => {
        console.log("Delete post", postId);
        try {
            const delRes = await fetch(`http://localhost:5108/api/Posts/${postId}`, {
                method: "DELETE",
                credentials: "include",
            });
            if (!delRes.ok) throw new Error("Failed to delete");
                setPosts((prev) => prev.filter((p) => p.id !== postId));
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleUsernameUpdate = async () => {
        try {
          const res = await fetch(`http://localhost:5108/api/Users/${userId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ 
                username: newUsername,
                email: profileData.email 
             }),
          });
      
          if (!res.ok) throw new Error("Failed to update username");
      
          setEditMode(false);
          window.location.reload();
        } catch (err) {
          console.error(err);
        }
      };
      

    const handleDeleteAccount = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete your account?");
        if (!confirmDelete) return;
    
        try {
          const res = await fetch(`http://localhost:5108/api/Users/${userId}`, {
            method: "DELETE",
            credentials: "include",
          });
    
          if (!res.ok) throw new Error("Account deletion failed");
    
          await logout();
          navigate("/login");
        } catch (error) {
          console.error("Failed to delete account:", error.message);
          alert("Something went wrong when deleting your account.");
        }
    };
    

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }
    if (!profileData) {
        return <p>Loading user profile...</p>;
    }

    return (
        <main>
            <section className="profile-details">
                <p>
                Username:{" "}
                {editMode ? (
                    <>
                    <input
                        type="text"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                    />
                    <button onClick={handleUsernameUpdate}>Save</button>
                    </>
                ) : (
                    <strong>{profileData.username}</strong>
                )}
                </p>
                <p>Email: {profileData.email}</p>
                {isOwner && (
                <>
                    {!editMode && (
                    <button
                        style={{ backgroundColor: "orange", color: "#fff", marginRight: "1rem" }}
                        onClick={() => setEditMode(true)}
                    >
                        Edit Username
                    </button>
                    )}
                    <button style={{ backgroundColor: "red", color: "#fff" }} onClick={handleDeleteAccount}>
                    Delete Account
                    </button>
                </>
                )}
            </section>
            <section>
                {error && <p style={{ color: "red" }}>{error}</p>}
                {posts.length ? 
                <Feed 
                    posts={posts}
                    isOwner={isOwner}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                /> : <p>No posts.</p>}
            </section>
        </main>
    );
};

export default Profile;
