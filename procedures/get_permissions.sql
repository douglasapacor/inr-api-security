DROP FUNCTION IF EXISTS inr.get_permissions;

CREATE OR REPLACE FUNCTION inr.get_permissions (
  uuser_id INTEGER
) RETURNS TABLE (
  featureId INTEGER,
  featureName VARCHAR(100),
  featureIcon VARCHAR(100),
  featurePath VARCHAR(300),
  featureCanonical VARCHAR(100),
  featureDeviceComponentId INTEGER,
  featureVisible BOOLEAN,
  featureDeviceComponentName VARCHAR(100),
  featureDeviceId INTEGER,
  actions JSONB
)
AS $$
BEGIN
  RETURN QUERY  
  SELECT
    DISTINCT(pm."featureId"),
    fe.name AS "featureName",
    fe.icon,
    fe.path,
    fe.canonical,
    fe."deviceComponentsId",
    fe.visible,
    dc.name AS "deviceName",
    dc."deviceId",
    (
      SELECT 
        json_agg(jsonb_build_object('id', fa."actionId", 'name', ac.name, 'canonical', ac.canonical))::JSONB
      FROM 
        inr."FeatureAction" fa
      INNER JOIN inr."Action" ac
        ON ac.id = fa."actionId"
      WHERE 
        fa."featureId" = pm."featureId"
      AND 
        ac."deletedAt" IS NULL
      AND
        ac."deletedById" is null
    ) AS actions
  FROM inr."Permission" pm
  LEFT JOIN inr."Feature" fe
    ON fe.id = pm."featureId"
  LEFT JOIN inr."DeviceComponent" dc
    ON dc.id = fe."deviceComponentsId"
  WHERE pm."userId" = uuser_id
  AND pm."deletedAt" IS NULL
  AND pm."deletedById" IS NULL
  AND fe."deletedAt" IS NULL
  AND fe."deletedById" IS NULL;
END;
$$ LANGUAGE plpgsql;