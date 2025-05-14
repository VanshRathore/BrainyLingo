import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';

export default function StoryDetails() {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [tab, setTab] = useState('wordExplorer');
  const [mainIdx, setMainIdx] = useState(0);

  useEffect(() => {
    axios
      .get(`https://mxpertztestapi.onrender.com/api/sciencefiction/${id}`)
      .then(res => setStory(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!story) return <div className="p-6 text-white">Loading...</div>;

  const images = typeof story.Image === 'string' 
    ? story.Image.split(',').map(img => img.trim()) 
    : Array.isArray(story.Image) ? story.Image : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d1129] to-[#1e2746] text-white px-6 ">
    <Header />
      <h1 className="text-4xl font-bold text-center mt-10 mb-4">
        <span className="text-[#6a6aff]">The Lost City</span> of <span className="text-[#00ffc3]">Future Earth</span>
      </h1>

      <div className="flex justify-center gap-4 my-6">
        <button
          onClick={() => setTab('wordExplorer')}
          className={`px-6 py-2 rounded-full font-semibold text-sm ${
            tab === 'wordExplorer' ? 'bg-cyan-400 text-black shadow-xl' : 'bg-[#2a2f55]'
          }`}
        >
          🔍 Word Explorer
        </button>
        <button
          onClick={() => setTab('storyAdventure')}
          className={`px-6 py-2 rounded-full font-semibold text-sm ${
            tab === 'storyAdventure' ? 'bg-[#8880e3] text-white shadow-xl' : 'bg-[#2a2f55]'
          }`}
        >
          🧙 Story Adventure
        </button>
        <button
          onClick={() => setTab('brainQuest')}
          className={`px-6 py-2 rounded-full font-semibold text-sm ${
            tab === 'brainQuest' ? 'bg-pink-400 text-black shadow-xl' : 'bg-[#2a2f55]'
          }`}
        >
          🧠 Brain Quest
        </button>
      </div>

      <div className="mt-6">
        {tab === 'wordExplorer' && (
          <>
            <p className="text-center text-sm mb-4">Drag Pictures to the matching Words, light up correct pairs, shake for a retry</p>
            <div className="flex flex-col md:flex-row gap-8">
              
              <div className="md:w-1/3 w-full flex flex-col items-center">
                {story.Wordexplore && story.Wordexplore.length > 0 && (
                  <div className="relative bg-[#1b2140] p-6 rounded-2xl border-2 border-dashed border-[#6a6aff] w-full">
                    <h2 className="text-2xl font-bold text-cyan-400 mb-2">
                      {story.Wordexplore[mainIdx].Noun} <span className="text-sm text-gray-400">(Noun)</span>
                    </h2>
                    <p className="text-white text-sm mb-2">{story.Wordexplore[mainIdx].Storyttext}</p>
                    {story.Wordexplore[mainIdx].Storyimage && story.Wordexplore[mainIdx].Storyimage[0] && (
                      <img
                        src={`https://ik.imagekit.io/dev24/${story.Wordexplore[mainIdx].Storyimage[0]}`}
                        alt={story.Wordexplore[mainIdx].Noun}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                    )}
                    <div className="flex flex-wrap gap-2 text-xs mb-1">
                      <span className="font-bold text-green-400">Synonyms:</span>
                      <span className="text-white">{story.Wordexplore[mainIdx].Synonyms}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="font-bold text-pink-400">Antonyms:</span>
                      <span className="text-white">{story.Wordexplore[mainIdx].Antonyms}</span>
                    </div>
                    <button
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#232a4d] hover:bg-[#6a6aff] text-white rounded-full w-8 h-8 flex items-center justify-center"
                      onClick={() => setMainIdx((prev) => (prev === 0 ? story.Wordexplore.length - 1 : prev - 1))}
                    >
                      &#8592;
                    </button>
                    <button
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#232a4d] hover:bg-[#6a6aff] text-white rounded-full w-8 h-8 flex items-center justify-center"
                      onClick={() => setMainIdx((prev) => (prev === story.Wordexplore.length - 1 ? 0 : prev + 1))}
                    >
                      &#8594;
                    </button>
                  </div>
                )}
              </div>
              <div className="md:w-2/3 w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {story.Wordexplore &&
                  story.Wordexplore.map((item, idx) => (
                    <div
                      key={item._id || idx}
                      className={`bg-[#232a4d] rounded-xl border border-[#4f567c] p-2 flex flex-col items-center transition-all duration-200 ${
                        idx === mainIdx ? 'ring-2 ring-[#6a6aff]' : ''
                      }`}
                      onClick={() => setMainIdx(idx)}
                      style={{ cursor: 'pointer' }}
                    >
                      {item.Storyimage && item.Storyimage[0] && (
                        <img
                          src={`https://ik.imagekit.io/dev24/${item.Storyimage[0]}`}
                          alt={item.Noun}
                          className="w-full h-72 object-cover rounded-lg mb-2"
                        />
                      )}
                      <div className="text-white text-sm font-semibold text-center">{item.Noun}</div>
                      <div className="text-xs text-gray-400 text-center mt-1 line-clamp-2">{item.Storyttext}</div>
                    </div>
                  ))}
              </div>
            </div>
          </>
        )}

        {tab === 'storyAdventure' && (
          <div className="text-center text-gray-200">
            <h2 className="text-3xl font-extrabold mb-8 text-gradient bg-gradient-to-r from-[#6a6aff] to-[#00ffc3] bg-clip-text text-transparent drop-shadow-lg">
              {story.Storyadvenure?.Storytitle || 'Story Adventure'}
            </h2>
            <div className="flex flex-col gap-12 items-center">
              {Array.isArray(story.Storyadvenure?.content) && story.Storyadvenure.content.map((section, idx) => (
                <div
                  key={section._id || idx}
                  className="w-full max-w-4xl bg-[#181d36] rounded-2xl shadow-xl border border-[#2a2f55] p-8 flex flex-col md:flex-row gap-8 items-center"
                >
                  <div className="flex flex-row md:flex-col gap-4 md:w-1/3 w-full justify-center">
                    {section.Storyimage && section.Storyimage.map((img, i) => (
                      <img
                        key={i}
                        src={`https://ik.imagekit.io/dev24/${img}`}
                        alt="Adventure"
                        className="w-32 h-24 md:w-40 md:h-28 object-cover rounded-lg border-2 border-[#6a6aff] shadow-md"
                      />
                    ))}
                  </div>
                  <div className="flex-1 text-left space-y-4">
                    {section.Paragraph && section.Paragraph.map((para, i) => (
                      <p
                        key={i}
                        className="text-base md:text-lg leading-relaxed text-gray-100"
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'brainQuest' && (
          <div className="text-center text-gray-200">
            <h2 className="text-2xl font-bold mb-2">Brain Quest</h2>
            <div className="max-w-xl mx-auto space-y-6">
              {Array.isArray(story.Brainquest) && story.Brainquest.map((q, idx) => (
                <div key={q._id || idx} className="bg-[#1b2140] p-4 rounded-xl border border-[#4f567c] text-left">
                  <p className="font-semibold mb-2">{idx + 1}. {q.Question}</p>
                  <ul className="space-y-1">
                    {q.Option && q.Option.map((opt, i) => (
                      <li key={i} className="pl-2">- {opt}</li>
                    ))}
                  </ul>
                  <p className="text-xs text-green-400 mt-2">Answer: {q.Answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

