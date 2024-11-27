-- Active: 1729025248584@@52.54.164.215@9002@clnxiu2o300dj9gtg4f21g3hd@inr
DROP FUNCTION IF EXISTS inr.count_group;

CREATE OR REPLACE FUNCTION inr.count_group (
  groupName VARCHAR(100),
  groupCanonical VARCHAR(100),
  groupColor VARCHAR(7),
  groupActive BOOLEAN,
  groupSuper BOOLEAN 
) RETURNS INTEGER
AS $$
BEGIN
  RETURN(
    SELECT 
        count(g.*)
    FROM inr."Group" AS g
    WHERE (groupName IS NULL OR g.name ILIKE groupName || '%')
    AND (groupCanonical IS NULL OR g.canonical ILIKE groupCanonical || '%')
    AND (groupColor IS NULL OR g.color ILIKE groupColor || '%')
    AND g.active = groupActive
    AND g.super = groupSuper
    AND g."deletedAt" ISNULL
    AND g."deletedById" ISNULL
  );
END;
$$ LANGUAGE plpgsql;