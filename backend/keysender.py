from datetime import date
from pydantic import BaseModel
import win32api
import win32com.client
from fastapi import FastAPI
import pygetwindow as gw
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware

app = FastAPI(middleware=[
    Middleware(CORSMiddleware, allow_origins=["*"],  allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],)
])

class User(BaseModel):
    title: str
    lastName: str
    firstName: str
    gender: str
    language: str
    patientBirthday: str
    insuranceCompany: str
    email: str
    houseNumber: str
    street: str
    city: str
    zipCode: str
    country: str

    patientNotes: str
    mobile: str
    telephone: str
    bsn: str

@app.post("/send")
async def root( user: User ):
    print(user)
    titles =  gw.getAllTitles()
    win = gw.getWindowsWithTitle('application')[0] 
    win.activate()

    shell = win32com.client.Dispatch("WScript.Shell")
    win32api.Sleep(100)

    win32api.Sleep(100)
    shell.SendKeys("{LEFT}")
    win32api.Sleep(500)
    shell.SendKeys("2")
    win32api.Sleep(500)
    shell.SendKeys("~") # ~ is the same as {ENTER}
    win32api.Sleep(500)
    shell.SendKeys("*3")
    win32api.Sleep(500)
    shell.SendKeys("~")
    win32api.Sleep(2500)

    return {"message": "Hello World"}