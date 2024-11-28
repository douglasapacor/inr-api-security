DROP FUNCTION IF EXISTS inr.get_group_feature;

CREATE OR REPLACE FUNCTION inr.get_group_feature (
  gId INTEGER
)RETURNS TABLE(
  id INTEGER,
  name VARCHAR(100),
  freeForGroup BOOLEAN
)
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    gf."featureId" AS "id", 
    f.name,
    gf."freeForGroup"
  FROM inr."GroupFeature" AS gf
  LEFT JOIN inr."Feature" f 
    ON f.id = gf."featureId"
  WHERE gf."groupId" = gId;
END;
$$ LANGUAGE plpgsql;