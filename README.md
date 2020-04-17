# LINKS

## Database

## Knex

Zugriff auf die Knex CLI (ohne globale Installation): npx knex
Zugriff auf die Knex CLI (mit globaler Installation): knex

### Migrations

Erzeugen einer neuen Migration, z.B.: npx knex migrate:make create_food_table

vgl. https://stackoverflow.com/questions/50706399/node-js-knex-command-not-found
vgl. https://gist.github.com/NigelEarle/70db130cc040cc2868555b29a0278261
vgl. https://www.youtube.com/watch?v=eBpP_velw1I&list=PL7sCSgsRZ-smPRSrim4bX5TQfRue1jKfw&index=3

Nach dem Einfügen der Table und der Attribute: npx knex migrate:latest

### Seeds

Erzeugen von Seeds, z.B.: npx knex seed:make 01_category

WARNING: Seeds müssen bei Abhängigkeiten immer in einer bestimmten Reihenfolge erzeugt werden.
         vgl. https://gist.github.com/NigelEarle/70db130cc040cc2868555b29a0278261

Nützliche Befehle:

npx knex migrate:rollback          // macht die letzte Migration rückgängig
npx knex migrate:rollback --all    // macht alle Migrations rückgängig
npx knex migrate:latest            // übernimmt die aktuellen Eingaben in Migrations
npx knex seed:run

vgl. http://knexjs.org/#Migrations
vgl. https://www.youtube.com/watch?v=EGLi3QQv8bI&list=PL7sCSgsRZ-smPRSrim4bX5TQfRue1jKfw&index=4

# Starten der App

Zum Starten der App in der Shell folgenden Befehl innerhalb des src folders ausführen:
node server.js

Grund für Verlagerung des Ports von app.js nach server.js:
http://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/

https://zellwk.com/blog/endpoint-testing/

# Starten von ESLint
z.B.:
./node_modules/.bin/eslint app.js

# Tests
Zum Ausführen von Tests im Terminal folgenden Befehl eingeben: npm test
