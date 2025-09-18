import { createContext, useState, useContext } from "react";

const LeadContext = createContext();

export const LeadProvider = ({ children }) => {
  const [showAddLead, setShowAddLead] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [leadAdded, setLeadAdded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <LeadContext.Provider
      value={{
        showAddLead,
        setShowAddLead,
        showFilter,
        setShowFilter,
        leadAdded,
        setLeadAdded,
        searchTerm,
        setSearchTerm
      }}
    >
      {children}
    </LeadContext.Provider>
  );
};

export const useLeadContext = () => useContext(LeadContext);
