import '../../styles/Board/Board.scss';

export default function CampaignBoardList({ campaigns = [], isLoading = false }) {
    return (
        <section aria-labelledby="campaigns-heading">
            {isLoading ? (
                <section
                    className="empty"
                    role="status"
                    aria-live="polite"
                    aria-busy="true"
                >
                    <h2 id="loading-heading">Loading campaigns...</h2>
                    <p aria-describedby="loading-heading">
                        Fetching the latest campaign list from Firestore.
                    </p>
                </section>
            ) : campaigns.length > 0 ? (
                <ul className="list" role="list" aria-label="Marketing campaigns">
                    {campaigns.map((campaign) => (

                        <li key={campaign.id} className="card" aria-label={`Campaign: ${campaign.name}`}>
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
                <section
                    className="empty"
                    role="status"
                    aria-live="polite"
                >
                    <h2 id="no-campaigns-heading">No campaigns yet</h2>
                    <p aria-describedby="no-campaigns-heading">
                        Firestore returned an empty campaigns collection.
                    </p>
                </section>
            )}
        </section>
    )
}