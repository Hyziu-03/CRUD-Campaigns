import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router'
import App from './App.jsx'

const CreateCampaign = lazy(() => import('./components/Actions/CreateCampaign.jsx'))
const DeleteCampaign = lazy(() => import('./components/Actions/DeleteCampaign.jsx'))
const EditCampaign = lazy(() => import('./components/Actions/EditCampaign.jsx'))

export function RouteFallback() {
    return (
        <main className="app-shell" aria-busy="true">
            Loading page...
        </main>
    )
}

export default function AppRoutes() {
    return (
        <Suspense fallback={<RouteFallback />}>
            <Routes>
                <Route path="/view-campaigns" element={<App />} />
                <Route path="/create-campaign" element={<CreateCampaign />} />
                <Route path="/delete-campaign" element={<DeleteCampaign />} />
                <Route path="/edit-campaign" element={<EditCampaign />} />
                <Route path="/" element={<App />} />
            </Routes>
        </Suspense>
    )
}