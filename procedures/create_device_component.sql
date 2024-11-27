-- Active: 1729025248584@@52.54.164.215@9002@clnxiu2o300dj9gtg4f21g3hd@inr
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