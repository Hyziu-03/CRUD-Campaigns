function CreateCampaign() {
    return (
        <section className="campaign-board" id="create-campaign" aria-labelledby="create-campaign-title">
            <header className="campaign-board__header">
                <div>
                    <p className="campaign-board__eyebrow">Create campaign</p>
                    <h1 id="create-campaign-title">Add a new product campaign</h1>
                    <p className="campaign-board__summary">
                        Capture the basic details for a campaign before it goes live.
                    </p>
                </div>

                <button className="campaign-board__option" type="button">
                    <a className="campaign-board__option" href="/view-campaigns">
                        Go Back
                    </a>
                </button>
            </header>

            <form className="campaign-board__form">
                <label>
                    Campaign name
                    <input type="text" name="name" placeholder="Spring launch push" />
                </label>

                <label>
                    Keywords
                    <input type="text" name="keywords" placeholder="summer, launch, bundle" />
                </label>

                <label>
                    Bid amount
                    <input type="number" name="bidAmount" placeholder="1000" />
                </label>

                <label>
                    Fund
                    <input type="number" name="fund" placeholder="5000" />
                </label>

                <label>
                    Town
                    <input type="text" name="town" placeholder="Springfield" />
                </label>

                <label>
                    Radius (km)
                    <input type="number" name="radius" placeholder="10" />
                </label>

                <label>
                    Status
                    <select name="status" defaultValue="scheduled">
                        <option value="on">On</option>
                        <option value="off">Off</option>
                    </select>
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
        </section>
    )
}

export default CreateCampaign
