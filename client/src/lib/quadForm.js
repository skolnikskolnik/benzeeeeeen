const quadForm = (a, b, c) => {

    let result1 = (-1 * b + Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a);
    let result2 = (-1 * b - Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a);

    //Ignore negatives
    let results = [];
    if(result1>0){
        results.push(result1);
    } else if(result2>0){
        results.push(result2);
    } else {
        results.push("error - no positive solutions")
    }

    return results;
}

export default quadForm;