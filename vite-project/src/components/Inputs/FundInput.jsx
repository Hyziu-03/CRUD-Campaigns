function FundInput(props) {
    const { formData, handleChange, errors } = props;

    return (
        <section className="form-group" role="group" aria-labelledby="fund-label">
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
            <section id="fund-hint" className="hint">Must be a positive number</section>
            {errors.fund && (
                <span id="fund-error" className="error-message" role="alert" aria-live="assertive">
                    {errors.fund}
                </span>
            )}
        </section>
    )
}

export default FundInput