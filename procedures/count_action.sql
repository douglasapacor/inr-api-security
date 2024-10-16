DROP FUNCTION IF EXISTS inr.count_action;

CREATE OR REPLACE
FUNCTION inr.count_action (
  nameAction VARCHAR(40),
  canonicalName VARCHAR(40)
) returns INTEGER
AS $$
BEGIN
  RETURN (
    SELECT
      count(*)
    FROM
      inr."Action" AS a
    WHERE 
      (nameAction IS NULL 
        OR a.name ILIKE nameAction || '%')
      AND (canonicalName IS NULL 
        OR a.canonical ILIKE canonicalName || '%')
      AND a."deletedAt" ISNULL
      AND a."deletedById" ISNULL
  );
END;
$$ LANGUAGE plpgsql;