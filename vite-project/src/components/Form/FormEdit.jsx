const keywordSuggestions = (campaigns) => {
    return Array.from(
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
}

function FormEdit(props) {
    const { selectedCampaign, towns, handleEditCampaign, showEditForm, selectedCampaignId, campaigns } = props;

    return (
        <>
            {showEditForm && selectedCampaignId && (
                <section aria-labelledby="edit-form-heading">
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
                            {keywordSuggestions(campaigns).map((keyword) => (
                                <option key={keyword} value={keyword} />
                            ))}
                        </datalist>
                    </ul>
                </section>
            )}</>

    );
}

export default FormEdit