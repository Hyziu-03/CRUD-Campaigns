import CampaignHome from './components/CampaignHome'
import './styles/Global/App.scss'

function App() {
  return (
    <main className="app-shell">
      <meta name="description" content="A simple CRUD app for managing ad campaigns" />
      <title>CRUD Campaign Manager</title>
      <CampaignHome />
    </main>
  )
}

export default App
