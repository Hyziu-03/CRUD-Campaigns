// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDKFxGXWohaZ2bKrz7RnZdHqG8-Hf4c-qY",
    authDomain: "crud-57966.firebaseapp.com",
    projectId: "crud-57966",
    storageBucket: "crud-57966.firebasestorage.app",
    messagingSenderId: "878670529218",
    appId: "1:878670529218:web:ea6647c0f37a330736f15b",
    measurementId: "G-0Q88KFEKBG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log(analytics)

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

function CreateCampaign() {
    async function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const submittedData = Object.fromEntries(formData.entries());

        console.log(submittedData);

        try {
            const docRef = await addDoc(collection(db, "campaigns"), submittedData);
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

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

            <form className="campaign-board__form" onSubmit={handleSubmit}>
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
