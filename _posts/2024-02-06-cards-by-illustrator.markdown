---
layout: post
title:  "Statistics: Grand Archive illustrators"
date: 2024-02-06 11:29:57 +0100
categories: data
permalink: stats-illustrators
excerpt: This dynamic article reveals the number of cards, editions, variants, populations and rarities each illustrator has been credited for.
image: /assets/images/2024-02-06-cards-by-illustrator/thumbnail.png
author: james
---
{% include image.html url="/assets/images/2024-02-06-cards-by-illustrator/cover.png" description="An assortment of Grand Archive collector rares." max-width="600px" %}

## Cards

This breaks down each illustration an artist has made into 2 columns:

- `Cards` shows the number of unique cards the artist has worked on and their editions. For example, if an artist has been credited on three "Trusty Steed" cards it will show "1 (3 editions)" - counting the named card once;
- `Variants` shows the different foil variants (foil + non-foil) and foil count.

<p style="font-size: 16px; line-height: 19px;">Note that the editions count does not show the number of unique artworks, only the number different set and rarity combinations a card appears in. If the same artwork appears on 3 different Trusty Steed cards, for example, it will show 3 editions regardless.</p>

{% include custom-templates/cards-by-illustrator.html %}

## Population

This reveals the total number of cards that have been printed crediting each artist.

{% include custom-templates/cards-by-illustrator-population.html %}

## Rarity

This breaks down each illustration an artist has made by rarity. This shows a combination of the _Cards_ and _Population_ breakdowns above.

### Common (C)

{% include custom-templates/cards-by-illustrator-rarity-C.html %}

### Uncommon (U)

{% include custom-templates/cards-by-illustrator-rarity-U.html %}

### Rare (R)

{% include custom-templates/cards-by-illustrator-rarity-R.html %}

### Super Rare (SR)

{% include custom-templates/cards-by-illustrator-rarity-SR.html %}

### Ultra Rare (UR)

{% include custom-templates/cards-by-illustrator-rarity-UR.html %}

### Collector Super Rare (CSR)

{% include custom-templates/cards-by-illustrator-rarity-CSR.html %}

### Collector Ultra Rare (CUR)

{% include custom-templates/cards-by-illustrator-rarity-CUR.html %}

### Promo Rare (PR)

{% include custom-templates/cards-by-illustrator-rarity-PR.html %}

### Collector Promo Rare (CPR)

{% include custom-templates/cards-by-illustrator-rarity-CPR.html %}

### Any Promo (PR and CPR)

{% include custom-templates/cards-by-illustrator-rarity-PR-CPR.html %}

### Any Collector Rare (CSR, CUR and CPR)

{% include custom-templates/cards-by-illustrator-rarity-CR.html %}