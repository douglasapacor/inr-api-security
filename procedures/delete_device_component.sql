DROP FUNCTION IF EXISTS inr.delete_device_component;

CREATE OR REPLACE FUNCTION inr.delete_device_component (
  idDevice INTEGER,
  deletedBy INTEGER
) RETURNS INTEGER
AS $$
declare
  res_count INTEGER;
BEGIN
  UPDATE 
    inr."DeviceComponent" 
  SET
    "deletedById" = deletedBy,
    "deletedAt" = now()
  WHERE 
    id = idDevice;
    
  GET DIAGNOSTICS res_count = ROW_COUNT;
  RETURN res_count;
COMMIT;
END;
$$ LANGUAGE plpgsql;