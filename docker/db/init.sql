CREATE EXTENSION citext;
CREATE DOMAIN domain_email AS citext
CHECK(
   VALUE ~ '^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$'
);

CREATE TABLE "accounts" (
    "account_id" character(36) NOT NULL,
    "email" domain_email NOT NULL,
    "username" character(40) NOT NULL,
    "name" character(80) NOT NULL,
    "password" character NOT NULL,
    PRIMARY KEY ("account_id")
);

ALTER TABLE "accounts"
ADD CONSTRAINT "accounts_username" UNIQUE ("username");