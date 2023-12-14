export async function getProducts(take) {
    try {
        const res = await fetch(`${process.env.BACKEND_URL}/api/products?take=${take}`, {
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

export async function getProduct(id) {
    try {
        const res = await fetch(`${process.env.BACKEND_URL}/api/products/${id}`, {
            cache: "no-store",
        });
        const data = await res.json();
        return data;
    }
    catch (err) {
        return err;
    }
}
