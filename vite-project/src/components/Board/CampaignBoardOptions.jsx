import '../../styles/Board/Board.scss';
import { Link } from 'react-router';

function CampaignBoardOptions() {
    return (
        <section className="board-options">
            <Link className="board-option" to="/create-campaign">Create campaign</Link>
            <Link className="board-option" to="/edit-campaign">Edit campaign</Link>
            <Link className="board-option" to="/delete-campaign">Delete campaign</Link>
        </section>
    )
}

export default CampaignBoardOptions