import CampaignBoardHeader from "../Board/CampaignBoardHeader";
import CampaignBoardMeta from "../Board/CampaignBoardMeta";
import CampaignForm from "../Form/CampaignForm";
import useFirestoreCollection from '../../hooks/useFirestoreCollection'

function CreateCampaign() {
    const { items: campaigns, isLoading: campaignsLoading } = useFirestoreCollection('campaigns')
    const { items: towns } = useFirestoreCollection('towns')

    return (
        <section className="board">
            <CampaignBoardHeader />

            <main className="board-main" role="main" aria-label="Campaign creation form">
                <CampaignBoardMeta
                    campaignCount={campaigns.length}
                    isLoading={campaignsLoading}
                    aria-label="Campaign statistics"
                />

                <p className="meta-divider" id="form-instruction" role="status">
                    Enter data to add a campaign:
                </p>

                <CampaignForm
                    towns={towns}
                    campaigns={campaigns}
                    aria-labelledby="form-instruction"
                />
            </main>
        </section>
    )
}

export default CreateCampaign