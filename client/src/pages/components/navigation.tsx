import React, { Fragment } from 'react';
import Link from 'next/link';

export interface NavPath {
  title: string;
  path: string;
}

interface NavigationProps {
  currentIndex: number;
  routes: NavPath[];
}

const Navigation = ({ currentIndex, routes }: NavigationProps) => {
  return <div className="pure-g">
    <div className="nav">
      <h1 className="nav__breadcrumb breadcrumb">
                    <span className="breadcrumb__lead">
                      <span className="breadcrumb__lead_active">
                        {currentIndex}
                      </span>
                      /{routes.length}
                    </span>
        <span className="breadcrumb__tail">
          &nbsp;&nbsp;&nbsp;
          {
            routes.map((route, index) =>
              <Fragment key={index}>
                <span className={'breadcrumb__link hoverable' + ((currentIndex - 1) === index ? ' breadcrumb__link--active' : '')}>
                  <Link href={route.path}><a>{route.title}</a></Link>
                </span>
                <span>{index < routes.length - 1 ? ' /' + ' ' : ''}</span>
              </Fragment>
            )
          }
        </span>
      </h1>
    </div>
  </div>;
};

export default Navigation;
