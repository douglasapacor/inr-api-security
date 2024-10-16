DROP FUNCTION IF EXISTS inr.count_device_component;

CREATE OR REPLACE FUNCTION inr.count_device_component (
  nameDeviceComponent VARCHAR(40),
  dId INTEGER DEFAULT NULL
) returns INTEGER
AS $$
BEGIN
  RETURN (
    SELECT 
      count(dc.*)
    FROM 
      inr."DeviceComponent" as dc
    WHERE 
      (nameDeviceComponent IS NULL 
        OR dc.name ILIKE nameDeviceComponent || '%')
      AND (dId IS NULL 
        OR dc."deviceId" = dId)
      AND dc."deletedAt" ISNULL
      AND dc."deletedById" ISNULL
  );
END;
$$ LANGUAGE plpgsql;