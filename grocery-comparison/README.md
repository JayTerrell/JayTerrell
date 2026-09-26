# Frisco grocery price comparison

Two-week, one-person basket (47 items) priced for in-store pickup at H-E-B, Target, Aldi,
Tom Thumb, Kroger, Market Street, Sprouts and Walmart in Frisco, TX (Sept 2026).

- `grocery_comparison.html` – interactive matrix (pickup vs. shelf price, staples and household toggles)
- `price_matrix.csv` – item-by-item prices by store with totals
- `build_prices.py` – price model; edit prices here and re-run `python3 build_prices.py`

Prices are modeled estimates anchored to Aug 2026 national averages, not live store data.
Check them against each store's app before ordering.

| Store | Shelf total | Est. pickup total |
|---|---|---|
| H-E-B | $176.73 | **$176.73** |
| Aldi | **$161.03** | $179.12 |
| Walmart | $182.86 | $182.86 |
| Kroger | $192.03 | $192.03 |
| Target | $200.03 | $200.03 |
| Market Street | $233.53 | $238.48 |
| Tom Thumb | $240.63 | $240.63 |
| Sprouts | $226.83 | $251.50 |
