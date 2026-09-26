"""Builds the Frisco, TX grocery price matrix (estimated in-store pickup prices, Sept 2026).

Prices are estimates. Each item has a Walmart store-brand anchor price; other stores are
modeled from category price indexes plus a small per-item variation, then rounded to the
price endings each chain uses. Verify in each store's app before ordering.
"""
import csv, hashlib, json, pathlib

STORES = ["H-E-B", "Target", "Aldi", "Tom Thumb", "Kroger", "Market Street", "Sprouts", "Walmart"]

# Price index vs. Walmart by category.
INDEX = {
    #            HEB   Target Aldi  TomT  Kroger MktSt Sprouts Wmt
    "Produce":  [0.95, 1.14, 0.88, 1.30, 1.05, 1.26, 1.00, 1.0],
    "Meat & Seafood": [0.95, 1.12, 0.96, 1.36, 1.05, 1.30, 1.24, 1.0],
    "Dairy & Eggs":   [0.98, 1.07, 0.88, 1.30, 1.03, 1.27, 1.24, 1.0],
    "Bakery & Grains":[0.97, 1.07, 0.85, 1.31, 1.03, 1.28, 1.32, 1.0],
    "Frozen":   [0.98, 1.08, 0.88, 1.30, 1.03, 1.28, 1.30, 1.0],
    "Pantry":   [0.97, 1.08, 0.86, 1.32, 1.03, 1.28, 1.35, 1.0],
    "Spices & Condiments": [0.92, 1.08, 0.86, 1.33, 1.04, 1.30, 1.38, 1.0],
    "Household": [0.99, 1.04, 0.88, 1.34, 1.05, 1.30, 1.40, 1.0],
}
# National brands vary less between chains (Aldi/Sprouts get their equivalent instead).
BRAND_INDEX = [1.00, 1.03, 0.72, 1.24, 1.07, 1.22, 1.26, 1.0]

