import { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import db from '../../Firebase-init'

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
                            <h2 className="campaign-card__name">{campaign.name}</h2>
                            <p className="campaign-card__keywords">
                                Keywords: {campaign.keywords.split(" ").join(", ")}
                            </p>
                            <p className="campaign-card__bid-amount">Bid amount: {campaign.bidAmount}</p>
                            <p className="campaign-card__fund">Fund: {campaign.fund}</p>
                            <p className="campaign-card__status">Status: {campaign.status}</p>
                            <p className="campaign-card__town">Town: {campaign.town}</p>
                            <p className="campaign-card__radius">Radius: {campaign.radius} km</p>
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

