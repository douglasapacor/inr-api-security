DROP FUNCTION IF EXISTS inr.get_user_id_bycpf;

CREATE OR REPLACE FUNCTION inr.get_user_id_bycpf (
  userCpf VARCHAR(14)
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
    pr.cpf = userCpf;
END;
$$ LANGUAGE plpgsql;