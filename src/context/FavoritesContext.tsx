import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { bookingStorage } from '@/services/bookingStorage';

interface FavoritesContextType {
  favorites: string[];
  isFavorite: (artistId: string) => boolean;
  toggleFavorite: (artistId: string) => void;
  favoritesCount: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    setFavorites(bookingStorage.getFavorites());
  }, []);

  const toggleFavorite = (artistId: string) => {
    const updated = bookingStorage.toggleFavorite(artistId);
    setFavorites([...updated]);
  };

  const isFavorite = (artistId: string) => {
    return favorites.includes(artistId);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        toggleFavorite,
        favoritesCount: favorites.length,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
