import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Signature Henna Bloom Interaction Listener
document.addEventListener('pointerdown', (e) => {
  const target = (e.target as HTMLElement)?.closest('.btn, button, .btn-primary, .btn-secondary, .btn-ink, .btn-ghost, .btn-icon') as HTMLElement;
  if (!target) return;

  const rect = target.getBoundingClientRect();
  const x = `${e.clientX - rect.left}px`;
  const y = `${e.clientY - rect.top}px`;

  target.style.setProperty('--x', x);
  target.style.setProperty('--y', y);

  target.classList.remove('is-blooming');
  void target.offsetWidth; // trigger reflow
  target.classList.add('is-blooming');

  setTimeout(() => {
    target.classList.remove('is-blooming');
  }, 650);
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
