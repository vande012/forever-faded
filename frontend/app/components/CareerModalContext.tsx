"use client";

import React, { createContext, useState, useContext } from 'react';
import { CareerApplicationModal } from './CareerApplicationModal';

// Define the context type
type CareerModalContextType = {
  openModal: () => void;
  closeModal: () => void;
};

// Create context with default values
const CareerModalContext = createContext<CareerModalContextType>({
  openModal: () => {},
  closeModal: () => {},
});

// Custom hook to use the career modal context
export const useCareerModal = () => useContext(CareerModalContext);

// Provider component
export const CareerModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <CareerModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <CareerApplicationModal isOpen={isOpen} onOpenChange={setIsOpen} />
    </CareerModalContext.Provider>
  );
}; 