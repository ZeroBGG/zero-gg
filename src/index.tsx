import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@/styles/_reset.scss';
import '@/styles/global.scss';

import Header from '@/components/Common/Header/Header';
import Footer from '@/components/Common/Footer/Footer';
import Route from '@/route';

import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Header />
      <Route />
      <Footer />
    </BrowserRouter>
  </QueryClientProvider>,
);
