# TechBridge MVP

TechBridge is a platform that connects university students with small and medium businesses (SMBs) for real-world tech projects. This repository contains the MVP (Minimum Viable Product) implementation of the TechBridge platform.

## Features

### For Students
- Register with school email (.edu) verification
- Create detailed profiles with resume/transcript uploads
- Browse and filter project postings 
- Apply to tech projects
- Communicate with businesses
- Get paid for completed work

### For Businesses (SMBs)
- Post tech projects with detailed requirements
- Review student applications and profiles
- Manage ongoing projects
- Update project stages
- Communicate with students

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form with Zod validation
- **Authentication**: NextAuth.js

## Getting Started

### Prerequisites

- Node.js (v18 or newer)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/techbridge-mvp.git
cd techbridge-mvp
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
techbridge-mvp/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── dashboard/          # Business dashboard
│   │   ├── login/              # Login page
│   │   ├── projects/           # Project pages
│   │   ├── signup/             # Signup pages
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Home page
│   ├── components/             # Reusable components
│   │   ├── Navbar.tsx          # Navigation bar
│   │   └── ProjectCard.tsx     # Project card component
│   └── lib/                    # Utility functions and shared logic
├── public/                     # Static assets
├── package.json                # Project dependencies
├── tailwind.config.js          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

## Demo Credentials

For the MVP, you can use the following credentials to test the application:

### Student Account
- Email: student@university.edu
- Password: password123

### Business Account
- Email: business@example.com
- Password: password123

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- This project was created as an MVP for the TechBridge concept. 