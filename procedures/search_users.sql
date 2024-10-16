DROP FUNCTION IF EXISTS inr.search_users;

CREATE OR REPLACE FUNCTION inr.search_users (
  userName VARCHAR(200),
  userEmail VARCHAR(200),
  userCpf VARCHAR(14),
  userRg VARCHAR(11),
  userCellphone VARCHAR(11),
  groupId INTEGER,
  userActive BOOLEAN,
  userSuper BOOLEAN,
  userLimit INTEGER,
  userOffset INTEGER
) RETURNS TABLE (
  id INTEGER,
  super BOOLEAN,
  active BOOLEAN,
  "groupId" INTEGER,
  groupName VARCHAR(200),
  name VARCHAR(200),
  email VARCHAR(200),
  cpf VARCHAR(14),
  rg VARCHAR(11),
  cellphone VARCHAR(11)
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
    pr.name,
    pr.email,
    pr.cpf,
    pr.rg,
    pr.cellphone
  FROM 
    inr."User" us
  INNER JOIN inr."Profile" pr
    ON pr."userId" = us.id
  INNER JOIN inr."Group" gr
    ON gr.id = us."groupId"
  WHERE (userName IS NULL OR pr.name ILIKE userName || '%')
  AND (userEmail IS NULL OR pr.email ILIKE userEmail || '%')
  AND (userCpf IS NULL OR pr.cpf ILIKE userCpf || '%')
  AND (userRg IS NULL OR pr.rg ILIKE userRg || '%')
  AND (userCellphone IS NULL OR pr.cellphone ILIKE userCellphone || '%')
  AND (groupId IS NULL OR us."groupId" = groupId)
  AND us.active = userActive
  AND us.super = userSuper
  AND us."deletedAt" IS NULL
  AND us."deletedById" IS NULL
  ORDER BY pr.name DESC
  LIMIT userLimit
  OFFSET userOffset * userLimit;
END;
$$ LANGUAGE plpgsql;