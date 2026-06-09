import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import API from "../api/axios";

const CreatePost = () => {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/login" replace />
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      if (image) {
        formData.append('image', image);
      }
      await API.post("/posts", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || "Something Went Wrong")
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Create New Post
        </h1>

        <p className="text-gray-500 mb-8">
          Share your thoughts with your readers.
        </p>
        {error && <p className="text-red-500 mb-4 font-medium">{error}</p>}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Featured Image
            </label>

            <input
              type="file"
              accept="image/*"
              className="w-full border border-gray-300 rounded-lg p-3"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Post Title
            </label>

            <input
              type="text"
              placeholder="Enter your post title"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>

            <textarea
              placeholder="Write your blog content here..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setContent(e.target.value)}
              value={content}
              rows={8}
              required

            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
          >
            {loading ? "Publishing Post.." : "Publish Post"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreatePost
