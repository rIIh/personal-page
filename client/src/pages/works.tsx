import React, {} from 'react';
import DotsBackground from './components/background';
import Timeline from './components/Timeline';
import Navigation from './components/navigation';
import routes from './routes/routes';

export default function() {
  return (
      <>
        <main className="container">
          <Navigation currentIndex={2} routes={routes}/>
          <section className="home pure-g pure-g--column pure-g--justify-content-space-around">

          </section>
        </main>
      </>
  );
}
