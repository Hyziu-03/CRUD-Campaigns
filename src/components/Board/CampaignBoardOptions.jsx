import '../../styles/Board/Board.scss';
import { Link } from 'react-router';

function CampaignBoardOptions() {
    return (
        <nav
            className="board-options"
            role="navigation"
            aria-label="Main campaign actions"
        >
            <Link
                className="board-option"
                to="/create-campaign"
                role="link"
                aria-label="Create a new marketing campaign"
            >
                Create campaign
            </Link>

            <Link
                className="board-option"
                to="/edit-campaign"
                role="link"
                aria-label="Edit an existing marketing campaign"
            >
                Edit campaign
            </Link>

            <Link
                className="board-option"
                to="/delete-campaign"
                role="link"
                aria-label="Delete a marketing campaign"
            >
                Delete campaign
            </Link>
        </nav>
    )
}

export default CampaignBoardOptions