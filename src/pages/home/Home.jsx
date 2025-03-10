import Tasks from "../../components/Tasks";

const Home = () => {
  return (
    <div>
      <div className="min-h-screen py-6 md:py-0 mt-6 md:mt-10 mb-10 bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex flex-col justify-center items-center px-6 rounded-lg">
        {/* Hero Section */}
        <header className="text-center max-w-3xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Organize Your Tasks <br />
            <span className="text-yellow-300">Effortlessly</span>
          </h1>
          <p className="mt-4 text-lg sm:text-xl md:text-2xl text-gray-200">
            A simple and powerful task manager to keep you on track.
          </p>
          <div className="mt-6">
            <a
              href="#task"
              className="bg-yellow-400 text-blue-900 px-6 py-3 text-lg rounded-lg shadow-lg hover:bg-yellow-500 transition duration-300"
            >
              Start Now
            </a>
          </div>
        </header>

        {/* Features Section */}
        <section className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center mt-12">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
            <h2 className="text-lg sm:text-xl font-semibold text-blue-600">
              🚀 Drag & Drop
            </h2>
            <p className="text-gray-600 mt-2">
              Move tasks between categories effortlessly.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
            <h2 className="text-lg sm:text-xl font-semibold text-blue-600">
              ⚡ Instant Sync
            </h2>
            <p className="text-gray-600 mt-2">
              All changes are saved instantly.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
            <h2 className="text-lg sm:text-xl font-semibold text-blue-600">
              👥 Easy Collaboration
            </h2>
            <p className="text-gray-600 mt-2">
              Work with your team in real-time.
            </p>
          </div>
        </section>
      </div>

      <div id="task" className="px-4 md:px-8">
        <Tasks />
      </div>
    </div>
  );
};

export default Home;
