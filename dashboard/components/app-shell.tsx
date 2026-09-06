"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BookOpen, Bot, FolderGit2, Gauge, GraduationCap, History, Menu, Route, X } from "lucide-react";
import { AppProvider } from "./app-provider";

const nav = [
  ["/", "Overview", Gauge], ["/curriculum", "Syllabus", BookOpen],
  ["/current", "Current Lesson", Route], ["/skills", "Skills", GraduationCap],
  ["/projects", "Projects", FolderGit2], ["/capstone", "Capstone", Bot],
  ["/history", "History", History],
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open,setOpen]=useState(false);const menuRef=useRef<HTMLButtonElement>(null);const drawerRef=useRef<HTMLElement>(null);
  const close=()=>{setOpen(false);requestAnimationFrame(()=>menuRef.current?.focus())};
  useEffect(()=>{if(!open)return;const previous=document.body.style.overflow;document.body.style.overflow="hidden";const drawer=drawerRef.current;const focusable=()=>Array.from(drawer?.querySelectorAll<HTMLElement>('a[href],button:not([disabled])')??[]);focusable()[0]?.focus();const keydown=(event:KeyboardEvent)=>{if(event.key==="Escape"){event.preventDefault();close();return}if(event.key!=="Tab")return;const items=focusable();if(!items.length)return;const first=items[0],last=items.at(-1)!;if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}};document.addEventListener("keydown",keydown);return()=>{document.body.style.overflow=previous;document.removeEventListener("keydown",keydown)}},[open]);
  return <AppProvider><div className={open?"app-frame nav-open":"app-frame"}><a className="skip-link" href="#main">Skip to content</a><button ref={menuRef} className="menu-button" aria-expanded={open} aria-controls="course-navigation" aria-label={open?"Close course navigation":"Open course navigation"} onClick={()=>open?close():setOpen(true)}><Menu/><span>Menu</span></button><aside ref={drawerRef} id="course-navigation" className={open?"sidebar open":"sidebar"} aria-label="Course navigation drawer"><button className="drawer-close" onClick={close} aria-label="Close course navigation"><X/></button><Link href="/" className="brand" onClick={close}><span className="brand-mark"><Bot size={21}/></span><span>MarketingOps AI<small>Python + AI Engineering</small></span></Link><nav aria-label="Course navigation">{nav.map(([href,label,Icon])=><NavItem key={href} href={href} label={label} icon={<Icon size={17}/>} close={close}/>)}</nav><div className="scope-card"><Bot size={17}/><div><strong>Controlled autonomy</strong><p>AI proposes. Policy validates. Evidence records.</p></div></div></aside>{open&&<button className="nav-scrim" aria-label="Close navigation" onClick={close}/>}<div className="content-frame" aria-hidden={open?true:undefined}><main id="main">{children}</main></div></div></AppProvider>;
}
function NavItem({href,label,icon,close}:{href:string;label:string;icon:React.ReactNode;close:()=>void}){const pathname=usePathname();const active=href==="/"?pathname===href:pathname.startsWith(href);return <Link href={href} onClick={close} aria-current={active?"page":undefined} className={active?"nav-link active":"nav-link"}>{icon}<span>{label}</span></Link>}
