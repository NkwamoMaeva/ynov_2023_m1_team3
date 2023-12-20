"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation'
import { getProduct, getFilteredProducts } from '@/services/api/product.api.js';
import ProductsRecommend from "@/components/products/ProductsRecommend";
import BreadCrumb from "@/components/UI/Breadcrumb";
import TitlePage from '@/components/UI/TitlePage';
import ProductFancyBox from "@/components/products/ProductFancyBox";
import Loader from "@/components/UI/Loader";
import Alert from "@/components/UI/Alert";
import { getBase64 } from '../../../lib/base64';


export default function Page() {

    const { id } = useParams();
    const [selectedImage, setSelectedImage] = useState(null);
    const [placehodlerImage, setPlaceholderImage] = useState(null);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [slideIndex, setSlideIndex] = useState(0);
    const [showFancyBox, setShowFancyBox] = useState(false);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState(null);


    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                let product = await getProduct(id);
                if (product) {
                    setProduct(product.data);
                }
            }
            catch (err) {
                setError(err)
            }
            finally {
                setLoading(false);
            }
        }
        if (id) {
            fetchProduct();
        }
    }, [id]);

    useEffect(() => {
        const fetchPlaceholderImage = async () => {
            try {
                const placeholder = await getBase64(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/${product.thumbnail}`);
                setPlaceholderImage(placeholder);
            } catch (error) {
                console.error('Error fetching placeholder image:', error.message);
            }
            };
        if (product) {
            setSelectedImage(product?.thumbnail);
            fetchPlaceholderImage();
        }
    }, [product]);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const min = localStorage.getItem('filterMin');
                const max = localStorage.getItem('filterMax');
                if(min && max){
                    let products = await getFilteredProducts(min, max, 3);
                    if (products) {
                    setProducts(products?.data);
                }
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
    }, []);

    if (loading) return <Loader />;

    const goToNextSlide = () => {
        setSelectedImage(slideIndex === 0 ? product?.packshot : product?.thumbnail);
        setSlideIndex(slideIndex === 0 ? 1 : 0);
    }

    const goToPrevSlide = () => {
        setSelectedImage(slideIndex === 0 ? product?.packshot : product?.thumbnail);
        setSlideIndex(slideIndex === 0 ? 1 : 0);
    }

    return (
        <div className="container mx-auto py-12">
            {
                error && (
                    <Alert message={error.message} type="error" />
                )
            }
            {
                !product && (
                    <Alert message="No products found" type="error" />
                )
            }
            {
                showFancyBox && (
                    <ProductFancyBox
                        img={selectedImage}
                        prevSlide={() => goToPrevSlide()}
                        nextSlide={() => goToNextSlide()}
                        close={() => { setShowFancyBox(false) }}
                    />
                )
            }
            <BreadCrumb current_page={product?.name} />
            <div className="flex">
                <div className="thumbnail lg:flex-1">
                    <div
                        onClick={() => setShowFancyBox(true)}
                        className="group/show w-4/5 h-[550px] overflow-hidden cursor-pointer">
                        <Image
                            blurDataURL={placehodlerImage}
                            className="object-cover h-full w-full group-hover/show:scale-105 transition ease-in-out delay-150 z-1"
                            alt={product?.name}
                            src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/${selectedImage}`}
                            width={500}
                            height={500}
                        />
                    </div>
                    <div className="carousel flex mt-4 overflow-hidden">
                        <div className="item w-[100px] h-[100px] mr-2">
                            <Image
                                className="cursor-pointer object-cover h-full w-full "
                                alt={product?.name}
                                src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/${product?.thumbnail}`}
                                width={100}
                                height={100}
                                onMouseOver={() => {
                                    setSelectedImage(product?.thumbnail);
                                    setSlideIndex(0);
                                }}
                                onClick={() => {
                                    setSelectedImage(product?.thumbnail);
                                    setSlideIndex(0);
                                }}
                            />
                        </div>
                        <div className="item w-[100px] h-[100px]">
                            <Image
                                className="cursor-pointer object-cover h-full w-full"
                                alt={product?.name}
                                src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/${product?.packshot}`}
                                width={100}
                                height={100}
                                onMouseOver={() => {
                                    setSelectedImage(product?.packshot);
                                    setSlideIndex(1);
                                }}
                                onClick={() => {
                                    setSelectedImage(product?.packshot);
                                    setSlideIndex(1);
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="content lg:flex-1 p-6">
                    <TitlePage title={product?.name} />
                    <p className="mb-3 font-semibold text-lg">{product?.price} €</p>
                    <p className="leading-7">{product?.description}</p>
                </div>
            </div>
            {
                products && (
                    <div>
                        <div className="flex items-center mt-32 mb-10">
                            <div className="flex-1 flex h-[3px] bg-gray-950	"></div>
                            <h2 className="px-8 text-xl">Recommended products</h2>
                            <div className="flex-1 flex h-[3px] bg-gray-950	"></div>
                        </div>
                        <div className="flex flex-row">
                            {
                                products?.map(product => (
                                <ProductsRecommend key={product.id} product={product} />
                                ))
                            }
                        </div>
                    </div>
                )
            }
            
        </div>
    );
}
