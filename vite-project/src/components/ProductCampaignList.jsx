function ProductCampaignList({ campaigns = [] }) {
    return (
        <section className="campaign-board" aria-labelledby="campaign-board-title">
            <header className="campaign-board__header">
                <div>
                    <p className="campaign-board__eyebrow">Product campaigns</p>
                    <h1 id="campaign-board-title">Active campaigns at a glance</h1>
                    <p className="campaign-board__summary">
                        Track each campaign by product, channel, budget, and delivery status.
                    </p>
                </div>

                <div className="campaign-board__meta" aria-label="Campaign overview">
                    <span className="campaign-board__meta-label">Campaigns: </span>
                    <span className="campaign-board__meta-value">{campaigns.length}</span>
                </div>
            </header>

            {campaigns.length > 0 ? (
                <ul className="campaign-list">
                    {campaigns.map((campaign) => (
                        campaign.status === 'on' && (
                            <li key={campaign.id} className="campaign-card">
                                <h2 className="campaign-card__name">{campaign.name}</h2>
                                <p className="campaign-card__keywords">Keywords: {campaign.keywords.join(', ')}
                                </p>
                                <p className="campaign-card__bid-amount">Bid amount: {campaign.bidAmount}</p>
                                <p className="campaign-card__fund">Fund: {campaign.fund}</p>
                                <p className="campaign-card__status">Status: {campaign.status}</p>
                                <p className="campaign-card__town">Town: {campaign.town}</p>
                                <p className="campaign-card__radius">Radius: {campaign.radius} km</p>
                            </li>
                        )))}
                </ul>
            ) : (
                <div className="campaign-empty">
                    <h2>No campaigns yet</h2>
                    <p>Add campaign data to display it here.</p>
                </div>
            )}
        </section>
    )
}

export default ProductCampaignList
