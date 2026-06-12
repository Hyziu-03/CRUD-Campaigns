import { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import db from '../Firebase-init'
import CampaignBoardHeader from './Board/CampaignBoardHeader'
import CampaignBoardMeta from './Board/CampaignBoardMeta';
import CampaignBoardList from './Board/CampaignBoardList';

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

            <section className="campaign-board__options">
                <button className="campaign-board__option" type="button">
                    <a className="campaign-board__option" href="/create-campaign">Create campaign</a>
                </button>
                <button className="campaign-board__option" type="button"><a className="campaign-board__option" href="/edit-campaign">Edit campaign</a></button>
                <button className="campaign-board__option" type="button"><a className="campaign-board__option" href="/delete-campaign">Delete campaign</a></button>
            </section>

            <CampaignBoardList campaigns={campaigns} />
        </section>
    )
}

export default CampaignHome
