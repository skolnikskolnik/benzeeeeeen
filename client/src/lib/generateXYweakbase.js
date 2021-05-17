import getKaFromPka from './getKaFromPka';
import quadForm from './quadForm';
import log10 from './log10';

const generateXYweakbase = (pKb, initialBaseConc, acidConc, acidIncrements, acidFinalVol, baseVolume) => {
    let generatedCoordinates = [];

    //STEP #1: Generate initial pH value
    //Turn pKb into Kb
    pKb = parseFloat(pKb);
    let newKb = getKaFromPka(pKb);

    //Solve for OH^- conc using quad form
    let initialOHConc = quadForm(1, newKb, -1 * initialBaseConc);
    let initialpOH = -1 * log10(initialOHConc);
    let initialPh = 14 - initialpOH;
    let firstCoordinate = { x: 0, y: initialPh };
    generatedCoordinates.push(firstCoordinate);

    //STEP #2 - Buffering region 
    //Determine the total # of increments
    let numIncrements = acidFinalVol / acidIncrements;

    //Determine the number of moles B present initially
    let numBmoles = (baseVolume / 1000) * initialBaseConc;

    //Iterate through the increments
    for (let i = 1; i < numIncrements; i++) {
        let volumeAcidAdded = i * acidIncrements;

        //Determine the # of moles of acid added
        let molesAcidAdded = (volumeAcidAdded / 1000) * acidConc;

        //Determine the # of moles of unreacted base remaining
        let molesBaseRemaining = numBmoles - molesAcidAdded;

        //Determine the pH values in buffering region but before the halfway point
        //Now for the halfway point
        if(molesBaseRemaining == molesAcidAdded){
            //pOH is equal to PkB
            let pHhalfway = 14 - pKb;
            
            let halfwayCoordinate = {
                x: volumeAcidAdded,
                y: pHhalfway
            }

            generatedCoordinates.push(halfwayCoordinate);
        } else if (molesBaseRemaining > 0) {
            let pOHbuffering = pKb + log10(molesAcidAdded/molesBaseRemaining);
            let pHbuffering = 14 - pOHbuffering;

            
            //Account for weird cases
            if(pHbuffering>initialPh){
                pHbuffering = initialPh;
            }

            let bufferingCoordinate = {
                x: volumeAcidAdded ,
                y: pHbuffering
            }

            generatedCoordinates.push(bufferingCoordinate);
        } 
        //Account for the equivalence point
        else if(molesBaseRemaining == 0) {
            //pH at equiv point determined by
            
            //Determine Ka of conjugate acid
            let kaConjAcid = (Math.pow(10, -14))/newKb;
            let equivHconc = quadForm(1, kaConjAcid, -1*kaConjAcid*initialBaseConc);
            let pHequivpoint = -1*log10(equivHconc);
            
            let equivCoordinate = {
                x: volumeAcidAdded,
                y: pHequivpoint
            };

            generatedCoordinates.push(equivCoordinate);
        } else {
            //Determine pH after the equiv point
            //Determine excess moles acid

            let excessAcidMoles = molesAcidAdded - numBmoles;
            let totalVolume = (baseVolume + volumeAcidAdded)/1000;

            let acidConc = excessAcidMoles/totalVolume;
            let pHpastequiv = -1* log10(acidConc);
            
            let pastEquivCoord = {
                x: volumeAcidAdded,
                y: pHpastequiv
            };

            generatedCoordinates.push(pastEquivCoord);
        }



    }


    return generatedCoordinates;
}

export default generateXYweakbase;