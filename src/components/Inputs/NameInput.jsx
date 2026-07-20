function NameInput(props) {
    const { formData, handleChange, errors } = props;

    return (
        <section className="form-group" role="group" aria-labelledby="name-label">
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
        </section>
    )
}

export default NameInput
