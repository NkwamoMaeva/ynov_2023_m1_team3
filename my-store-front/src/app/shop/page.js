"use client";
import Link from "next/link";
import { getProducts, getFilteredProducts } from "@/services/api/product.api.js";
import { getFilterMetrics, postFilterValues, generateAverages} from "@/services/api/metric.api.js";
import Loader from "@/components/UI/Loader";
import ProductsGrid from "@/components/products/ProductsGrid";
import ProductsCounter from "@/components/products/ProductsCounter";
import TuneIcon from '@mui/icons-material/Tune';
import TitlePage from "@/components/UI/TitlePage";
import Filter from "@/components/UI/Filter";
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react';

export default function Page({
    searchParams,
}) {
    const [range, setRange] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState(null);
    const [error, setError] = useState(null);
    const { take = 8 } = searchParams || {};
    const router = useRouter();
    const query = useSearchParams();

    useEffect(() => {
        if(query.get('min')){
            const fetchProducts = async (min, max) => {
            setLoading(true);
            setRange([min, max]);

            try {
                let products = await getFilteredProducts(min, max); // produits filtré à partir du prix

                if (products) {
                    setProducts(products?.data);
                    handleClose();
                    localStorage.setItem('filterMin', min);
                    localStorage.setItem('filterMax', max);
                }
            }
            catch (err) {
                setError(err)
            }
            finally {
                setLoading(false);
            }
        }
        fetchProducts(query.get('min'), query.get('max'));
        } else {
            const fetchProducts = async () => {
                setLoading(true);
                try {
                    setRange([100, 300]);
                    let products = await getProducts(take);
                    let metrics = await getFilterMetrics(); //données du filtre
                    
                    if(metrics){
                        let averages = await generateAverages(metrics)
                         if(averages){
                            const interval = averages.interval.split(':').map(part => part.trim());
                            const range = interval.map(Number);
                            setRange(range);
                         }
                    }

                    if (products) {
                        setProducts(products?.data);
                        localStorage.removeItem('filterMin');
                        localStorage.removeItem('filterMax');
                    }
                }
                catch (err) {
                    setError(err)
                }
                finally {
                    setLoading(false);
                }
            }
            fetchProducts();
        }
    }, [query]);


    const handleClick = () => (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleReset = () => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                handleClose();
                router.push(`/shop`, undefined, { shallow: true })
            }
            catch (err) {
                setError(err)
            }
            finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }
    const handleSubmit = (min, max) => {
        min = parseInt(min)
        max = parseInt(max)
        const fetchProduct = async () => {
            setLoading(true);
            try {
                postFilterValues(min,max);
                handleClose();
                router.push(`?min=${min}&max=${max}`, undefined, { shallow: true })
            }
            catch (err) {
                setError(err)
            }
            finally {
                setLoading(false);
            }
        }
        fetchProduct();
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
            <Filter min={range[0]} max={range[1]} onReset={handleReset} onSubmit={handleSubmit} />
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
