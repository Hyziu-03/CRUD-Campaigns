import '../../styles/Board/Board.scss';

function CampaignBoardOptions() {
    return (
        <section className="board-options">
            <button type="button">
                <a className="board-option" href="/create-campaign">Create campaign</a>
            </button>
            <button type="button">
                <a className="board-option" href="/edit-campaign">Edit campaign</a>
            </button>
            <button type="button">
                <a className="board-option" href="/delete-campaign">Delete campaign</a>
            </button>
        </section>
    )
}

export default CampaignBoardOptions