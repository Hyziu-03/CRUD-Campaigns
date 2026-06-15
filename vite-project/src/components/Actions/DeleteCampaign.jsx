import db from '../../Firebase-init'
import CampaignBoardHeader from '../Board/CampaignBoardHeader'
import { doc, deleteDoc } from "firebase/firestore";
import CampaignBoardMeta from '../Board/CampaignBoardMeta';
import useFirestoreCollection from '../../hooks/useFirestoreCollection'

function CampaignHome() {
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
        } catch (error) {
            console.error("Error deleting document: ", error);
            alert("Failed to delete campaign.");
        }
    }

    return (
        <section className="board" id="board" aria-labelledby="board-title">
            <CampaignBoardHeader />

            <CampaignBoardMeta campaignCount={campaigns.length} isLoading={isLoading} />

            <p className="meta-divider">Choose campaign to delete:</p>

            <section>
                {campaigns.length > 0 ? (
                    <ul className="list">
                        {campaigns.map((campaign) => (
                            <li key={campaign.id} className="list-selection">
                                <input
                                    type="radio"
                                    name="campaign"
                                    id={campaign.id}
                                />
                                <label htmlFor={campaign.id}>{campaign.name}</label>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="empty">
                        <h2>No campaigns yet</h2>
                        <p >Firestore returned an empty campaigns collection.</p>
                    </div>
                )}
            </section>

            <div className="board-options ">
                <button><a className="board-option" href="/" onClick={handleDeleteCampaign}>Delete campaign</a></button>

                <button>
                    <a className="board-option" href="/view-campaigns">
                        Cancel
                    </a>
                </button>
            </div>
        </section>
    )
}

export default CampaignHome
