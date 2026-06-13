import { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import db from '../Firebase-init'
import CampaignBoardHeader from './Board/CampaignBoardHeader'
import CampaignBoardMeta from './Board/CampaignBoardMeta';
import CampaignBoardList from './Board/CampaignBoardList';
import CampaignBoardOptions from './Board/CampaignBoardOptions';

function CampaignHome() {
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

    return (
        <section className="campaign-board" id="campaign-board" aria-labelledby="campaign-board-title">
            <CampaignBoardHeader />

            <CampaignBoardMeta/>

            <p className="campaign-meta__divider">Here are your campaigns:</p>

            <CampaignBoardList campaigns={campaigns} />

            <CampaignBoardOptions />

        </section>
    )
}

export default CampaignHome
