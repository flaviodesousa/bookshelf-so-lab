DROP TABLE IF EXISTS "users";
CREATE TABLE "users" (
  id   serial PRIMARY KEY,
  name TEXT
);
INSERT INTO "users" (id, name) VALUES (1, 'john');
INSERT INTO "users" (id, name) VALUES (2, 'joe');
INSERT INTO "users" (id, name) VALUES (3, 'jake');

DROP TABLE IF EXISTS "applications";
CREATE TABLE "applications" (
  id           serial PRIMARY KEY,
  applicant_id INTEGER REFERENCES users (id)
);
INSERT INTO "applications" (id,applicant_id) VALUES (1,2);
INSERT INTO "applications" (id,applicant_id) VALUES (1,3);

DROP TABLE IF EXISTS "skills_users";
CREATE TABLE "skills_users" (
  id      serial PRIMARY KEY,
  user_id INTEGER REFERENCES users (id)
);
INSERT INTO "skills_users" (id, user_id) VALUES (1, 2);
INSERT INTO "skills_users" (id, user_id) VALUES (2, 2);
INSERT INTO "skills_users" (id, user_id) VALUES (3, 3);

DROP TABLE IF EXISTS "ratings";
CREATE TABLE "ratings" (
  id          SERIAL PRIMARY KEY,
  rateable_id INTEGER REFERENCES skills_users (id)
);
INSERT INTO "ratings" (id,rateable_id) VALUES (1,2);
INSERT INTO "ratings" (id,rateable_id) VALUES (2,3);