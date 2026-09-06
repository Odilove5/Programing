"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { appStateSchema, defaultState, type AppState } from "../lib/progress";

type Context = { state: AppState; loading: boolean; error: string; stale: boolean; retry: () => void; update: (change: (current: AppState) => AppState) => Promise<void>; replace: (next: AppState) => Promise<void> };
const AppContext = createContext<Context | null>(null);
const CACHE_KEY = "marketingops-course-progress-v1";

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state,setState]=useState(defaultState);const[loading,setLoading]=useState(true);const[error,setError]=useState("");const[stale,setStale]=useState(false);const[attempt,setAttempt]=useState(0);
  const retry=useCallback(()=>{setLoading(true);setError("");setAttempt(value=>value+1)},[]);
  useEffect(()=>{let active=true;fetch("/api/state",{cache:"no-store"}).then(response=>{if(!response.ok)throw new Error(`Progress request failed (${response.status})`);return response.json()}).then(data=>{const valid=appStateSchema.parse(data);if(!active)return;setState(valid);setStale(false);localStorage.setItem(CACHE_KEY,JSON.stringify(valid))}).catch(()=>{if(!active)return;let fallback=defaultState;try{const saved=localStorage.getItem(CACHE_KEY);if(saved)fallback=appStateSchema.parse(JSON.parse(saved))}catch{fallback=defaultState}setState(fallback);setStale(true);setError("Live progress could not be loaded. Showing this device's last local state, or a clean course profile if none exists.")}).finally(()=>active&&setLoading(false));return()=>{active=false}},[attempt]);
  const replace=useCallback(async(next:AppState)=>{const valid=appStateSchema.parse(next);setState(valid);localStorage.setItem(CACHE_KEY,JSON.stringify(valid));const response=await fetch("/api/state",{method:"PUT",headers:{"content-type":"application/json"},body:JSON.stringify(valid)});if(!response.ok){setStale(true);throw new Error("Could not save progress")}},[]);
  const update=useCallback(async(change:(current:AppState)=>AppState)=>replace(change(state)),[replace,state]);
  const value=useMemo(()=>({state,loading,error,stale,retry,update,replace}),[state,loading,error,stale,retry,update,replace]);
  return <AppContext.Provider value={value}>{children}{!loading&&!error&&!state.profile.onboarded&&<Onboarding state={state} replace={replace}/>}</AppContext.Provider>;
}
export function useApp(){const value=useContext(AppContext);if(!value)throw new Error("useApp must be used inside AppProvider");return value}

function Onboarding({state,replace}:{state:AppState;replace:(next:AppState)=>Promise<void>}) {
  const[name,setName]=useState(state.profile.name);const[startDate,setStartDate]=useState(state.profile.startDate);const[target,setTarget]=useState<60|90|120>(state.profile.dailyTarget);
  return <div className="onboarding-backdrop" role="dialog" aria-modal="true" aria-labelledby="setup-title"><form className="onboarding" onSubmit={async event=>{event.preventDefault();await replace({...state,profile:{...state.profile,name,startDate,dailyTarget:target,onboarded:true}})}}><p className="eyebrow">Python + AI Software Engineering</p><h1 id="setup-title">Build a study plan you can sustain.</h1><p>Progress remains in the local database. Lessons build toward Autonomous MarketingOps AI through student-written, tested increments.</p><label>Your name<input required value={name} onChange={event=>setName(event.target.value)}/></label><label>Course start date<input required type="date" value={startDate} onChange={event=>setStartDate(event.target.value)}/></label><fieldset><legend>Daily study target</legend><div className="target-options">{([60,90,120] as const).map(minutes=><label key={minutes}><input type="radio" name="target" checked={target===minutes} onChange={()=>setTarget(minutes)}/><span>{minutes}<small>minutes</small></span></label>)}</div></fieldset><div className="safety-notice"><strong>Controlled execution.</strong> AI may propose; deterministic validation, policy, and required approval control external action.</div><button className="button primary full" type="submit">Open course dashboard</button></form></div>
}
