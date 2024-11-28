-- Active: 1729025248584@@52.54.164.215@9002@clnxiu2o300dj9gtg4f21g3hd@inr
DROP FUNCTION IF EXISTS inr.create_group;

CREATE OR REPLACE FUNCTION inr.create_group (
  groupName VARCHAR(40),
  groupCanonical VARCHAR(40),
  groupColor VARCHAR(7),
  groupActive BOOLEAN,
  groupSuper BOOLEAN,
  createdBy INTEGER,
  features JSONB[]
) RETURNS INTEGER
AS $$
DECLARE
  res_id INTEGER;
  feature JSONB;
BEGIN
  -- Inserir o grupo
  INSERT INTO inr."Group" (
    active,
    canonical,
    name, 
    super,
    color, 
    "createdById", 
    "createdAt"
  ) VALUES (
    groupActive, 
    groupCanonical,
    groupName,
    groupSuper,
    groupColor,
    createdBy,
    now()
  ) RETURNING id INTO res_id;  
  
  IF features IS NOT NULL AND array_length(features, 1) IS NOT NULL THEN
    FOREACH feature IN ARRAY features LOOP
      RAISE NOTICE 'Processando feature: %', feature;
      INSERT INTO inr."GroupFeature" (
        "groupId",
        "featureId",
        "freeForGroup"
      ) VALUES (
        res_id,
        (feature->>'id')::INTEGER,
        (feature->>'free')::BOOLEAN
      );
      RAISE NOTICE 'Feature inserida: %', feature;
    END LOOP;
  ELSE
    RAISE NOTICE 'Nenhuma feature fornecida para o grupo %', res_id;
  END IF;

  RETURN res_id;
END;
$$ LANGUAGE plpgsql;