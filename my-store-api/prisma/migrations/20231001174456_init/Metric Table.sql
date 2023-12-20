-- SQLite

CREATE TABLE "FilterMetrics" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "min" INTEGER NOT NULL
    "interval" TEXT NOT NULL,
);


SELECT * FROM FilterMetrics;

-- INSERT INTO FilterMetrics (min, max, interval)
-- VALUES (100, 150, "100 : 150");

-- INSERT INTO FilterMetrics (min, max, interval)
-- VALUES (90, 110, "90 : 110");