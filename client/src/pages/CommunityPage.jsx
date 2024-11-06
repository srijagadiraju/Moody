// // import React, { useState, useEffect } from 'react';
// // import '../styles/CommunityPage.css';

// // const CommunityPage = () => {
// //   const [posts, setPosts] = useState([]);
// //   const [expandedPost, setExpandedPost] = useState(null);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const postsPerPage = 12;

// //   useEffect(() => {
// //     fetch('/posts.json')
// //       .then((response) => response.json())
// //       .then((data) => setPosts(data))
// //       .catch((error) => console.error('Fetch error:', error));
// //   }, []);

// //   const toggleComments = (postId) => {
// //     setExpandedPost(expandedPost === postId ? null : postId);
// //   };

// //   const handlePageChange = (page) => {
// //     setCurrentPage(page);
// //   };

// //   // Calculate paginated posts
// //   const indexOfLastPost = currentPage * postsPerPage;
// //   const indexOfFirstPost = indexOfLastPost - postsPerPage;
// //   const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

// //   return (
// //     <div className="community-page">
// //       <h1>Community Posts</h1>
// //       <div className="posts-container">
// //         {currentPosts.map((post) => (
// //           <div key={post.id} className="post-card">
// //             <h2 className="post-subject">{post.subject}</h2>
// //             <p className="post-message">{post.message}</p>
// //             <div className="post-actions">
// //               <button className="like-button">👍 {post.likes}</button>
// //               <button className="comment-button" onClick={() => toggleComments(post.id)}>
// //                 {expandedPost === post.id ? '▼' : '▶'} Comments
// //               </button>
// //             </div>
// //             {expandedPost === post.id && (
// //               <div className="comments-section">
// //                 {post.comments.map((comment) => (
// //                   <p key={comment.id} className="comment">{comment.text}</p>
// //                 ))}
// //                 <input type="text" placeholder="Add a comment..." className="comment-input" />
// //                 <button className="add-comment-button">Comment</button>
// //               </div>
// //             )}
// //           </div>
// //         ))}
// //       </div>

// //       {/* Pagination */}
// //       <div className="pagination">
// //         {Array.from({ length: Math.ceil(posts.length / postsPerPage) }, (_, index) => (
// //           <button
// //             key={index + 1}
// //             onClick={() => handlePageChange(index + 1)}
// //             className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
// //           >
// //             {index + 1}
// //           </button>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default CommunityPage;

// import React, { useState, useEffect } from 'react';
// import '../styles/CommunityPage.css';

// const CommunityPage = () => {
//   const [posts, setPosts] = useState([]);
//   const [expandedPost, setExpandedPost] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const postsPerPage = 12;

//   useEffect(() => {
//     fetch('/posts.json')
//       .then((response) => response.json())
//       .then((data) => setPosts(data))
//       .catch((error) => console.error('Fetch error:', error));
//   }, []);

//   const toggleComments = (postId) => {
//     setExpandedPost(expandedPost === postId ? null : postId);
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   // Calculate paginated posts
//   const indexOfLastPost = currentPage * postsPerPage;
//   const indexOfFirstPost = indexOfLastPost - postsPerPage;
//   const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

//   return (
//     <div className="community-page">
//       <h1>Community Posts</h1>
//       <div className="posts-container">
//         {currentPosts.map((post) => (
//           <div key={post.id} className="post-card">
//             <h2 className="post-subject">{post.subject}</h2>
//             <p className="post-message">{post.message}</p>
//             <div className="post-actions">
//               <button className="comment-button" onClick={() => toggleComments(post.id)}>
//                 {expandedPost === post.id ? '▼' : '▶'} Comments
//               </button>
//               <button className="like-button">👍 {post.likes}</button>
//             </div>
//             {expandedPost === post.id && (
//               <div className="comments-section">
//                 {post.comments.map((comment) => (
//                   <p key={comment.id} className="comment">{comment.text}</p>
//                 ))}
//                 <input type="text" placeholder="Add a comment..." className="comment-input" />
//                 <button className="add-comment-button">Comment</button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Pagination */}
//       <div className="pagination">
//         {Array.from({ length: Math.ceil(posts.length / postsPerPage) }, (_, index) => (
//           <button
//             key={index + 1}
//             onClick={() => handlePageChange(index + 1)}
//             className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
//           >
//             {index + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CommunityPage;
import React, { useState, useEffect } from 'react';
import '../styles/CommunityPage.css';

const CommunityPage = () => {
  const [posts, setPosts] = useState([]);
  const [expandedPost, setExpandedPost] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [newPost, setNewPost] = useState({ subject: '', message: '' });
  const postsPerPage = 12;

  useEffect(() => {
    fetch('/posts.json')
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error('Fetch error:', error));
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
    setNewPost({ subject: '', message: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleAddPostSubmit = () => {
    if (newPost.subject && newPost.message) {
      const updatedPosts = [
        {
          id: posts.length + 1,
          subject: newPost.subject,
          message: newPost.message,
          likes: 0,
          comments: [],
        },
        ...posts,
      ];
      setPosts(updatedPosts);
      handleModalClose();
    }
  };

  // Calculate paginated posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="community-page">
      <h1>Community Posts</h1>
      <button className="add-post-button" onClick={handleAddPost}>Add Post</button>
      <div className="posts-container">
        {currentPosts.map((post) => (
          <div key={post.id} className="post-card">
            <h2 className="post-subject">{post.subject}</h2>
            <p className="post-message">{post.message}</p>
            <div className="post-actions">
              <button className="comment-button" onClick={() => toggleComments(post.id)}>
                {expandedPost === post.id ? '▼' : '▶'} Comments
              </button>
              <button className="like-button">👍 {post.likes}</button>
            </div>
            {expandedPost === post.id && (
              <div className="comments-section">
                {post.comments.map((comment) => (
                  <p key={comment.id} className="comment">{comment.text}</p>
                ))}
                <input type="text" placeholder="Add a comment..." className="comment-input" />
                <button className="add-comment-button">Comment</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(posts.length / postsPerPage) }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Add Post Modal */}
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
            <button className="submit-button" onClick={handleAddPostSubmit}>Add Post</button>
            <button className="close-button" onClick={handleModalClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityPage;


