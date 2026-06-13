import db from "../../Firebase-init";
import CampaignBoardHeader from "../Board/CampaignBoardHeader";
import { useEffect, useState } from 'react'
import { onSnapshot, collection } from 'firebase/firestore'
import CampaignBoardMeta from "../Board/CampaignBoardMeta";
import CampaignForm from "../CampaignForm";

function CreateCampaign() {
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

            <p className="campaign-meta__divider">Enter data to add a campaign:</p>

            <CampaignForm />
        </section>
    )
}

export default CreateCampaign
