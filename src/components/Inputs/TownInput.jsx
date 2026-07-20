function TownInput(props) {
    const { formData, errors, handleChange, towns } = props;
  return (

      <section className="form-group" role="group" aria-labelledby="town-label">
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
      </section>
  )
}

export default TownInput