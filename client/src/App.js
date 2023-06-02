import Navbar from './Components/Navbar';
import About from './Components/About';
import Contact from './Components/Contact';
import Profile from './Components/NewPost';
import Layout from './Components/Layout';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="contact" element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;
