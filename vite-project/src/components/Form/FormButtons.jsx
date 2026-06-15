import { Link } from "react-router";

function FormButtons(props) {
    const { submitStatus } = props;
    return (
        <section
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
        </section>
    )
}

export default FormButtons
