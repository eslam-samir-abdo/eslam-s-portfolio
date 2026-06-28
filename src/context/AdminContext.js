// src/context/AdminContext.js
import { createContext, useContext, useState } from 'react';

const AdminContext = createContext(null);
const ADMIN_PASSWORD = 'eslam2005';
const ADMIN_SESSION_KEY = 'is_admin';

export function AdminProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(() => sessionStorage.getItem(ADMIN_SESSION_KEY) === '1');
  const [lockOpen, setLockOpen] = useState(false);
  const [pwd, setPwd] = useState('');
  const [pwdErr, setPwdErr] = useState(false);

  function openLock() { setLockOpen(true); }

  function tryUnlock() {
    if (pwd === ADMIN_PASSWORD) {
      setIsAdmin(true);
      sessionStorage.setItem(ADMIN_SESSION_KEY, '1');
      setLockOpen(false);
      setPwd('');
      return true;
    }
    setPwdErr(true);
    setTimeout(() => setPwdErr(false), 1200);
    return false;
  }

  function logout() {
    setIsAdmin(false);
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
  }

  function closeLock() {
    setLockOpen(false);
    setPwd('');
  }

  return (
    <AdminContext.Provider value={{
      isAdmin, lockOpen, pwd, pwdErr,
      openLock, tryUnlock, logout, closeLock, setPwd,
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
