import amberBottle from "../img/amber.png"
import stoutBottle from "../img/stout.png"
import lagerBottle from "../img/lager.png"
import ipaBottle from "../img/IPAt.png"
import lagerBg from "../img/beer2.png"
import amberBg from "../img/beer4.png"
import stoutBg from "../img/beer3.png"
import ipaBg from "../img/beer5.png"

export const beers = [
    {
        id: "golden-harvest", price: 249, src: lagerBg,
        bottle: lagerBottle,
        title: "Golden Harvest",
        subtitle: "Lager",
        category: "Crisp grain fields",
        tastingNotes: "Light bread and golden grain meet a gentle floral hop note. Clean, refreshing, and softly bitter, with a crisp, dry finish.",
    },
    {
        id: "amber-arcadia", price: 289, src: amberBg,
        bottle: amberBottle,
        title: "Amber Arcadia",
        subtitle: "Amber Ale",
        category: "Caramel malt embrace",
        tastingNotes: "Toasted bread, caramel, and a hint of biscuit give way to a rounded malt sweetness. Gentle hop bitterness keeps the finish balanced and smooth.",
    },
    
    {
        id: "wildwood", price: 329, src: ipaBg,
        bottle: ipaBottle,
        title: "Wildwood",
        subtitle: "India Pale Ale (IPA)",
        category: "Citrus pine explosion",
        tastingNotes: "Bright grapefruit peel and resinous pine lead the way, backed by a light malt sweetness. Assertive hop bitterness lingers through a dry, lively finish.",
    },
    {
        id: "frostbite-stout", price: 399, src: stoutBg,
        bottle: stoutBottle,
        title: "Frostbite Stout",
        subtitle: "Imperial Stout",
        category: "Rich chocolatey mint",
        tastingNotes: "Dark chocolate, roasted coffee, and deep caramel unfold in a full, velvety body. A cool mint accent lifts the rich malt character into a long, bittersweet finish.",
    },
    
    
];

export const formatPrice = (cents) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(cents / 100);
