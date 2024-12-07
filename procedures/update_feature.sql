DROP FUNCTION IF EXISTS inr.update_feature;

CREATE OR REPLACE FUNCTION inr.update_feature (
  featureId INTEGER,
  featureName VARCHAR(100),
  featureCanonical VARCHAR(100),
  featureActive BOOLEAN,
  featureIcon VARCHAR(100),
  featurePath VARCHAR(300),
  featureVisible BOOLEAN,
  deviceComponentsId INTEGER,
  updateById INTEGER,
  actions INTEGER[]
) RETURNS INTEGER
AS $$
DECLARE
  res_count INTEGER;
  action_id INTEGER;
BEGIN
  DELETE 
    FROM inr."FeatureAction" 
  WHERE 
    "featureId" = featureId;    

  UPDATE inr."Feature" SET
    name = featureName,
    canonical = featureCanonical,
    active = featureActive,
    icon = featureIcon,
    path = featurePath,
    visible = featureVisible,
    "deviceComponentsId" = deviceComponentsId,
    "updatedById" = updateById,
    "updatedAt" = now()
  WHERE id = featureId;

  GET DIAGNOSTICS res_count = ROW_COUNT;

  IF actions IS NOT NULL AND array_length(actions, 1) IS NOT NULL THEN
    FOREACH action_id IN ARRAY actions LOOP
      RAISE NOTICE 'Processando action: %', action_id;

      INSERT INTO inr."FeatureAction" (
        "featureId", 
        "actionId"
      ) VALUES (
        featureId,
        action_id
      );

      RAISE NOTICE 'Action inserida: %', action_id;
    END LOOP;
  ELSE
    RAISE NOTICE 'Nenhuma action fornecida para a feature %', gId;
  END IF;

  RETURN res_count;
COMMIT;
END;
$$ LANGUAGE plpgsql;