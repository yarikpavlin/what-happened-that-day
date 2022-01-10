import { useEffect } from 'react';
import './App.css';
import Container from './components/Container';

function App() {
  useEffect(() => {
    document.title = 'Что происходило в этот день?';
  }, [])
  return (
    <Container/>
  );
}

export default App;
