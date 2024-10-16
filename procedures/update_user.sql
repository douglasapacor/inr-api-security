DROP FUNCTION IF EXISTS inr.update_user;

CREATE OR REPLACE FUNCTION inr.update_user (
  uuser_id INTEGER,
  user_super BOOLEAN,
  user_groupId INTEGER,
  user_active BOOLEAN,
  user_updatedBy INTEGER,
  uuser_name VARCHAR(200),
  user_email VARCHAR(200),
  user_cellphone VARCHAR(200),
  user_cpf  VARCHAR(200),
  user_rg  VARCHAR(200),
  user_address JSONB
) RETURNS INTEGER
AS $$
DECLARE
  res_count INTEGER;
  res_newAddr INTEGER;
BEGIN
  DELETE FROM inr."Permission" WHERE "userId" = uuser_id;

  UPDATE inr."User"
    SET
      super = user_super,
      active = user_active,
      "groupId" = user_groupId,
      "updatedById" = user_updatedBy,
      "updatedAt" = now()
  WHERE
    id = uuser_id;
  
  UPDATE inr."Profile"
    SET
      name = uuser_name,
      email = user_email,
      cellphone = user_cellphone,
      cpf = user_cpf,
      rg = user_rg
  WHERE
    "userId" = uuser_id;

  IF user_address IS NOT NULL THEN
    IF user_address->>'id' IS NOT NULL THEN
      UPDATE inr."Address" 
        SET
          cep = user_address->>'cep',
          street = user_address->>'street',
          "streetNumber" = user_address->>'streetNumber',
          neighborhood = user_address->>'neighborhood',
          observation = user_address->>'observation',
          "cityIbge" = CAST(user_address->>'cityIbge' as int),
          "updatedById" = user_updatedBy,
          "updatedAt" = now()
      WHERE id = CAST(user_address->>'id' as int);
    ELSE
      INSERT INTO inr."Address" (
        cep,
        street,
        "streetNumber",
        neighborhood,
        "cityIbge",
        observation,
        "createdById",
        "createdAt"
      ) VALUES (
        user_address->>'cep',
        user_address->>'street',
        user_address->>'streetNumber',
        user_address->>'neighborhood',
        CAST(user_address->>'cityIbge' as int),
        user_address->>'observation',
        user_updatedBy,
        now()
      ) RETURNING id INTO res_newAddr;

      UPDATE inr."Profile"
        SET
          "addressId" = res_newAddr
      WHERE "userId" = uuser_id;
    END IF;
  END IF;

  GET DIAGNOSTICS res_count = ROW_COUNT;
  RETURN res_count;
COMMIT;
END;
$$ LANGUAGE plpgsql;