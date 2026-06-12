import { collection, addDoc, onSnapshot } from "firebase/firestore";
import db from "../Firebase-init";
import { useState, useEffect } from "react";

function CampaignForm() {
    const [towns, setTowns] = useState([]);

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

        const formData = new FormData(event.currentTarget);
        const submittedData = Object.fromEntries(formData.entries());

        try {
            if (validateForm()) {
                const docRef = await addDoc(collection(db, "campaigns"), submittedData);
                console.log("Document written with ID: ", docRef.id);
            }
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return (
        <form className="campaign-board__form" onSubmit={handleSubmit} noValidate>
            <label>
                Campaign name
                <input
                    type="text"
                    name="name"
                    placeholder="Spring launch push"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
            </label>

            <label>
                Keywords
                <input
                    type="text"
                    name="keywords"
                    placeholder="summer launch bundle"
                    value={formData.keywords}
                    onChange={handleChange}
                    className={errors.keywords ? 'error' : ''}
                />
                {errors.keywords && <span className="error-message">{errors.keywords}</span>}
            </label>

            <label>
                Bid amount
                <input
                    type="number"
                    name="bidAmount"
                    placeholder="1000"
                    value={formData.bidAmount}
                    onChange={handleChange}
                    min="0.01"
                    step="0.01"
                    className={errors.bidAmount ? 'error' : ''}
                />
                {errors.bidAmount && <span className="error-message">{errors.bidAmount}</span>}
            </label>

            <label>
                Fund
                <input
                    type="number"
                    name="fund"
                    placeholder="5000"
                    value={formData.fund}
                    onChange={handleChange}
                    min="0.01"
                    step="0.01"
                    className={errors.fund ? 'error' : ''}
                />
                {errors.fund && <span className="error-message">{errors.fund}</span>}
            </label>

            <label>
                Town
                <select
                    name="town"
                    value={formData.town}
                    onChange={handleChange}
                    required
                    className={`campaign-board__edit-input ${errors.town ? 'error' : ''}`}
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

            <label>
                Radius (km)
                <input
                    type="number"
                    name="radius"
                    placeholder="10"
                    value={formData.radius}
                    onChange={handleChange}
                    min="1"
                    step="1"
                    className={errors.radius ? 'error' : ''}
                />
                {errors.radius && <span className="error-message">{errors.radius}</span>}
            </label>

            <label>
                Status
                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className={errors.status ? 'error' : ''}
                >
                    <option value="on">On</option>
                    <option value="off">Off</option>
                </select>
                {errors.status && <span className="error-message">{errors.status}</span>}
            </label>

            <div className="campaign-board__form-actions">
                <button className="campaign-board__form-options" type="submit">
                    Save campaign
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
