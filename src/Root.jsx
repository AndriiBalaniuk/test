import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

import styles from './Root.pcss';

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

const Topics = () => (
  <div>
    <h2>Topics</h2>
  </div>
);

const Root = () => (
  <Router>
    <div>
      <h1>Test app</h1>

      <ul className={styles.Links}>
        <li className={styles.Links__item}>
          <Link to="/">Home</Link>
        </li>
        <li className={styles.Links__item}>
          <Link to="/about">About</Link>
        </li>
        <li className={styles.Links__item}>
          <Link to="/topics">Topics</Link>
        </li>
      </ul>

      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/topics" component={Topics} />
    </div>
  </Router>
);

export default Root;
