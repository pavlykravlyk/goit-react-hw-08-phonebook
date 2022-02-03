import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, Window } from './Modal.styled';

export default function Modal({ onClose, children }) {
  const handleOverlayClick = ({ currentTarget, target }) => {
    currentTarget === target && onClose();
  };

  useEffect(() => {
    const handleKeyDown = ({ code }) => code === 'Escape' && onClose();
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return createPortal(
    <Overlay onClick={handleOverlayClick}>
      <Window>{children}</Window>
    </Overlay>,
    document.querySelector('#modal-root'),
  );
}
