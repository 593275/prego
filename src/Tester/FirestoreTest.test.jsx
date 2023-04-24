const { doc, getDoc } = require('firebase/firestore');
const { db } =  require("../config/firebase-config");
const assert = require("assert");
const firebase = require("@firebase/testing")

const projectid = "prego-258a6"



describe("Land db", () => {


    it("Understands basic math", () => {
        assert.equal(2+2, 4)
    });

    it("can read items", async() => {
        
        const testDoc =  db.collection("Land").doc("Norge")
        await firebase.assertSucceeds(testDoc.get())
    })

    it("Can fetch specific doc", async() => {
     
        const land = "Tester"
        const docRef = doc(db, "Land", land)
        const docSnap = await getDoc(docRef)
        expect(docSnap.exists).toBe(true);
        expect(docSnap.data()).toEqual({ ctry: 'tester', n: 80085, n_sb: 100, pct_sb: 0.12 });
    })


})