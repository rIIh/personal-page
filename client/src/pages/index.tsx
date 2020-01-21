import React, {} from 'react';
import DotsBackground from './components/background';
import Timeline from './components/Timeline';
import Navigation from './components/navigation';
import routes from './routes/routes';

export default function() {

  return (
      <>
        <main className="container">
          <Navigation currentIndex={1} routes={routes}/>
          <section className="home pure-g pure-g--column pure-g--justify-content-space-around">
            <div className="pure-u-1 home__welcome">
              <div className="welcome">
                <h1>Hello</h1>
                <h1>I am <span className="welcome__name">Vadim</span></h1>
              </div>
            </div>
            <div className="pure-u-1 home__technologies technologies">
              <ul className="technologies__ul">
                <li className="technologies__element unselectable">Web Development</li>
                <li className="technologies__element unselectable">SPA</li>
              </ul>
              <ul className="technologies__ul technologies__ul--subtext">
                <li className="technologies__element unselectable">React</li>
                <li className="technologies__element unselectable">GraphQL</li>
                <li className="technologies__element unselectable">Typescript</li>
                <li className="technologies__element unselectable">PHP</li>
              </ul>
            </div>
            <ul className="pure-u-1 home__social_links social_links">
              <li>
                <button className="social_links__link wave hoverable">
                  <span className="social_links__wave wave__element"/>
                  <span className="fab fa-github social_links__icon"/>
                </button>
              </li>
              <li>
                <button className="social_links__link wave hoverable">
                  <span className="social_links__wave wave__element"/>
                  <span className="fab fa-instagram social_links__icon"/>
                </button>
              </li>
              <li>
                <button className="social_links__link wave hoverable">
                  <span className="social_links__wave wave__element"/>
                  <span className="fab fa-twitter social_links__icon"/>
                </button>
              </li>
              {/*<li>*/}
              {/*  <button className="social_links__link wave">*/}
              {/*    <span className="social_links__wave wave__element"/>*/}
              {/*    <span className="fab fa-linkedin social_links__icon"/>*/}
              {/*  </button>*/}
              {/*</li>*/}
              <li>
              </li>
            </ul>
          </section>
        </main>
      </>
  );
}
