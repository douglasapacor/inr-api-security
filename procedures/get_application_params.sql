DROP FUNCTION IF EXISTS inr.get_application_params;

CREATE
OR
REPLACE
    FUNCTION inr.get_application_params () RETURNS
TABLE (
    key VARCHAR(100),
    value VARCHAR(100)
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    p."name" as "key",
     ap.value
  FROM
    inr."Params" p
  INNER JOIN inr."ApplicationParams" ap ON
    ap."paramId" = p.id;  
END;
$$ LANGUAGE PLPGSQL;