let school_ids = [
    {
        _id: "60336037760399197474b863",
        name: "SOICT",
    },
    {
        _id: "60336071760399197474b864",
        name: "SOM",
    },
    {
        _id: "60336071760399197474b865",
        name: "SOE",
    },
    {
        _id: "603360ec760399197474b866",
        name: "SOBSC",
    },
    {
        _id: "603360ec760399197474b867",
        name: "SOBT",
    },
    {
        _id: "603360ec760399197474b868",
        name: "SOHSS",
    },
    {
        _id: "603360ec760399197474b869",
        name: "SOLJG",
    },
    {
        _id: "603360ec760399197474b86b",
        name: "SOVSAS",
    },
]

let school_branches = {
    SOBSC: [],
    SOBT: [
        "B.Tech + M.Tech/MBA (Biotech)(1)",
        "B.Tech + M.Tech/MBA (Biotech)(2)",
        "B.Tech + M.Tech/MBA (Biotech)(3)",
        "B.Tech + M.Tech/MBA (Biotech)(4)",
        "MTB2-1",
        "M. Sc Biotechnology (1)",
    ],
    SOE: [
        "B.Tech + M.Tech/MBA (CE)(4-E)",
        "B.Tech + M.Tech/MBA (CE)(4-S)",
        "B.Tech + M.Tech/MBA (EE)(4(I&C))",
        "B.Tech + M.Tech/MBA (EE)(4(PS))",
        "B.Tech + M.Tech/MBA (EE)(4(PED))",
        "M.Tech (Power System) (1)",
        "M.Tech (Structural) (1)",
        "B.Architecture (1)",
        "B.Tech (EE) (1)",
        "B.Tech (EE) (2)",
        "B.Tech (EE) (3)",
        "B.Tech (ME) (1)",
        "B.Tech (CE) (1)",
    ],
    SOHSS: [
        "B.A. (Hon) Political Science (1)",
        "BA English (1)",
        "BSW (1)",
        "BA Psychology (1)",
        "BA (H) Economics (1)",
        "BA (H) History and Civilization (1)",
        "BA Mass Commu. (1)",
        "BA Urdu (1)",
        "BA Hindi (1)",
    ],
    SOICT: [
        "B.Tech + M.Tech/MBA (CS)(1-A)",
        "B.Tech + M.Tech/MBA (CS)(1-B)",
        "M.Tech (VLSI Design) (1)",
        "M.Tech (Wireless Comm.) (1)",
        "M.Tech (Wireless Comm.) (2)",
        "M.Tech (Software) (1)",
        "MT-1-A",
        "M.Tech (Intell.)(1-B)",
        "Ph.D ICT",
        "B.Tech (IT) (1)",
        "B.Tech (IT) (2)",
        "B.Tech (IT) (3)",
        "B.Tech (AI) (1)",
        "B.Tech (AI) (2)",
        "B.C.A (1)",
        "B.C.A  (2)",
        "MCA (1)",
        "MCA (2)",
        "B.Tech (CS) (1-A)",
        "B.Tech (CS) (1-B)",
        "B.Tech (CS) (2-A)",
        "B.Tech (CS) (2-B)",
        "B.Tech (CS) (2-C)",
        "B.Tech (CS) (3)",
        "B.Tech (EC) (1)",
        "B.Tech (EC) (2-A)",
        "B.Tech (EC) (2-B)",
        "B.Tech (EC) (3)",
    ],
    SOLJG: ["BA LLB (1-A)", "BA LLB (1-B)"],
    SOM: [
        "DMB -1",
        "DMB -2",
        "MBA (1-A)",
        "MBA (1-B)",
        "B. Com (1-A)",
        "B. Com (1-B)",
    ],
    SOVSAS: [
        "M. Sc (Applied Mathematics) (1)",
        "M. Sc (Applied Mathematics) (2)",
        "M. Sc (Applied Physics) (1) ",
        "M. Sc (Applied Chemistry) (1)",
        "M. Sc (Food Science) (2)",
        "M. Sc (Environmental Science) (1)",
        "M. Sc (Environmental Science) (2)",
        "B.Tech + M.Tech/MBA (Food)(2)",
        "B.Tech + M.Tech/MBA (Food)(3)",
        "B.Tech + M.Tech/MBA (Food)(4)",
        "M.Tech (Food Technology ) (2)",
        "B. Sc Physical Sciences (1)",
        "B. Sc Physical Sciences (2)",
        "B. Sc (H) Mathematics (1)",
        "B. Sc (H) Mathematics (2)",
        "B. Sc (H) Chemistry (1)",
        "B. Sc (H) Chemistry (2)",
        "B. Sc (H) Physics (1)",
        "B. Sc (H) Physics (2)",
    ],
}

let arr = []

school_ids.forEach((school) => {
    let name = school.name
    let s_id = school._id
    let branches = school_branches[name]
    console.log(branches, name)
    branches.forEach((branch) => {
        let json = {
            name: branch,
            school_id: s_id,
        }
        arr.push(json)
    })
})

const fs = require("fs")

fs.appendFile('branches.json', JSON.stringify(arr), function (err) {
  if (err) throw err;
  console.log('Saved!');
})
