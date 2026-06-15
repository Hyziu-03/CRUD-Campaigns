import { collection, addDoc } from "firebase/firestore";
import db from "../Firebase-init";
import { useState, useCallback } from "react";
import { Link } from "react-router";

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
        try {
            const { name, value } = e.target;
            setFormData(prev => ({ ...prev, [name]: value }));

            if (errors[name]) {
                setErrors(prev => ({ ...prev, [name]: '' }));
            }
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
                <div className="form-group" role="group" aria-labelledby="name-label">
                    <label id="name-label" className="list-selection" htmlFor="name">
                        Campaign name:
                    </label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Spring launch push"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-input"
                        aria-describedby="name-error"
                        aria-required="true"
                        required
                    />
                    {errors.name && (
                        <span id="name-error" className="error-message" role="alert" aria-live="assertive">
                            {errors.name}
                        </span>
                    )}
                </div>

                <div className="form-group" role="group" aria-labelledby="keywords-label">
                    <label id="keywords-label" className="list-selection" htmlFor="keywords">
                        Keywords:
                    </label>
                    <input
                        id="keywords"
                        type="text"
                        name="keywords"
                        placeholder="summer launch bundle"
                        value={formData.keywords}
                        onChange={handleChange}
                        className="form-input"
                        list="keyword-suggestions"
                        aria-describedby="keywords-error"
                        aria-required="true"
                        required
                    />
                    {errors.keywords && (
                        <span id="keywords-error" className="error-message" role="alert" aria-live="assertive">
                            {errors.keywords}
                        </span>
                    )}
                    <datalist id="keyword-suggestions" aria-label="Suggested keywords">
                        {keywordSuggestions.map((keyword) => (
                            <option key={keyword} value={keyword} />
                        ))}
                    </datalist>
                </div>

                <div className="form-group" role="group" aria-labelledby="bidAmount-label">
                    <label id="bidAmount-label" className="list-selection" htmlFor="bidAmount">
                        Bid amount:
                    </label>
                    <input
                        id="bidAmount"
                        type="number"
                        name="bidAmount"
                        placeholder="1000"
                        value={formData.bidAmount}
                        onChange={handleChange}
                        min="0.01"
                        step="0.01"
                        className="form-input"
                        aria-describedby="bidAmount-error bidAmount-hint"
                        aria-required="true"
                        required
                    />
                    <div id="bidAmount-hint" className="hint">Must be a positive number</div>
                    {errors.bidAmount && (
                        <span id="bidAmount-error" className="error-message" role="alert" aria-live="assertive">
                            {errors.bidAmount}
                        </span>
                    )}
                </div>

                <div className="form-group" role="group" aria-labelledby="fund-label">
                    <label id="fund-label" className="list-selection" htmlFor="fund">
                        Fund:
                    </label>
                    <input
                        id="fund"
                        type="number"
                        name="fund"
                        placeholder="5000"
                        value={formData.fund}
                        onChange={handleChange}
                        min="0.01"
                        step="0.01"
                        className="form-input"
                        aria-describedby="fund-error fund-hint"
                        aria-required="true"
                        required
                    />
                    <div id="fund-hint" className="hint">Must be a positive number</div>
                    {errors.fund && (
                        <span id="fund-error" className="error-message" role="alert" aria-live="assertive">
                            {errors.fund}
                        </span>
                    )}
                </div>

                <div className="form-group" role="group" aria-labelledby="town-label">
                    <label id="town-label" className="list-selection" htmlFor="town">
                        Town:
                    </label>
                    <select
                        id="town"
                        name="town"
                        value={formData.town}
                        onChange={handleChange}
                        className="form-input"
                        aria-describedby="town-error"
                        aria-required="true"
                        required
                    >
                        <option value="">Select a town</option>
                        {towns.map((town) => (
                            <option key={town.name} value={town.name}>
                                {town.name}
                            </option>
                        ))}
                    </select>
                    {errors.town && (
                        <span id="town-error" className="error-message" role="alert" aria-live="assertive">
                            {errors.town}
                        </span>
                    )}
                </div>

                <div className="form-group" role="group" aria-labelledby="radius-label">
                    <label id="radius-label" className="list-selection" htmlFor="radius">
                        Radius (km):
                    </label>
                    <input
                        id="radius"
                        type="number"
                        name="radius"
                        placeholder="10"
                        value={formData.radius}
                        onChange={handleChange}
                        min="1"
                        step="1"
                        className="form-input"
                        aria-describedby="radius-error radius-hint"
                        aria-required="true"
                        required
                    />
                    <div id="radius-hint" className="hint">Must be a positive integer</div>
                    {errors.radius && (
                        <span id="radius-error" className="error-message" role="alert" aria-live="assertive">
                            {errors.radius}
                        </span>
                    )}
                </div>

                <div className="form-group" role="group" aria-labelledby="status-label">
                    <label id="status-label" className="list-selection" htmlFor="status">
                        Status:
                    </label>
                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="form-input"
                        aria-describedby="status-error"
                    >
                        <option value="on">On</option>
                        <option value="off">Off</option>
                    </select>
                    {errors.status && (
                        <span id="status-error" className="error-message" role="alert" aria-live="assertive">
                            {errors.status}
                        </span>
                    )}
                </div>
            </fieldset>

            <div
                className="board-options"
                role="toolbar"
                aria-label="Form actions"
            >
                <button
                    type="submit"
                    aria-label="Save campaign"
                    aria-describedby="submit-status"
                    disabled={submitStatus === 'submitting'}
                >
                    <span className="board-option">Save campaign</span>
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

        </form>
    );
}

export default CampaignForm;