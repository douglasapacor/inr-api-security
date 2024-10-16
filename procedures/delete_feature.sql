DROP FUNCTION IF EXISTS inr.delete_feature;

CREATE OR REPLACE FUNCTION inr.delete_feature (
  featureId INTEGER,
  deletedBy INTEGER
) RETURNS INTEGER
AS $$
DECLARE
  res_count INTEGER;
BEGIN
  DELETE FROM inr."FeatureAction" WHERE "featureId" = featureId;

  UPDATE inr."Feature" SET
    "deletedById" = deletedBy,
    "deletedAt" = now()
  WHERE id = featureId;
  
  GET DIAGNOSTICS res_count = ROW_COUNT;
  RETURN res_count;
COMMIT;
END;
$$ LANGUAGE plpgsql;