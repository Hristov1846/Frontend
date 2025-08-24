export default function Home() {
  return (
    <div className="flex max-w-6xl mx-auto mt-6 px-4">
      {/* Sidebar */}
      <aside className="w-1/5 hidden md:block pr-6">
        <ul className="space-y-4 font-medium">
          <li className="hover:text-indigo-600 cursor-pointer">🏠 Home</li>
          <li className="hover:text-indigo-600 cursor-pointer">🔥 Trending</li>
          <li className="hover:text-indigo-600 cursor-pointer">📩 Messages</li>
          <li className="hover:text-indigo-600 cursor-pointer">⚙ Settings</li>
        </ul>
      </aside>

      {/* Feed */}
      <main className="flex-1 space-y-6">
        {/* Пост 1 */}
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="font-bold">Ivan Petrov</h3>
          <p className="text-gray-700 mt-2">
            Това е първият ми пост в YouVibe! 🚀
          </p>
          <div className="mt-3 flex space-x-4 text-gray-500 text-sm">
            <span>👍 Like</span>
            <span>💬 Comment</span>
            <span>🔁 Share</span>
          </div>
        </div>

        {/* Пост 2 */}
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="font-bold">Maria Georgieva</h3>
          <p className="text-gray-700 mt-2">
            Днес е страхотен ден за нови проекти! 💡✨
          </p>
          <div className="mt-3 flex space-x-4 text-gray-500 text-sm">
            <span>👍 Like</span>
            <span>💬 Comment</span>
            <span>🔁 Share</span>
          </div>
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="w-1/4 hidden lg:block pl-6">
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="font-bold mb-3">Who to follow</h3>
          <ul className="space-y-3">
            <li className="flex justify-between items-center">
              <span>@peter</span>
              <button className="text-indigo-600 text-sm">Follow</button>
            </li>
            <li className="flex justify-between items-center">
              <span>@anna</span>
              <button className="text-indigo-600 text-sm">Follow</button>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
