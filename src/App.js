import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import AllQuotes from './pages/AllQuotes';
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/UI/LoadingSpinner';

const NewQuote = React.lazy(() => import('./pages/NewQuote'));       //this lazy method ensures that his component will be loaded, only when it is required or needed.
const QuoteDetail = React.lazy(() => import('./pages/QuoteDetail'));    //lazy loading basically used to split the code.
const NotFound = React.lazy(() => import('./pages/NotFound'));
function App() {
  return (
    <Layout>
      <Suspense fallback={
        <div className='centered'>
          <LoadingSpinner />
        </div>
      }>
      <Switch>
      <Route path='/' exact>
      <Redirect to='/quotes'/>
      </Route>
      <Route path='/quotes' exact>
      <AllQuotes />
      </Route>
      <Route path='/quotes/:quoteId'>
      <QuoteDetail />
      </Route>
      <Route path='/new-quote'>
      <NewQuote />
      </Route>
      <Route path='*'>
      <NotFound />
      </Route>
      </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
