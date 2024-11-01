DROP FUNCTION IF EXISTS inr.register_first_user;

CREATE OR REPLACE FUNCTION inr.register_first_user (
    sistemUserId INTEGER
)
RETURNS VARCHAR AS $$
DECLARE
    first_user_params_id INTEGER;
BEGIN
    INSERT INTO inr."Params" (
        name
    ) VALUES (
        'firstUser'
    ) RETURNING id INTO first_user_params_id;

    INSERT INTO inr."ApplicationParams" (
        "paramId",
        "value"
    ) VALUES (
        first_user_params_id,
        sistemUserId
    );

    RETURN '';
END;
$$ LANGUAGE plpgsql;