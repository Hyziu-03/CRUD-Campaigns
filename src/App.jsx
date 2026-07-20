import CampaignHome from './components/CampaignHome'
import './styles/Global/App.scss'

function App() {
  return (
    <main className="app-shell" role="main">
      <meta name="description" content="A simple CRUD app for managing ad campaigns" />
      <title>CRUD Campaign Manager</title>
      <CampaignHome id="main-content" aria-label="Main campaign management interface" />
    </main>
  )
}

export default App
