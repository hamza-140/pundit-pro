import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.dialog}>
        <div>
          <h1 style={styles.title}>The page you were looking for doesn't exist.</h1>
          <p style={styles.paragraph}>You may have mistyped the address or the page may have moved.</p>
        </div>
        <p style={styles.paragraph}>If you are the application owner, check the logs for more information.</p>
      </div>
      <Link to="/" className="btn btn-primary mx-2 text-nowrap">Return</Link>
    </div>
  );
};

export default NotFoundPage;

// CSS styles
const styles = {
  container: {
    backgroundColor: '#EFEFEF',
    color: '#2E2F30',
    textAlign: 'center',
    fontFamily: 'arial, sans-serif',
    margin: 0,
  },
  dialog: {
    width: '95%',
    maxWidth: '33em',
    margin: '4em auto 0',
    border: '1px solid #CCC',
    borderRightColor: '#999',
    borderLeftColor: '#999',
    borderBottomColor: '#BBB',
    borderTop: '#B00100 solid 4px',
    borderTopLeftRadius: '9px',
    borderTopRightRadius: '9px',
    backgroundColor: 'white',
    padding: '7px 12% 0',
    boxShadow: '0 3px 8px rgba(50, 50, 50, 0.17)',
  },
  title: {
    fontSize: '100%',
    color: '#730E15',
    lineHeight: '1.5em',
  },
  paragraph: {
    margin: '0 0 1em',
    padding: '1em',
    backgroundColor: '#F7F7F7',
    border: '1px solid #CCC',
    borderRightColor: '#999',
    borderLeftColor: '#999',
    borderBottomColor: '#999',
    borderBottomLeftRadius: '4px',
    borderBottomRightRadius: '4px',
    borderTopColor: '#DADADA',
    color: '#666',
    boxShadow: '0 3px 8px rgba(50, 50, 50, 0.17)',
  },
};
