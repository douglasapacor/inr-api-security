-- Active: 1729097755891@@52.54.164.215@9002@clnxiu2o300dj9gtg4f21g3hd@inr
DROP FUNCTION IF EXISTS inr.get_features_actions;

CREATE OR REPLACE FUNCTION inr.get_features_actions (
  feature INTEGER
) RETURNS TABLE(
  actionId INTEGER
)
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    "actionId" 
  FROM 
    inr."FeatureAction" 
  WHERE "featureId" = feature;
END;
$$ LANGUAGE plpgsql;