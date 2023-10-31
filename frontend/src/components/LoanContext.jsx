import React, { createContext, useState, useContext } from "react";

const LoanContext = createContext();

export const useLoans = () => {
  return useContext(LoanContext);
};
export const LoanProvider = ({ children }) => {
  const [loanedMovies, setLoanedMovies] = useState([]);

  return (
    <LoanContext.Provider value={[loanedMovies, setLoanedMovies]}>
      {children}
    </LoanContext.Provider>
  );
};

export default LoanContext;
