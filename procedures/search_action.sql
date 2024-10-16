DROP FUNCTION IF EXISTS inr.search_action;

CREATE OR REPLACE
FUNCTION inr.search_action (
  nameAction VARCHAR(40),
  canonicalName VARCHAR(40),
  actionLimit INTEGER,
  actionOffset INTEGER
) RETURNS TABLE(
  id INTEGER,
  name VARCHAR(100),
  canonical VARCHAR(40)
)
AS $$
BEGIN
  RETURN QUERY
  SELECT
    a.id,
    a.name,
    a.canonical
  FROM
    inr."Action" a
  WHERE 
    (nameAction IS NULL 
      OR a.name ILIKE nameAction || '%')
    AND (canonicalName IS NULL 
      OR a.canonical ILIKE canonicalName || '%')
    AND a."deletedAt" ISNULL
    AND a."deletedById" ISNULL
  ORDER BY
    a."name" DESC
  LIMIT actionLimit 
  OFFSET actionOffset * actionLimit;
END;

$$ language plpgsql;