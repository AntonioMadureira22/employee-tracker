USE company;


INSERT INTO department(name)
VALUES
("Sales"),
("Accounting"),
("Engineering"),
("Marketing")

INSERT INTO roles(title, salary department_id)
VALUES
    ('Sales person',80000,1),
    ('Senior Engineer',150000,2),
    ('Software Engineer',120000,2),
    ('Accountant',125000,3),
    ('Senior Marketer',250000,4),
    ('Junior Marketer',190000,4),
    ('Lead Engineer',150000,2);

    INSERT INTO employees (first_name, last_name, job_title, roles_id, manager_id )
    VALUES
    ("Mark", "Smith", "Sales person",1, NULL),
    ("Zachary", "Royka", "Sales person", 1, NULL),
    ("")