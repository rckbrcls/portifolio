---

# My Portfolio

## Overview

This repository is a monorepo that houses my personal portfolio, built using a microfrontend architecture. Each project within the portfolio is treated as a separate microfrontend, with the portfolio itself acting as the overarching macro application. The goal of this portfolio is to showcase my skills and projects using a variety of modern web technologies.

## Architecture

The architecture of this portfolio is designed to be modular and scalable, with each microfrontend handling a specific project or section of the portfolio. The following technologies and tools are utilized:

- **Turborepo:** Manages the monorepo and optimizes build processes across multiple microfrontends.
- **SolidJS:** Used for certain microfrontends to create highly performant and reactive user interfaces.
- **Webpack:** Bundles and optimizes the assets for each microfrontend, ensuring efficient loading and performance.
- **React & Next.js:** Powers the main portfolio application and some microfrontends, providing a robust and dynamic user experience.
- **TypeScript & JavaScript:** TypeScript is used for type safety and maintainability across most of the codebase, while JavaScript is employed where flexibility is needed.
- **Node.js & Flask:** Backend services that support the portfolio's functionality, with Flask handling any API needs and Node.js managing server-side rendering or other backend tasks.

### Architecture Diagram

Below is a diagram of the microfrontend architecture, illustrating how various APIs serve the different frontend components within the monorepo structure:

```mermaid
graph TD;
    A[Portfolio (Macro)] -->|Uses| B[Microfrontend 1];
    A -->|Uses| C[Microfrontend 2];
    A -->|Uses| D[Microfrontend N];
    B --> E[Turborepo];
    C --> E;
    D --> E;
    E --> F[Shared Components];
    E --> G[Shared Utils];
    F --> H[React/Next.js];
    F --> I[SolidJS];
    G --> J[TypeScript/JavaScript];
    H --> K[Webpack];
    I --> K;
    J --> L[Node.js/Flask];

    subgraph APIs
    M[API 1 (Flask)] -->|Serves| B;
    N[API 2 (Node.js)] -->|Serves| C;
    O[API N (Flask/Node.js)] -->|Serves| D;
    end
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
