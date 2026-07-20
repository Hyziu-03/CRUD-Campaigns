
function RadiusInput(props) {
    const { formData, handleChange, errors } = props;
    return (
        <section className="form-group" role="group" aria-labelledby="radius-label">
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
            <section id="radius-hint" className="hint">Must be a positive integer</section>
            {errors.radius && (
                <span id="radius-error" className="error-message" role="alert" aria-live="assertive">
                    {errors.radius}
                </span>
            )}
        </section>
    )
}

export default RadiusInput