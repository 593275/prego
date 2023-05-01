import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from 'react-router-dom'
import { auth } from "../config/firebase-config"
import { collection, onSnapshot, getDocs, getDoc } from "firebase/firestore"; 
import { db } from "../config/firebase-config"
import { riskScoreCalc, getNorgeData, sum } from "../Functions/function";
import { describe, expect, it } from "vitest"; 

const landListe = [
    {
      ctry: "Etiopia",
      pct_sb: 1.858576393,
      pct_lbw: 8.264027176,
      pct_pet: 10.4837765,
      pct_gdm: 22.88665027,
      pct_cs: 41.72230682,
      pct_fa: 20.6864238,
    },
    {
      ctry: "Norge",
      pct_sb: 1.001091256,
      pct_lbw: 5.107889674,
      pct_pet: 7.124931684,
      pct_gdm: 12.01493002,
      pct_cs: 33.96172582,
      pct_fa: 30.06713399,
    },
    {
      ctry: "Sri-Lanka",
      pct_sb: 0.870416332,
      pct_lbw: 4.448794584,
      pct_pet: 8.162337889,
      pct_gdm: 9.856561914,
      pct_cs: 47.89969821,
      pct_fa: 33.48714184,
    },
    {
      ctry: "India",
      pct_sb: 0.357652561,
      pct_lbw: 4.608215692,
      pct_pet: 10.56106746,
      pct_gdm: 16.87329126,
      pct_cs: 62.03036608,
      pct_fa: 40.02613615,
    },
    {
      ctry: "Somalia",
      pct_sb: 0.621978243,
      pct_lbw: 4.157433521,
      pct_pet: 5.723710717,
      pct_gdm: 13.23025786,
      pct_cs: 54.11966156,
      pct_fa: 31.77125302,
    },
    {
      ctry: 'Polen',
      pct_sb: 0.32273474,
      pct_lbw: 2.592363886,
      pct_pet: 6.337018956,
      pct_gdm: 7.433384986,
      pct_cs: 38.15726619,
      pct_fa: 21.72575703,
    }
]

describe("PreGoTest", async () => {
    it("tester", () => {
        expect(sum(1,2)).toBe(3)
    })

    it("hente Norge data fra firebase", () => {
        const result1 =  riskScoreCalc("Norge", landListe);
        expect(result1).toBe(99)
        const result2 =  riskScoreCalc("Etiopia", landListe);
        expect(result2).toBe(134)
        const result3 =  riskScoreCalc("Sri-Lanka", landListe);
        expect(result3).toBe(87)
        const result4 =  riskScoreCalc("India", landListe);
        expect(result4).toBe(83)
    })

})