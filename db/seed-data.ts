/**
 * Court Seed Data - London Basketball Courts
 * 
 * Data sourced from Courts of the World
 * https://www.courtsoftheworld.com/united-kingdom/london/
 * 
 * Run: npm run db:seed:local (for local dev)
 * Run: npm run db:seed (for production)
 */

export const courts = [
    // 1. Ravenscourt Park - #1 in London
    {
        name: "Ravenscourt Park",
        address: "Ravenscourt Park, Ravenscourt Road, Hammersmith",
        postcode: "W6 0UL",
        borough: "Hammersmith and Fulham",
        latitude: 51.4943,
        longitude: -0.2366,
        description: "Popular outdoor basketball court in West London with a scenic park setting. Multiple courts with strong local hoop culture. One of the best spots for streetball in London.",
        tags: ["tag_outdoor", "tag_concrete", "tag_free", "tag_fullcourt", "tag_public"],
        imageUrl: ""
    },
    // 2. Argyle Square Public Basketball Court
    {
        name: "Argyle Square Basketball Court",
        address: "Argyle Square, King's Cross",
        postcode: "WC1H 8EG",
        borough: "Camden",
        latitude: 51.5302,
        longitude: -0.1220,
        description: "Outdoor public court near King's Cross with rubber flooring and lighting. Full court with regulation height hoops and wheelchair access.",
        tags: ["tag_outdoor", "tag_synthetic", "tag_free", "tag_fullcourt", "tag_lighting", "tag_public"],
        imageUrl: ""
    },
    // 3. Finsbury Park - #3 in London
    {
        name: "Finsbury Park",
        address: "Finsbury Park, Seven Sisters Road",
        postcode: "N4 2PH",
        borough: "Haringey",
        latitude: 51.5655,
        longitude: -0.1027,
        description: "One of North London's most popular outdoor courts. Multiple hoops with rubber flooring and regulation height. Draws players of all skill levels for competitive pick-up games.",
        tags: ["tag_outdoor", "tag_synthetic", "tag_free", "tag_fullcourt", "tag_public"],
        imageUrl: ""
    },
    // 4. The Regal - Indoor
    {
        name: "The Regal",
        address: "The Regal, Queensway",
        postcode: "W2 4SJ",
        borough: "Westminster",
        latitude: 51.5115,
        longitude: -0.1879,
        description: "Indoor public basketball facility in central London. Full court with hardwood flooring, lighting, and wheelchair access.",
        tags: ["tag_indoor", "tag_hardwood", "tag_paid", "tag_fullcourt", "tag_lighting", "tag_public"],
        imageUrl: ""
    },
    // 5. Crescent Basketball Court
    {
        name: "Crescent Basketball Court",
        address: "Crescent Road, Crouch End",
        postcode: "N8 8AX",
        borough: "Haringey",
        latitude: 51.5812,
        longitude: -0.1183,
        description: "Outdoor public full court in Crouch End. Great spot for pick-up games in North London.",
        tags: ["tag_outdoor", "tag_concrete", "tag_free", "tag_fullcourt", "tag_public"],
        imageUrl: ""
    },
    // 6. Turnpike Lane
    {
        name: "Turnpike Lane",
        address: "Turnpike Lane, Wood Green",
        postcode: "N8 0DU",
        borough: "Haringey",
        latitude: 51.5901,
        longitude: -0.1031,
        description: "Outdoor public court near Turnpike Lane station. Popular spot in North London.",
        tags: ["tag_outdoor", "tag_concrete", "tag_free", "tag_public"],
        imageUrl: ""
    },
    // 7. Oval Court
    {
        name: "Oval Court",
        address: "Kennington Oval, Kennington",
        postcode: "SE11 5SS",
        borough: "Lambeth",
        latitude: 51.4837,
        longitude: -0.1133,
        description: "Outdoor public basketball court near The Oval. Accessible location in South London.",
        tags: ["tag_outdoor", "tag_concrete", "tag_free", "tag_public"],
        imageUrl: ""
    },
    // 8. Bethnal Green
    {
        name: "Bethnal Green",
        address: "Bethnal Green Gardens, Bethnal Green Road",
        postcode: "E2 0AG",
        borough: "Tower Hamlets",
        latitude: 51.5274,
        longitude: -0.0551,
        description: "Multiple outdoor courts near Bethnal Green station. Concrete flooring with dunk rims and wheelchair access. Good for pick-up games in East London.",
        tags: ["tag_outdoor", "tag_concrete", "tag_free", "tag_fullcourt", "tag_public"],
        imageUrl: ""
    },
    // 9. Crown Basketball Court
    {
        name: "Crown Basketball Court",
        address: "Crown Road, Morden",
        postcode: "SM4 5BT",
        borough: "Merton",
        latitude: 51.3976,
        longitude: -0.2048,
        description: "Outdoor public full court with regulation height hoops. Concrete flooring with wheelchair access.",
        tags: ["tag_outdoor", "tag_concrete", "tag_free", "tag_fullcourt", "tag_public"],
        imageUrl: ""
    },
    // 10. Kilburn Grange Park
    {
        name: "Kilburn Grange Park",
        address: "Kilburn Grange Park, Kilburn",
        postcode: "NW6 5SB",
        borough: "Camden",
        latitude: 51.5449,
        longitude: -0.1990,
        description: "Outdoor public court in a lovely park setting. Great for casual games in North West London.",
        tags: ["tag_outdoor", "tag_concrete", "tag_free", "tag_public"],
        imageUrl: ""
    },
    // 11. Clapham Common Park
    {
        name: "Clapham Common Park",
        address: "Clapham Common, Windmill Drive",
        postcode: "SW4 9DE",
        borough: "Lambeth",
        latitude: 51.4615,
        longitude: -0.1380,
        description: "Multiple hoops in a great park! Outdoor courts with adjustable rims, lighting, and wheelchair access. Popular for pick-up games in South London.",
        tags: ["tag_outdoor", "tag_concrete", "tag_free", "tag_fullcourt", "tag_lighting", "tag_public"],
        imageUrl: ""
    },
    // 12. Hilly Fields Court
    {
        name: "Hilly Fields Court",
        address: "Hilly Fields, Brockley",
        postcode: "SE4 1QE",
        borough: "Lewisham",
        latitude: 51.4585,
        longitude: -0.0337,
        description: "Multiple outdoor courts in Hilly Fields park. Popular spot in South East London.",
        tags: ["tag_outdoor", "tag_concrete", "tag_free", "tag_fullcourt", "tag_public"],
        imageUrl: ""
    },
    // 13. Garratt Park
    {
        name: "Garratt Park",
        address: "Garratt Park, Garratt Lane, Earlsfield",
        postcode: "SW17 0NY",
        borough: "Wandsworth",
        latitude: 51.4410,
        longitude: -0.1895,
        description: "Full court in a park setting with pick-up games. Concrete floor in South West London.",
        tags: ["tag_outdoor", "tag_concrete", "tag_free", "tag_fullcourt", "tag_public"],
        imageUrl: ""
    },
    // 14. Dulwich Park
    {
        name: "Dulwich Park",
        address: "Dulwich Park, College Road",
        postcode: "SE21 7BQ",
        borough: "Southwark",
        latitude: 51.4455,
        longitude: -0.0773,
        description: "Outdoor court in beautiful Dulwich Park. Great spot for basketball in South East London.",
        tags: ["tag_outdoor", "tag_concrete", "tag_free", "tag_public"],
        imageUrl: ""
    },
    // 15. Acton Park
    {
        name: "Acton Park",
        address: "Acton Park, The Vale, Acton",
        postcode: "W3 7JT",
        borough: "Ealing",
        latitude: 51.5108,
        longitude: -0.2747,
        description: "Full court in Acton Park with pick-up games. Concrete floor in West London.",
        tags: ["tag_outdoor", "tag_concrete", "tag_free", "tag_fullcourt", "tag_public"],
        imageUrl: ""
    },
    // 16. Bourne Estate
    {
        name: "Bourne Estate",
        address: "Bourne Estate, Portpool Lane, Clerkenwell",
        postcode: "EC1N 7UD",
        borough: "Camden",
        latitude: 51.5218,
        longitude: -0.1095,
        description: "Outdoor public court near Clerkenwell. Central London location.",
        tags: ["tag_outdoor", "tag_concrete", "tag_free", "tag_public"],
        imageUrl: ""
    },
    // 17. Leyton Manor Park
    {
        name: "Leyton Manor Park",
        address: "Leyton Manor Park, Church Road, Leyton",
        postcode: "E10 5JG",
        borough: "Waltham Forest",
        latitude: 51.5683,
        longitude: -0.0197,
        description: "Outdoor public court in Leyton. Great spot for basketball in East London.",
        tags: ["tag_outdoor", "tag_concrete", "tag_free", "tag_public"],
        imageUrl: ""
    },
    // 18. Haverstock School - Indoor
    {
        name: "Haverstock School",
        address: "Haverstock School, Crogsland Road, Chalk Farm",
        postcode: "NW1 8YT",
        borough: "Camden",
        latitude: 51.5503,
        longitude: -0.1502,
        description: "Indoor private courts at Haverstock School. Multiple courts with hardwood flooring, lighting, and wheelchair access. Regulation height hoops.",
        tags: ["tag_indoor", "tag_hardwood", "tag_membership", "tag_fullcourt", "tag_lighting"],
        imageUrl: ""
    },
    // 19. Alderny Street
    {
        name: "Alderny Street",
        address: "Alderny Street, Pimlico",
        postcode: "SW1V 4EU",
        borough: "Westminster",
        latitude: 51.4875,
        longitude: -0.1384,
        description: "Outdoor public court in Pimlico. Central London location for pick-up games.",
        tags: ["tag_outdoor", "tag_concrete", "tag_free", "tag_public"],
        imageUrl: ""
    },
    // 20. Ealing Road Court
    {
        name: "Ealing Road Court",
        address: "Ealing Road, Wembley",
        postcode: "HA0 4LW",
        borough: "Brent",
        latitude: 51.5505,
        longitude: -0.3036,
        description: "Full court with concrete floor in Wembley. North West London location.",
        tags: ["tag_outdoor", "tag_concrete", "tag_free", "tag_fullcourt", "tag_public"],
        imageUrl: ""
    },
    // 21. Marlowe Road
    {
        name: "Marlowe Road",
        address: "Marlowe Road, Walthamstow",
        postcode: "E17 6EJ",
        borough: "Waltham Forest",
        latitude: 51.5903,
        longitude: -0.0236,
        description: "Outdoor public court in Walthamstow. East London basketball spot.",
        tags: ["tag_outdoor", "tag_concrete", "tag_free", "tag_public"],
        imageUrl: ""
    },
    // 22. Vestry Park
    {
        name: "Vestry Park",
        address: "Vestry Road, Walthamstow",
        postcode: "E17 9NH",
        borough: "Waltham Forest",
        latitude: 51.5857,
        longitude: -0.0160,
        description: "Multiple outdoor courts in Vestry Park with wheelchair access.",
        tags: ["tag_outdoor", "tag_concrete", "tag_free", "tag_fullcourt", "tag_public"],
        imageUrl: ""
    },
    // 23. Wood Street Precinct Ball Court
    {
        name: "Wood Street Ball Court",
        address: "Wood Street, Walthamstow",
        postcode: "E17 3HX",
        borough: "Waltham Forest",
        latitude: 51.5889,
        longitude: -0.0019,
        description: "Outdoor public ball court on Wood Street in Walthamstow.",
        tags: ["tag_outdoor", "tag_concrete", "tag_free", "tag_public"],
        imageUrl: ""
    },
    // 24. Kennington Park
    {
        name: "Kennington Park",
        address: "Kennington Park, Kennington Park Road",
        postcode: "SE11 4BE",
        borough: "Lambeth",
        latitude: 51.4834,
        longitude: -0.1067,
        description: "Outdoor court in historic Kennington Park. Great for basketball in South London.",
        tags: ["tag_outdoor", "tag_concrete", "tag_free", "tag_public"],
        imageUrl: ""
    },
    // Additional courts from Shoreditch area mentioned in the description
    {
        name: "Shoreditch Park",
        address: "Shoreditch Park, New North Road",
        postcode: "N1 6TA",
        borough: "Hackney",
        latitude: 51.5360,
        longitude: -0.0794,
        description: "Popular outdoor basketball court in the heart of Shoreditch. Blends local talent with urban culture and international flair.",
        tags: ["tag_outdoor", "tag_concrete", "tag_free", "tag_fullcourt", "tag_public"],
        imageUrl: ""
    }
]

export default courts
