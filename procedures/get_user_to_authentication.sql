DROP FUNCTION IF EXISTS inr.get_user_to_authentication;

CREATE OR REPLACE FUNCTION inr.get_user_to_authentication (
  uuserId INTEGER
) RETURNS TABLE (
  id INTEGER,
  active BOOLEAN,
  "needChange" BOOLEAN,
  password VARCHAR(200),
  super BOOLEAN,  
  "groupId" INTEGER,
  "groupName" VARCHAR(100),
  "groupCanonicalName" VARCHAR(100),
  "groupSuper" BOOLEAN,
  "userName" VARCHAR(200),
  email VARCHAR(200),
  cpf  VARCHAR(14),
  rg VARCHAR(11),
  cellphone  VARCHAR(11)
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    us.id, 
    us.active, 
    us."needChange",
    us.password,
    us.super, 
    us."groupId",
    gr.name AS "groupSuper",
    gr.canonical AS "groupCanonicalName",
    gr.super AS "groupSuper",
    pr.name,
    pr.email,
    pr.cpf,
    pr.rg,
    pr.cellphone
  FROM inr."User" us
  INNER JOIN inr."Profile" pr
    ON pr."userId" = uuserId
  INNER JOIN inr."Group" gr
    ON gr.id = us."groupId"
  WHERE 
    us.id = uuserId
  AND 
    us.active = TRUE    
  AND 
    us."deletedAt" IS NULL
  AND 
    us."deletedById" IS NULL;
END;
$$ LANGUAGE plpgsql;