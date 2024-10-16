DROP FUNCTION IF EXISTS inr.get_feature_by_id;

CREATE OR REPLACE FUNCTION inr.get_feature_by_id (
  fuinctionId INTEGER
) RETURNS TABLE(
  id INTEGER,
  name VARCHAR(100),
  canonical VARCHAR(100),
  active BOOLEAN,
  icon VARCHAR(100),
  path VARCHAR(300),
  visible BOOLEAN,
  "deviceComponentsId" INTEGER,
  "deviceName" VARCHAR(40),
  "createdById" INTEGER,
  "createdName" VARCHAR(200),
  "createdAt" TIMESTAMP(3),
  "updatedById" INTEGER,
  "updatedName" VARCHAR(200),
  "updatedAt" TIMESTAMP(3)
)
AS $$
BEGIN
  RETURN QUERY
  SELECT
    f.id,
    f.name,
    f.canonical,
    f.active,
    f.icon,
    f.path,
    f.visible,
    f."deviceComponentsId",
    dc.name AS "deviceName",
    f."createdById",
    p.name AS "createdName",
    f."createdAt",
    f."updatedById",
    p2.name AS "updatedName",
    f."updatedAt"
  FROM inr."Feature" as f
  LEFT JOIN inr."DeviceComponent" AS dc
    ON dc."id" = f."deviceComponentsId"
  LEFT JOIN inr."Profile" AS p 
    ON p."userId" = f."createdById"
  LEFT JOIN inr."Profile" AS p2 
    ON p2."userId" = f."updatedById"
  WHERE f.id = fuinctionId
  AND f."deletedAt" ISNULL
  AND f."deletedById" ISNULL
  GROUP BY 
    f.id, dc.name, 
    p.name, 
    p2.name;
END;
$$ LANGUAGE plpgsql;