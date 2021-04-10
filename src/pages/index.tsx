import React from 'react';
import { Meta } from '../layout/Meta';
import Main from '../templates/Main';

const Index = () => (
  <Main
    meta={(
      <Meta
        title="Next.js Boilerplate Presentation"
        description="Next js Boilerplate is the perfect starer code for your project. Build your React application with Next.js framework."
      />
    )}
  >
  </Main>
);

export default Index;
