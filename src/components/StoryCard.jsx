import { Link } from 'react-router-dom';

export default function StoryCard({ story }) {
  let firstImage = '';

  if (typeof story.Image === 'string') {
    firstImage = story.Image.split(',')[0]?.trim();
  } else if (Array.isArray(story.Image)) {
    firstImage = story.Image[0];
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'New':
        return 'bg-blue-500';
      case 'In Progress':
        return 'bg-yellow-400 text-black';
      case 'Completed':
        return 'bg-green-400 text-black';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Link to={`/story/${story._id}`}>
      <div className="rounded-xl overflow-hidden shadow-xl transform transition hover:scale-105 bg-[#1c1c3c] border border-purple-700">
        {firstImage && (
          <img
            src={`https://ik.imagekit.io/dev24/${firstImage}`}
            alt={story.Title || 'Story Image'}
            className="w-full h-48 object-cover"
          />
        )}
        <div className="p-4 text-white">
          <h2 className="text-lg font-bold">{story.Title || 'No Title'}</h2>
          <div className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(story.Status)}`}>
            {story.Status || 'Unknown'}
          </div>
        </div>
      </div>
    </Link>
  );
}
