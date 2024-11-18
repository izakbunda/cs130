import './App.css';
import { Note } from './components/note';

//const date = new Date(2024, 10, 17, 23, 59, 59);
const date = new Date('2024-12-17T23:59:59').getTime();
const today = new Date().getTime();
const start = new Date ('2024-10-17').getTime();

const diff = date-today;
console.log(date);
console.log(today);
console.log(start);
console.log((today-start)/(date-start)*100);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Note name="Note 1"/>
      </header>
    </div>
  );
}

export default App;
