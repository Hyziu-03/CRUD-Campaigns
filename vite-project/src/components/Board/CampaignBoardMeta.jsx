import '../../styles/Board/Board.scss';

export default function CampaignBoardMeta({ campaignCount = 0, isLoading = false }) {

    return (
        <div className="campaign-board__meta" aria-label="Campaign overview">
            Campaigns in general: {isLoading ? 'Loading…' : campaignCount}
        </div>
    )
}
