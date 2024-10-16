DROP FUNCTION IF EXISTS inr.delete_group;

CREATE OR REPLACE FUNCTION inr.delete_group (
  groupId INTEGER,
  deletedBy INTEGER
) RETURNS INTEGER
AS $$
DECLARE
    res_count integer;
BEGIN
  DELETE 
    FROM inr."GroupFeature"
  WHERE 
    "groupId" = groupId;
    
  UPDATE inr."Group" SET
    "deletedById" = deletedBy,
    "deletedAt" = now()
  WHERE id = groupId;

  GET DIAGNOSTICS res_count = ROW_COUNT;
  RETURN res_count;
COMMIT;
END;
$$ LANGUAGE plpgsql;