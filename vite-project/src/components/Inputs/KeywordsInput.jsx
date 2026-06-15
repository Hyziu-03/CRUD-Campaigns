import { keywordSuggestions } from "../CampaignTools";

function KeywordsInput(props) {
    const { formData, handleChange, errors, campaigns } = props;
    
    const ks = keywordSuggestions(campaigns);

    return (
        <section className="form-group" role="group" aria-labelledby="keywords-label">
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
                {ks.map((keyword) => (
                    <option key={keyword} value={keyword} />
                ))}
            </datalist>
        </section>
    )
}

export default KeywordsInput