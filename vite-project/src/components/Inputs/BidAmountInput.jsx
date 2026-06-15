function BidAmountInput(props) {
    const { formData, handleChange, errors } = props;

    return (
        <section className="form-group" role="group" aria-labelledby="bidAmount-label">
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
            <section id="bidAmount-hint" className="hint">Must be a positive number</section>
            {errors.bidAmount && (
                <span id="bidAmount-error" className="error-message" role="alert" aria-live="assertive">
                    {errors.bidAmount}
                </span>
            )}
        </section>
    )
}

export default BidAmountInput