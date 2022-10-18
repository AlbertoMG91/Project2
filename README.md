# Project2

### User Signup/Login

METHOD | ENDPOINT         | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                               | RETURNS
-------|------------------|-------|------|--------------------|-------------------------------------------------|--------------------
POST   | /auth/signup     | -     | user | User Signup         | `username`, `email`, `password`,`phone`        | {msg: string, token: token }
POST   | /auth/login      | -     | user | Login               | `email`, `password`                            | {msg: string}
POST   | /auth/logout     | -     | user | Logout              |                                                | {msg: string}


### User Endpoints

METHOD | ENDPOINT         | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                               | RETURNS
-------|------------------|-------|------|--------------------|-------------------------------------------------|--------------------
GET    | /user/profile    | YES   | user | Get Own Profile    |                                                 | {user}
GET    | /user            | YES   | admin | Get All Users     | query params                                    | [{users}]
GET    | /user/:id       | YES   | admin | Get One User       |                                                 | {user}
PUT    | /user/profile    | YES   | user | Update Own Profile |  `userName`, `email`,`phone`,`password`         | {msg: string, {profile}}
PUT    | /user/:id       | YES   | admin | Update One User     |   `userName`, `email`, `password`,`phone`      | {msg: string, {profile}}
DELETE | /user/profile   | YES   | user  | Delete Own Profile  |                                                | {msg: string}
DELETE | /user/:id       | YES   | admin | Delete One Profile  |                                                | {msg: string}

### Adress Endpoints

METHOD | ENDPOINT         | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                               | RETURNS
-------|------------------|-------|------|--------------------|-------------------------------------------------|--------------------
POST   | /adress/profile  | YES   | user | Create own adress  |`street`,`number`,`flat`,`PC`,`city`             | {msg: string, adress}
POST   | /adress/profile/:id| YES | admin| Create an adress   |`street`,`number`,`flat`,`PC`,`city`             | {msg: string, adress}
GET    | /adress/container| YES   | user | Get nearby container adress|                                         | [{containers adress}]
GET    | /adress/profile  | YES   | user | Get own adress     |                                                 | {user adress}
GET    | /adress/         | YES   | admin | Get all addresses |                                                 | [{adress}]
GET    | /adress/:id      | YES   | admin | Get one adress    |                                                 | {adress}
PUT    | /adress/profile  | YES   | user | Update Own Adress  |  `Adress`                                       | {msg: string, {adress}}
PUT    | /adress/:id      | YES   | admin | Update One User Adress|   `adress`                                  | {msg: string, {adress}}
DELETE | /adress/:id      | YES   | admin | Delete One User Adress|                                             | {msg: string}

### Container Endpoints

METHOD | ENDPOINT         | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                               | RETURNS
-------|------------------|-------|------|--------------------|-------------------------------------------------|--------------------
POST   | /container       | YES   | admin | Create one container |  `adress`,`fleet assignment`                 | {msg: string, {container}}
GET    | /container       | YES   | admin | Get all containers   |  query params                                | [{Containers}]
GET    | /container/:id   | YES   | admin | Get one container    |                                              | {Containers}
PUT    | /container/:id   | YES   | admin | Update one container |  `adress`                                    | {msg: string, {container}}
DELETE | /container/:id   | YES   | admin | Delete one container |                                              | {msg: string}

### Donations Endpoints

METHOD | ENDPOINT         | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                               | RETURNS
-------|------------------|-------|------|--------------------|-------------------------------------------------|--------------------
POST   | /donation/coins  | YES   | user | Donate Coins       |   `coins`                                       | {msg: string, {coins}}
POST   | /donation/claim  | YES   | user | Claim Coins        |   `coins`                                       | {msg: string, {coins}}
POST   | /donation        | YES   | admin | Donate Coins      |   `types`,`id`                                  | {msg: string, {donation}}
GET    | /donation/coins  | YES   | user | Get own donations  |                                                 | [{donations}]
GET    | /donation        | YES | admin| Get all donations    |   query params                                  | [{donations}]
GET    | /donation/:id    | YES | admin| Get one donation     |                                                 | {donations}
PUT    | /donation/:id    | YES | admin| Modify a donation    |   `coins`                                       | {msg: string, {donation}}
DELETE | /donation/:id    | YES | admin| Delete a donation    |                                                 | {msg: string}

### Date Endpoints

METHOD | ENDPOINT         | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                               | RETURNS
-------|------------------|-------|------|--------------------|-------------------------------------------------|--------------------
POST   | /date/profile    | YES   | user | Make an appointment|   `date`                                        | {msg: string, {date}}
POST   | /date/profile/:id| YES   | admin | Make an appointment|   `date`                                       | {msg: string, {date}}
GET    | /date/fleet      | YES   | user | Get fleet contact  |     `id`                                        | {contact}
GET    | /date/profile    | YES   | user | Get Own date info  |   `id`                                          | {date}
PUT    | /date/profile/:id| YES   | user | Modify own appointment|   `date`                                     | {msg: string, date:date}
PUT    | /date/profile/:id| YES   | admin | Modify an appointment|   `date`                                     | {msg: string, date:date}
DELETE | /date/profile/:id| YES   | user | Delete own appointment|                                              | {msg: string}
DELETE | /date/profile/:id| YES   | admin | Delete an appointment|                                              | {msg: string}

### Fleet Endpoints

METHOD | ENDPOINT         | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                               | RETURNS
-------|------------------|-------|------|--------------------|-------------------------------------------------|--------------------
POST   | /fleet           | YES   | admin | Create a truck    |   `workArea`,`contact`,`status`                 | {msg: string, {truck}}
GET    | /fleet           | YES   | admin | Get fleet         |   query params                                  | [{fleet}]
GET    | /fleet/:id       | YES   | admin | Get one truck     |                                                 | {truck}
PUT    | /fleet/:id       | YES   | admin | Modify a truck    |   `workArea`,`contact`,`status`                 | {msg: string, fleet:truck}
DELETE | /fleet/:id       | YES   | admin | Delete a truck    |                                                 | {msg: string}
