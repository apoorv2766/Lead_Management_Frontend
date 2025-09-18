import { BrowserRouter, Routes, Route } from "react-router-dom";
import LeadForm from "./components/leadForm/LeadForm";
import ShowLeads from "./components/showLeads/AddLeads";
import Filter from "./components/filter/Filter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LeadProvider } from "../context";

function App() {
  return (
    <>
    <LeadProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LeadForm />} />
          {/* <Route path='/showLeads' element={<ShowLeads/>}/> */}
          <Route path="/filter" element={<Filter />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      </LeadProvider>
    </>
  );
}

export default App;
