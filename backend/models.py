from pydantic import BaseModel, Field


class PasswordCheckRequest(BaseModel):
    password: str = Field(..., min_length=1, description="Password to check")


class PasswordCheckResponse(BaseModel):
    leaked: bool = Field(..., description="Whether the password has been leaked")
    count: int = Field(..., description="Number of times the password appears in breaches")
    message: str = Field(..., description="Human-readable message about the result")

