// Import the functions you need from the SDKs you need
import db from "../../Firebase-init";
import { collection, addDoc } from "firebase/firestore";
import CampaignBoardHeader from "../Board/CampaignBoardHeader";
import { useEffect, useState } from 'react'
import { onSnapshot } from 'firebase/firestore'
import CampaignBoardMeta from "../Board/CampaignBoardMeta";

function CreateCampaign() {
    async function handleSubmit(event) {
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

    const [campaigns, setCampaigns] = useState([])

    useEffect(() => {
        const campaignsRef = collection(db, 'campaigns')

        const unsubscribe = onSnapshot(
            campaignsRef,
            (querySnapshot) => {
                const campaignList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))
                setCampaigns(campaignList)
            }
        )

        return () => unsubscribe()
    }, [])

    console.log(campaigns)

    return (
        <section className="campaign-board" id="create-campaign" aria-labelledby="create-campaign-title">
            <CampaignBoardHeader />

            <CampaignBoardMeta />

            <form className="campaign-board__form" onSubmit={handleSubmit}>
                <label>
                    Campaign name
                    <input type="text" name="name" placeholder="Spring launch push" required />
                </label>

                <label>
                    Keywords
                    <input type="text" name="keywords" placeholder="summer launch bundle" required />
                </label>

                <label>
                    Bid amount
                    <input type="number" name="bidAmount" placeholder="1000" required />
                </label>

                <label>
                    Fund
                    <input type="number" name="fund" placeholder="5000" required />
                </label>

                <label>
                    Town
                    <input type="text" name="town" placeholder="Springfield" required />
                </label>

                <label>
                    Radius (km)
                    <input type="number" name="radius" placeholder="10" required />
                </label>

                <label>
                    Status
                    <select name="status" defaultValue="scheduled" required>
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
