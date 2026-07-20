import { collection, addDoc } from "firebase/firestore";
import db from "../../Firebase-init";
import { useState, useCallback } from "react";
import FormButtons from "./FormButtons";
import NameInput from "../Inputs/NameInput";
import BidAmountInput from "../Inputs/BidAmountInput";
import FundInput from "../Inputs/FundInput";
import RadiusInput from "../Inputs/RadiusInput";
import KeywordsInput from "../Inputs/KeywordsInput";
import TownInput from "../Inputs/TownInput";

function CampaignForm({ towns = [], campaigns = [] }) {
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

    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        try {
            const { name, value } = e.target;
            setFormData(prev => ({ ...prev, [name]: value }));

            if (errors[name]) 
                setErrors(prev => ({ ...prev, [name]: '' }));
        } catch (error) {
            console.error('Error handling input change:', error);
        }
    };

    const validateForm = useCallback(() => {
        try {
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
        } catch (error) {
            console.error('Validation error:', error);
            return false;
        }
    }, [formData, errors]);

    async function handleSubmit(event) {
        event.preventDefault();
        setSubmitStatus(null);

        try {
            if (!validateForm()) {
                setSubmitStatus('error');
                return;
            }

            setSubmitStatus('submitting');
            // eslint-disable-next-line no-unused-vars
            const docRef = await addDoc(collection(db, "campaigns"), formData);
            setSubmitStatus('success');
            window.location.reload();
        } catch (e) {
            console.error("Error adding document: ", e);
            setSubmitStatus('error');
        }
    }

    return (
        <form
            className="board-form"
            onSubmit={handleSubmit}
            noValidate
            aria-labelledby="form-heading"
            aria-describedby="form-description"
        >
            <fieldset>
                <NameInput formData={formData} handleChange={handleChange} errors={errors} />
                <KeywordsInput formData={formData} handleChange={handleChange} errors={errors} campaigns={campaigns} />
                <BidAmountInput formData={formData} handleChange={handleChange} errors={errors} />
                <FundInput formData={formData} handleChange={handleChange} errors={errors} />
                <TownInput formData={formData} handleChange={handleChange} errors={errors} towns={towns} />
                <RadiusInput formData={formData} handleChange={handleChange} errors={errors} />
            </fieldset>

            <FormButtons submitStatus={submitStatus} />
        </form>
    );
}

export default CampaignForm;
