# OnChain Korea Invoice Recalculation Memo

Date: 2026-03-31  
Basis: update memo for the prior 4-week invoice  
Note: the invoice image attached in the current thread is not readable enough to reconstruct the original line items. This document is therefore a recalculation memo for the requested changes only. The remaining line items and final total should be overwritten once a readable source invoice is provided.

## Changes Applied
- Recalculated the `cNFT minting cost` using current Metaplex Bubblegum V2 references
- Increased the `dedicated 2-person monitoring team` cost for the 8-week operating window

## 1. cNFT Minting Cost Recalculation

### Budget Assumptions
- Target quantity: `500 units`
- Protocol: `Metaplex Bubblegum V2`
- Tree profile: recommended small tree from the Metaplex CLI docs
  - `16,384` capacity
  - `maxDepth 14`
  - `maxBufferSize 64`
  - `canopyDepth 8`
- Internal conservative reserve conversion: `1 SOL = ₩200,000`
  - This is a budgeting buffer, not a live market FX quote

### Official Reference Numbers
- One-time Merkle Tree creation cost: `~0.34 SOL`
- Bubblegum V2 create protocol fee: `0.00009 SOL per mint`

### Calculation
- Tree creation: `0.34 SOL`
- 500 mints protocol fee: `500 x 0.00009 SOL = 0.045 SOL`
- Subtotal: `0.385 SOL`
- Budgeted reserve including transaction fee slack and execution margin: `0.50 SOL`

### Recommended Invoice Amount
- Recommended booking amount: `₩100,000`
- Suggested invoice label:
  - `cNFT Minting Network Reserve (500 units): ₩100,000`

### Notes
- The pure on-chain network cost is very small.
- If the invoice needs a larger commercial number, that increase should sit in separate operating items such as `mint execution`, `metadata QA`, `wallet verification`, and `failed issuance handling`.
- For pure chain/network cost, `₩100,000` is already conservative.

## 2. Dedicated 2-Person Monitoring Cost Increase

### Budget Assumptions
- Operating period: `8 weeks`
- Staffing model: `2-person team`
- Scope: active monitoring, learner support, issue escalation, issuance checks, and program operations oversight
- Internal loaded day rate: `₩300,000 per person per day`
  - This assumes operational ownership, not simple customer support
- Working days: `5 days per week x 8 weeks = 40 days`

### Calculation
- `2 people x 40 days x ₩300,000 = ₩24,000,000`

### Recommended Invoice Amount
- Recommended booking amount: `₩24,000,000`
- Suggested invoice label:
  - `Dedicated Monitoring & Operations (2-person team, 8 weeks): ₩24,000,000`

### Notes
- This figure is intentionally conservative in line with the request to price this item higher.
- If the scope is explicitly expanded toward weekend/night coverage or quasi-24/7 monitoring, this line can reasonably move into the `₩28,000,000 to ₩32,000,000` range.
- For now, the recommended fixed value is `₩24,000,000`.

## Items To Replace Immediately

| Item | Previous | Revised |
| --- | --- | --- |
| cNFT minting cost | prior 4-week value | `₩100,000` |
| dedicated monitoring team | prior 4-week value | `₩24,000,000` |

## Recommended Next Step
- Once a readable source invoice is provided:
  - restore all original line items in the same order
  - replace only the two items above
  - update all `4-week` wording to `8-week`
  - recalculate the final subtotal and VAT-inclusive total

## Sources
- Metaplex Bubblegum V2 Overview  
  https://www.metaplex.com/docs/smart-contracts/bubblegum-v2
- Metaplex Protocol Fees  
  https://www.metaplex.com/docs/protocol-fees
- Metaplex CLI Bubblegum Create Tree  
  https://www.metaplex.com/docs/dev-tools/cli/bubblegum/create-tree
