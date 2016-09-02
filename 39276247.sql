DROP TABLE IF EXISTS "users";
CREATE TABLE "users" (
  id   serial PRIMARY KEY,
  name TEXT
);
INSERT INTO "users" (id, name) VALUES (11, 'john');
INSERT INTO "users" (id, name) VALUES (22, 'joe');
INSERT INTO "users" (id, name) VALUES (33, 'jake');

DROP TABLE IF EXISTS "applications";
CREATE TABLE "applications" (
  id           serial PRIMARY KEY,
  applicant_id INTEGER REFERENCES users (id)
);
INSERT INTO "applications" (id,applicant_id) VALUES (1001,22);
INSERT INTO "applications" (id,applicant_id) VALUES (1002,32);

DROP TABLE IF EXISTS "skills_users";
CREATE TABLE "skills_users" (
  id      serial PRIMARY KEY,
  user_id INTEGER REFERENCES users (id)
);
INSERT INTO "skills_users" (id, user_id) VALUES (111, 22);
INSERT INTO "skills_users" (id, user_id) VALUES (222, 22);
INSERT INTO "skills_users" (id, user_id) VALUES (333, 33);

DROP TABLE IF EXISTS "ratings";
CREATE TABLE "ratings" (
  id          SERIAL PRIMARY KEY,
  rateable_id INTEGER REFERENCES skills_users (id)
);
INSERT INTO "ratings" (id,rateable_id) VALUES (1111,222);
INSERT INTO "ratings" (id,rateable_id) VALUES (2222,333);