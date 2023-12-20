
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