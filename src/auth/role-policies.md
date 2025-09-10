# Role-Based Access Control (RBAC) Policies

## Roles Defined

### 1. MASTER
- **Full control** of the system
- Can view and edit all registrations
- **Permissions:**
  - ✅ View all users
  - ✅ View specific user
  - ✅ Update any user
  - ✅ Delete any user
  - ✅ Create victims
  - ✅ View all victims
  - ✅ View specific victim
  - ✅ Update any victim
  - ✅ Delete any victim
  - ✅ View leaderboard
  - ✅ Assign rewards to slaves

### 2. SLAVE
- **Register new victims** only
- **Permissions:**
  - ❌ View users (except own profile)
  - ❌ Update users
  - ❌ Delete users
  - ✅ Create victims
  - ❌ View all victims
  - ❌ View specific victim
  - ❌ Update victims
  - ❌ Delete victims
  - ✅ View leaderboard
  - ❌ Assign rewards

### 3. DEVELOPER
- **Read-only access** for development/testing
- **Permissions:**
  - ✅ View all users
  - ✅ View specific user
  - ❌ Update users
  - ❌ Delete users
  - ✅ Create victims
  - ✅ View all victims
  - ✅ View specific victim
  - ✅ Update victims
  - ❌ Delete victims
  - ✅ View leaderboard
  - ✅ Assign rewards to slaves

## Route Protection Summary

| Route | MASTER | SLAVE | DEVELOPER |
|-------|--------|-------|-----------|
| `POST /auth/register` | ✅ | ✅ | ✅ |
| `POST /auth/login` | ✅ | ✅ | ✅ |
| `GET /users` | ✅ | ❌ | ✅ |
| `GET /users/:id` | ✅ | ❌ | ✅ |
| `PATCH /users/:id` | ✅ | ❌ | ❌ |
| `DELETE /users/:id` | ✅ | ❌ | ❌ |
| `POST /victimas` | ✅ | ✅ | ✅ |
| `GET /victimas` | ✅ | ❌ | ✅ |
| `GET /victimas/:id` | ✅ | ❌ | ✅ |
| `PATCH /victimas/:id` | ✅ | ❌ | ✅ |
| `DELETE /victimas/:id` | ✅ | ❌ | ❌ |
| `GET /leaderboard` | ✅ | ✅ | ✅ |
| `POST /leaderboard/recompensas/:slaveId` | ✅ | ❌ | ✅ |

## Authentication Flow

1. **Public Routes:** `/auth/register`, `/auth/login`
2. **Protected Routes:** All other routes require JWT token
3. **Role Validation:** Each protected route checks user role against required roles
4. **Token Format:** `Authorization: Bearer <jwt_token>`

## Error Responses

- **401 Unauthorized:** Missing or invalid JWT token
- **403 Forbidden:** Valid token but insufficient role permissions
- **400 Bad Request:** Invalid request data or validation errors