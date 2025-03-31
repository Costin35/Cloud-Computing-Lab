import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import NewPost from './pages/NewPost/NewPost';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import NoNavLayout from './layouts/NoNavLayout/NoNavLayout';
import MainLayout from './layouts/MainLayout/MainLayout';
import Jokes from './pages/Jokes/Jokes';
import Quotes from './pages/Quotes/Quotes';

function App() {
  return (
      <AuthProvider>
        <Routes>
          <Route element={<NoNavLayout />}>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<MainLayout />}>
            <Route path="/quotes" element={<Quotes />} />
            <Route path="/jokes" element={<Jokes />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/post" element={<NewPost />} />
          </Route>
        </Routes>
      </AuthProvider>
  );
}

export default App;
