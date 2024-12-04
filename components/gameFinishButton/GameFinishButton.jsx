import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import styles from './GameFinishButton.module.css';

const GameFinishButton = ({ onFinish }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  const handleClick = () => {
    setMenuOpen(true);
  };

  const handleConfirm = () => {
    onFinish();
    setMenuOpen(false);
  };

  const handleCancel = () => {
    setMenuOpen(false);
  };

  return (
    <div className={styles.gameFinishContainer}>
      <button className={styles.gameFinishButton} onClick={handleClick}>
        Game Finish
      </button>
      {menuOpen && (
        <div className={styles.confirmationMenu} ref={menuRef}>
          <button className={styles.closeButton} onClick={handleCancel}>
            <X size={24} />
          </button>
          <div className={styles.confirmationText}>Confirm that this game is over?</div>
          <div className={styles.confirmationButtons}>
            <button className={styles.confirmButton} onClick={handleConfirm}>
              Confirm
            </button>
            <button className={styles.cancelButton} onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameFinishButton;
