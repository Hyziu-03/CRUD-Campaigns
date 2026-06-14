import '../../styles/Board/Board.scss';

export default function CampaignBoardMeta({ campaignCount = 0, isLoading = false }) {

    return (
        <div className="board-meta" aria-label="Campaign overview">
            Campaigns in general: {isLoading ? 'Loading…' : campaignCount}
        </div>
    )
}
