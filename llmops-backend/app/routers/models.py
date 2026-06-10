from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import List
import os
import requests
import google.generativeai as genai
from app.core.auth import get_current_user
from app.core.database import supabase
from app.models.model import ModelCreate, ModelResponse
from dotenv import load_dotenv

router = APIRouter(prefix="/api/models", tags=["Models"])

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str
    history: List[ChatMessage] = []


@router.get("", response_model=list[ModelResponse])
async def get_models(current_user: dict[str, str] = Depends(get_current_user)):
    try:
        response = (
            supabase.table("models")
            .select("*")
            .eq("user_id", current_user["id"])
            .order("created_at", desc=False)
            .execute()
        )
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("", response_model=ModelResponse)
async def create_model(model: ModelCreate, current_user: dict[str, str] = Depends(get_current_user)):
    try:
        response = supabase.table("models").insert({
            "user_id": current_user["id"],
            "name": model.name,
            "provider": model.provider,
            "version": model.version,
            "temperature": model.temperature,
            "max_tokens": model.max_tokens,
            "top_p": model.top_p,
            "endpoint_url": model.endpoint_url, 
            "api_key_ref": model.api_key_ref,
            "system_prompt": model.system_prompt 
        }).execute()
        return response.data[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{model_id}", response_model=ModelResponse)
async def update_model(model_id: str, model: ModelCreate, current_user: dict[str, str] = Depends(get_current_user)):
    try:
        response = supabase.table("models").update({
            "name": model.name,
            "provider": model.provider,
            "version": model.version,
            "temperature": model.temperature,
            "max_tokens": model.max_tokens,
            "top_p": model.top_p,
            "endpoint_url": model.endpoint_url, 
            "api_key_ref": model.api_key_ref,
            "system_prompt": model.system_prompt 
        }).eq("id", model_id).eq("user_id", current_user["id"]).execute()
        
        if not response.data:
            raise HTTPException(status_code=404, detail="Model not found")
        return response.data[0]
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.delete("/{model_id}")
async def delete_model(model_id: str, current_user: dict[str, str] = Depends(get_current_user)):
    try:
        supabase.table("models").delete().eq("id", model_id).eq("user_id", current_user["id"]).execute()
        return {"message": "Model deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.get("/available")
async def get_available_models():
    """Returns only the two supported providers for the frontend UI."""
    return {
        "Google": ["gemini-2.5-flash", "gemini-2.5-pro"],
        "Custom": ["llama3", "mistral", "phi3"]
    }

@router.post("/{model_id}/chat")
async def chat_with_model(
    model_id: str, 
    request: ChatRequest, 
    current_user: dict[str, str] = Depends(get_current_user)
):
    try:
        # 1. Fetch the exact model configuration from Supabase
        res = supabase.table("models").select("*").eq("id", model_id).execute()
        if not res.data:
            raise HTTPException(status_code=404, detail="Model not found in database.")
        
        model_data = res.data[0]
        
        # Security check: Ensure the user actually owns this model
        if model_data.get("user_id") != current_user["id"]:
            raise HTTPException(status_code=403, detail="Unauthorized to access this model.")

        provider = model_data.get("provider", "").lower()
        actual_model_name = model_data.get("version", "gemini-2.5-flash") # Fallback name

        # 2. Build the Context (History + New Message)
        full_conversation = ""
        for msg in request.history[-5:]: # Keep only the last 5 messages to save tokens
            full_conversation += f"{msg.role.upper()}: {msg.content}\n"
        
        # Add the system prompt if the user configured one for this model
        system_prompt = model_data.get("system_prompt")
        if system_prompt:
            full_conversation = f"SYSTEM INSTRUCTION: {system_prompt}\n\n" + full_conversation
            
        full_conversation += f"USER: {request.message}\n"

        # 3. Route to the correct LLM Provider
        reply_text = ""

        if provider in ["google", "gemini"]:
            load_dotenv()
            api_key = os.getenv("GEMINI_API_KEY")
            if not api_key:
                raise HTTPException(status_code=500, detail="Google API Key missing in backend environment.")
            
            genai.configure(api_key=api_key)
            llm = genai.GenerativeModel(actual_model_name)
            response = llm.generate_content(full_conversation)
            reply_text = response.text

        elif provider in ["ollama", "custom", "local"]:
            # --- LOCAL OLLAMA LOGIC ---
            ollama_url = "http://localhost:11434/api/generate"
            payload = {
                "model": actual_model_name,
                "prompt": full_conversation,
                "stream": False
            }
            
            response = requests.post(ollama_url, json=payload)
            if response.status_code == 200:
                reply_text = response.json().get("response", "No response generated.")
            else:
                raise Exception(f"Ollama error: {response.text}")

        else:
            raise HTTPException(status_code=400, detail=f"Unsupported provider: {provider}")

        # 4. Return to React Frontend
        return {"reply": reply_text}

    except Exception as e:
        print(f"Chat API Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))