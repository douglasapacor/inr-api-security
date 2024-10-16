DROP FUNCTION IF EXISTS inr.delete_action;

CREATE OR REPLACE
FUNCTION inr.delete_action (
  actionId INTEGER,
  deletedBy INTEGER
) returns INTEGER
AS $$
DECLARE
  res_count integer;
BEGIN
  UPDATE
    inr."Action"
  SET
    "deletedById" = deletedBy,
    "deletedAt" = now()
  WHERE
    id = actionId;

  GET DIAGNOSTICS res_count = ROW_COUNT;
  RETURN res_count;
COMMIT;
END;
$$ LANGUAGE PLPGSQL;