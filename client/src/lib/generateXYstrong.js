import log10 from './log10';

const generateXYstrong = (acidConc, acidVol, baseConc, baseVol, increment) => {
    let xyCoordinates = [];

    //For first coordinate - based just on initial acid concentration
    let pH = -1 * log10(acidConc);
    let firstCoordinate = {x: 0, y: pH};
    xyCoordinates.push(firstCoordinate);

    let totalNumCoordinates = baseVol / increment;
    let molesAcid = acidVol * acidConc / 1000;
    for(let i=1; i< totalNumCoordinates + 1; i++){
        //For each coordinate, calculate pH
        //Must calculate moles acid, moles of base, volume base added, and total volume
        let volumeBaseAdded = i*increment;
        let molesBaseAdded = baseConc * volumeBaseAdded / 1000;
        let totalVolumeLiters = (acidVol + baseVol)/1000;
        
        
        if(molesAcid>molesBaseAdded){
            let newMolesAcid = molesAcid - molesBaseAdded;
            let newAcidConc = newMolesAcid / totalVolumeLiters;
            let pHVal = -1 * log10(newAcidConc);
            let newCoordinate = {
                x: volumeBaseAdded,
                y: pHVal
            };
            xyCoordinates.push(newCoordinate);

        } else if (molesAcid == molesBaseAdded){
            let neutralCoordinate = {
                x: volumeBaseAdded,
                y: 7
            }
            xyCoordinates.push(neutralCoordinate);

        } else {
            let newMolesBase = molesBaseAdded - molesAcid;
            let newBaseConc = newMolesBase / totalVolumeLiters;
            let pOH = -1 * log10(newBaseConc);
            let newpH = 14 - pOH;
            let newxyCoordinate = {
                x: volumeBaseAdded,
                y: newpH
            }
            xyCoordinates.push(newxyCoordinate);
        }
    }

    return xyCoordinates;
}

export default generateXYstrong;