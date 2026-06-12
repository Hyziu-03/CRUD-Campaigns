import ProductCampaignList from './components/ProductCampaignList'
import './styles/App.scss'
import campaigns from './data/campaigns.json'

function App() {
  return (
    <main className="app-shell">
      <ProductCampaignList campaigns={campaigns} />
    </main>
  )
}

export default App
