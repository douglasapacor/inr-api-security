-- Active: 1729025248584@@52.54.164.215@9002@clnxiu2o300dj9gtg4f21g3hd@inr
DROP FUNCTION IF EXISTS inr.count_users;

CREATE OR REPLACE FUNCTION inr.count_users (
  userName VARCHAR(200),
  userEmail VARCHAR(200),
  userCpf VARCHAR(14),
  userRg VARCHAR(11),
  userCellphone VARCHAR(11),
  groupId INTEGER,
  userActive BOOLEAN,
  userSuper BOOLEAN
) RETURNS INTEGER
AS $$
BEGIN
  RETURN (
    SELECT 
        COUNT(us.id)
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
  );
END;
$$ LANGUAGE plpgsql;