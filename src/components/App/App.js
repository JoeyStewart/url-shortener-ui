import React, { useState, useEffect } from 'react';
import './App.css';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

function App () {
  const [urls, setUrls] = useState([]);
  // console.log(urls)
  
  useEffect(() => {
    fetch('http://localhost:3001/api/v1/urls')
    .then(response => response.json())
    .then(data => {
      console.log("pure, request", data)
      setUrls(data.urls);
    })
  }, []);

  function addURL(newURL){
    fetch('http://localhost:3001/api/v1/urls', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(newURL)
    })
    .then(response => response.json())
    .then(data => {
    setUrls([...urls, data])
  })
}
console.log(urls)
  return (
    <main className="App">
      <header>
        <h1>URL Shortener</h1>
        <UrlForm  addURL={ addURL }/>
      </header>
      <div className="url-container">
        <UrlContainer urls={urls}/>
      </div>
    </main>
  );
}

export default App;
