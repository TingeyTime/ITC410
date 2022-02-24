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

CREATE TABLE taskLists (
    list_id character(36) NOT NULL,
    title character (80) NOT NULL,
    completed boolean NOT NULL,
    PRIMARY KEY (list_id)
);

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