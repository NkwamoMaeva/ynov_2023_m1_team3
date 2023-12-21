function mostFrequentInterval(dataArray, dataArrayLength) {

    let maxCount = 0; // counter d'apparition d'un interval dans le tableau
    let mostOccurencies; // nombre d'apparition max d'un élement du tableau
    for (let i = 0; i < dataArrayLength; i++) {
        let count = 0;
        for (let j = 0; j < dataArrayLength; j++) {
            if (dataArray[i] == dataArray[j])
                count++;
        }

        if (count > maxCount) {
            maxCount = count;
            mostOccurencies = dataArray[i];
        }
    }

    return mostOccurencies;
}

export function generateAverages (response){ //géneration des moyennes à partir de la reponse de la reqûete get

    const data = response.data;

    let averages  = { // objet qui stockera les valeurs finales
        min : null,
        max : null,
        interval : null
    }
    let minValuesArray = [] //toutes les valeurs minimum
    let maxValuesArray = [] //toutes les valeurs maximum
    let intervalsArray = [] //toutes les valeurs interval

    data.forEach(elem => {

        minValuesArray.push(elem.min)
    });

    data.forEach(elem => {
        maxValuesArray.push(elem.max)
    });

    data.forEach(elem => {

        intervalsArray.push(elem.interval)
    });

    averages.min =  Math.ceil((minValuesArray.reduce((acc,currentVal)=>{ return  parseInt(acc) + parseInt(currentVal)}) / minValuesArray.length ))
    averages.max =  Math.ceil((maxValuesArray.reduce((acc,currentVal)=>{ return  parseInt(acc) + parseInt(currentVal)}) / maxValuesArray.length ))
    averages.interval = `${mostFrequentInterval(intervalsArray, intervalsArray.length)}`;

    return averages;
}

export async function getFilterMetrics() {
    try {
        const res = await fetch(`${process.env.BACKEND_URL}/api/metrics`, {
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        generateAverages(data) // cette fonction retoune un object qui contiendra les moyennes
        return data;
    }
    catch (err) {
        return err;
    }
}

export async function postFilterValues(min, max) {

    try {
        const res = await fetch(`${process.env.BACKEND_URL}/api/metrics/postValues?min=${min}&max=${max}`, {
            method: "POST",
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        return data;
    }
    catch (err) {
        return err;
    }
}


