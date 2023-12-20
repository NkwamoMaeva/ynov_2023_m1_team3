const { PrismaClient } = require('@prisma/client');

const throwError = require('../utils/throwError');

const prisma = new PrismaClient();

exports.getFilterMetrics = async (req, res, next) => {
    try {
        const metrics = await prisma.FilterMetrics.findMany();
        if (!metrics) {
            const err = throwError('No Metrics found', 404);
            return next(err);
        }
        return res.send(
            {
                success: true,
                data: metrics,
            },
        );
    } catch (err) {
        return next(err);
    }
};