# name, category, quantity to buy, Walmart anchor price for that quantity, staple?, brand?, notes
ITEMS = [
    ("Chicken breasts, boneless skinless", "Meat & Seafood", "3 lb family pack", 11.91, False, False, ""),
    ("Chicken drumsticks", "Meat & Seafood", "~3 lb pack", 4.41, False, False, ""),
    ("Ground beef, 93/7 lean", "Meat & Seafood", "2 lb", 14.94, False, False, "90/10 is ~$0.50/lb less if 93/7 is out"),
    ("Pork chops, boneless", "Meat & Seafood", "~1.5 lb", 6.71, False, False, ""),
    ("Fish fillets, frozen (tilapia or swai)", "Meat & Seafood", "2 lb bag", 8.97, False, False, ""),
    ("Sliced smoked turkey (lunch meat)", "Meat & Seafood", "16 oz", 5.48, False, False, ""),
    ("Hot dogs, beef franks", "Meat & Seafood", "1 pack (8 ct)", 2.98, False, False, ""),
    ("Eggs, large", "Dairy & Eggs", "18 ct", 3.24, False, False, ""),
    ("Greek yogurt, plain nonfat", "Dairy & Eggs", "2 x 32 oz tubs", 8.96, False, False, ""),
    ("Shredded cheese", "Dairy & Eggs", "8 oz bag", 2.22, False, False, ""),
    ("Sliced cheese", "Dairy & Eggs", "12 oz (16 slices)", 2.64, False, False, ""),
    ("Butter, salted", "Dairy & Eggs", "1 lb (4 sticks)", 3.97, True, False, "Lasts well past 2 weeks if used intentionally"),
    ("Carrots, fresh", "Produce", "2 lb bag", 1.64, False, False, ""),
    ("Asparagus, fresh", "Produce", "2 bunches (~2 lb)", 6.96, False, False, "Out of peak season in late Sept; price swings"),
    ("Apples (Gala)", "Produce", "3 lb bag", 4.47, False, False, ""),
    ("Oranges", "Produce", "3 lb bag", 4.97, False, False, ""),
    ("Peaches, frozen unsweetened", "Produce", "2 x 16 oz bags", 5.94, False, False, "Texas fresh peach season is over by late Sept, so frozen is the better buy"),
    ("Potatoes, russet", "Produce", "5 lb bag", 3.47, False, False, ""),
    ("Green beans, frozen", "Frozen", "32 oz bag", 3.24, False, False, ""),
    ("French fries, frozen", "Frozen", "32 oz bag", 2.97, False, False, ""),
    ("Pepperoni pizzas, frozen", "Frozen", "2 pizzas", 7.96, False, False, ""),
    ("Whole-grain bread", "Bakery & Grains", "2 loaves (20 oz)", 3.96, False, False, ""),
    ("Whole-grain hamburger buns", "Bakery & Grains", "8 ct", 2.48, False, False, ""),
    ("Hot dog buns", "Bakery & Grains", "8 ct", 1.34, False, False, ""),
    ("Tortillas, whole wheat", "Bakery & Grains", "10 ct", 2.48, False, False, ""),
    ("Pasta, whole wheat", "Bakery & Grains", "2 x 16 oz", 2.48, False, False, ""),
    ("Rice, long grain white", "Bakery & Grains", "2 lb bag", 1.98, True, False, ""),
    ("Cereal: Cheerios (original)", "Pantry", "1 box (~12 oz)", 4.48, False, True, "Aldi: Millville Toasted Oats"),
    ("Granola bars (Nature Valley Oats 'n Honey)", "Pantry", "12 ct box", 4.48, False, True, "Aldi: Millville equivalent"),
    ("Marinara sauce", "Pantry", "24 oz jar", 1.98, False, False, ""),
    ("Black beans, canned", "Pantry", "3 x 15 oz cans", 2.34, False, False, ""),
    ("Tortilla chips", "Pantry", "13 oz bag", 2.28, False, False, ""),
    ("Salsa", "Pantry", "16 oz jar", 2.24, False, False, ""),
    ("Olive oil, extra virgin", "Spices & Condiments", "17 oz bottle", 6.98, True, False, ""),
    ("Garlic powder", "Spices & Condiments", "~3 oz", 1.48, True, False, ""),
    ("Onion powder", "Spices & Condiments", "~2.5 oz", 1.48, True, False, ""),
    ("Black pepper, ground", "Spices & Condiments", "~3 oz", 2.48, True, False, ""),
    ("Paprika", "Spices & Condiments", "~2.5 oz", 1.28, True, False, ""),
    ("Cajun seasoning (Tony Chachere's)", "Spices & Condiments", "8 oz", 3.24, True, True, "Aldi: Stonemill Cajun"),
    ("Lemon pepper", "Spices & Condiments", "~3 oz", 1.48, True, False, ""),
    ("Salt, iodized", "Spices & Condiments", "26 oz", 0.68, True, False, ""),
    ("Barbecue sauce", "Spices & Condiments", "18 oz", 1.28, True, False, ""),
    ("Miracle Whip", "Spices & Condiments", "30 oz jar", 4.98, True, True, "Aldi: Burman's whipped dressing. Sprouts rarely stocks it"),
    ("Ketchup", "Spices & Condiments", "32 oz", 1.98, True, False, ""),
    ("Mustard, yellow", "Spices & Condiments", "20 oz", 0.98, True, False, ""),
    ("Sandwich pickles (slices)", "Spices & Condiments", "24 oz jar", 2.48, True, False, ""),
    ("Grape jelly", "Spices & Condiments", "30 oz jar", 2.12, True, False, ""),
    # Optional household add-ons for meal prep (not on the original list)
    ("Meal-prep containers", "Household", "10 ct", 5.97, True, False, "Optional add-on"),
    ("Zip-top storage bags, gallon", "Household", "40 ct", 2.97, True, False, "Optional add-on"),
    ("Aluminum foil", "Household", "75 sq ft", 3.97, True, False, "Optional add-on"),
    ("Dish soap", "Household", "~20 oz", 2.97, True, False, "Optional add-on"),
    ("Paper towels", "Household", "6 rolls", 7.97, True, False, "Optional add-on"),
]

