from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# --- CORS SETUP ---
# This allows your Next.js frontend (running on a different port) to talk to this backend.
origins = [
    "http://localhost:3000", # Your local Next.js
    "https://your-vitademy-site.vercel.app" # Your production site
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- 1. DEFINE THE INPUT MODEL (What Next.js sends us) ---
class QuizSubmission(BaseModel):
    # Expecting lists of -1 (Option A) and +1 (Option B)
    # We expect 9 answers per dimension9
    resilience_answers: List[int]
    drive_answers: List[int]
    logic_answers: List[int]
    social_answers: List[int]
    action_answers: List[int]

# --- 2. THE SCORING LOGIC (From our previous discussion) ---
def calculate_dimension_status(score):
    magnitude = abs(score)
    if magnitude <= 1: return "Versatile (Hybrid)"
    if magnitude <= 3: return "Distinct"
    if magnitude <= 5: return "Strong"
    return "Pure (Specialist)"

def get_archetype(logic, resilience, drive):
    # Determine Code (Logic - Resilience - Drive)
    code = ""
    code += "H" if logic < 0 else "A"
    code += "T" if resilience < 0 else "C"
    code += "I" if drive < 0 else "E"
    
    archetype_map = {
        "HCE": "THE VISIONARY",
        "HCI": "THE STRATEGIST",
        "HTE": "THE PHILOSOPHER",
        "HTI": "THE IMPRESSIONIST",
        "ACE": "THE SCIENTIST",
        "ACI": "THE COMMANDER",
        "ATE": "THE ARCHIVIST",
        "ATI": "THE TECHNICIAN"
    }
    return archetype_map.get(code, "Unknown")

def get_rpg_class(archetype):
    job_map = {
        "THE VISIONARY": "Alchemist",
        "THE STRATEGIST": "Rogue",
        "THE PHILOSOPHER": "Druid",
        "THE IMPRESSIONIST": "Bard",
        "THE SCIENTIST": "Technomancer",
        "THE COMMANDER": "Paladin",
        "THE ARCHIVIST": "Scribe",
        "THE TECHNICIAN": "Engineer"
    }
    return job_map.get(archetype, "Novice")

# --- 3. THE API ENDPOINT ---
@app.post("/calculate-results")
async def calculate_results(submission: QuizSubmission):
    
    # Validation: Ensure we have enough data (Optional but good)
    if len(submission.logic_answers) != 9:
        raise HTTPException(status_code=400, detail="Invalid data: Logic dimension must have 9 answers")

    # Calculate Nets
    res_score = sum(submission.resilience_answers)
    drive_score = sum(submission.drive_answers)
    logic_score = sum(submission.logic_answers)
    social_score = sum(submission.social_answers)
    action_score = sum(submission.action_answers)

    # Determine Profiles
    archetype = get_archetype(logic_score, res_score, drive_score)
    rpg_class = get_rpg_class(archetype)
    
    # Determine Visual Modifiers
    pet_type = "Linker" if social_score > 0 else "Anchor"
    item_type = "Kinetic" if action_score > 0 else "Simulation"

    # Return the JSON Result
    return {
        "profile": {
            "archetype_name": archetype,
            "rpg_class": rpg_class,
            "description": "A calculated description based on inputs..." 
        },
        "scores": {
            "resilience": {"score": res_score, "status": calculate_dimension_status(res_score)},
            "drive": {"score": drive_score, "status": calculate_dimension_status(drive_score)},
            "logic": {"score": logic_score, "status": calculate_dimension_status(logic_score)},
            "social": {"score": social_score, "status": calculate_dimension_status(social_score)},
            "action": {"score": action_score, "status": calculate_dimension_status(action_score)},
        },
        "visuals": {
            "vita_pet": pet_type,
            "vita_bit": item_type
        }
    }

# --- ROOT CHECK ---
@app.get("/")
def read_root():
    return {"status": "Vitademy API is running"}