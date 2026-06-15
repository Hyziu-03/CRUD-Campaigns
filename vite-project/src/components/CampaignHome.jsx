import CampaignBoardHeader from './Board/CampaignBoardHeader'
import CampaignBoardMeta from './Board/CampaignBoardMeta'
import CampaignBoardList from './Board/CampaignBoardList'
import CampaignBoardOptions from './Board/CampaignBoardOptions';
import useFirestoreCollection from '../hooks/useFirestoreCollection'

function CampaignHome() {
    const { items: campaigns, isLoading } = useFirestoreCollection('campaigns')

    return (
        <main className="board" id="board" role="main" aria-labelledby="board-title" aria-label="Campaign dashboard">
            <CampaignBoardHeader />

            <CampaignBoardMeta
                campaignCount={campaigns.length}
                isLoading={isLoading}
                aria-label="Campaign statistics"
            />

            <p className="meta-divider" id="campaigns-intro">
                Here are your campaigns:
            </p>

            <section
                aria-labelledby="campaigns-intro"
                aria-describedby="campaigns-description"
            >
                <CampaignBoardList
                    campaigns={campaigns}
                    isLoading={isLoading}
                    aria-label="Marketing campaigns list"
                />
            </section>

            <CampaignBoardOptions aria-label="Campaign actions" />

        </main>
    )
}

export default CampaignHome