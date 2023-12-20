
export async function getFilterMetrics() {
    try {
        const res = await fetch(`${process.env.BACKEND_URL}/api/metrics`, {
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

