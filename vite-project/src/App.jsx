import ProductCampaignList from './components/ProductCampaignList'
import './styles/App.css'

function App() {
  const campaigns = [
    {
      id: 1,
      name: 'Summer Launch Bundle',
      keywords: ['summer', 'launch', 'bundle'],
      bidAmount: 1000,
      fund: 5000,
      status: 'on',
      town: 'Springfield',
      radius: 10,
    },
    {
      id: 2,
      name: 'Retail Partner Push',
      keywords: ['retail', 'partner', 'push'],
      bidAmount: 500,
      fund: 2000,
      status: 'off',
      town: 'Shelbyville',
      radius: 20,
    },
    {
      id: 3,
      name: 'Retention Winback',
      keywords: ['retention', 'winback'],
      bidAmount: 750,
      fund: 3000,
      status: 'on',
      town: 'Ogdenville',
      radius: 15,
    },
  ]

  return (
    <main className="app-shell">
      <ProductCampaignList campaigns={campaigns} />
    </main>
  )
}

export default App
