import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import Newsitem from './Components/Newsitem';
import LoadingBar from 'react-top-loading-bar'


import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";

const App=()=> {

  const [progress, setProgress] = useState(0)

    return (
      <>
      <BrowserRouter>
      <Navbar />
      <LoadingBar                                        //adding loading bar(progress bar just below the navbar)...read documentaion for more properties
        color='#8D72E1'
        height={3}
        progress={progress}
        // onLoaderFinished={() => setProgress(0)}
      />
      {/* <News setProgress={setProgress}  key="" pageSize={8} category="science"/> */}
      <Routes>
          <Route exact path="/home" element={<News setProgress={setProgress} key="home" pageSize={8} category="home"/>}  />
          <Route exact path="/" element={<News setProgress={setProgress}  key="general" pageSize={8} category="general"/>}  />
          <Route exact path="/buisness" element={<News setProgress={setProgress}  key="buisness" pageSize={8} category="buisness"/>}  />
          <Route exact path="/entertainment" element={<News setProgress={setProgress}  key="entertainment" pageSize={8} category="entertainment"/>}  />
          <Route exact path="/general" element={<News setProgress={setProgress}  key="general" pageSize={8} category="general"/>}  />
          <Route exact path="/health" element={<News setProgress={setProgress}  key="health" pageSize={8} category="health"/>}  />
          <Route exact path="/science" element={<News setProgress={setProgress}  key="science" pageSize={8} category="science"/>}  />
          <Route exact path="/sports" element={<News setProgress={setProgress}  key="sports" pageSize={8} category="sports"/>}  />
          <Route exact path="/technology" element={<News setProgress={setProgress}  key="technology" pageSize={8} category="technology"/>}  />
          

      </Routes>
      
      </BrowserRouter>
      </>
    )
  
}
export default App;