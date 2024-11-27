-- Active: 1729025248584@@52.54.164.215@9002@clnxiu2o300dj9gtg4f21g3hd@inr
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