import { useEffect, useState } from 'react';
import axios from 'axios';
import StoryCard from '../components/StoryCard';
import Header from '../components/Header';

export default function Home() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    axios.get('https://mxpertztestapi.onrender.com/api/sciencefiction')
      .then(res => {
        setStories(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch stories');
        setLoading(false);
        console.error(err);
      });
  }, []);

  const filteredStories = filter === 'All'
    ? stories
    : stories.filter(story => story.Status === filter);

  const totalPages = Math.ceil(filteredStories.length / itemsPerPage);
  const paginatedStories = filteredStories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter === 'Clear All' ? 'All' : newFilter);
    setCurrentPage(1); 
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center text-white text-2xl">
      Loading stories...
    </div>
  );

  if (error) return (
    <div className="h-screen flex items-center justify-center text-red-400 text-xl">
      {error}
    </div>
  );

  return (
    <main className="min-h-screen bg-[url('/bg.jpg')] bg-cover bg-center text-white font-sans">
     
      
      <Header />

      <section className="text-center my-10">
        <h1 className="text-4xl font-bold tracking-wide">Science Fiction Stories</h1>
        <div className="flex justify-center mt-6 gap-4 flex-wrap">
          {[
            { label: 'New', color: 'bg-blue-600', icon: '🪄' },
            { label: 'In Progress', color: 'bg-yellow-400 text-black', icon: '⏳' },
            { label: 'Completed', color: 'bg-green-400 text-black', icon: '🏆' },
            { label: 'Clear All', color: 'bg-purple-500', icon: '🧹' }
          ].map(({ label, color, icon }) => {
            const isActive = filter === label || (filter === 'All' && label === 'Clear All');
            return (
              <button
                key={label}
                onClick={() => handleFilterChange(label)}
                className={`px-4 py-2 rounded-full font-semibold transition transform ${
                  isActive ? 'scale-110 ring-2 ring-white' : ''
                } ${color}`}
              >
                <span className="mr-1">{icon}</span>{label}
              </button>
            );
          })}
        </div>
      </section>

      <section className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6 pb-12">
        {paginatedStories.length === 0 ? (
          <p className="col-span-full text-center text-xl text-purple-300">
            No stories found.
          </p>
        ) : (
          paginatedStories.map(story => (
            <StoryCard key={story._id} story={story} />
          ))
        )}
      </section>

      <div className="flex justify-between max-w-7xl mx-auto text-purple-300 text-lg px-6 pb-8">
        <button
          onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="hover:underline disabled:text-gray-500"
        >
          ← Previous
        </button>
        <span className="text-white">{currentPage} / {totalPages}</span>
        <button
          onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="hover:underline disabled:text-gray-500"
        >
          Next →
        </button>
      </div>
    </main>
  );
}
