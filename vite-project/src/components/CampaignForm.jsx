import { collection, addDoc, onSnapshot } from "firebase/firestore";
import db from "../Firebase-init";
import { useState, useEffect } from "react";

function CampaignForm() {
    const [towns, setTowns] = useState([]);
    const [campaigns, setCampaigns] = useState([]);

    const [formData, setFormData] = useState({
        name: '',
        keywords: '',
        bidAmount: '',
        fund: '',
        town: '',
        radius: '',
        status: 'on'
    });

    const [errors, setErrors] = useState({
        name: '',
        keywords: '',
        bidAmount: '',
        fund: '',
        town: '',
        radius: '',
        status: ''
    });

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

    const keywordSuggestions = Array.from(
        new Set(
            campaigns.flatMap((campaign) =>
                String(campaign.keywords ?? '')
                    .split(/[\s,]+/)
                    .map((keyword) => keyword.trim())
                    .filter(Boolean)
            )
        )
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = { ...errors };

        if (!formData.name.trim()) {
            newErrors.name = 'Campaign name is required';
            valid = false;
        }

        if (!formData.keywords.trim()) {
            newErrors.keywords = 'Keywords are required';
            valid = false;
        }

        if (!formData.bidAmount) {
            newErrors.bidAmount = 'Bid amount is required';
            valid = false;
        } else if (isNaN(formData.bidAmount) || parseFloat(formData.bidAmount) <= 0) {
            newErrors.bidAmount = 'Bid amount must be a positive number';
            valid = false;
        }

        if (!formData.fund) {
            newErrors.fund = 'Fund is required';
            valid = false;
        } else if (isNaN(formData.fund) || parseFloat(formData.fund) <= 0) {
            newErrors.fund = 'Fund must be a positive number';
            valid = false;
        }

        if (!formData.town) {
            newErrors.town = 'Town is required';
            valid = false;
        }

        if (!formData.radius) {
            newErrors.radius = 'Radius is required';
            valid = false;
        } else if (isNaN(formData.radius) || parseFloat(formData.radius) <= 0) {
            newErrors.radius = 'Radius must be a positive number';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };


    async function handleSubmit(event) {
        event.preventDefault();

        try {
            if (validateForm()) {
                const docRef = await addDoc(collection(db, "campaigns"), formData);
                console.log("Document written with ID: ", docRef.id);
                window.location.reload();
            }
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return (
        <form className="campaign-board__form" onSubmit={handleSubmit} noValidate>
            <label className="campaign-list-selection">
                Campaign name:
                <input
                    type="text"
                    name="name"
                    placeholder="Spring launch push"
                    value={formData.name}
                    onChange={handleChange}
                    className="campaign-form__input"
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
            </label>

            <label className="campaign-list-selection">

                Keywords:
                <input
                    type="text"
                    name="keywords"
                    placeholder="summer launch bundle"
                    value={formData.keywords}
                    onChange={handleChange}
                    className="campaign-form__input"
                    list="keyword-suggestions"

                />
                {errors.keywords && <span className="error-message">{errors.keywords}</span>}
            </label>
            <datalist id="keyword-suggestions">
                {keywordSuggestions.map((keyword) => (
                    <option key={keyword} value={keyword} />
                ))}
            </datalist>

            <label className="campaign-list-selection">

                Bid amount:
                <input
                    type="number"
                    name="bidAmount"
                    placeholder="1000"
                    value={formData.bidAmount}
                    onChange={handleChange}
                    min="0.01"
                    step="0.01"
                    className="campaign-form__input"

                />
                {errors.bidAmount && <span className="error-message">{errors.bidAmount}</span>}
            </label>

            <label className="campaign-list-selection">

                Fund:
                <input
                    type="number"
                    name="fund"
                    placeholder="5000"
                    value={formData.fund}
                    onChange={handleChange}
                    min="0.01"
                    step="0.01"
                    className="campaign-form__input"

                />
                {errors.fund && <span className="error-message">{errors.fund}</span>}
            </label>

            <label className="campaign-list-selection">

                Town:
                <select
                    name="town"
                    value={formData.town}
                    onChange={handleChange}
                    required
                                        className="campaign-form__input"

                >
                    <option value="">Select a town</option>
                    {towns.map((town) => (
                        <option key={town.name} value={town.name}>
                            {town.name}
                        </option>
                    ))}
                </select>
                {errors.town && <span className="error-message">{errors.town}</span>}
            </label>

            <label className="campaign-list-selection">

                Radius (km):
                <input
                    type="number"
                    name="radius"
                    placeholder="10"
                    value={formData.radius}
                    onChange={handleChange}
                    min="1"
                    step="1"
                    className="campaign-form__input"
                />
                {errors.radius && <span className="error-message">{errors.radius}</span>}
            </label>

            <label className="campaign-list-selection">

                Status:
                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="campaign-form__input"
                >
                    <option value="on">On</option>
                    <option value="off">Off</option>
                </select>
                {errors.status && <span className="error-message">{errors.status}</span>}
            </label>

            <div className="campaign-board__options ">
                <button type="submit" id="campaign-form__submit">
                    <a href="" className="campaign-board__option"  onClick={handleSubmit}>
                        Save campaign
                    </a>
                </button>
                <button>
                    <a className="campaign-board__option" href="/view-campaigns">
                        Cancel
                    </a>
                </button>
            </div>
        </form>
    );
}


export default CampaignForm
