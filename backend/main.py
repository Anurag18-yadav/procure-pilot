from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from pymongo import MongoClient
import random

app = FastAPI(title="ProcurePilot GovTech Sandbox API")

# Enable CORS for React Frontend (Vite runs on localhost:5173 typically)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can specify your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================================
# MONGODB ATLAS CONNECTION CONFIGURATION
# ==========================================
MONGO_URI = "mongodb+srv://anurag11:anurag1121@cluster0.kvsh4tw.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(MONGO_URI)

# Database and Collections
db = client["procurepilot"]
startups_collection = db["startups"]

# Pydantic Models for Request Validation
class StartupRegisterSchema(BaseModel):
    fullName: str
    startupName: str
    email: EmailStr
    phone: str
    password: str
    sector: str = None
    dpiitId: str
    cin: str
    incorporationDate: str
    fundingStage: str
    documentName: str = None
    pitchDeckName: str = None

class LoginSchema(BaseModel):
    identifier: str  # Can be email or Unique Blind Evaluation ID
    password: str

class EmailCheckSchema(BaseModel):
    email: EmailStr

# 0. EMAIL CHECK API (For Step 1 Validation)
@app.post("/api/check-email")
def check_email(data: EmailCheckSchema):
    email_lower = data.email.strip().lower()
    existing_startup = startups_collection.find_one({"email": email_lower})
    
    if existing_startup:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This email is already registered! Please sign in using your credentials."
        )
    
    return {
        "success": True,
        "message": "Email is available"
    }

# 1. STARTUP REGISTRATION API
@app.post("/api/register-startup")
def register_startup(data: StartupRegisterSchema):
    # Check if email already exists in MongoDB
    existing_startup = startups_collection.find_one({"email": data.email.lower()})
    if existing_startup:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This email is already registered! Please sign in using your credentials."
        )

    # Generate Unique Blind Evaluation ID
    unique_eval_id = f"BLIND-EVAL-{random.randint(100000, 999999)}"
    while startups_collection.find_one({"uniqueId": unique_eval_id}):
        unique_eval_id = f"BLIND-EVAL-{random.randint(100000, 999999)}"

    # Prepare document to insert into MongoDB
    startup_dict = data.dict()
    startup_dict["email"] = startup_dict["email"].lower()
    startup_dict["uniqueId"] = unique_eval_id
    startup_dict["role"] = "startup"

    # Insert into MongoDB database
    result = startups_collection.insert_one(startup_dict)

    return {
        "success": True,
        "message": "Startup Registered Successfully in MongoDB!",
        "uniqueId": unique_eval_id,
        "startupName": data.startupName
    }

# 2. STARTUP LOGIN API
@app.post("/api/login-startup")
def login_startup(data: LoginSchema):
    identifier = data.identifier.strip()
    
    # Find user by email or uniqueId in MongoDB
    query = {
        "$or": [
            {"email": identifier.lower()},
            {"uniqueId": identifier}
        ]
    }
    
    startup = startups_collection.find_one(query)
    
    if not startup or startup["password"] != data.password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Unique ID/Email or Password!"
        )

    return {
        "success": True,
        "message": "Login Successful",
        "uniqueId": startup["uniqueId"],
        "startupName": startup["startupName"],
        "email": startup["email"]
    }

# Run server command: uvicorn main:app --reload --port 8000