-- Active: 1729025248584@@52.54.164.215@9002@clnxiu2o300dj9gtg4f21g3hd@inr
DROP FUNCTION IF EXISTS inr.create_feature;

CREATE OR REPLACE FUNCTION inr.create_feature (
  featureName VARCHAR(100),
  featureCanonical VARCHAR(100),
  featureActive BOOLEAN,
  featureIcon VARCHAR(100),
  featurePath VARCHAR(300),
  featureVisible BOOLEAN,
  deviceComponentsId INTEGER,
  createdById INTEGER,
  actions integer[]
) RETURNS INTEGER
AS $$
DECLARE
  ret_id INTEGER;
  action_id INTEGER;
BEGIN
  INSERT 
    INTO inr."Feature" (
      name, 
      canonical, 
      active, 
      icon, 
      path, 
      visible, 
      "deviceComponentsId", 
      "createdById", 
      "createdAt"
    ) VALUES (
      featureName,
      featureCanonical,
      featureActive,
      featureIcon,
      featurePath,
      featureVisible,
      deviceComponentsId,
      createdById,
      now()
    ) RETURNING id
    INTO ret_id;

    FOREACH action_id IN ARRAY actions LOOP
      INSERT INTO inr."FeatureAction" (
        "featureId", 
        "actionId"
      ) VALUES (
        ret_id,
        action_id
      );
    END LOOP;

    RETURN ret_id;
COMMIT;
END;
$$ LANGUAGE plpgsql;