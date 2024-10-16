DROP FUNCTION IF EXISTS inr.update_action;

CREATE OR REPLACE
FUNCTION inr.update_action (
  actionId INTEGER,
  actionName VARCHAR(40),
  canonicalName VARCHAR(40),
  updatedBy INTEGER
) RETURNS INTEGER
AS $$
DECLARE
  res_count integer;
BEGIN
  UPDATE
    inr."Action"
  SET
    name = actionName,
    canonical = canonicalName,
    "updatedById" = updatedBy,
    "updatedAt" = now()
  WHERE
    id = actionId;
    
  GET DIAGNOSTICS res_count = ROW_COUNT;
  RETURN res_count;

  COMMIT;
END;
$$ LANGUAGE PLPGSQL;