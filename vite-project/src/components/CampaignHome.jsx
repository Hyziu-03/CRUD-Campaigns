import CampaignBoardHeader from './Board/CampaignBoardHeader'
import CampaignBoardMeta from './Board/CampaignBoardMeta'
import CampaignBoardList from './Board/CampaignBoardList'
import CampaignBoardOptions from './Board/CampaignBoardOptions';
import useFirestoreCollection from '../hooks/useFirestoreCollection'

function CampaignHome() {
    const { items: campaigns, isLoading } = useFirestoreCollection('campaigns')

    return (
        <section className="campaign-board" id="campaign-board" aria-labelledby="campaign-board-title">
            <CampaignBoardHeader />

            <CampaignBoardMeta campaignCount={campaigns.length} isLoading={isLoading} />

            <p className="campaign-meta__divider">Here are your campaigns:</p>

            <CampaignBoardList campaigns={campaigns} isLoading={isLoading} />

            <CampaignBoardOptions />

        </section>
    )
}

export default CampaignHome
