import { useEffect, useState } from 'react';
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import db from '../../Firebase-init';
import CampaignBoardHeader from '../Board/CampaignBoardHeader';
import CampaignBoardMeta from '../Board/CampaignBoardMeta';

function ProductCampaignList() {
    const [campaigns, setCampaigns] = useState([]);
    const [selectedCampaignId, setSelectedCampaignId] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);  

    useEffect(() => {
        const campaignsRef = collection(db, 'campaigns');
        const unsubscribe = onSnapshot(campaignsRef, (querySnapshot) => {
            const campaignList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setCampaigns(campaignList);
        });
        return () => unsubscribe();
    }, []);

    const handleEditForm = () => { 
        const selectedRadio = document.querySelector('input[name="campaign"]:checked');

        setSelectedCampaignId(selectedRadio.id);
        setShowEditForm(true);
    }

    const handleEditCampaign = (    ) => {
        const inputFields = document.querySelectorAll(".campaign-board__edit-input");

        for(let i = 0; i < inputFields.length; i++) {
            const currentFieldName = inputFields[i].name;
            const currentFieldValue = inputFields[i].value;
            
            if(currentFieldValue !== null || currentFieldValue !== undefined) { 
                const currentCampaign = doc(db, "campaigns", selectedCampaignId);
                updateDoc(currentCampaign, {
                    [currentFieldName]: currentFieldValue
                })
            }
        }
    };

    function getSelectedCampaign() {
        return campaigns.find((campaign) => campaign.id === selectedCampaignId);
    }

    const selectedCampaign = getSelectedCampaign();

    return (
        <section className="campaign-board" id="campaign-board" aria-labelledby="campaign-board-title">
            <CampaignBoardHeader />
            <CampaignBoardMeta />

            <section>
                {campaigns.length > 0 ? (
                    <ul className="campaign-list">
                        {campaigns.map((campaign) => (
                            <li key={campaign.id} className="campaign-card">
                                <input
                                    type="radio"
                                    name="campaign"
                                    className="campaign-card__name"
                                    id={campaign.id}
                                    onChange={() => handleEditForm(campaign.id)}
                                />
                                <label htmlFor={campaign.id}>{campaign.name}</label>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="campaign-empty">
                        <h2>No campaigns yet</h2>
                        <p>Firestore returned an empty campaigns collection.</p>
                    </div>
                )}
            </section>

            {showEditForm && selectedCampaignId && (
                <div>
                    {<ul className="campaign-list">

                        <form className="campaign-board__form">
                            <label>
                                <p className="campaign-board__form-name">
                                    Current name: {selectedCampaign.name}
                                </p>
                                New name (leave blank to keep current value):
                                <input type="text" name="name" placeholder="Spring launch push" required className="campaign-board__edit-input"/>
                            </label>

                            <label>
                                <p className="campaign-board__form-name">
                                    Current keywords: {selectedCampaign.keywords.split(" ").join(", ")}
                                </p>
                                New keywords (leave blank to keep current value):
                                <input type="text" name="keywords" placeholder="summer launch bundle" required className="campaign-board__edit-input" />
                            </label>

                            <label>
                                <p className="campaign-board__form-name">
                                    Current bid amount: {selectedCampaign.bidAmount}
                                </p>
                                New bid amount (leave blank to keep current value):
                                <input type="number" name="bidAmount" placeholder="1000" required className="campaign-board__edit-input" />
                            </label>

                            <label>
                                <p className="campaign-board__form-name">
                                    Current fund: {selectedCampaign.fund}
                                </p>
                                New fund (leave blank to keep current value):
                                <input type="number" name="fund" placeholder="5000" required className="campaign-board__edit-input" />
                            </label>

                            <label>
                                <p className="campaign-board__form-name">
                                    Current town: {selectedCampaign.town}
                                </p>
                                New town (leave blank to keep current value):
                                <input type="text" name="town" placeholder="Springfield" required className="campaign-board__edit-input" />
                            </label>

                            <label>
                                <p className="campaign-board__form-name">Current radius: {selectedCampaign.radius}</p>
                                New radius (leave blank to keep current value):
                                <input type="number" name="radius" placeholder="10" required className="campaign-board__edit-input" />
                            </label>

                            <label>
                                <p className="campaign-board__form-name">{selectedCampaign.status}</p>

                                New status:
                                <select name="status" defaultValue="scheduled" required className="campaign-board__edit-input">
                                    <option value="on">On</option>
                                    <option value="off">Off</option>
                                </select>
                            </label>

                        </form>

                    </ul>}
                </div>
            )}

            <div className="campaign-board__form-actions">
                <button className="campaign-board__option" type="button" onClick={handleEditCampaign}>
                    <a className="campaign-board__option" href="/">
                        Edit campaign
                    </a>
                </button>
                <button>
                    <a className="campaign-board__option" href="/view-campaigns">
                        Cancel
                    </a>
                </button>
            </div>
        </section>
    );
}

export default ProductCampaignList;