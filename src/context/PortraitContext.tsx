import React, { createContext, useContext, useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface PortraitContextType {
  portraitUrl: string;
  setCustomPortrait: (url: string) => void;
  resetPortrait: () => void;
  isCustomPhoto: boolean;
}

const PortraitContext = createContext<PortraitContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'rajiv_portfolio_portrait_url';

export const PortraitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [portraitUrl, setPortraitUrl] = useState<string>(PORTFOLIO_DATA.personal.portraitImage);
  const [isCustomPhoto, setIsCustomPhoto] = useState<boolean>(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        setPortraitUrl(stored);
        setIsCustomPhoto(true);
      }
    } catch {
      // Local storage fallback
    }
  }, []);

  const setCustomPortrait = (url: string) => {
    setPortraitUrl(url);
    setIsCustomPhoto(true);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, url);
    } catch {
      // Local storage error handling
    }
  };

  const resetPortrait = () => {
    setPortraitUrl(PORTFOLIO_DATA.personal.portraitImage);
    setIsCustomPhoto(false);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch {
      // Local storage error handling
    }
  };

  return (
    <PortraitContext.Provider
      value={{
        portraitUrl,
        setCustomPortrait,
        resetPortrait,
        isCustomPhoto,
      }}
    >
      {children}
    </PortraitContext.Provider>
  );
};

export const usePortrait = (): PortraitContextType => {
  const context = useContext(PortraitContext);
  if (!context) {
    throw new Error('usePortrait must be used within a PortraitProvider');
  }
  return context;
};
