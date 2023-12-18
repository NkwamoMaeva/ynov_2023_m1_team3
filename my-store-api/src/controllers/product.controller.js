const { PrismaClient } = require('@prisma/client');

const throwError = require('../utils/throwError');

const prisma = new PrismaClient();

exports.getProducts = async (req, res, next) => {
    try {
        const products = await prisma.product.findMany({
            where: { active: true },
            take: req.query.take ? Number(req.query.take) : 8,
        });
        if (!products) {
            const err = throwError('No products found', 404);
            return next(err);
        }
        return res.send(
            {
                success: true,
                data: products,
            },
        );
    } catch (err) {
        return next(err);
    }
};


exports.getProductsAjax = async (req, res, next) => {
    console.log(req.query.params)
    try {
        const products = await prisma.product.findMany({
            where: {
                AND:[
                    {
                        price : {
                            gte: parseInt(req.query.min),

                        },
                    },
                    {
                        price : {
                            lte: parseInt(req.query.max),

                        }
                    }
                ]

            },
            take: req.query.take ? Number(req.query.take) : 8

        });
        if (!products) {
            const err = throwError('No products found', 404);
            return next(err);
        }
        return res.send(
            {
                success: true,
                data: products,
            },
        );
    } catch (err) {
        return next(err);
    }
};

exports.getProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            const err = throwError('No product id provided', 404);
            next(err);
        }
        const product = await prisma.product.findUnique({
            where: { id: Number(id) },
        });
        if (!product) {
            const err = throwError('Product not found', 404);
            return next(err);
        }
        return res.json(
            {
                data: product,
                sucess: true,
            },
        );
    } catch (err) {
        return next(err);
    }
};