# Chains' typical price endings: most end in 9; Walmart mostly in 7 or 8.
def round_price(p, store):
    tenth = round(p, 1)
    return round(tenth - (0.02 if store == "Walmart" else 0.01), 2)

def jitter(name, store):
    h = int(hashlib.md5(f"{name}|{store}".encode()).hexdigest()[:6], 16)
    return 1 + ((h % 900) / 900 - 0.5) * 0.08  # +/-4%

rows = []
for name, cat, qty, base, staple, brand, note in ITEMS:
    idx = BRAND_INDEX if brand else INDEX[cat]
    prices = {}
    for i, s in enumerate(STORES):
        p = base if s == "Walmart" else base * idx[i] * jitter(name, s)
        prices[s] = round_price(p, s)
    rows.append(dict(item=name, category=cat, qty=qty, staple=staple,
                     household=(cat == "Household"), note=note, prices=prices))

# Estimated pickup costs. Aldi and Sprouts pickup runs through Instacart.
PICKUP = {
    "H-E-B": {"fee": 0.00, "markup": 0.0, "note": "Curbside free on orders $35+"},
    "Target": {"fee": 0.00, "markup": 0.0, "note": "Drive Up free, no minimum"},
    "Aldi": {"fee": 1.99, "markup": 0.10, "note": "Instacart pickup; online prices can run above shelf price"},
    "Tom Thumb": {"fee": 0.00, "markup": 0.0, "note": "Drive Up & Go free over order minimum"},
    "Kroger": {"fee": 0.00, "markup": 0.0, "note": "Pickup free on orders $35+"},
    "Market Street": {"fee": 4.95, "markup": 0.0, "note": "Pickup fee varies by order size"},
    "Sprouts": {"fee": 1.99, "markup": 0.10, "note": "Instacart pickup; online prices can run above shelf price"},
    "Walmart": {"fee": 0.00, "markup": 0.0, "note": "Pickup free on orders $35+"},
}

out = pathlib.Path(__file__).parent
(out / "prices.json").write_text(json.dumps({"stores": STORES, "items": rows, "pickup": PICKUP}, indent=1))
with open(out / "price_matrix.csv", "w", newline="") as f:
    w = csv.writer(f)
    w.writerow(["Category", "Item", "Quantity", "Pantry staple"] + STORES + ["Cheapest"])
    for r in rows:
        p = r["prices"]
        w.writerow([r["category"], r["item"], r["qty"], "yes" if r["staple"] else ""] +
                   [f"{p[s]:.2f}" for s in STORES] + [min(p, key=p.get)])
    for label, keep in [("TOTAL (grocery list)", lambda r: not r["household"]),
                        ("TOTAL (2-week recurring, no staples)", lambda r: not r["staple"]),
                        ("TOTAL (list + household add-ons)", lambda r: True)]:
        tot = {s: sum(r["prices"][s] for r in rows if keep(r)) for s in STORES}
        w.writerow(["", label, "", ""] + [f"{tot[s]:.2f}" for s in STORES] + [min(tot, key=tot.get)])

grocery = {s: sum(r["prices"][s] for r in rows if not r["household"]) for s in STORES}
for s in sorted(grocery, key=grocery.get):
    pk = PICKUP[s]
    print(f"{s:14s} shelf ${grocery[s]:7.2f}  pickup est ${grocery[s]*(1+pk['markup'])+pk['fee']:7.2f}")

# Render the interactive page from the template.
tpl = (out / "template.html").read_text()
(out / "grocery_comparison.html").write_text(
    tpl.replace("__DATA__", json.dumps({"stores": STORES, "items": rows, "pickup": PICKUP})))
