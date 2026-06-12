import { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import db from '../../Firebase-init'

export default function CampaignBoardMeta() {
    const [campaigns, setCampaigns] = useState([])

    useEffect(() => {
        function subscriveToCampaigns() {
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
        }

        subscriveToCampaigns()
    }, [])

    return (
        <div className="campaign-board__meta" aria-label="Campaign overview">
            <span className="campaign-board__meta-label">Campaigns: </span>
            <span className="campaign-board__meta-value">{campaigns.length}</span>
        </div>
    )
}
