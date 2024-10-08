import ReactDOM from 'react-dom/client';
import './index.css';
import { Landing } from './pages/Landing';
import { Header } from './components/Header';
import styled from 'styled-components';
import { RecoilRoot } from 'recoil';

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  position: relative;

  background-color: #000;

  overflow: hidden;
`;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <RecoilRoot>
    <Container>
      <Header />
      <Landing />
    </Container>
  </RecoilRoot>
);
