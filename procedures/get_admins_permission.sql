DROP FUNCTION IF EXISTS inr.get_admins_permission;

CREATE OR REPLACE FUNCTION inr.get_admins_permission ()
RETURNS TABLE (
  featureId INTEGER,
  featureName VARCHAR(100),
  featureIcon VARCHAR(100),
  featurePath VARCHAR(300),
  featureCanonical VARCHAR(100),
  featureDeviceComponentId INTEGER,
  featureVisible BOOLEAN,
  deviceName VARCHAR(100),
  featureDeviceId INTEGER,
  actions JSONB
)
AS $$
BEGIN
  RETURN QUERY
  SELECT
    f.id as "featureId",
    f."name" as "featureName",
    f.icon,
    f."path",
    f.canonical,
    f."deviceComponentsId",
    f.visible,
    dc."name" as "deviceName",
    dc."deviceId",
    (
    SELECT
      json_agg(jsonb_build_object('id',
      fa."actionId",
      'name',
      ac.name,
      'canonical',
      ac.canonical))::JSONB
    FROM
      inr."FeatureAction" fa
    INNER JOIN inr."Action" ac
    ON
      ac.id = fa."actionId"
    WHERE
      fa."featureId" = f.id
      AND 
      ac."deletedAt" IS NULL
      AND
      ac."deletedById" IS NULL
    ) AS actions
  FROM
    inr."Feature" f
  INNER JOIN "DeviceComponent" dc ON
    dc.id = f."deviceComponentsId"
  WHERE
    f."deletedById" IS NULL
    AND f."deletedAt" IS NULL;
END;
$$ LANGUAGE plpgsql;