
import { riskScoreCalc, getNorgeData, sum } from "../Functions/function";
import { describe, expect, it } from "vitest"; 
import { landListe } from "./testData";


describe("PreGoTest", async () => {
    it("tester", () => {
        expect(sum(1,2)).toBe(3)
    })

    it("risiko score kalkulering", () => {
        const result1 =  riskScoreCalc("Norge", landListe);
        expect(result1).toBe(99)
        const result2 =  riskScoreCalc("Etiopia", landListe);
        expect(result2).toBe(134)
        const result3 =  riskScoreCalc("Sri-Lanka", landListe);
        expect(result3).toBe(87)
        const result4 =  riskScoreCalc("India", landListe);
        expect(result4).toBe(83)
    })

    it("Kan hente data om Norge fra firebase firestore", async () => {
        const result =  await getNorgeData();
        expect(result.ctry).toBe("Norge")
    })

})