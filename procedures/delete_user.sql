DROP FUNCTION IF EXISTS inr.delete_user;

CREATE OR REPLACE FUNCTION inr.delete_user (
  uuser_id INTEGER,
  deletedBy INTEGER
) RETURNS INTEGER
AS $$
DECLARE
  res_count INTEGER;
BEGIN
  DELETE FROM inr."Permission" WHERE "userId" = uuser_id;

  WITH user_profile as (
    SELECT * 
    FROM inr."Profile"
    WHERE "userId" = uuser_id
  ) 

  UPDATE inr."Address" addr
    SET
      "deletedAt" = now(),
      "deletedById" = deletedBy
  FROM user_profile
  WHERE 
    addr.id = user_profile."addressId";

  UPDATE inr."User" us
    SET 
      "deletedAt" = now(),
      "deletedById" = deletedBy
  WHERE 
    us.id = uuser_id;

  GET DIAGNOSTICS res_count = ROW_COUNT;
  RETURN res_count;
COMMIT;
END;
$$ LANGUAGE plpgsql;