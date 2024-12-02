DROP FUNCTION IF EXISTS inr.update_group;

CREATE OR REPLACE FUNCTION inr.update_group (
  gId INTEGER,
  groupName VARCHAR(40),
  groupCanonical VARCHAR(40),
  groupColor VARCHAR(7),
  groupActive BOOLEAN,
  groupSuper BOOLEAN,
  updatedBy INTEGER,
  features JSONB[]
) RETURNS INTEGER
AS $$
DECLARE
    res_count integer;
    feature JSONB;
BEGIN
  DELETE 
    FROM inr."GroupFeature"
  WHERE 
    "groupId" = gId;

  UPDATE inr."Group" SET
    name = groupName,
    canonical = groupCanonical,
    color = groupColor,
    active = groupActive,
    super = groupSuper,
    "updatedById" = updatedBy,
    "updatedAt" = now()
  WHERE id = gId;

  GET DIAGNOSTICS res_count = ROW_COUNT;

  IF features IS NOT NULL AND array_length(features, 1) IS NOT NULL THEN
    FOREACH feature IN ARRAY features LOOP
      RAISE NOTICE 'Processando feature: %', feature;

      INSERT INTO inr."GroupFeature" (
        "groupId",
        "featureId",
        "freeForGroup"
      ) VALUES (
        gId,
        (feature->>'id')::INTEGER,
        (feature->>'free')::BOOLEAN
      );

      RAISE NOTICE 'Feature inserida: %', feature;
    END LOOP;
  ELSE
    RAISE NOTICE 'Nenhuma feature fornecida para o grupo %', gId;
  END IF;

  RETURN res_count;
COMMIT;
END;
$$ LANGUAGE plpgsql;