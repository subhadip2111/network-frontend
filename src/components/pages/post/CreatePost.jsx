// components/CreatePost.jsx
import { useState } from "react";

const   CreatePost = ({ onSubmit }) => {
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    author: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ title: "", excerpt: "", content: "", author: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="title"
        placeholder="Post Title"
        className="w-full px-4 py-2 border rounded-lg"
        value={form.title}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="excerpt"
        placeholder="Short Excerpt"
        className="w-full px-4 py-2 border rounded-lg"
        value={form.excerpt}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="author"
        placeholder="Author Name"
        className="w-full px-4 py-2 border rounded-lg"
        value={form.author}
        onChange={handleChange}
        required
      />
      <textarea
        name="content"
        rows="6"
        placeholder="Full Content"
        className="w-full px-4 py-2 border rounded-lg"
        value={form.content}
        onChange={handleChange}
        required
      />
      <button
        type="submit"
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indi
go-700 transition-colors"
        >
        Create Post
      </button>
    </form>
  );
};

export default CreatePost;