-- Active: 1729025248584@@52.54.164.215@9002@clnxiu2o300dj9gtg4f21g3hd@inr
DROP FUNCTION IF EXISTS inr.create_user_for_initialize;

CREATE OR REPLACE FUNCTION inr.create_user_for_initialize (
    group_id INTEGER
) 
RETURNS INTEGER
AS $$
DECLARE
    param_system_user INTEGER;
    system_user_value INTEGER;
    user_id INTEGER;
BEGIN
    SELECT p.id into param_system_user 
    FROM inr."Params" AS p
    WHERE p.name = 'systemUser';

    IF param_system_user IS NULL THEN
        INSERT INTO inr."Params" (
            name
        ) VALUES (
            'systemUser'
        ) RETURNING id INTO param_system_user;
    END IF;

    SELECT pr."userId" INTO user_id 
    FROM inr."Profile" AS pr
    WHERE pr.name = 'Sistema' 
    AND pr.cpf = '111.111.111-11';

    IF user_id IS NULL THEN
        INSERT INTO "User" (
            active,
            "createdAt",
            "groupId",
            password,
            super,
            "needChange"
        ) VALUES (
            TRUE,
            now(),
            group_id,
            'sdfkljredlg@jmxnwez#çaudgh%djfg',
            TRUE,
            FALSE
        ) RETURNING id INTO user_id;

        INSERT INTO "Profile" (
            "userId",
            cpf,
            name
        ) VALUES (
            user_id,
            '111.111.111-11',
            'Sistema'
        );
    END IF;

    SELECT id INTO system_user_value 
    FROM inr."ApplicationParams" 
    WHERE "paramId" = param_system_user;

    IF system_user_value IS NULL THEN
        INSERT INTO inr."ApplicationParams" (
            "paramId",
            "value"
        ) VALUES (
            param_system_user,
            user_id
        );
    END IF;

    RETURN user_id;
END;
$$ LANGUAGE plpgsql;