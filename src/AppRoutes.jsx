import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import App from './App.jsx'

const CreateCampaign = lazy(() => import('./components/Actions/CreateCampaign.jsx'))
const DeleteCampaign = lazy(() => import('./components/Actions/DeleteCampaign.jsx'))
const EditCampaign = lazy(() => import('./components/Actions/EditCampaign.jsx'))

export function RouteFallback() {
    return (
        <main
            className="app-shell"
            role="main"
            aria-busy="true"
            aria-live="polite"
            aria-label="Loading page content"
        >
            <section role="status" aria-live="polite">
                Loading page...
            </section>
        </main>
    )
}

export default function AppRoutes() {
    return (
        <Suspense fallback={<RouteFallback />}>
            <Routes aria-label="Campaign management navigation">
                <Route
                    path="/view-campaigns"
                    element={<App />}
                    aria-label="View all campaigns page"
                />
                <Route
                    path="/create-campaign"
                    element={<CreateCampaign />}
                    aria-label="Create new campaign page"
                />
                <Route
                    path="/delete-campaign"
                    element={<DeleteCampaign />}
                    aria-label="Delete campaign page"
                />
                <Route
                    path="/edit-campaign"
                    element={<EditCampaign />}
                    aria-label="Edit campaign page"
                />
                <Route
                    path="/"
                    element={<App />}
                    aria-label="Home page"
                />
                <Route
                    path="*"
                    element={<Navigate to="/view-campaigns" replace />}
                    aria-label="Redirect to view campaigns"
                />
            </Routes>
        </Suspense>
    )
}