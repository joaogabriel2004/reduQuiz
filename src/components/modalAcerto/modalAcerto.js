import React from 'react';
import './stylemodalAcerto.css';

const Modal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-btn" onClick={onClose}>X</button>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Modal;
