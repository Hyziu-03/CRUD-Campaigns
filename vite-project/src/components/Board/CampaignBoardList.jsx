import '../../styles/Board/Board.scss';


export default function CampaignBoardList({ campaigns = [], isLoading = false }) {

    return (
        <section>
            {isLoading ? (
                <div className="campaign-empty">
                    <h2>Loading campaigns</h2>
                    <p>Fetching the latest campaign list from Firestore.</p>
                </div>
            ) : campaigns.length > 0 ? (
                <ul className="campaign-list">
                    {campaigns.map((campaign) => (
                        <li key={campaign.id} className="campaign-card">
                            <h2>{campaign.name}</h2>
                            <p>Keywords: {campaign.keywords.split(" ").join(", ")}</p>
                            <p>Bid amount: {campaign.bidAmount}</p>
                            <p>Fund: {campaign.fund}</p>
                            <p>Status: {campaign.status}</p>
                            <p>Town: {campaign.town}</p>
                            <p>Radius: {campaign.radius} km</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="campaign-empty">
                    <h2>No campaigns yet</h2>
                    <p>Firestore returned an empty campaigns collection.</p>
                </div>
            )}
        </section>
    )
}

