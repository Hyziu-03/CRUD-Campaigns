import { useEffect, useState, useCallback } from 'react';
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import db from '../../Firebase-init';
import CampaignBoardHeader from '../Board/CampaignBoardHeader';
import CampaignBoardMeta from '../Board/CampaignBoardMeta';
import { Link, useNavigate } from 'react-router';

function CampaignHome() {
    const navigate = useNavigate();
    const [campaigns, setCampaigns] = useState([]);
    const [towns, setTowns] = useState([]);
    const [selectedCampaignId, setSelectedCampaignId] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);
    const [error, setError] = useState(null);

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
            if (!selectedRadio) {
                setError('Please select a campaign to edit.');
                return;
            }
            setSelectedCampaignId(selectedRadio.id);
            setShowEditForm(true);
            setError(null);
        } catch (error) {
            console.error('Error handling edit form:', error);
            setError('Failed to open edit form.');
        }
    }

    const handleEditCampaign = useCallback(async (event) => {
        try {
            event.preventDefault();
            if (!selectedCampaignId) {
                setError('No campaign selected.');
                return;
            }

            const inputFields = document.querySelectorAll(".board-edit-input");
            const updates = {};

            for (let i = 0; i < inputFields.length; i++) {
                const currentFieldName = inputFields[i].name;
                const currentFieldValue = inputFields[i].value;

                if (currentFieldValue) {
                    updates[currentFieldName] = currentFieldValue;
                }
            }

            if (Object.keys(updates).length > 0) {
                const currentCampaign = doc(db, "campaigns", selectedCampaignId);
                await updateDoc(currentCampaign, updates);
                navigate('/view-campaigns');
            } else {
                setError('No changes detected.');
            }
        } catch (error) {
            console.error('Error editing campaign:', error);
            setError('Failed to update campaign.');
        }
    }, [navigate, selectedCampaignId]);

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
        <section className="board" id="board" aria-labelledby="board-title">
            <CampaignBoardHeader />

            <CampaignBoardMeta
                campaignCount={campaigns.length}
                aria-label="Campaign statistics"
            />

            <p className="meta-divider" id="selection-instruction">
                Choose campaign to edit:
            </p>

            {error && (
                <div role="alert" aria-live="assertive" className="error-message">
                    {error}
                </div>
            )}

            <section aria-labelledby="selection-instruction">
                {campaigns.length > 0 ? (
                    <ul className="list" role="list" aria-label="Campaigns to edit">
                        {campaigns.map((campaign) => (
                            <li key={campaign.id} className="list-selection" role="listitem">
                                <input
                                    type="radio"
                                    name="campaign"
                                    className="form-input"
                                    id={campaign.id}
                                    onChange={() => handleEditForm()}
                                    aria-describedby={`campaign-${campaign.id}-desc`}
                                />
                                <label
                                    htmlFor={campaign.id}
                                    className="list-selection"
                                    id={`campaign-${campaign.id}-desc`}
                                >
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

            {showEditForm && selectedCampaignId && (
                <section aria-labelledby="edit-form-heading">
                    <h2 id="edit-form-heading">Edit Campaign Form</h2>
                    <ul className="list list-edit" role="list">
                        <form className="board-form" onSubmit={handleEditCampaign} aria-labelledby="edit-form-heading">
                            <label className="list-label">
                                <p className="list-selection" id="current-name">
                                    Current name: {selectedCampaign?.name}
                                </p>
                                <p className="list-selection-edit" id="new-name-desc">
                                    New name (leave blank to keep current value):
                                </p>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Spring launch push"
                                    className="form-input board-edit-input"
                                    aria-describedby="current-name new-name-desc"
                                    aria-label="New campaign name"
                                />
                            </label>

                            <label className="list-label">
                                <p className="list-selection" id="current-keywords">
                                    Current keywords: {selectedCampaign?.keywords?.split(" ")?.join(", ") || 'None'}
                                </p>
                                <p className="list-selection-edit" id="new-keywords-desc">
                                    New keywords (leave blank to keep current value):
                                </p>
                                <input
                                    type="text"
                                    name="keywords"
                                    placeholder="summer launch bundle"
                                    defaultValue={selectedCampaign?.keywords ?? ''}
                                    className="form-input board-edit-input"
                                    list="keyword-suggestions"
                                    aria-describedby="current-keywords new-keywords-desc"
                                    aria-label="New campaign keywords"
                                />
                            </label>

                            <label className="list-label">
                                <p className="list-selection" id="current-bid">
                                    Current bid amount: {selectedCampaign?.bidAmount}
                                </p>
                                <p className="list-selection-edit" id="new-bid-desc">
                                    New bid amount (leave blank to keep current value):
                                </p>
                                <input
                                    type="number"
                                    name="bidAmount"
                                    placeholder="1000"
                                    className="form-input board-edit-input"
                                    aria-describedby="current-bid new-bid-desc"
                                    aria-label="New bid amount"
                                />
                            </label>

                            <label className="list-label">
                                <p className="list-selection" id="current-fund">
                                    Current fund: {selectedCampaign?.fund}
                                </p>
                                <p className="list-selection-edit" id="new-fund-desc">
                                    New fund (leave blank to keep current value):
                                </p>
                                <input
                                    type="number"
                                    name="fund"
                                    placeholder="5000"
                                    className="form-input board-edit-input"
                                    aria-describedby="current-fund new-fund-desc"
                                    aria-label="New fund amount"
                                />
                            </label>

                            <label className="list-label">
                                <p className="list-selection" id="current-town">
                                    Current town: {selectedCampaign?.town}
                                </p>
                                <p className="list-selection-edit" id="new-town-desc">
                                    New town (leave blank to keep current value):
                                </p>
                                <select
                                    name="town"
                                    defaultValue={selectedCampaign?.town}
                                    className="form-input board-edit-input"
                                    aria-describedby="current-town new-town-desc"
                                    aria-label="New town"
                                >
                                    {towns.map((town) => (
                                        <option key={town.name} value={town.name}>
                                            {town.name}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label className="list-label">
                                <p className="list-selection" id="current-radius">
                                    Current radius: {selectedCampaign?.radius}
                                </p>
                                <p className="list-selection-edit" id="new-radius-desc">
                                    New radius (leave blank to keep current value):
                                </p>
                                <input
                                    type="number"
                                    name="radius"
                                    placeholder="10"
                                    className="form-input board-edit-input"
                                    aria-describedby="current-radius new-radius-desc"
                                    aria-label="New radius"
                                />
                            </label>

                            <label className="list-label">
                                <p className="list-selection" id="current-status">
                                    Current status: {selectedCampaign?.status}
                                </p>
                                <p className="list-selection-edit" id="new-status-desc">
                                    New status:
                                </p>
                                <select
                                    name="status"
                                    defaultValue={selectedCampaign?.status || "scheduled"}
                                    className="form-input board-edit-input"
                                    aria-describedby="current-status new-status-desc"
                                    aria-label="New status"
                                >
                                    <option value="on">On</option>
                                    <option value="off">Off</option>
                                </select>
                            </label>

                            <button type="submit" className="board-option" aria-label="Save campaign changes">
                                Save Changes
                            </button>
                        </form>

                        <datalist id="keyword-suggestions" aria-label="Keyword suggestions">
                            {keywordSuggestions.map((keyword) => (
                                <option key={keyword} value={keyword} />
                            ))}
                        </datalist>
                    </ul>
                </section>
            )}

            <div className="board-options" role="toolbar" aria-label="Campaign actions">
                <button
                    type="button"
                    className="board-option"
                    onClick={handleEditForm}
                    aria-label="Open edit form for selected campaign"
                    disabled={campaigns.length === 0}
                >
                    Edit campaign
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
    );
}

export default CampaignHome;