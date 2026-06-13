import { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import db from '../../Firebase-init'
import '../../styles/Board/Board.scss';


export default function CampaignBoardList() {

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
        <section>
            {campaigns.length > 0 ? (
                <ul className="campaign-list">
                    {campaigns.map((campaign) => (
                        <li key={campaign.id} className="campaign-card">
                            <h2>{campaign.name}</h2>
                            <p>Keywords: {campaign.keywords.split(" ").join(", ")}</p>
                            <p>Bid amount: {campaign.bidAmount}</p>
                            <p>Fund: {campaign.fund}</p>
                            <p>Status: {campaign.status}</p>
                            <p>Town: {campaign.town}</p>
                            <p>Radius: {campaign.radius} km</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="campaign-empty">
                    <h2>No campaigns yet</h2>
                    <p>Firestore returned an empty campaigns collection.</p>
                </div>
            )}
        </section>
    )
}

