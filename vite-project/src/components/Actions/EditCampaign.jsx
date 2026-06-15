import { useEffect, useState, useCallback } from 'react';
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import db from '../../Firebase-init';
import CampaignBoardHeader from '../Board/CampaignBoardHeader';
import CampaignBoardMeta from '../Board/CampaignBoardMeta';
import { Link, useNavigate } from 'react-router';
import { selectedCampaign } from '../CampaignTools';
import FormEdit from '../Form/FormEdit';

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
                <section role="alert" aria-live="assertive" className="error-message">
                    {error}
                </section>
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
                    <section className="empty" role="status" aria-live="polite">
                        <h2 id="no-campaigns-heading">No campaigns yet</h2>
                        <p aria-describedby="no-campaigns-heading">
                            Firestore returned an empty campaigns collection.
                        </p>
                    </section>
                )}
            </section>

            <FormEdit selectedCampaign={selectedCampaign} towns={towns} handleEditCampaign={handleEditCampaign} showEditForm={showEditForm} selectedCampaignId={selectedCampaignId} campaigns={campaigns} />

            <section className="board-options" role="toolbar" aria-label="Campaign actions">
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
            </section>
        </section>
    );
}

export default CampaignHome;