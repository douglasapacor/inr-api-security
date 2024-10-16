-- Active: 1729025248584@@52.54.164.215@9002@clnxiu2o300dj9gtg4f21g3hd@inr
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