DROP FUNCTION IF EXISTS inr.initialize_group;

CREATE OR REPLACE FUNCTION inr.initialize_group ()
RETURNS INTEGER
AS $$
DECLARE
    param_admin_group INTEGER;
    admin_group INTEGER;    
    application_param_id INTEGER;
BEGIN
    SELECT p.id into param_admin_group 
    FROM inr."Params" AS p
    WHERE p.name = 'adminGroup';

    IF param_admin_group IS NULL THEN
        INSERT INTO inr."Params" (
            name
        ) VALUES (
            'adminGroup'
        ) RETURNING id INTO param_admin_group;
    END IF;

    SELECT id INTO admin_group 
    FROM inr."Group" 
    WHERE canonical = 'admin';

    IF admin_group IS NULL THEN
        INSERT INTO inr."Group" (
            active, 
            canonical,
            color,
            name,
            super,
            "createdAt"
        ) VALUES (
            TRUE,
            'admin',
            '#607D8B',
            'Administração de aplicação',
            TRUE,
            now()
        ) RETURNING id INTO admin_group;
    END IF;

    SELECT id INTO application_param_id 
    FROM inr."ApplicationParams" 
    WHERE "paramId" = param_admin_group;

    IF application_param_id IS NULL THEN
        INSERT INTO inr."ApplicationParams" (
            "paramId",
            "value"
        ) VALUES (
            param_admin_group,
            CAST(admin_group AS VARCHAR)
        );
    END IF;

    RETURN admin_group;
END;
$$ LANGUAGE plpgsql;