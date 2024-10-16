DROP FUNCTION IF EXISTS inr.get_user_id_byemail;

CREATE OR REPLACE FUNCTION inr.get_user_id_byemail (
  userEmail  VARCHAR(200)
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
    pr.email = userEmail;
END;
$$ LANGUAGE plpgsql;