DROP FUNCTION IF EXISTS inr.search_device_component;

CREATE OR REPLACE FUNCTION inr.search_device_component (
  nameDeviceComponent VARCHAR(40),
  dId INTEGER DEFAULT NULL,
  actionLimit INTEGER DEFAULT 10,
  actionOffset INTEGER DEFAULT 0
)RETURNS TABLE(
  id INTEGER,
  name VARCHAR(40),
  deviceId INTEGER
)
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    dc.id,
    dc.name,
    dc."deviceId"
  FROM 
    inr."DeviceComponent" as dc
  WHERE 
    (nameDeviceComponent IS NULL 
      OR dc.name ILIKE nameDeviceComponent || '%')
    AND (dId IS NULL OR dc."deviceId" = dId)
    AND dc."deletedAt" ISNULL
    AND dc."deletedById" ISNULL
  ORDER BY 
    dc.name DESC
  LIMIT actionLimit
  OFFSET actionOffset * actionLimit;
END;
$$ LANGUAGE plpgsql;