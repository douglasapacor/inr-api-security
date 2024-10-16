DROP FUNCTION IF EXISTS inr.update_device_component;

CREATE OR REPLACE FUNCTION inr.update_device_component (
  idDevice INTEGER,
  deviceName VARCHAR(40),
  devId INTEGER,
  updatedBy INTEGER
) RETURNS INTEGER
AS $$
DECLARE
  res_count integer;
BEGIN
  UPDATE inr."DeviceComponent" SET
    name = deviceName,
    "deviceId" = devId,
    "updatedById" = updatedBy,
    "updatedAt" = now()
  WHERE id = idDevice;
  GET DIAGNOSTICS res_count = ROW_COUNT;
  RETURN res_count;
COMMIT;
END;
$$ LANGUAGE plpgsql;