import db from '../../Firebase-init'
import CampaignBoardHeader from '../Board/CampaignBoardHeader'
import { doc, deleteDoc } from "firebase/firestore";
import CampaignBoardMeta from '../Board/CampaignBoardMeta';
import useFirestoreCollection from '../../hooks/useFirestoreCollection'
import { Link, useNavigate } from 'react-router';

function CampaignHome() {
    const navigate = useNavigate();
    const { items: campaigns, isLoading } = useFirestoreCollection('campaigns')

    const handleDeleteCampaign = async (event) => {
        try {
            event.preventDefault();
            const selectedRadio = document.querySelector('input[name="campaign"]:checked');
            if (!selectedRadio) {
                alert("Please select a campaign to delete.");
                return;
            }
            const targetCampaignId = selectedRadio.id;
            await deleteDoc(doc(db, "campaigns", targetCampaignId));
            alert("Document deleted successfully!");
            navigate('/view-campaigns');
        } catch (error) {
            console.error("Error deleting document: ", error);
            alert("Failed to delete campaign.");
        }
    }

    return (
        <section className="board" id="board" aria-labelledby="board-title">
            <CampaignBoardHeader />

            <CampaignBoardMeta
                campaignCount={campaigns.length}
                isLoading={isLoading}
                aria-label="Campaign statistics"
            />

            <p className="meta-divider" id="selection-instruction">
                Choose campaign to delete:
            </p>

            <section aria-labelledby="selection-instruction">
                {campaigns.length > 0 ? (
                    <ul className="list" role="list" aria-label="Campaigns to delete">
                        {campaigns.map((campaign) => (
                            <li key={campaign.id} className="list-selection" role="listitem">
                                <input
                                    type="radio"
                                    name="campaign"
                                    id={campaign.id}
                                    aria-describedby={`campaign-${campaign.id}-desc`}
                                />
                                <label htmlFor={campaign.id} id={`campaign-${campaign.id}-desc`}>
                                    {campaign.name}
                                </label>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="empty" role="status" aria-live="polite">
                        <h2 id="no-campaigns-heading">No campaigns yet</h2>
                        <p aria-describedby="no-campaigns-heading">
                            Firestore returned an empty campaigns collection.
                        </p>
                    </div>
                )}
            </section>

            <div className="board-options" role="toolbar" aria-label="Campaign actions">
                <button
                    type="button"
                    className="board-option"
                    onClick={handleDeleteCampaign}
                    aria-label="Delete selected campaign"
                    disabled={campaigns.length === 0}
                >
                    Delete campaign
                </button>
                <Link
                    className="board-option"
                    to="/view-campaigns"
                    role="button"
                    aria-label="Cancel and return to campaigns list"
                >
                    Cancel
                </Link>
            </div>
        </section>
    )
}

export default CampaignHome