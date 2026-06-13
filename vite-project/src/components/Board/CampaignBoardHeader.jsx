import '../../styles/Board/Board.scss';

export default function CampaignBoardHeader() {
    return (
        <header className="campaign-board__header">
            <p className="campaign-board__eyebrow">Product campaigns</p>
            <h1 id="campaign-board-title">Manage current marketing issues</h1>
            <p className="campaign-board__summary">
                Track each campaign by product, budget, area or fund status.
            </p>
        </header>
    )
}
