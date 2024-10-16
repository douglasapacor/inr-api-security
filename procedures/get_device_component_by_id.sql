DROP FUNCTION IF EXISTS inr.get_device_component_by_id;

CREATE OR REPLACE FUNCTION inr.get_device_component_by_id(
  getId INTEGER
) RETURNS TABLE(
  id INTEGER,
  name VARCHAR(40),
  deviceId INTEGER,
  createdById INTEGER,
  createdName VARCHAR(200),
  createdAt TIMESTAMP(3),
  updatedById INTEGER,
  updatedName VARCHAR(200),
  updatedAt TIMESTAMP(3)
)
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    dc.id, 
    dc.name, 
    dc."deviceId", 
    dc."createdById", 
    p.name as "createdName", 
    dc."createdAt", 
    dc."updatedById", 
    p2.name as "updatedName", 
    dc."updatedAt" 
  FROM inr."DeviceComponent" as dc
  LEFT JOIN inr."Profile" as p ON 
    p."userId" = dc."createdById"
  LEFT JOIN inr."Profile" as p2 ON 
    p2."userId" = dc."updatedById"
  WHERE dc.id = getId
  AND dc."deletedAt" ISNULL
  AND dc."deletedById" ISNULL;
END;
$$ LANGUAGE plpgsql;