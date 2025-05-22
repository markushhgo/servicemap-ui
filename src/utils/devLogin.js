import React, { useState, useEffect } from 'react';
import { Button, Typography } from '@mui/material';
import { PropTypes } from 'prop-types';
import { useIntl } from 'react-intl';

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    background: '#fff',
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  input: { padding: 10, fontSize: 16 },
  button: { padding: 10, fontSize: 16 },
  error: { color: 'red' },
};

/* To use development/test environment, a password is needed */
const DevLoginGate = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const isDev = typeof window !== 'undefined' ? window.nodeEnvSettings?.SERVICEMAP_API?.includes('-testi') : false;
  const [correctPasswords, setCorrectPasswords] = useState([]);
  const intl = useIntl();

  useEffect(() => {
    if (isDev) {
      if (correctPasswords == null || correctPasswords.length === 0) {
        const passwords = typeof window !== 'undefined'
          ? window.nodeEnvSettings?.TEST_AUTH_PASSWORDS || [] : [];
        try {
          setCorrectPasswords(JSON.parse(passwords.replace(/'/g, '"')));
        } catch (e) {
          setError(intl.formatMessage({ id: 'dev.password.error' }));
        }
      }
      const saved = localStorage.getItem('dev_login');
      if (saved && new Date(saved) > new Date()) {
        setIsLoggedIn(true);
      } else setIsLoggedIn(false);
    } else setIsLoggedIn(true);
  }, [isDev, correctPasswords, setIsLoggedIn, setCorrectPasswords]);

  const handleLogin = e => {
    e.preventDefault();
    if (correctPasswords.includes(password)) {
      const expiry = new Date();
      expiry.setDate(expiry.getDate() + 1);
      localStorage.setItem('dev_login', expiry.toISOString());
      setIsLoggedIn(true);
    } else {
      setError(intl.formatMessage({ id: 'dev.incorrect.password' }));
    }
  };

  if (isDev && !isLoggedIn) {
    return (
      <div style={styles.overlay}>
        <form onSubmit={handleLogin} style={styles.modal}>
          <Typography component="h2">{intl.formatMessage({ id: 'dev.login.title' })}</Typography>
          <input
            type="password"
            placeholder={intl.formatMessage({ id: 'dev.enter.password' })}
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={styles.input}
          />
          <Button type="submit">{intl.formatMessage({ id: 'dev.login' })}</Button>
          {error && <p style={styles.error}>{error}</p>}
        </form>
      </div>
    );
  }

  return children;
};

DevLoginGate.propTypes = {
  children: PropTypes.node,
};

DevLoginGate.defaultProps = {
  children: null,
};

export default DevLoginGate;
