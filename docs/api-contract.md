# 🧭 RENTWISE FRONTEND CONTRACT (MVP)

Think of this as:

> “If frontend follows this, everything just works.”

---

# 🔐 1. AUTH CONTRACT

## Endpoints

### Register

```

```

```
POST /auth/register
```

```

```

```
{
  "name": "Samuel",
  "email": "test@email.com",
  "phone": "080...",
  "password": "123456",
  "role": "TENANT"
}
```

Response:

```

```

```
{
  "message": "User created",
  "user": {
    "id": "...",
    "email": "...",
    "role": "TENANT"
  },
  "accessToken": "jwt_token_here"
}
```

---

### Login

```

```

```
POST /auth/login
```

Response:

```

```

```
{
  "message": "Login successful",
  "accessToken": "jwt_token_here",
  "user": {
    "id": "...",
    "role": "TENANT"
  }
}
```

---

### Me

```

```

```
GET /users/me
Authorization: Bearer token
```

---

# 🏠 2. LISTINGS CONTRACT

## Create Listing (Agent/Landlord)

```

```

```
POST /listings
```

```

```

```
{
  "title": "2 Bedroom Apartment",
  "description": "Nice place in Lekki",
  "price": 1200000,
  "location": "Lekki Phase 1"
}
```

Response:

```

```

```
{
  "id": "...",
  "title": "...",
  "price": 1200000,
  "verificationStatus": "PENDING"
}
```

---

## Get Listings (Public feed)

```

```

```
GET /listings
```

Response:

```

```

```
[
  {
    "id": "...",
    "title": "...",
    "price": 1200000,
    "location": "...",
    "verificationStatus": "VERIFIED"
  }
]
```

---

## Get Single Listing

```

```

```
GET /listings/:id
```

---

# 🏠 3. INSPECTION CONTRACT (CORE FLOW)

## Request Inspection (Tenant)

```

```

```
POST /inspections
Authorization: Bearer token
```

```

```

```
{
  "listingId": "abc123",
  "scheduledTime": "2026-06-01T10:00:00Z"
}
```

Response:

```

```

```
{
  "id": "...",
  "status": "PENDING",
  "paymentStatus": "UNPAID"
}
```

---

## Get Tenant Inspections

```

```

```
GET /inspections
```

Returns only tenant’s inspections.

---

## Get Agent Inspections

```

```

```
GET /inspections/owner
```

Returns inspections for listings owned by agent.

---

## Accept Inspection (Agent)

```

```

```
PATCH /inspections/:id/accept
```

Rules:

-  ONLY works if `paymentStatus = PAID` 

---

## Reject Inspection

```

```

```
PATCH /inspections/:id/reject
```

---

# 💰 4. PAYMENT CONTRACT (PAYSTACK FLOW)

## Initialize Payment

```

```

```
POST /payments/initialize
```

```

```

```
{
  "inspectionId": "abc123"
}
```

Response:

```

```

```
{
  "authorizationUrl": "https://paystack.com/checkout/...",
  "reference": "rentwise_123"
}
```

---

## Webhook (NO FRONTEND CALL)

```

```

```
POST /payments/webhook
```

Handled only by Paystack.

---

# 🔔 5. CHAT CONTRACT (MVP SIMPLE)

## Get Messages

```

```

```
GET /messages/:userId
```

---

## Send Message

```

```

```
POST /messages
```

```

```

```
{
  "receiverId": "abc",
  "content": "Hello, is this available?"
}
```

---

# 🚨 6. REPORT SYSTEM

```

```

```
POST /reports
```

```

```

```
{
  "targetId": "listing123",
  "reason": "fake listing"
}
```

---

# 🧠 FRONTEND STATE MODEL (VERY IMPORTANT)

Frontend should ALWAYS rely on:

## Listing

```

```

```
verificationStatus: "PENDING" | "VERIFIED" | "REJECTED"
```

## Inspection

```

```

```
status: "PENDING" | "ACCEPTED" | "REJECTED"
paymentStatus: "UNPAID" | "PAID"
```

## User

```

```

```
role: "TENANT" | "AGENT" | "LANDLORD" | "ADMIN"
```

---

# 🧭 FRONTEND PAGES MAPPING

## Tenant Side

- `/` → listings feed 
- `/listing/:id` 
- `/inspections` 
- `/chat` 
- `/profile` 

---

## Agent Side

- `/dashboard` 
- `/listings/create` 
- `/inspections/incoming` 
- `/earnings` 

---

## Admin

- `/admin/reports` 
- `/admin/listings` 
- `/admin/users`

