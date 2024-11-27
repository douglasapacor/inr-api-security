-- Active: 1729025248584@@52.54.164.215@9002@clnxiu2o300dj9gtg4f21g3hd@inr
DROP FUNCTION IF EXISTS inr.create_group;

CREATE OR REPLACE FUNCTION inr.create_group (
  groupName VARCHAR(40),
  groupCanonical VARCHAR(40),
  groupColor VARCHAR(7),
  groupActive BOOLEAN,
  groupSuper BOOLEAN,
  createdBy INTEGER,
  features integer[]
) RETURNS INTEGER
AS $$
DECLARE
  res_id INTEGER;
  feature_id  INTEGER;
BEGIN
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

  FOREACH feature_id IN ARRAY features LOOP
    INSERT INTO inr."GroupFeature" (
      "groupId",
      "featureId"
    ) VALUES (
      res_id,
      feature_id
    );
  END LOOP;
  RETURN res_id;
COMMIT;
END;
$$ LANGUAGE plpgsql;