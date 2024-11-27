-- Active: 1729025248584@@52.54.164.215@9002@clnxiu2o300dj9gtg4f21g3hd@inr
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