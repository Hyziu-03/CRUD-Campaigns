import { useEffect, useState } from 'react';
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import db from '../../Firebase-init';
import CampaignBoardHeader from '../Board/CampaignBoardHeader';
import CampaignBoardMeta from '../Board/CampaignBoardMeta';

function ProductCampaignList() {
    const [campaigns, setCampaigns] = useState([]);
    const [towns, setTowns] = useState([]);
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

    useEffect(() => {
        const townsRef = collection(db, 'towns');
        const unsubscribe = onSnapshot(townsRef, (querySnapshot) => {
            const townList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTowns(townList);
        });
        return () => unsubscribe();
    }, []);

    const handleEditForm = () => {
        const selectedRadio = document.querySelector('input[name="campaign"]:checked');

        setSelectedCampaignId(selectedRadio.id);
        setShowEditForm(true);
    }

    const handleEditCampaign = () => {
        event.preventDefault();

        const inputFields = document.querySelectorAll(".campaign-board__edit-input");

        for (let i = 0; i < inputFields.length; i++) {
            const currentFieldName = inputFields[i].name;
            const currentFieldValue = inputFields[i].value;

            if (currentFieldValue !== null || currentFieldValue !== undefined) {
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

            <p className="campaign-meta__divider">Choose campaign to edit:</p>

            <section>
                {campaigns.length > 0 ? (
                    <ul className="campaign-list">
                        {campaigns.map((campaign) => (
                            <li key={campaign.id} className="campaign-list-selection">
                                <input
                                    type="radio"
                                    name="campaign"
                                    className="campaign-form__input"
                                    id={campaign.id}
                                    onChange={() => handleEditForm(campaign.id)}
                                />
                                <label htmlFor={campaign.id} classname="campaign-form-label">{campaign.name}</label>
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
                    {<ul className="campaign-list campaign-list__edit">

                        <form className="campaign-board__form">
                            <label>
                                <p className="campaign-form-label">
                                    Current name: {selectedCampaign.name}
                                </p>
                                <p className="campaign-form-label__edit">
                                    New name (leave blank to keep current value):


                                </p>
                                <input type="text" name="name" placeholder="Spring launch push" required className="campaign-form__input" />
                            </label>

                            <label>
                                <p className="campaign-form-label">
                                    Current keywords: {selectedCampaign.keywords.split(" ").join(", ")}
                                </p>
                                <p className="campaign-form-label__edit">
                                    New keywords (leave blank to keep current value):
                                </p>
                                <input type="text" name="keywords" placeholder="summer launch bundle" required className="campaign-form__input" />
                            </label>

                            <label>
                                <p className="campaign-form-label">
                                    Current bid amount: {selectedCampaign.bidAmount}
                                </p>
                                <p className="campaign-form-label__edit">

                                    New bid amount (leave blank to keep current value):

                                </p>
                                <input type="number" name="bidAmount" placeholder="1000" required className="campaign-form__input" />
                            </label>

                            <label>
                                <p className="campaign-form-label">
                                    Current fund: {selectedCampaign.fund}
                                </p>
                                <p className="campaign-form-label__edit">

                                New fund (leave blank to keep current value):
                                </p>
                                <input type="number" name="fund" placeholder="5000" required className="campaign-form__input" />
                            </label>

                            <label>
                                <p className="campaign-form-label">
                                    Current town: {selectedCampaign.town}
                                </p>
                                <p className="campaign-form-label__edit">

                                    New town (leave blank to keep current value):
                                </p>
                                <select
                                    name="town"
                                    defaultValue={selectedCampaign.town}
                                    required
                                    className="campaign-form__input"
                                >
                                    {towns.map((town) => (
                                        <option key={town.name} value={town.name}>
                                            {town.name}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label>
                                <p className="campaign-form-label">Current radius: {selectedCampaign.radius}</p>
                                <p className="campaign-form-label__edit">
                                    New radius (leave blank to keep current value):
                                </p>
                                <input type="number" name="radius" placeholder="10" required className="campaign-form__input" />
                            </label>

                            <label>
                                <p className="campaign-form-label">Current status: {selectedCampaign.status}</p>
                                <p className="campaign-form-label__edit">

                                New status:
                                </p>
                                <select name="status" defaultValue="scheduled" required className="campaign-form__input">
                                    <option value="on">On</option>
                                    <option value="off">Off</option>
                                </select>
                            </label>

                        </form>

                    </ul>}
                </div>
            )}

            <div className="campaign-board__options ">
                <button type="button" onClick={handleEditCampaign}>
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