import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

import Header from '@/components/Common/Header/Header';
import Footer from '@/components/Common/Footer/Footer';
import Route from '@/route';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <Header />
    <Route />
    <Footer />
  </BrowserRouter>,
);
