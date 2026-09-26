# Frisco grocery price comparison

Two-week, one-person grocery list (47 items, plus 5 optional household items) priced for in-store
pickup at eight stores in Frisco, TX. Prices are real regular prices read from each store's online
ordering system on 2026-09-26.

- `grocery_comparison.html` – interactive matrix (tap a row to see each store's matched product)
- `price_matrix.csv` – item-by-item pickup prices by store with totals
- `data/<store>.json` – the raw per-item prices, products and notes for each store
- `build_matrix.py` – rebuilds the CSV and page from `data/` (`python3 build_matrix.py`)

## Result: same 40 items at every store (pickup prices)

| Rank | Store | Total | Items found (of 47) | Location |
|---|---|---|---|---|
| 1 | **Aldi** | **$143.99** | 42 | ALDI Frisco (DEN 25) |
| 2 | Walmart | $155.89 | 47 | Store #3081, Sacramento CA area (Frisco couldn't be set) |
| 3 | H-E-B | $178.22 | 47 | #789, 4800 Main St, Frisco |
| 4 | Market Street | $192.79 | 47 | #685, 4268 Legacy Dr, Frisco |
| 5 | Tom Thumb | $199.18 | 47 | #2581, 4848 Preston Rd, Frisco |
| 6 | Sprouts | $303.75 | 44 | Frisco (#105) |
| – | Target | not ranked | 11 | #1763, 3201 Preston Rd, Frisco (bot protection blocked most searches) |
| – | Kroger | not ranked | 0 | Blocked; needs a Kroger developer API key |

Aldi doesn't carry 5 list items (frozen peaches, whole-wheat tortillas, Nature Valley bars, black
pepper, grape jelly). Buying those at Walmart (~$17.81) brings the full list to about $172 vs.
$184 all at Walmart. Aldi in-store prices are about 7% lower than its pickup prices.

Not included: pickup fees, sales tax, sales/coupons/loyalty prices. Meat is priced per lb for the
listed quantity; stores sell fixed packs, so checkout amounts can run higher.
