-- Active: 1729097755891@@52.54.164.215@9002@clnxiu2o300dj9gtg4f21g3hd@inr
DROP FUNCTION IF EXISTS inr.create_group_for_initialize;

CREATE
OR
REPLACE
    FUNCTION inr.create_group_for_initialize () RETURNS
INTEGER AS $$
DECLARE
  res_id INTEGER;
BEGIN
    INSERT INTO INR."Group" (
      name, 
      active,  
      canonical, 
      color, 
      "createdAt",
      super
    ) VALUES(
      'Administradores da aplicação',
      TRUE,
      'adminGroup',
      "#616161",
      now(),
      TRUE
    )  RETURNING id INTO res_id;
END;
$$ LANGUAGE PLPGSQL;