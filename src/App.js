import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import Home from './Screens/Home';
const App = () => {
  return (
    <Router>
      <main className='py-3'>
        <Container>
          <Route path='/' component={Home} exact />
        </Container>
      </main>
    </Router>
  );
}

export default App;
