DROP FUNCTION IF EXISTS inr.search_group;

CREATE OR REPLACE FUNCTION inr.search_group (
  groupName VARCHAR(100),
  groupCanonical VARCHAR(100),
  groupActive BOOLEAN,
  groupSuper BOOLEAN,
  groupLimit INTEGER,
  groupOffset INTEGER
) RETURNS TABLE (
  id INTEGER,
  name VARCHAR(100),
  canonical VARCHAR(100),
  color VARCHAR(7),
  active BOOLEAN,
  super BOOLEAN
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
      g.super
  FROM inr."Group" AS g
  WHERE (groupName IS NULL OR g.name ILIKE groupName || '%')
  AND (groupCanonical IS NULL OR g.canonical ILIKE groupCanonical || '%')
  AND g.active = groupActive
  AND g.super = groupSuper
  AND g."deletedAt" ISNULL
  AND g."deletedById" ISNULL
  ORDER BY g.name DESC
  LIMIT groupLimit
  OFFSET groupOffset * groupLimit;
END;
$$ LANGUAGE plpgsql;