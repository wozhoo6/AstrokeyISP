import logo from './astro.jpg';
import './App.css';
import Home from './pages/home';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main className="App-main">
        <Home />
      </main>
      <footer className="App-footer">
        <p>&copy; 2025 AstroKeyISP. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
