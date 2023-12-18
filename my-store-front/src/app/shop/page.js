"use client";
import Link from "next/link";
import { getProducts, getProductsAjax } from "@/services/api/product.api.js";
import Loader from "@/components/UI/Loader";
import ProductsGrid from "@/components/products/ProductsGrid";
import ProductsCounter from "@/components/products/ProductsCounter";
import TuneIcon from '@mui/icons-material/Tune';
import TitlePage from "@/components/UI/TitlePage";
import Filter from "@/components/UI/Filter";
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';

import { useState, useEffect } from 'react';

export default function Page({
    searchParams,
}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(true);
    const { take = 8 } = searchParams || {};

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                let products = await getProducts(take);
                let productFilter = await getProductsAjax("90","100"); // Remplacer valeur en dur par les valeurs de l'input

                if (products) {
                    setProducts(products?.data);
                }
            }
            catch (err) {
                setError(err)
            }
            finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [take]);


    const handleClick = () => (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const openFilter = Boolean(anchorEl);
    const idFilter = openFilter ? 'simple-popover' : undefined;

if (loading) return <Loader />;
    return (
        <div className="container mx-auto my-12">
        <Popover
            id={idFilter}
            open={openFilter}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            <Filter min={20} max={300} onClose={handleClose} />
        </Popover>
            <div className="flex flex-row justify-between">
                <TitlePage title="Shop" />
                <Button aria-describedby={idFilter} className="w-min" variant="outlined" onClick={handleClick()} style={{padding: 5 + 'px', minWidth: 46 + 'px'}} >
                    <TuneIcon className="m-0" />
                </Button>
            </div>
            <ProductsCounter productsLength={products?.length} />
            <ProductsGrid products={products} />
            <div className="flex justify-center mb-24">
                {
                    Number(take) <= products?.length && (
                        <Link
                            className="transition ease-in-out delay-150 mt-4 inline-flex items-center px-4 py-3 text-sm border border-slate-500 font-medium text-center text-slate-500 bg-white hover:bg-slate-500 hover:text-white"
                            href={`/shop?take=${(Number(take) + 8)}`}
                        >
                            See more
                        </Link>
                    )
                }
            </div>
        </div>
    )
}
