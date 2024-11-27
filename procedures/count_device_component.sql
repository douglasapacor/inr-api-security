-- Active: 1729025248584@@52.54.164.215@9002@clnxiu2o300dj9gtg4f21g3hd@inr
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