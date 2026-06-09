import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import API from "../api/axios"
const Home = () => {
  const [posts, setPost] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await API.get('/posts');
        setLoading(true);
        setError('');
        setPost(data);
      } catch (error) {
        setError('Failed to Load Posts');
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, [])
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900">
            Share Your Ideas With The World
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            Discover inspiring stories, share your knowledge, and connect with
            readers through beautifully crafted blog posts.
          </p>

          <button onClick={() => navigate("/create")} className="mt-8 px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition cursor-pointer">
            Start Writing
          </button>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Latest Posts
          </h2>

          <button className="text-indigo-600 font-semibold hover:underline">
            View All
          </button>
        </div>

        {loading && <p style={{ color: "red" }}>Loading Posts....</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {posts.length === 0 ? (
            <p>No posts yet. Be the first to create one!</p>
          ) : (
            posts.map(post => (
              <div key={post._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-52 object-cover"
                />

                <div className="p-5">
                  <div className="flex justify-between">
                    <p className="text-sm text-indigo-600 font-medium">
                      {post.author?.name}
                    </p>
                    <p className="text-sm text-gray-600 ">
                      {new Date(post.createdAt).toDateString()}
                    </p>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mt-2">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 mt-2">
                    {post.content.substring(0, 100)}...
                  </p>
                  <Link to={`/postDetail/${post._id}`} className="mt-3 text-indigo-600 font-semibold hover:underline">
                    Read More →
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  )
}

export default Home
