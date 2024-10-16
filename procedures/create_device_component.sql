DROP FUNCTION IF EXISTS inr.create_device_component;

CREATE OR REPLACE FUNCTION inr.create_device_component (
  deviceName VARCHAR(40),
  deviceId INTEGER,
  createdBy INTEGER
) RETURNS INTEGER
AS $$
DECLARE
  ret_id INTEGER;
BEGIN
  INSERT INTO inr."DeviceComponent" (
    name, "deviceId", "createdById", "createdAt"
  ) VALUES(
    deviceName, deviceId, createdBy, now()
  ) RETURNING id
  INTO ret_id;
  RETURN ret_id;
COMMIT;
END;
$$ LANGUAGE plpgsql;