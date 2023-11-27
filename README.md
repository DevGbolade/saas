# Duplo Platform API

<!-- ![Duplo Logo](./duplo-logo.png) -->

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)
  - [API Endpoints](#api-endpoints)
  - [Credit Score Calculation](#credit-score-calculation)
  - [Order Details](#order-details)
- [Deployment](#deployment)
  - [Docker](#docker)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Welcome to the Duplo Platform Backend! This application serves as the backend for Duplo, a platform that facilitates business registrations, order processing, and credit score calculation for businesses.

## Features

- Business registration and user management.
- Order processing and storage in PostgreSQL.
- Transaction logging in MongoDB.
- Credit score calculation based on transaction data.
- Integration with a government tax authority API for order logging.

## Getting Started

### Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [NestJs](https://nestjs.com)
- [Docker](https://www.docker.com/)

API Swagger Documentation can be found here:

- [API Docs](http://localhost:8094/api/v1/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/DevGbolade/duplo-bussiness-case
   cd duplo-backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

### Configuration

Copy the `.env.example` file to `.env` and update it with your configuration:

```bash
cp .env.example .env
```

## Usage

### API Endpoints

The Duplo Platform Backend provides the following API endpoints:

- **POST /api/business/register:** Register a new business.
- **POST /api/business/:businessId/department-head/:departmentHeadId/order:** Place an order for a department.
- **GET /api/business/:businessId/credit-score:** Get the credit score for a business.
- **GET /api/business/:businessId/orders/metrics:** Get order metrics for a business.

### Credit Score Calculation

The credit score for a business is calculated using the formula:

```bash
(Total transactions or order amount ) / ( Number of transactions * 100)
```

### Order Details

- Total number of orders.
- Total amount of orders.
- Total number of orders today.
- Total amount of orders today.

## Deployment

### Docker

To deploy the backend solution as a Docker image, follow these steps:

1. **Build the Docker image:**

   ```bash
   docker build -t duplo-api .
   ```

2. **Run the Docker container:**

   ```bash
   docker run -p 8094:8094 -d duplo-api
   ```

The Duplo Platform Backend will be accessible at [http://localhost:3000](http://localhost:3000).

## Contributing

We welcome contributions! If you'd like to contribute to the project, please follow our [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).
