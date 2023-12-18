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


export async function getProductsAjax(intervalMin, intervalMax ) {

    try {

        const res = await fetch(`${process.env.BACKEND_URL}/api/products/filters?min=${intervalMin}&max=${intervalMax}`, {
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
        console.log('error : ' + `${process.env.BACKEND_URL}/api/products/filers?=&min=${intervalMin}&max=${intervalMax}` )
        return err;
    }
}
