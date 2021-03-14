import getKaFromPka from './getKaFromPka';
import quadForm from './quadForm';
import log10 from './log10';

const generateXY = (pKa, acidConc, ohConc, baseIncrement, baseFinalVol, acidInitVol) => {
    //Variable pKa is the pKa from the db

    //Need to get pKa, [HA], [OH^-], volume increment of base, final volume base
    pKa = parseFloat(pKa);
    baseIncrement = parseFloat(baseIncrement);


    //Step #1 - calculate the initial pH
    let xyCoordinates = [];
    let valKa = getKaFromPka(pKa);
    let initialHConc = quadForm(1, valKa, -1 * valKa * acidConc);
    let initialPh = -1 * log10(initialHConc);
    xyCoordinates.push({ x: 0, y: initialPh })

    //Step #2 - determine the total # of increments 
    let numIncrements = baseFinalVol / baseIncrement;

    //Step #3 - determine the initial # of moles acid present
    let molesAcid = acidConc * acidInitVol / 1000;

    //Step #4 - iterate through the number of increments
    for (let i = 1; i < numIncrements; i++) {
        //Determine the volume of base added
        let volumeBaseAdded = i * baseIncrement;
        volumeBaseAdded = volumeBaseAdded.toFixed(2);


        //Determine the number of moles of base added
        let molesBaseAdded = (ohConc * volumeBaseAdded) / 1000;
        molesBaseAdded = molesBaseAdded.toFixed(6);

        //Determine the number of moles of unreacted acid remaining
        let molesHAremaining = molesAcid - molesBaseAdded;
        molesHAremaining = molesHAremaining.toFixed(6);

        //Step #5 - determine the pH values while in buffering region but before the halfway point
        if (molesAcid > molesBaseAdded) {
            let pHbufferingRegion = pKa + log10(molesBaseAdded / molesHAremaining);
            pHbufferingRegion = parseFloat(pHbufferingRegion);

            if(pHbufferingRegion < initialPh){
                pHbufferingRegion = initialPh;
            }
            let bufferingCoordinate = {
                x: volumeBaseAdded,
                y: pHbufferingRegion
            }

            xyCoordinates.push(bufferingCoordinate);
        } else if (molesHAremaining == molesBaseAdded) {
            //Step #6 - determine pH at equivalence point
            let Kb = (Math.pow(10, -14))/valKa;
            let hydroxideConc = quadForm(1, Kb, -1*Kb*acidConc);
            let pHequivPoint = 14 + log10(hydroxideConc);

            
            let equivPointCoordinate = {
                x: volumeBaseAdded,
                y: pHequivPoint
            }

            xyCoordinates.push(equivPointCoordinate);

        } else {
            //Step #7 - determine the pH after the equivalence point
            let excessOHmoles = molesBaseAdded - molesAcid;
            excessOHmoles = excessOHmoles.toFixed(6);
            

            let totalVolume = (acidInitVol + volumeBaseAdded)/1000;
            let baseConcAfterEquiv = excessOHmoles/totalVolume;
            
            let pHAfterEquiv = 14 + log10(baseConcAfterEquiv);

            if(pHAfterEquiv == "-Infinity"){
                let Kb = (Math.pow(10, -14))/valKa;
                let hydroxideConc = quadForm(1, Kb, -1*Kb*acidConc);
                pHAfterEquiv = 14 + log10(hydroxideConc);
            }
            
            let afterEquivCoordinate = {
                x: volumeBaseAdded,
                y: pHAfterEquiv
            }

            xyCoordinates.push(afterEquivCoordinate);
            
        }
    }
    return xyCoordinates;
}

export default generateXY;