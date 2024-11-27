-- Active: 1729025248584@@52.54.164.215@9002@clnxiu2o300dj9gtg4f21g3hd@inr
DROP FUNCTION IF EXISTS inr.create_action;

CREATE OR REPLACE FUNCTION inr.create_action (
  actionName VARCHAR(40),
  canonicalName VARCHAR(40),
  createdBy INTEGER
) RETURNS INTEGER
AS $$
DECLARE
  ret_id INTEGER;
BEGIN
  INSERT INTO inr."Action" (
    "name",
    canonical,
    "createdById",
    "createdAt"
  )
  VALUES (
    actionName,
    canonicalName,
    createdBy,
    now()
  ) RETURNING id
  INTO ret_id;
  RETURN ret_id;
COMMIT;
END;
$$ LANGUAGE PLPGSQL;