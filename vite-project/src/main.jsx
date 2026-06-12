import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from "react-router";
import CreateCampaign from './components/Actions/CreateCampaign.jsx';
import DeleteCampaign from './components/Actions/DeleteCampaign.jsx';
import EditCampaign from './components/Actions/EditCampaign.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/view-campaigns" element={<App />} />
        <Route path="/create-campaign" element={<CreateCampaign />} />
        <Route path="/delete-campaign" element={<DeleteCampaign />} />
        <Route path="/edit-campaign" element={<EditCampaign />} />
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
