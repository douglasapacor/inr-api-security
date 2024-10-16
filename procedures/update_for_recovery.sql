DROP FUNCTION IF EXISTS inr.update_for_recovery;

CREATE OR REPLACE FUNCTION inr.update_for_recovery (
  uuserId INTEGER,
  newHash VARCHAR(300)
) RETURNS INTEGER
AS $$
DECLARE
  res_count INTEGER;
BEGIN
  UPDATE inr."User" SET
    password = newHash,
    "needChange" = true
  WHERE 
    id = uuserId;
  GET DIAGNOSTICS res_count = ROW_COUNT;
  RETURN res_count;
COMMIT;
END;
$$ LANGUAGE plpgsql;