export const keywordSuggestions = (campaigns) => {
    const ks = Array.from(
        new Set(
            campaigns.flatMap((campaign) =>
                String(campaign.keywords ?? '')
                    .split(/[\s,]+/)
                    .map((keyword) => keyword.trim())
                    .filter(Boolean)
            )
        )
    );
    return ks;
}
