# Password Leak Detector

A modern web application that checks passwords against the haveibeenpwned database to determine if they've been compromised in data breaches. Built with React, TypeScript, FastAPI, and styled with macOS Tahoe design language.

## Features

- **Secure Password Checking**: Uses k-anonymity to protect your password
- **Real-time Breach Detection**: Queries haveibeenpwned's Pwned Passwords API
- **Beautiful macOS-style UI**: Clean, modern interface with glass morphism effects
- **Privacy-First**: Your password is never fully transmitted or logged

## Architecture

```
User → React Frontend → FastAPI Backend → haveibeenpwned API
                ↓                ↓
         Password Input    SHA-1 Hash (5 chars only)
                            ↓
                      k-anonymity check
```

## How It Works

1. User enters a password in the frontend
2. Password is sent to the backend via HTTPS
3. Backend hashes the password with SHA-1
4. Only the first 5 characters of the hash are sent to haveibeenpwned
5. haveibeenpwned returns all hash suffixes matching that prefix
6. Backend checks if the full hash exists in the results
7. User sees if their password has been leaked and how many times

This approach (k-anonymity) ensures your actual password is never exposed to haveibeenpwned.

## Tech Stack

### Backend
- Python 3.11+
- FastAPI
- httpx for async HTTP requests
- Pydantic for validation
- uvicorn as ASGI server

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS with custom Tahoe theme
- Axios for API calls
- Lucide React for icons

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the server:
```bash
uvicorn main:app --reload --port 8847
```

The backend API will be available at `http://localhost:8847`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:4729`

## API Documentation

### POST `/api/check`

Check if a password has been compromised.

**Request Body:**
```json
{
  "password": "mypassword123"
}
```

**Response (Leaked):**
```json
{
  "leaked": true,
  "count": 142891,
  "message": "This password has been seen 142,891 times in data breaches"
}
```

**Response (Safe):**
```json
{
  "leaked": false,
  "count": 0,
  "message": "This password has not been found in any known data breaches"
}
```

## Security Considerations

- Passwords are transmitted over HTTPS in production
- Backend never logs passwords
- k-anonymity ensures partial hash matching
- CORS configured for local development only
- Rate limiting recommended for production deployment

## UI Design - macOS Tahoe Style

The interface follows Apple's design principles:
- Soft, rounded corners (16-24px border radius)
- Glass morphism with backdrop blur
- System font stack (SF Pro)
- Subtle animations (180ms cubic-bezier)
- Clear visual hierarchy
- Accent color: `#0A84FF` (Apple blue)

## Development

### Backend Testing

```bash
cd backend
pytest  # (if tests are added)
```

### Frontend Building

```bash
cd frontend
npm run build
```

## Future Enhancements

- [ ] Password strength indicator
- [ ] Batch password checking
- [ ] Check history with database
- [ ] User authentication
- [ ] Rate limiting
- [ ] Docker deployment configs
- [ ] Dark mode support

## License

MIT

## Credits

- Password breach data: [haveibeenpwned.com](https://haveibeenpwned.com/)
- Created using Fastly's leaked password detection pattern

