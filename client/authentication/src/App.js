import './App.css';
import './index.css';
import { Note } from './components/note';
import {LogInPage} from './components/logInPage';
import { Folder } from './components/folder';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Folder name="Folder 1"/>
      </header>
    </div>
  );
}

export default App;
