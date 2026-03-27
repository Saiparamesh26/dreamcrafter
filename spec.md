# Dreamcrafter

## Current State
- AnalysisPathPage shows full content immediately when loaded, even without a company searched
- CompetitorBriefing (Intelligence Pipeline) Step1 shows LLM Search Queries including Market Context
- ApiKeysPage has key generation and management but no integrated company-search-with-API-key feature

## Requested Changes (Diff)

### Add
- DreamCrafter API Key feature section on ApiKeysPage:
  - "Generate New API Key" button that creates a secure random key and stores it
  - API key validation on every search (error if invalid)
  - Company search input that fetches company website URL and opens it in a new tab
  - Sample company mapping: OpenAI→openai.com, Google→google.com, Microsoft→microsoft.com (plus existing COMPANY_WEBSITES map)
  - Loading indicator during search
  - Copy button for generated key
  - Error display for invalid keys or unknown companies
- Top section of AnalysisPathPage should show a "locked" overlay/state when no company is searched yet; it unlocks and reveals after a company is present

### Modify
- CompetitorBriefing Step1Content: Remove the "LLM Search Queries" / Market Context query display entirely — Step1 should just show a clean loading/done indicator without listing queries
- AnalysisPathPage: Add guard so top intelligence preview card is visually blocked until company param is present

### Remove
- Market Context query card from CompetitorBriefing Step1Content
- Query list display in Step1 of the AI Competitor Briefing pipeline

## Implementation Plan
1. Modify `CompetitorBriefing.tsx` Step1Content to remove query cards — show only a "Search queries generated" success state when done, no query list
2. Modify `AnalysisPathPage.tsx` to add a locked/blurred overlay on the top intelligence preview card when `company` param is missing or empty; show a "Search a company to unlock" prompt
3. Modify `ApiKeysPage.tsx` to add a DreamCrafter API Key search tool section: generate key, copy, validate, company search input, opens website in new tab, loading state, error handling
