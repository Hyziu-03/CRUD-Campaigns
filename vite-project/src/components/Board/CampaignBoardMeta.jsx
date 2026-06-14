import { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import db from '../../Firebase-init'
import '../../styles/Board/Board.scss';

export default function CampaignBoardMeta() {
    const [campaigns, setCampaigns] = useState([])

    useEffect(() => {
        try {
            const subscribetoCampaigns = () => {
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

            subscribetoCampaigns()
        } catch (error) {
            console.error('Error fetching campaigns:', error)
        }
    }, [])

    return (
        <div className="campaign-board__meta" aria-label="Campaign overview">
            Campaigns in general: {campaigns.length}
        </div>
    )
}
