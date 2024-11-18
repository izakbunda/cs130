import './App.css';
import { Note } from './components/note';
import {LogInPage} from './components/logInPage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LogInPage />
        <Note name="Note 1"/>
      </header>
    </div>
  );
}

export default App;
