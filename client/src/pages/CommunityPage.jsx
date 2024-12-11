import React, { useState, useEffect } from "react";
import "../styles/CommunityPage.css";
import NavBar from "../components/NavBar";

const CommunityPage = () => {
  const [posts, setPosts] = useState([]);
  const [expandedPost, setExpandedPost] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [newPost, setNewPost] = useState({ subject: "", message: "" });
  const [commentText, setCommentText] = useState("");
  const postsPerPage = 12;

  // const backendUrl = "https://moody-backend.onrender.com"; // Backend base URL
  const backendUrl = "https://moody-be.onrender.com";
  useEffect(() => {
    fetch(`${backendUrl}/api/posts`, { credentials: "include" })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setPosts(data))
      .catch((error) => {
        console.error("Fetch error:", error);
        setPosts([]); // Ensure posts is always an array
      });
  }, []);

  const toggleComments = (postId) => {
    setExpandedPost(expandedPost === postId ? null : postId);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddPost = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setNewPost({ subject: "", message: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleAddPostSubmit = () => {
    if (newPost.subject && newPost.message) {
      fetch(`${backendUrl}/api/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
        credentials: "include",
      })
        .then((response) => response.json())
        .then((createdPost) => {
          setPosts([createdPost, ...posts]);
          handleModalClose();
        })
        .catch((error) => console.error("Error adding post:", error));
    }
  };

  const handleLike = (postId) => {
    fetch(`${backendUrl}/api/posts/${postId}/like`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          setPosts(
            posts.map((post) =>
              post._id === postId ? { ...post, likes: post.likes + 1 } : post
            )
          );
        }
      })
      .catch((error) => console.error("Error liking post:", error));
  };

  const handleAddComment = (postId) => {
    if (commentText.trim()) {
      fetch(`${backendUrl}/api/posts/${postId}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: commentText.trim() }),
        credentials: "include",
      })
        .then((response) => response.json())
        .then(() => {
          setPosts(
            posts.map((post) =>
              post._id === postId
                ? {
                    ...post,
                    comments: [...post.comments, { text: commentText }],
                  }
                : post
            )
          );
          setCommentText("");
        })
        .catch((error) => console.error("Error adding comment:", error));
    }
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      <NavBar />
      <div className="community-page">
        <h1>Community Posts</h1>
        <button className="add-post-button" onClick={handleAddPost}>
          Add Post
        </button>
        <div className="posts-container">
          {currentPosts.map((post) => (
            <div key={post._id} className="post-card">
              <h2 className="post-subject">{post.subject}</h2>
              <p className="post-message">{post.message}</p>
              <div className="post-actions">
                <button
                  className="comment-button"
                  onClick={() => toggleComments(post._id)}
                >
                  {expandedPost === post._id ? "▼" : "▶"} Comments
                </button>
                <button
                  className="like-button"
                  onClick={() => handleLike(post._id)}
                >
                  👍 {post.likes}
                </button>
              </div>
              {expandedPost === post._id && (
                <div className="comments-section">
                  {post.comments.map((comment, index) => (
                    <p key={index} className="comment">
                      {comment.text}
                    </p>
                  ))}
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="comment-input"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                  <button
                    className="comment-input-button"
                    onClick={() => handleAddComment(post._id)}
                  >
                    Comment
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="pagination">
          {Array.from(
            { length: Math.ceil(posts.length / postsPerPage) },
            (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`page-button ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Add New Post</h2>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={newPost.subject}
                onChange={handleInputChange}
                className="modal-input"
              />
              <textarea
                name="message"
                placeholder="Message"
                value={newPost.message}
                onChange={handleInputChange}
                className="modal-input"
                rows="4"
              ></textarea>
              <button className="submit-button" onClick={handleAddPostSubmit}>
                Add Post
              </button>
              <button className="close-button" onClick={handleModalClose}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CommunityPage;
