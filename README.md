# Village Survey Form

A bilingual (English/Marathi) web application for collecting village census and household survey data. The form captures family information, agriculture and livestock details, health-related survey responses, and feedback about village facilities.

## Features

- Bilingual form labels in English and Marathi
- Household and family-member information
- Government scheme, identity-card, education, occupation, and income fields
- Dynamic family-member sections based on household size
- Optional farm, crop, irrigation, and farm-equipment details
- Dynamic cattle and livestock entries with income totals
- Health and community survey questions
- Feedback and village-facility satisfaction fields
- Submission through a Netlify serverless function
- MongoDB persistence for submitted survey records
- Responsive layout using Bootstrap 5

## Tech Stack

- **Frontend:** HTML, CSS, TypeScript, Bootstrap 5
- **Backend:** Netlify Functions
- **Database:** MongoDB
- **Runtime/dependencies:** Node.js, npm
- **Deployment:** Netlify

## Project Structure

```text
.
├── index.html                    # Survey form UI
├── styles.css                    # Application styles
├── script.ts                     # TypeScript form logic and submission code
├── netlify/
│   └── functions/
│       └── submitCensus.js       # Netlify function that stores submissions
├── package.json                  # npm scripts and dependencies
├── tsconfig.json                 # TypeScript configuration
├── netlify.toml                  # Netlify function and redirect configuration
└── dist/
    └── script.js                 # Compiled TypeScript output
```

## Prerequisites

- Node.js 18 or later
- npm
- A MongoDB deployment and connection URI
- Netlify CLI (optional, for local serverless-function testing)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/HrishikeshWadile/Village-Survey-Form.git
   cd Village-Survey-Form
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure the required environment variables:

   ```bash
   export MONGODB_URI="your-mongodb-connection-string"
   export MONGODB_DB_NAME="your-database-name"
   ```

   For local development, these values can also be placed in a `.env` file. Do not commit credentials or other secrets to the repository.

4. Compile the TypeScript source:

   ```bash
   npm run build
   ```

5. Serve the project using a local web server. Because form submission calls a Netlify Function, use Netlify Dev when testing the complete application locally:

   ```bash
   npx netlify dev
   ```

   Then open the local URL shown by Netlify, usually `http://localhost:8888`.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run build` | Compiles `script.ts` to JavaScript using TypeScript. |
| `npm test` | Placeholder test command; tests are not currently configured. |
| `npx netlify dev` | Runs the site and Netlify Functions locally. |

## Environment Variables

The `submitCensus` Netlify Function requires:

| Variable | Description |
| --- | --- |
| `MONGODB_URI` | MongoDB connection string. |
| `MONGODB_DB_NAME` | MongoDB database name. |

Submissions are inserted into the `submissions` collection and automatically receive a `createdAt` timestamp.

## Deployment on Netlify

1. Push the project to GitHub.
2. Create or link a site in Netlify using this repository.
3. Set the following environment variables in **Site configuration → Environment variables**:
   - `MONGODB_URI`
   - `MONGODB_DB_NAME`
4. Ensure the TypeScript build is run before deployment:

   ```bash
   npm run build
   ```

5. Deploy the site. The included `netlify.toml` configures the Netlify Functions directory and routes `/netlify/functions/*` requests to the deployed function endpoint.

## Data and Privacy

The form collects potentially sensitive personal, identity, health, and financial information. Before using this application with real survey participants:

- Use HTTPS in production.
- Restrict access to the MongoDB database.
- Store secrets only in environment variables.
- Apply appropriate authentication, authorization, retention, and backup policies.
- Follow applicable privacy and data-protection requirements.
- Avoid exposing submitted records in client-side logs or public dashboards.

## Contributing

1. Create a feature branch.
2. Make and test your changes locally.
3. Run `npm run build` to verify TypeScript compilation.
4. Open a pull request with a clear description of the change.

## License

The project currently does not declare a license. Add a license file and update this section before distributing or reusing the project.
