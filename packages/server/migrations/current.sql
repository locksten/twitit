drop table if exists "User" cascade;
create table "User" (
    "id" serial primary key,
    "username" text not null unique,
    "password" text not null,
    "createdAt" timestamp with time zone default now()
);

drop table if exists "Twit" cascade;
create table "Twit" (
    "id" serial primary key,
    "text" text not null,
    "createdAt" timestamp with time zone default now(),
    "authorId" integer not null references "User" (id) on delete cascade
);

drop table if exists "Follow" cascade;
create table "Follow" (
    "followerId" integer references "User" (id) on delete cascade,
    "followeeId" integer references "User" (id) on delete cascade,
    check ("followerId" <> "followeeId"),
    primary key ("followerId", "followeeId"),
    "createdAt" timestamp with time zone default now()
);
