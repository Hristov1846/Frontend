{/* User Posts */}
<section className="p-4">
  <h2 className="text-xl font-bold mb-3">📝 Публикации</h2>

  {/* Новата форма за пост */}
  <CreatePost onPostCreated={(newPost) => setPosts([newPost, ...posts])} />

  <div className="space-y-4">
    {posts.length > 0 ? (
      posts.map((post) => (
        <div
          key={post._id}
          className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
        >
          <h3 className="font-semibold">
            {post.author?.firstName} {post.author?.lastName}
          </h3>
          <p className="text-gray-700 mt-2">{post.content}</p>
          {post.image && (
            <img
              src={post.image}
              alt="Post"
              className="mt-2 rounded-lg max-h-64 object-cover"
            />
          )}
        </div>
      ))
    ) : (
      <p className="text-gray-600">Все още няма публикации.</p>
    )}
  </div>
</section>
