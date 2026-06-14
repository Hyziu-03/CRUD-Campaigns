import { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import db from '../../Firebase-init'
import CampaignBoardHeader from '../Board/CampaignBoardHeader'
import { doc, deleteDoc } from "firebase/firestore";
import CampaignBoardMeta from '../Board/CampaignBoardMeta';

function ProductCampaignList() {
    const [campaigns, setCampaigns] = useState([])

    useEffect(() => {
        try {
            const campaignsRef = collection(db, 'campaigns')

            const unsubscribe = onSnapshot(
                campaignsRef,
                (querySnapshot) => {
                    const campaignList = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }))
                    setCampaigns(campaignList)
                }
            )

            return () => unsubscribe()
        } catch (error) {
            console.error('Error fetching campaigns:', error)
        }
    }, [])

    const handleDeleteCampaign = async() => {
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
        <section className="campaign-board" id="campaign-board" aria-labelledby="campaign-board-title">
            <CampaignBoardHeader />

            <CampaignBoardMeta />

            <p className="campaign-meta__divider">Choose campaign to delete:</p>

            <section>
                {campaigns.length > 0 ? (
                    <ul className="campaign-list">
                        {campaigns.map((campaign) => (
                            <li key={campaign.id} className="campaign-list-selection">
                                <input
                                    type="radio"
                                    name="campaign"
                                    className="campaign-card__name"
                                    id={campaign.id}
                                />
                                <label htmlFor={campaign.id}>{campaign.name}</label>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="campaign-empty">
                        <h2>No campaigns yet</h2>
                        <p >Firestore returned an empty campaigns collection.</p>
                    </div>
                )}
            </section>

            <div className="campaign-board__options ">
                <button><a className="campaign-board__option" href="/" onClick={handleDeleteCampaign}>Delete campaign</a></button>

                <button>
                    <a className="campaign-board__option" href="/view-campaigns">
                        Cancel
                    </a>
                </button>
            </div>
        </section>
    )
}

export default ProductCampaignList
