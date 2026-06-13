import '../../styles/Board/Board.scss';

function CampaignBoardOptions() {
    return (
        <section className="campaign-board__options">
            <button type="button">
                <a className="campaign-board__option" href="/create-campaign">Create campaign</a>
            </button>
            <button type="button">
                <a className="campaign-board__option" href="/edit-campaign">Edit campaign</a>
            </button>
            <button type="button">
                <a className="campaign-board__option" href="/delete-campaign">Delete campaign</a>
            </button>
        </section>
    )
}

export default CampaignBoardOptions