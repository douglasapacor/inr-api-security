DROP FUNCTION IF EXISTS inr.get_group_by_id;

CREATE OR REPLACE FUNCTION inr.get_group_by_id (
  gId INTEGER
) RETURNS TABLE(
  id INTEGER,
  name VARCHAR(100),
  canonical VARCHAR(100),
  color VARCHAR(7),
  active BOOLEAN ,
  super BOOLEAN,
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
    g.id,
    g.name,
    g.canonical,
    g.color,
    g.active,
    g.super,
    g."createdById",
    p.name AS "createdName",
    g."createdAt",
    g."updatedById",
    p2.name AS "updatedName",
    g."updatedAt"
  FROM inr."Group" AS g
  LEFT JOIN inr."Profile" AS p 
    ON p."userId" = g."createdById"
  LEFT JOIN inr."Profile" AS p2 
    ON p2."userId" = g."updatedById"
  WHERE g.id = gId;
END;
$$ LANGUAGE plpgsql;