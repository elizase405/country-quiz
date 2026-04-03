import { createContext, useState, ReactNode, useContext } from 'react';

interface PointsContextType {
  points: number;
  IncrementPoints: () => void;
  ResetPoints: () => void;
}

const PointsContext = createContext<PointsContextType | undefined>(undefined);

export const PointsProvider = ({ children }: { children: ReactNode }) => {
  const [points, setPoints] = useState(0);

  const IncrementPoints = () => {
    setPoints(prev => prev + 1)
  }
  const ResetPoints = () => {
    setPoints(0)
  }

  return (
    <PointsContext.Provider value={{ points, IncrementPoints, ResetPoints }}>
      {children}
    </PointsContext.Provider>
  );
}

export const usePointsContext = () => {
  const context = useContext(PointsContext);
  if (!context) {
    throw new Error('usePointsContext must be used within a PointsProvider.');
  }
  return context;
}