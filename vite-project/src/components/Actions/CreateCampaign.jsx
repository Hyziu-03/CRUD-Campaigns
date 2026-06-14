import CampaignBoardHeader from "../Board/CampaignBoardHeader";
import CampaignBoardMeta from "../Board/CampaignBoardMeta";
import CampaignForm from "../CampaignForm";
import useFirestoreCollection from '../../hooks/useFirestoreCollection'

function CreateCampaign() {
    const { items: campaigns, isLoading: campaignsLoading } = useFirestoreCollection('campaigns')
    const { items: towns } = useFirestoreCollection('towns')

    return (
        <section className="board" id="create-campaign">
            <CampaignBoardHeader />
            <main className="board-main">
                <CampaignBoardMeta campaignCount={campaigns.length} isLoading={campaignsLoading} />

                <p className="meta-divider">Enter data to add a campaign:</p>

                <CampaignForm towns={towns} campaigns={campaigns} />
            </main>
        </section>
    )
}

export default CreateCampaign
