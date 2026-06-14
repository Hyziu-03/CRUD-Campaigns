import { useEffect, useState, useCallback } from 'react';
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
        try {
            const campaignsRef = collection(db, 'campaigns');
            const unsubscribe = onSnapshot(campaignsRef, (querySnapshot) => {
                const campaignList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setCampaigns(campaignList);
            });
            return () => unsubscribe();
        } catch (error) {
            console.error('Error fetching campaigns:', error);
        }
    }, []);

    useEffect(() => {
        try {
            const townsRef = collection(db, 'towns');
            const unsubscribe = onSnapshot(townsRef, (querySnapshot) => {
                const townList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setTowns(townList);
            });
            return () => unsubscribe();
        } catch (error) {
            console.error('Error fetching towns:', error);
        }
    }, []);

    const handleEditForm = () => {
        try {
            const selectedRadio = document.querySelector('input[name="campaign"]:checked');

            setSelectedCampaignId(selectedRadio.id);
            setShowEditForm(true);
        } catch (error) {
            console.error('Error handling edit form:', error);
        }
    }

    const handleEditCampaign = useCallback(() => {
        try {
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
        } catch (error) {
            console.error('Error editing campaign:', error);
        }
    }, [selectedCampaignId]);

    const getSelectedCampaign = () => campaigns.find((campaign) => campaign.id === selectedCampaignId);

    const selectedCampaign = getSelectedCampaign();
    const keywordSuggestions = Array.from(
        new Set(
            campaigns.flatMap((campaign) => {
                const keywords = campaign.keywords ?? '';
                const keywordArray = Array.isArray(keywords)
                    ? keywords
                    : String(keywords).split(',');
                return keywordArray
                    .map((keyword) => String(keyword).trim())
                    .filter(Boolean);
            })
        )
    );

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
                                <label htmlFor={campaign.id} className="campaign-list-selection">{campaign.name}</label>
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
                            <label className="campaign-list__label">
                                <p className="campaign-list-selection">
                                    Current name: {selectedCampaign.name}
                                </p>
                                <p className="campaign-list-selection__edit">
                                    New name (leave blank to keep current value):
                                </p>
                                <input type="text" name="name" placeholder="Spring launch push" required className="campaign-form__input" />
                            </label>

                            <label className="campaign-list__label">
                                <p className="campaign-list-selection">
                                    Current keywords: {selectedCampaign.keywords.split(" ").join(", ")}
                                </p>
                                <p className="campaign-list-selection__edit">
                                    New keywords (leave blank to keep current value):
                                </p>
                                <input
                                    type="text"
                                    name="keywords"
                                    placeholder="summer launch bundle"
                                    defaultValue={selectedCampaign?.keywords ?? ''}
                                    required
                                    className="campaign-form__input"
                                    list="keyword-suggestions"
                                />
                            </label>

                            <label className="campaign-list__label">
                                <p className="campaign-list-selection">
                                    Current bid amount: {selectedCampaign.bidAmount}
                                </p>
                                <p className="campaign-list-selection__edit">

                                    New bid amount (leave blank to keep current value):

                                </p>
                                <input type="number" name="bidAmount" placeholder="1000" required className="campaign-form__input" />
                            </label>

                            <label className="campaign-list__label">
                                <p className="campaign-list-selection">
                                    Current fund: {selectedCampaign.fund}
                                </p>
                                <p className="campaign-list-selection__edit">

                                    New fund (leave blank to keep current value):
                                </p>
                                <input type="number" name="fund" placeholder="5000" required className="campaign-form__input" />
                            </label>

                            <label className="campaign-list__label">
                                <p className="campaign-list-selection">
                                    Current town: {selectedCampaign.town}
                                </p>
                                <p className="campaign-list-selection__edit">

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

                            <label className="campaign-list__label">
                                <p className="campaign-list-selection">Current radius: {selectedCampaign.radius}</p>
                                <p className="campaign-list-selection__edit">
                                    New radius (leave blank to keep current value):
                                </p>
                                <input type="number" name="radius" placeholder="10" required className="campaign-form__input" />
                            </label>

                            <label className="campaign-list__label">
                                <p className="campaign-list-selection">Current status: {selectedCampaign.status}</p>
                                <p className="campaign-list-selection__edit">

                                    New status:
                                </p>
                                <select name="status" defaultValue="scheduled" required className="campaign-form__input">
                                    <option value="on">On</option>
                                    <option value="off">Off</option>
                                </select>
                            </label>

                        </form>
                        <datalist id="keyword-suggestions">
                            {keywordSuggestions.map((keyword) => (
                                <option key={keyword} value={keyword} />
                            ))}
                        </datalist>

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