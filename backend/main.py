from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import PasswordCheckRequest, PasswordCheckResponse
from services.password_checker import PasswordCheckerService

app = FastAPI(
    title="Password Leak Detector API",
    description="Check passwords against haveibeenpwned database",
    version="1.0.0"
)

# CORS middleware for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4729"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

password_checker = PasswordCheckerService()


@app.get("/")
async def root():
    return {"message": "Password Leak Detector API", "status": "online"}


@app.post("/api/check", response_model=PasswordCheckResponse)
async def check_password(request: PasswordCheckRequest):
    """Check if a password has been leaked in data breaches."""
    try:
        is_leaked, count = await password_checker.check_password(request.password)
        
        if is_leaked:
            message = f"This password has been seen {count:,} times in data breaches"
        else:
            message = "This password has not been found in any known data breaches"
        
        return PasswordCheckResponse(
            leaked=is_leaked,
            count=count,
            message=message
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error checking password: {str(e)}"
        )

