DROP FUNCTION IF EXISTS inr.get_user_by_id;

CREATE OR REPLACE FUNCTION inr.get_user_by_id (
  uuser_id INTEGER
) RETURNS TABLE(
  id INTEGER,
  super BOOLEAN,
  active BOOLEAN,
  groupId INTEGER,
  groupName VARCHAR(100),
  "createdById" INTEGER,
  createdName VARCHAR(200),
  "createdAt" TIMESTAMP(3),
  "updatedById" INTEGER,
  updatedName VARCHAR(200),
  "updatedAt" TIMESTAMP(3),
  name VARCHAR(200),
  email VARCHAR(200),
  cpf VARCHAR(14),
  rg VARCHAR(11),
  cellphone VARCHAR(11),
  addressId INTEGER,
  cep VARCHAR(8),
  street VARCHAR(200),
  streetNumber VARCHAR(10),
  neighborhood VARCHAR(100),
  "cityIbge" INTEGER,
  "cityName" VARCHAR(300),
  estateIbge INTEGER,
  estateName VARCHAR(300),
  acronym VARCHAR(2)
)
AS $$
BEGIN
  RETURN QUERY
  SELECT
    us.id,
    us.super,
    us.active,
    us."groupId",
    gr.name AS "groupName",
    us."createdById",
    pr.name AS "createdName",
    us."createdAt",
    us."updatedById",
    pr2.name AS "updatedName",
    us."updatedAt",
    pr3.name,
    pr3.email,
    pr3.cpf,
    pr3.rg,
    pr3.cellphone,
    pr3."addressId",
    addr.cep,
    addr.street,
    addr."streetNumber",
    addr.neighborhood,
    addr."cityIbge",
    ci.name AS "cityName",
    st.ibge AS "estateIbge",
    st.name AS "estateName",
    st.acronym
  FROM inr."User" AS us
  LEFT JOIN inr."Profile" AS pr 
    ON pr."userId" = us."createdById"
  LEFT JOIN inr."Group" AS gr
    ON gr.id = us."groupId"
  LEFT JOIN inr."Profile" pr2
    ON pr2."userId" = us."updatedById"
  LEFT JOIN inr."Profile" pr3
    ON pr3."userId" = us.id
  LEFT JOIN inr."Address" AS addr
    ON addr.id = pr3."addressId"
  LEFT JOIN inr."City" AS ci
    ON ci.ibge = addr."cityIbge"
  LEFT JOIN inr."State" AS st
    ON st.ibge = ci."stateIbge"
  WHERE 
    us.id = uuser_id
  AND
    us."deletedAt" IS NULL
  AND 
    us."deletedById" IS NULL;
END;
$$ LANGUAGE plpgsql;