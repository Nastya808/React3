const { BrowserRouter, Route, Link } = window.ReactRouterDOM;

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <nav>
          <ul>
            <li><Link to="/">Информация о городе</Link></li>
            <li><Link to="/landmark">Самая известная достопримечательность</Link></li>
            <li><Link to="/landmarks">Другие достопримечательности</Link></li>
            <li><Link to="/photos">Фотографии города</Link></li>
          </ul>
        </nav>

        <Route exact path="/" component={CityInfo} />
        <Route path="/landmark" component={MainLandmark} />
        <Route path="/landmarks" component={OtherLandmarks} />
        <Route path="/photos" component={CityPhotos} />
      </div>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
