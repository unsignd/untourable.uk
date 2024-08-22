import ReactDOM from 'react-dom/client';
import './index.css';
import { Landing } from './pages/Landing';
import { Header } from './components/Header';
import styled from 'styled-components';

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  background-color: #000;
`;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Container>
    <Header />
    <Landing />
  </Container>
);
