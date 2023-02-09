import React from 'react'
import {BrowserRouter , Link ,Route , Routes} from 'react-router-dom';
import {logo} from './assets';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';

const App = () => {
  return (
    <BrowserRouter>
      <header className='w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 '>

        <Link to="/">
          <img src={logo} alt="logo" className='w-28 object-contain'/>
        </Link>

        <Link to="/createpost" className='font-inter font-medium rounded-md border px-4 py-2 bg-[#6469ff] text-white'>
          Create
        </Link>

      </header>
      
      <main className='w-full bg-[#f9fafe] sm:px-8 px-4 py-4 min-h-[calc(100vh-73px)]'>
        {/* 73px is the default height of the header*/}
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/createpost' element={<CreatePost/>}></Route>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App