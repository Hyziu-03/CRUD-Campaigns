import '../../styles/Board/Board.scss';
import Icon from '../Icon';

export default function CampaignBoardHeader() {
    return (
        <header className="board-header">
            <p className="board-eyebrow">Product campaigns</p>
            <section className="header-title">
                <Icon />
                <h1 id="board-title">Manage current marketing issues</h1>
            </section>
            <p>
                Track each campaign by product, budget, area or fund status.
            </p>
        </header>
    )
}
