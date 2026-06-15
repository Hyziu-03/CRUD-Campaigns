import '../../styles/Board/Board.scss';

export default function CampaignBoardMeta({ campaignCount = 0, isLoading = false }) {
    return (
        <section
            className="board-meta"
            role="status"
            aria-live="polite"
            aria-atomic="true"
            aria-label="Campaign count"
        >
            <span>Total campaigns: </span>
            {isLoading ? (
                <span aria-busy="true" aria-label="Loading campaign count">
                    Loading…
                </span>
            ) : (
                <span aria-label={`Total of ${campaignCount} campaigns`}>
                    {campaignCount}
                </span>
            )}
        </section>
    )
}