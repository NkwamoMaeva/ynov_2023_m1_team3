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

exports.postFilterValues = async (req, res, next) => { // fonction d'insertion des valeurs des input filtres
    console.log(req.query)
    try {
        const values = await prisma.FilterMetrics.create({
            data: {
              min: req.query.min ,
              max: req.query.max,
              interval : `${req.query.min} : ${req.query.max}`
            },
          })

        return res.send(
            {
                success: true,
                data: values,
            },
        );
    } catch (err) {
        return next(err);
    }
};


