DROP FUNCTION IF EXISTS inr.verify_if_exist_email;

CREATE OR REPLACE FUNCTION inr.verify_if_exist_email (
  userEmail VARCHAR(200)
) RETURNS INTEGER
AS $$
BEGIN
  RETURN (
    SELECT 
      count(p.id) 
    FROM inr."Profile" AS p
    INNER JOIN inr."User" AS u 
      ON u.id = p."userId"
    WHERE email = userEmail
    AND u."deletedAt" ISNULL
    AND u."deletedById" ISNULL    
  );
END;
$$ LANGUAGE plpgsql;