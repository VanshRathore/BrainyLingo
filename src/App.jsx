import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import StoryDetails from './pages/StoryDetails';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/story/:id" element={<StoryDetails />} />
    </Routes>
  );
}
