import logo from './logo.svg';
import './App.css';

function Gallery() {
  return (
    <div className="Gallery">
      <div className="Gallery-row">
        <div className="Gallery-item">Item</div>
        <div className="Gallery-item">Item</div>
        <div className="Gallery-item">Item</div>
      </div>
      <div className="Gallery-row">
        <div className="Gallery-item">Item</div>
        <div className="Gallery-item">Item</div>
      </div>
      <div className="Gallery-row">
        <div className="Gallery-item">Item</div>
        <div className="Gallery-item">Item</div>
        <div className="Gallery-item">Item</div>
        <div className="Gallery-item">Item</div>
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>#channel-name</h1>
        <div className="Divider"/>
        <Gallery/>
      </header>
    </div>
  );
}

export default App;
