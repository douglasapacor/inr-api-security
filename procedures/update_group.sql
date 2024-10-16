DROP FUNCTION IF EXISTS inr.update_group;

CREATE OR REPLACE FUNCTION inr.update_group (
  gId INTEGER,
  groupName VARCHAR(40),
  groupCanonical VARCHAR(40),
  groupColor VARCHAR(7),
  groupActive BOOLEAN,
  groupSuper BOOLEAN,
  updatedBy INTEGER,
  features integer[]
) RETURNS INTEGER
AS $$
DECLARE
    res_count integer;
    feature_id integer;
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

  FOREACH feature_id IN ARRAY features LOOP
    INSERT INTO inr."GroupFeature" (
      "groupId",
      "featureId"
    ) VALUES (
      gId,
      feature_id
    );
  END LOOP;

  RETURN res_count;
COMMIT;
END;
$$ LANGUAGE plpgsql;