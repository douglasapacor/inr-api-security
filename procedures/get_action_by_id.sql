DROP FUNCTION IF EXISTS inr.get_action_by_id;

CREATE OR REPLACE
FUNCTION inr.get_action_by_id (
  actionId INTEGER
) RETURNS TABLE(
  id INTEGER,
  name VARCHAR(40),
  canonical VARCHAR(40),
  createdById INTEGER,
  createdName VARCHAR(200),
  createdAt TIMESTAMP(3),
  updatedById INTEGER,
  updatedName VARCHAR(200),
  updatedAt TIMESTAMP(3)
)
AS $$
BEGIN
  RETURN QUERY
  SELECT
    a.id,
    a.name,
    a.canonical,
    a."createdById",
    p."name" as "createdName",
    a."createdAt",
    a."updatedById",
    p2."name" as "updatedName",
    a."updatedAt"
  FROM
    inr."Action" a
  LEFT JOIN inr."Profile" p on
    p."userId" = a."createdById"
  LEFT JOIN inr."Profile" p2 on
    p2."userId" = a."updatedById"
  WHERE
    a.id = actionId
  AND a."deletedById" ISNULL
  AND a."deletedAt" ISNULL;
END;
$$ LANGUAGE PLPGSQL;