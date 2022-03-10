--- Initial Database Structure for Simple Plan

-- Accounts

CREATE TABLE accounts (
    account_id varchar NOT NULL,
    email varchar NOT NULL,
    username varchar NOT NULL,
    name varchar NOT NULL,
    password varchar NOT NULL,
    PRIMARY KEY (account_id)
);

ALTER TABLE accounts
ADD CONSTRAINT accounts_username UNIQUE (username);

CREATE TABLE "accounts_sessions" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "accounts_sessions" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "accounts_sessions" ("expire");

-- Task Lists

CREATE TABLE taskLists (
    list_id varchar NOT NULL,
    title varchar NOT NULL,
    completed boolean NOT NULL,
    PRIMARY KEY (list_id)
);

-- Tasks

CREATE TABLE tasks (
    task_id varchar NOT NULL,
    title varchar NOT NULL,
    description varchar NOT NULL,
    duration numeric NOT NULL,
    complete boolean NOT NULL,
    PRIMARY KEY (task_id)
);

CREATE TABLE tasksInTaskLists (
    list_id varchar NOT NULL,
    task_id varchar NOT NULL,
    PRIMARY KEY (list_id, task_id),
    CONSTRAINT fk_list FOREIGN KEY (list_id) REFERENCES taskLists(list_id) ON DELETE CASCADE,
    CONSTRAINT fk_task FOREIGN KEY (task_id) REFERENCES tasks(task_id) ON DELETE CASCADE
);

-- Events

CREATE TABLE events (
    event_id varchar NOT NULL,
    title varchar NOT NULL,
    description varchar NOT NULL,
    date_start timestamp NOT NULL,
    date_end timestamp NOT NULL,
    PRIMARY KEY (event_id)
);

-- Notes

CREATE TABLE notes (
    note_id varchar NOT NULL,
    account_id varchar NOT NULL,
    date_updated timestamp NOT NULL,
    context varchar NOT NULL,
    PRIMARY KEY (note_id),
    CONSTRAINT fk_list FOREIGN KEY (account_id) REFERENCES accounts(account_id) ON DELETE CASCADE
);