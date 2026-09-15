# Web Development I & II

Coursework for two web programming courses, organized by course:

```
.
├── cs546/   — CS 546 Web Programming I  (labs 1–9)
└── cs554/   — CS 554 Web Programming II (labs 1–…)
```

---

## CS 546 — Web Programming I (`cs546/`)

A series of labs building up from async fundamentals in Node.js through MongoDB-backed REST APIs, plus static HTML and client-side JavaScript labs.

### Lab 1 — Async Fundamentals (`cs546/lab1-async-fundamentals/`)

Introduction to async/await and Promise-based patterns in Node.js. Exercises on chaining async operations, error propagation, and handling edge cases.

### Lab 2 — Utility Functions (`cs546/lab2-utility-functions/`)

Modular utility libraries for common data manipulation:

- **`arrayUtils.js`** — filtering, transforming, and aggregating arrays
- **`stringUtils.js`** — string normalization, parsing, and validation helpers
- **`objectUtils.js`** — object merging, key extraction, and restructuring

### Lab 3 — Data Access Layer (`cs546/lab3-data-access/`)

A multi-module async data access system over a simulated dataset of students, courses, and instructors:

| Module           | Key Functions                                                         |
| ---------------- | --------------------------------------------------------------------- |
| `students.js`    | `getStudentById`, `studentsInCourse`, `getInstructorsByStudentID`     |
| `courses.js`     | `getMostPopularCourses`, `getDepartmentCourseStats`, `getCourseById`  |
| `instructors.js` | `getInstructorRoster`, `instructorsByDepartment`, `getInstructorById` |
| `helpers.js`     | Shared data-fetching utilities                                        |

Each function validates inputs strictly (type checks, null/undefined guards, whitespace-only strings) and throws descriptive errors for invalid inputs.

### Lab 4 — MongoDB Data Access (`cs546/lab4-mongodb-data-access/`)

A CRUD data access layer backed by MongoDB. Manages gym equipment records with full create, read, update, and delete operations.

- **Database:** `Samantha_Bryan_lab4` · **Collection:** `equipment`

### Lab 5 — Express REST API (`cs546/lab5-express-rest-api/`)

A simple Express server exposing a REST API over a MongoDB bands collection.

| Route            | Description                           |
| ---------------- | ------------------------------------- |
| `GET /bands`     | Returns all 20 bands as a JSON array  |
| `GET /bands/:id` | Returns a single band by its ObjectId |

- **Database:** `Samantha_Bryan_lab5` · **Collection:** `bands` · **Server:** `http://localhost:3000`

### Lab 6 — Equipment Checkout API (`cs546/lab6-equipment-checkout-api/`)

An expanded Express + MongoDB REST API layering equipment checkout/checkin tracking on top of the equipment CRUD from Lab 4.

| Route                                   | Description                         |
| --------------------------------------- | ----------------------------------- |
| `GET /equipment`                        | Returns all equipment items         |
| `POST /equipment`                       | Creates a new equipment item        |
| `GET /equipment/:equipmentId`           | Fetches a single item by ObjectId   |
| `PATCH /equipment/:equipmentId`         | Partially updates an equipment item |
| `DELETE /equipment/:equipmentId`        | Deletes an equipment item           |
| `POST /checkouts/checkout/:equipmentId` | Checks an item out to a borrower    |
| `POST /checkouts/checkin/:checkoutId`   | Checks a borrowed item back in      |
| `GET /checkouts/overdue`                | Lists equipment overdue for return  |

- **Database:** `Samantha_Bryan_lab6` · **Collection:** `equipment` · **Server:** `http://localhost:3000`

### Lab 7 — HTML Fundamentals (`cs546/lab7-html-fundamentals/`)

Three static, semantically-structured HTML documents sharing a common nav header (`index.html`, `education.html`, `story.html`). Validated against the [W3C Markup Validator](https://validator.w3.org/).

### Lab 8 — Meal Search (`cs546/lab8-meal-search/`)

An Express + Handlebars server-rendered app for searching [TheMealDB](https://www.themealdb.com/api.php) via Axios.

| Route                        | Description                                                          |
| ---------------------------- | -------------------------------------------------------------------- |
| `GET /`                      | Search form                                                          |
| `POST /searchmealsbykeyword` | Searches meals by keyword; `400` on blank input, `404` on no matches |
| `GET /meal/:id`              | Full meal detail; `404` if the id doesn't exist                      |

- **Server:** `http://localhost:3000`

### Lab 9 — Password Strength Analyzer (`cs546/lab9/`)

A minimal Express server serving a single static page; all password analysis runs client-side. Stats per submission: length, character-class counts, unique/repeated characters, and sequential detection, scored Weak / Moderate / Strong.

- **Server:** `http://localhost:3000`

---

## CS 554 — Web Programming II (`cs554/`)

### Lab 1 — Recipes REST API (`cs554/lab1/`)

An Express + MongoDB JSON REST API for recipes, with session-based authentication (signup / login / logout via `express-session`), bcrypt-hashed passwords, comments and likes as sub-documents, and paginated listing. There is no UI — tested via Postman.

| Verb   | Route                           | Auth       | Description                                |
| ------ | ------------------------------- | ---------- | ------------------------------------------ |
| GET    | `/recipes`                      | public     | Paginated recipes, 50 per page (`?page=n`) |
| GET    | `/recipes/:id`                  | public     | A single recipe by id                      |
| POST   | `/recipes`                      | logged in  | Create a recipe                            |
| PATCH  | `/recipes/:id`                  | owner only | Update a recipe you posted                 |
| POST   | `/recipes/:id/comments`         | logged in  | Add a comment                              |
| DELETE | `/recipes/:recipeId/:commentId` | owner only | Delete a comment you posted                |
| POST   | `/recipes/:id/likes`            | logged in  | Toggle a like on/off                       |
| POST   | `/signup`                       | public     | Create a user (returns user sans password) |
| POST   | `/login`                        | public     | Log in; sets the session                   |
| GET    | `/logout`                       | public     | Destroy the session                        |

**Middleware:** (1) auth guard on recipe writes, (2) auth guard on comment create/delete, (3) app-wide request logger (logs verb, path, and body — never passwords), (4) app-wide per-URL request counter.

**Two collections only** — `recipes` and `users`; comments live as sub-documents inside a recipe.

- **Database:** `Bryan-Samantha-CS554-Lab1`
- **Server:** `http://localhost:3000`
- **Stack:** Express · MongoDB · express-session · bcryptjs

---

## Tech Stack

- **Runtime:** Node.js (v18+)
- **Module system:** ES6 (`import`/`export`)
- **Async pattern:** `async`/`await` throughout
- **Database:** MongoDB (CS546 labs 4–6; CS554 lab 1)
- **Server:** Express
- **Templating:** Handlebars (CS546 lab 8)
- **HTTP client:** Axios (CS546 lab 8)
- **Auth:** express-session + bcryptjs (CS554 lab 1)

## Running a Lab

Each lab is self-contained. Install its dependencies once, then start it:

```bash
cd cs554/lab1      # or any lab folder, e.g. cs546/lab6-equipment-checkout-api
npm install        # regenerates node_modules from package.json
npm start          # servers run on http://localhost:3000
```

Labs that talk to MongoDB expect a local server at `mongodb://localhost:27017/`.
Static HTML labs (CS546 lab 7) need no server — open the `.html` files directly.
