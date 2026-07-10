# CS 546 — Web Programming I

A series of labs building up from async fundamentals in Node.js through MongoDB-backed REST APIs, plus a static HTML lab and the final project.

## Labs

### Lab 1 — Async Fundamentals (`lab1-async-fundamentals/`)

Introduction to async/await and Promise-based patterns in Node.js. Exercises on chaining async operations, error propagation, and handling edge cases.

### Lab 2 — Utility Functions (`lab2-utility-functions/`)

Modular utility libraries for common data manipulation:

- **`arrayUtils.js`** — filtering, transforming, and aggregating arrays
- **`stringUtils.js`** — string normalization, parsing, and validation helpers
- **`objectUtils.js`** — object merging, key extraction, and restructuring

### Lab 3 — Data Access Layer (`lab3-data-access/`)

A multi-module async data access system over a simulated dataset of students, courses, and instructors:

| Module           | Key Functions                                                         |
| ---------------- | --------------------------------------------------------------------- |
| `students.js`    | `getStudentById`, `studentsInCourse`, `getInstructorsByStudentID`     |
| `courses.js`     | `getMostPopularCourses`, `getDepartmentCourseStats`, `getCourseById`  |
| `instructors.js` | `getInstructorRoster`, `instructorsByDepartment`, `getInstructorById` |
| `helpers.js`     | Shared data-fetching utilities                                        |

Each function validates inputs strictly (type checks, null/undefined guards, whitespace-only strings) and throws descriptive errors for invalid inputs, following real-world API design patterns.

### Lab 4 — MongoDB Data Access (`lab4-mongodb-data-access/`)

A CRUD data access layer backed by MongoDB. Manages gym equipment records with full create, read, update, and delete operations.

| Function                    | Description                                       |
| ---------------------------- | -------------------------------------------------- |
| `createEquipmentItem()`      | Inserts a new equipment item with full validation  |
| `getAllEquipmentItems()`     | Returns all items in the collection                |
| `getEquipmentById(id)`       | Fetches a single item by ObjectId                  |
| `updateEquipmentLocation()`  | Updates an item's storage location                 |
| `removeEquipmentItem(id)`    | Deletes an item by ObjectId                        |

- **Database:** `Samantha_Bryan_lab4`
- **Collection:** `equipment`

### Lab 5 — Express REST API (`lab5-express-rest-api/`)

A simple Express server exposing a REST API over a MongoDB bands collection.

| Route            | Description                            |
| ----------------- | --------------------------------------- |
| `GET /bands`      | Returns all 20 bands as a JSON array    |
| `GET /bands/:id`  | Returns a single band by its ObjectId   |

Error handling:
- `400` — id is a number or an invalid ObjectId
- `404` — no band found with the given id

- **Database:** `Samantha_Bryan_lab5`
- **Collection:** `bands`
- **Server:** `http://localhost:3000`

### Lab 6 — Equipment Checkout API (`lab6/`)

An expanded Express + MongoDB REST API layering equipment checkout/checkin tracking on top of the equipment CRUD from Lab 4.

| Route                                   | Description                                       |
| ----------------------------------------- | -------------------------------------------------- |
| `GET /equipment`                          | Returns all equipment items                        |
| `POST /equipment`                         | Creates a new equipment item                        |
| `GET /equipment/:equipmentId`             | Fetches a single item by ObjectId                   |
| `PATCH /equipment/:equipmentId`           | Partially updates an equipment item                 |
| `DELETE /equipment/:equipmentId`          | Deletes an equipment item                            |
| `POST /checkouts/checkout/:equipmentId`   | Checks an item out to a borrower                     |
| `POST /checkouts/checkin/:checkoutId`     | Checks a borrowed item back in                       |
| `GET /checkouts/overdue`                  | Lists equipment that is overdue for return           |

- **Database:** `Samantha_Bryan_lab6`
- **Collection:** `equipment`
- **Server:** `http://localhost:3000`

### Lab 7 — HTML Fundamentals (`lab7/`)

Three static, semantically-structured HTML documents (no JavaScript this week), sharing a common nav header:

| Page              | Description                                                             |
| ------------------ | ------------------------------------------------------------------------ |
| `index.html`       | Bio, favorite TV shows (ordered list), and hobbies (unordered list)     |
| `education.html`   | A `section` per school attended, with favorite class and a memory       |
| `story.html`       | A short personal story told in paragraphs                                |

Validated against the [W3C Markup Validator](https://validator.w3.org/#validate_by_input).

## Final Project (`Final Project/`)

Pitch deck and presentation recording for the CS 546 final project.

- `CS 546 Final Project Pitch.pdf`
- `FinalProjectPresentation546.mp4`

## Tech Stack

- **Runtime:** Node.js (v18+)
- **Module system:** ES6 (`import`/`export`)
- **Async pattern:** `async`/`await` throughout
- **Database:** MongoDB (labs 4–6)
- **Server:** Express (labs 5–6)
- **Testing:** Jest (`*.test.mjs`)
- **Markup:** Semantic HTML5 (lab 7)

## Running the Labs

```bash
# Lab 1 — run tests
cd lab1-async-fundamentals/
node --experimental-vm-modules node_modules/.bin/jest

# Lab 3
cd lab3-data-access/
node app.js

# Lab 4
cd lab4-mongodb-data-access/
npm start

# Lab 5
cd lab5-express-rest-api/
npm run seed   # seed the database first
npm start      # runs on http://localhost:3000

# Lab 6
cd lab6/
npm run seed   # seed the database first
npm start      # runs on http://localhost:3000

# Lab 7 — no server, just open the HTML files directly
open lab7/index.html
```

## Concepts Demonstrated

- ES6 module system (`import`/`export`, `.mjs` files)
- Async/await and Promise-based data fetching
- Defensive input validation with descriptive error messages
- Separation of concerns across multiple data modules
- MongoDB CRUD operations with the Node.js driver
- Express routing and JSON REST APIs
- Unit testing with Jest
- Semantic, valid HTML document structure
