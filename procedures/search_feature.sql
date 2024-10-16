DROP FUNCTION IF EXISTS inr.search_feature;

CREATE OR REPLACE FUNCTION inr.search_feature (
  featureName VARCHAR(100),
  featureCanonical VARCHAR(100),
  featureActive BOOLEAN,
  featureIcon VARCHAR(100),
  featurePath VARCHAR(300),
  featureVisible BOOLEAN,
  featureDeviceComponentsId INTEGER,
  featureLimit INTEGER,
  featureOffset INTEGER
) RETURNS TABLE(
  id INTEGER,
  name VARCHAR(100),
  canonical VARCHAR(100),
  active BOOLEAN,
  icon VARCHAR(100),
  path VARCHAR(300),
  visible BOOLEAN,
  deviceComponentsId INTEGER,
  deviceComponentsName VARCHAR(40)
)
AS $$
BEGIN
  RETURN QUERY
  SELECT
    f.id,
    f.name,
    f.canonical,
    f.active,
    f.icon,
    f.path,
    f.visible,
    f."deviceComponentsId",
    dc.name AS "deviceComponentsName" 
  FROM inr."Feature" AS f
  LEFT JOIN inr."DeviceComponent" AS dc 
    ON dc.id = f."deviceComponentsId"
  WHERE 
    (featureName IS NULL OR f.name ILIKE featureName || '%' )
    AND (featureIcon IS NULL OR f.icon ILIKE featureIcon || '%')
    AND (featureCanonical IS NULL OR f.canonical ILIKE featureCanonical || '%')
    AND (featurePath IS NULL OR f.path ILIKE featurePath || '%')
    AND (featureActive IS NULL OR f.active = featureActive)
    AND (featureVisible IS NULL OR f.visible =  featureVisible)
    AND (featureDeviceComponentsId IS NULL OR f."deviceComponentsId" = featureDeviceComponentsId)
    AND f."deletedAt" ISNULL
    AND f."deletedById" ISNULL
  ORDER BY f.name DESC
  LIMIT featureLimit
  OFFSET featureOffset * featureLimit;
END;
$$ LANGUAGE plpgsql;