import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { getAllBlogsApi } from "../apis/Api";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Fetch blogs when the component mounts
    getAllBlogsApi().then((res) => {
      setBlogs(res.data);
    });
  }, []);

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="container mt-5">
        <div className="row mt-4" >
          {blogs.map((blog) => (
            <div key={blog.blogId} className="col-md-3 mb-4">
              <div className="card">
                <img
                  src={blog.blogImageUrl}
                  style={{ height: '200px', width: '300px', objectFit: 'cover' }}
                  className="card-img-top img-fluid"
                  alt={`Blog ${blog.blogId}`}
                />
                <div className="card-body">
                  <h5 className="card-title">{blog.blogTitle}</h5>
                  <p className="card-text">Author: {blog.blogAuthor}</p>
                  <p className="card-text">Date: {new Date(blog.blogDate).toLocaleDateString()}</p>
                  <p className="card-text">Category: {blog.blogCategory}</p>
                  <p className="card-text">Content: {blog.blogContent}</p>
                  <a
                    style={{
                      backgroundColor: "#920808",
                      color: "white",
                      padding: "10px 20px",
                      borderRadius: "4px",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "20px",
                      fontWeight: "medium",
                     
                    }}
                    href="#"
                    className="btn btn-primary"
                  >
                    Show More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Blog;