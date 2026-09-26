"""Builds the Frisco, TX grocery comparison from real store prices collected 2026-09-26.

Inputs: data/<store>.json, one file per store with a price per list item (or found=false).
Outputs: price_matrix.csv and grocery_comparison.html (from template.html).
"""
import csv, json, pathlib

HERE = pathlib.Path(__file__).parent
STORES = [  # (file, display name)
    ("heb", "H-E-B"), ("target", "Target"), ("aldi", "Aldi"), ("tomthumb", "Tom Thumb"),
    ("kroger", "Kroger"), ("marketstreet", "Market Street"), ("sprouts", "Sprouts"), ("walmart", "Walmart"),
]
CATEGORY = {}
for cat, names in {
    "Meat & Seafood": ["Chicken breasts", "Chicken drumsticks", "Ground beef", "Pork chops", "Fish fillets", "Sliced smoked turkey", "Hot dogs"],
    "Dairy & Eggs": ["Eggs", "Greek yogurt", "Shredded cheese", "Sliced cheese", "Butter"],
    "Produce": ["Carrots", "Asparagus", "Apples", "Oranges", "Peaches", "Potatoes"],
    "Frozen": ["Green beans", "French fries", "Pepperoni pizzas"],
    "Bakery & Grains": ["Whole-grain bread", "Whole-grain hamburger buns", "Hot dog buns", "Tortillas", "Pasta", "Rice"],
    "Pantry": ["Cereal", "Granola bars", "Marinara", "Black beans", "Tortilla chips", "Salsa"],
    "Spices & Condiments": ["Olive oil", "Garlic powder", "Onion powder", "Black pepper", "Paprika", "Cajun", "Lemon pepper", "Salt", "Barbecue", "Miracle Whip", "Ketchup", "Mustard", "Sandwich pickles", "Grape jelly"],
    "Household": ["Meal-prep", "Zip-top", "Aluminum foil", "Dish soap", "Paper towels"],
}.items():
    for n in names:
        CATEGORY[n] = cat
STAPLES = {"Butter, salted", "Rice, long grain white", "Olive oil, extra virgin", "Garlic powder", "Onion powder",
           "Black pepper, ground", "Paprika", "Cajun seasoning (Tony Chachere's)", "Lemon pepper", "Salt, iodized",
           "Barbecue sauce", "Miracle Whip", "Ketchup", "Mustard, yellow", "Sandwich pickles (slices)", "Grape jelly"}
QTY = {i["item"]: i["qty"] for i in json.loads((HERE / "data" / "items.json").read_text())}

def category(item):
    return next(c for k, c in CATEGORY.items() if item.startswith(k))

data = {name: json.loads((HERE / "data" / f"{f}.json").read_text()) for f, name in STORES}
names = [n for _, n in STORES]
rows = []
for idx, item in enumerate(QTY):
    cells = {}
    for n in names:
        it = data[n]["items"][idx]
        assert it["item"] == item, (n, it["item"], item)
        if not it.get("found"):
            cells[n] = None
            continue
        # Pickup price: Aldi/Sprouts files keep the pickup price in online_line_total.
        pickup = it.get("online_line_total") or it["line_total"]
        cells[n] = {"price": round(pickup, 2), "shelf": round(it["line_total"], 2),
                    "product": it.get("product") or "", "calc": it.get("calc") or "", "note": it.get("note") or ""}
    rows.append({"item": item, "qty": QTY[item], "category": category(item),
                 "staple": item in STAPLES, "household": category(item) == "Household", "cells": cells})

stores_meta = {n: {"location": data[n].get("location"), "method": data[n].get("method"),
                   "found": sum(1 for r in rows if r["cells"][n] and not r["household"])} for n in names}
payload = {"stores": names, "rows": rows, "meta": stores_meta, "grocery_items": sum(1 for r in rows if not r["household"])}

with open(HERE / "price_matrix.csv", "w", newline="") as f:
    w = csv.writer(f)
    w.writerow(["Category", "Item", "Quantity", "Pantry staple"] + names)
    for r in rows:
        w.writerow([r["category"], r["item"], r["qty"], "yes" if r["staple"] else ""] +
                   [f'{r["cells"][n]["price"]:.2f}' if r["cells"][n] else "" for n in names])
    ranked = [n for n in names if stores_meta[n]["found"] >= 40]
    common = [r for r in rows if not r["household"] and all(r["cells"][n] for n in ranked)]
    w.writerow([])
    w.writerow(["", f"Like-for-like total ({len(common)} items carried by every fully priced store)", "", ""] +
               [f'{sum(r["cells"][n]["price"] for r in common):.2f}' if n in ranked else "n/a" for n in names])
    w.writerow(["", "Items found (of %d)" % payload["grocery_items"], "", ""] + [stores_meta[n]["found"] for n in names])

import sys
tpl = (HERE / "template.html").read_text()
(HERE / "grocery_comparison.html").write_text(tpl.replace("__DATA__", json.dumps(payload)))

for n in sorted(ranked, key=lambda n: sum(r["cells"][n]["price"] for r in common)):
    print(f'{n:14s} like-for-like ${sum(r["cells"][n]["price"] for r in common):7.2f}  found {stores_meta[n]["found"]}')
print("common items:", len(common))
