DROP FUNCTION IF EXISTS inr.get_user_id_bycellphone;

CREATE OR REPLACE FUNCTION inr.get_user_id_bycellphone (
  userCellphone VARCHAR(11)
) RETURNS TABLE (
  id INTEGER
)
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    us.id 
  FROM inr."User" us 
    INNER JOIN inr."Profile" pr 
      ON pr."userId" = us.id
  WHERE 
    pr.cellphone = userCellphone;
END;
$$ LANGUAGE plpgsql;