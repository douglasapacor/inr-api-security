DROP FUNCTION IF EXISTS inr.get_feature_action;

CREATE OR REPLACE FUNCTION inr.get_feature_action (
  fId INTEGER
)RETURNS TABLE(
  id INTEGER,
  name VARCHAR(40)
)
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    fa."actionId" AS "id",
    ac.name
  FROM inr."FeatureAction" AS fa
  LEFT JOIN inr."Action" AS ac 
    ON ac.id = fa."actionId"
  WHERE 
    fa."featureId" = fId;
END;
$$ LANGUAGE plpgsql;