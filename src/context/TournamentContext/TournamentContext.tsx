import { useState, createContext, useContext, useEffect } from 'react';

import { tournamentRegionalId } from 'constants/tournamentInfo';

import type { Dispatch, SetStateAction, ReactNode } from 'react';

interface TournamentContextProps {
  tournamentId: string;
  setTournamentId: Dispatch<SetStateAction<string>>;
}

const TournamentContext = createContext<TournamentContextProps | undefined>(undefined);

const getPreferredTournament = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedTournament = window.localStorage.getItem('melbourne-tcg-tournament-id');
    if (storedTournament) {
      return storedTournament;
    }
  }

  return tournamentRegionalId;
};

function TournamentProvider({ children }: { children: ReactNode }) {
  const [tournamentId, setTournamentId] = useState(() => {
    return getPreferredTournament();
  });

  const checkTournamentId = (id: string) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('melbourne-tcg-tournament-id', id);
  };

  useEffect(() => {
    checkTournamentId(tournamentId);
  }, [tournamentId]);

  return (
    <TournamentContext.Provider
      value={{
        tournamentId,
        setTournamentId,
      }}
    >
      {children}
    </TournamentContext.Provider>
  );
}

function useTournament() {
  const context = useContext(TournamentContext);
  if (context === undefined) {
    throw new Error('useTournament must be used within a TournamentProvider');
  }
  return context;
}

export { TournamentProvider, useTournament, TournamentContext };
