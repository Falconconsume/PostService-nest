# PortService - NestJS Migration Tasks

## Tech Stack Migration: Express+MongoDB → NestJS+Prisma+PostgreSQL

### 1. Project Setup
- [ ] Create new NestJS project: `nest new portservice-nest`
- [ ] Install dependencies:
  ```bash
  npm install @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt
  npm install @prisma/client prisma
  npm install class-validator class-transformer @nestjs/config
  npm install --save-dev @types/bcrypt @types/passport-jwt
  ```

### 2. Database Setup
- [ ] Initialize Prisma: `npx prisma init`
- [ ] Create PostgreSQL database
- [ ] Configure DATABASE_URL in .env
- [ ] Create Prisma schema with models:
  - User (id, username, password, role, createdAt, updatedAt)
  - Post (id, title, content, authorId, createdAt, updatedAt)
  - Comment (id, content, postId, authorId, createdAt, updatedAt)
  - Role enum (USER, ADMIN)

### 3. Auth Module
- [ ] Generate auth module: `nest g module auth`
- [ ] Generate auth controller: `nest g controller auth`
- [ ] Generate auth service: `nest g service auth`
- [ ] Create DTOs:
  - LoginDto (username, password)
  - RegisterDto (username, password)
- [ ] Implement JWT strategy
- [ ] Create JWT auth guard
- [ ] Create roles decorator and guard
- [ ] Endpoints:
  - POST /auth/login
  - POST /auth/register
  - GET /auth/users (admin only)

### 4. Posts Module
- [ ] Generate posts module: `nest g module posts`
- [ ] Generate posts controller: `nest g controller posts`
- [ ] Generate posts service: `nest g service posts`
- [ ] Create DTOs:
  - CreatePostDto (title, content)
  - UpdatePostDto (title?, content?)
- [ ] Endpoints:
  - GET /posts (all posts)
  - POST /posts (create post)
  - GET /posts/:id (single post)
  - PUT /posts/:id (update post)
  - DELETE /posts/:id (delete post)

### 5. Comments Module
- [ ] Generate comments module: `nest g module comments`
- [ ] Generate comments controller: `nest g controller comments`
- [ ] Generate comments service: `nest g service comments`
- [ ] Create DTOs:
  - CreateCommentDto (content, postId)
- [ ] Endpoints:
  - GET /posts/:postId/comments
  - POST /posts/:postId/comments
  - DELETE /comments/:id

### 6. Validation & Middleware
- [ ] Add validation pipes globally
- [ ] Create custom validation decorators
- [ ] Implement user validation (username 3-20 chars, password 6-20 chars)
- [ ] Add request logging

### 7. Configuration
- [ ] Setup ConfigModule
- [ ] Environment variables:
  - DATABASE_URL
  - JWT_SECRET
  - JWT_EXPIRES_IN
  - PORT

### 8. Database Operations
- [ ] Create PrismaService
- [ ] Generate and run migrations: `npx prisma migrate dev`
- [ ] Seed database with roles and admin user

### 9. Error Handling
- [ ] Global exception filters
- [ ] Custom HTTP exceptions
- [ ] Validation error handling

### 10. Testing Setup
- [ ] Unit tests for services
- [ ] Integration tests for controllers
- [ ] E2E tests for auth flow

### Current Express.js Features to Migrate:
✅ **Auth Features:**
- User registration/login
- JWT token generation
- Role-based access control (admin/user)
- Password hashing with bcrypt

✅ **Post Features:**
- Create posts (title max 30 chars)
- Get all posts
- Render views (skip - API only)

✅ **Comment Features:**
- Comments linked to posts
- Max 50 characters per comment

✅ **Validation:**
- Username required, unique
- Password 6-20 characters
- Post title max 30 chars
- Comment max 50 chars

### Commands Reference:
```bash
# Generate resources
nest g resource [name] --no-spec

# Database
npx prisma generate
npx prisma migrate dev
npx prisma studio

# Run app
npm run start:dev
``` 