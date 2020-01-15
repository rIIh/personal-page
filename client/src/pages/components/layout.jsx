import React, { useEffect } from 'react';
import getConfig from 'next/config';
const { publicRuntimeConfig: { GA_ID } } = getConfig();

const LayoutComponent = ({ children }) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production' && GA_ID !== undefined) {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag('js', new Date());
      gtag('config', GA_ID, {
        page_location: window.location.href,
        page_path: window.location.pathname,
        page_title: window.document.title,
      });
    }
  });

  return (
      <div>
        {children}
      </div>
  );
};

export default LayoutComponent;
