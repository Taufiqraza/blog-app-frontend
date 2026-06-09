import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";
const PostDetail = () => {
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await API.get(`/posts/${id}`);
        setPost(data);
      } catch (error) {
        setError("Post Not Found");
      } finally {
        setLoading(false)
      }
    }
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are You Sure You Want To Delete The Post")) return
    try {
      await API.delete(`/posts/${id}`);
      navigate('/')
    } catch (error) {
      setError(error.response?.data?.message || "Failed to delete post");
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {/* Back Button */}
        <div className="flex justify-between">
          <Link
            to="/"
            className="inline-flex items-center text-indigo-600 hover:underline mb-6"
          >
            ← Back to Posts
          </Link>
          {user?.name === post?.author?.name && <button onClick={handleDelete} className="text-red-700 cursor-pointer">Delete Post</button>}
        </div>

        {/* Post Card */}
        <article className="bg-white rounded-2xl shadow-lg overflow-hidden">

          {/* Featured Image */}
          {post?.image &&
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-96 object-cover"
            />
          }

          <div className="p-8">

            {/* Author & Date */}
            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <span>{post?.author?.name}</span>
              <span>{new Date(post?.createdAt).toDateString()}</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-800 mb-6">
              {post?.title}
            </h1>

            {/* Content */}
            <div className="prose max-w-none text-gray-700 leading-8">
              <p>
                {post?.content}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}

export default PostDetail
