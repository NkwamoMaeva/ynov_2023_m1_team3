"use client";
import Link from "next/link";
import { getProducts } from "@/services/api/product.api.js";
import Loader from "@/components/UI/Loader";
import ProductsGrid from "@/components/products/ProductsGrid";
import TitlePage from "@/components/UI/TitlePage";
import ProductsCounter from "@/components/products/ProductsCounter";
import TuneIcon from '@mui/icons-material/Tune';
import Popper from '@mui/material/Popper';
import Popover from '@mui/material/Popover';
import Fade from '@mui/material/Fade';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';

import { useState, useEffect } from 'react';

export default function Page({
    searchParams,
}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [range, setRange] = useState([50, 300]);
    const { take = 8 } = searchParams || {};
    const minDistance = 10;

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                let products = await getProducts(take);
                console.log(products)

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

    const handleRangeChange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
        return;
        }

        if (newValue[1] - newValue[0] < minDistance) {
        if (activeThumb === 0) {
            const clamped = Math.min(newValue[0], 100 - minDistance);
            setRange([clamped, clamped + minDistance]);
        } else {
            const clamped = Math.max(newValue[1], minDistance);
            setRange([clamped - minDistance, clamped]);
        }
        } else {
        setRange(newValue);
        }
    };

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
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <h6 className="text-xl font-semibold">
                        Price range
                    </h6>
                    <span className="text-sm" color="text.secondary">
                    Use slider or enter min and max price
                    </span>
                    <div className="my-5 flex flex-row">
                        <FormControl className="w-36" variant="outlined" size="small">
                            <OutlinedInput
                                type="number"
                                value={range[0]}
                                placeholder="Min"
                                id="standard-adornment-amount"
                                endAdornment={<InputAdornment position="end">&nbsp;€</InputAdornment>}
                                onChange={(event) => {
                                    setRange([event.target.value,range[1]]);
                                }}
                            />
                        </FormControl> <span className="mx-2">_</span>
                        <FormControl className="w-36" variant="outlined" size="small">
                            <OutlinedInput
                                type="number"
                                value={range[1]}
                                placeholder="Max"
                                id="standard-adornment-amount"
                                endAdornment={<InputAdornment position="end">&nbsp;€</InputAdornment>}
                                onChange={(event) => {
                                    setRange([range[0], event.target.value]);
                                }}
                            />
                        </FormControl>
                    </div>
                    <Slider
                        value={range}
                        min={0} max={1000}
                        onChange={handleRangeChange}
                        valueLabelDisplay="auto"
                        disableSwap
                    />
                </CardContent>
                <CardActions className="flex justify-end">
                    <Button size="small" onClick={handleClose}>Cancel</Button>
                    <Button size="small" onClick={handleClose}>Confirm</Button>
                </CardActions>
            </Card>
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
