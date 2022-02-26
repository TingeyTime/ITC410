--- Initial Database Structure for Simple Plan

-- Accounts

CREATE TABLE accounts (
    account_id character(36) NOT NULL,
    email character(80) NOT NULL,
    username character(40) NOT NULL,
    name character(80) NOT NULL,
    password character(80) NOT NULL,
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
    list_id character(36) NOT NULL,
    title character (80) NOT NULL,
    completed boolean NOT NULL,
    PRIMARY KEY (list_id)
);

-- Tasks

CREATE TABLE tasks (
    task_id character(36) NOT NULL,
    title character (80) NOT NULL,
    description character(1000) NOT NULL,
    duration numeric NOT NULL,
    complete boolean NOT NULL,
    PRIMARY KEY (task_id)
);

CREATE TABLE tasksInTaskLists (
    list_id character(36) NOT NULL,
    task_id character(36) NOT NULL,
    PRIMARY KEY (list_id, task_id),
    CONSTRAINT fk_list FOREIGN KEY (list_id) REFERENCES taskLists(list_id),
    CONSTRAINT fk_task FOREIGN KEY (task_id) REFERENCES tasks(task_id)
);

-- Events

CREATE TABLE events (
    event_id character(36) NOT NULL,
    title character(80) NOT NULL,
    description character(1000) NOT NULL,
    date_start timestamp NOT NULL,
    date_end timestamp NOT NULL,
    PRIMARY KEY (event_id)
);