import '../../styles/Board/Board.scss';

export default function CampaignBoardHeader() {
    return (
        <header className="board-header" role="banner">
            <p className="board-eyebrow" aria-label="Section category">
                Product campaigns
            </p>

            <h1 id="board-title" tabIndex="-1">
                Manage current marketing issues
            </h1>

            <p aria-label="Section description">
                Track each campaign by product, budget, area or fund status.
            </p>
        </header>
    )
}