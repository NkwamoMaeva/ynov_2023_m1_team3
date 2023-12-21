function generateAverages (response){ //géneration des moyennes à partir de la reponse de la reqûete get

    let data = response.data;
    // console.log(data)

    let averages  = { // objet qui stockera les valeurs finales
        min : null,
        max : null
    }
    let minValuesArray = [] //toutes les valeurs minimum
    let maxValuesArray = [] //toutes les valeurs maximum

    data.forEach(elem => {

        minValuesArray.push(elem.min)
    });
    // console.log(minValuesArray)

    data.forEach(elem => {
        maxValuesArray.push(elem.max)
    });

    // console.log(maxValuesArray)

    averages.min =  Math.ceil((minValuesArray.reduce((acc,currentVal)=>{ return  parseInt(acc) + parseInt(currentVal)}) / minValuesArray.length ))
    averages.max =  Math.ceil((maxValuesArray.reduce((acc,currentVal)=>{ return  parseInt(acc) + parseInt(currentVal)}) / maxValuesArray.length ))

    console.log(averages);
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
        console.log(data)
        return data;
    }
    catch (err) {
        return err;
    }
}


