create table job(
    id bigserial not null primary key,
    title varchar(80) not null,  
)

create table employer(
    id bigserial not null primary key,
    name varchar(80) not null,
    degree varchar(80) not null,
    job_id bigint references job(id)
)
