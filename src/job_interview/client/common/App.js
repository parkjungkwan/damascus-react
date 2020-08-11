import React from 'react';
import Navbar from '../navbar/Nav'
import Footer from '../footer/Footer'
import { routerConfig } from '../routers'
import { Route } from 'react-router-dom'

function App() {
  return (
    <div className='wrapper'>
      <Navbar />
      <div className="content">
        {routerConfig.map((route, index) => (<Route path={route.path} key={index} exact={route.exact} component={route.component} />))}
      </div>
      <Footer />
    </div>
  );
}

export default App;