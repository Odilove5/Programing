import { z } from "zod";
import { actualLessonSections } from "./course-content";

const resourceSchema = z.object({
  title: z.string().min(3),
  publisher: z.string().min(2),
  url: z.string().url(),
  resourceType: z.enum(["documentation", "guide", "academy"]),
  required: z.boolean(),
});
const questionSchema = z.object({
  id: z.string(),
  prompt: z.string().min(12),
  options: z.array(z.string()).min(2),
  answer: z.number().int().nonnegative(),
  explanation: z.string().min(12),
});
export const lessonSchema = z.object({
  id: z.string().regex(/^week-\d{2}-day-\d{2}$/),
  week: z.number().int().min(1).max(36),
  day: z.number().int().min(1).max(7),
  phase: z.string(),
  phaseNumber: z.number().int().min(1).max(9),
  track: z.string(),
  title: z.string().min(12),
  summary: z.string().min(50),
  difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]),
  estimatedMinutes: z.number().int().min(0),
  required: z.boolean(),
  prerequisiteLessonIds: z.array(z.string()),
  learningObjectives: z.array(z.string().min(12)).min(3),
  keyVocabulary: z
    .array(z.object({ term: z.string(), definition: z.string().min(12) }))
    .min(3),
  conceptSections: z
    .array(z.object({ heading: z.string(), content: z.string().min(80) }))
    .min(2),
  officialResources: z.array(resourceSchema),
  guidedExamples: z
    .array(
      z.object({
        title: z.string(),
        explanation: z.string(),
        code: z.string(),
      }),
    )
    .min(1),
  practiceExercises: z
    .array(
      z.object({
        title: z.string(),
        instructions: z.string(),
        successCriteria: z.string(),
        expectedOutput: z.string().min(1),
        validationMode: z.enum(["exact", "exit-code"]),
        requiredCodeSnippets: z.array(z.string()).default([]),
        hints: z.array(z.string()).optional(),
      }),
    )
    .min(2),
  notionExplanation: z.array(z.string().min(120)).min(2).max(4),
  guidedPractice: z
    .array(
      z.object({
        title: z.string().min(3),
        prompt: z.string().min(30),
        responseType: z.enum(["explanation", "code"]),
        requiredIdeas: z.array(z.array(z.string().min(1)).min(1)).min(1),
        successFeedback: z.string().min(30),
        hints: z.array(z.string().min(10)).min(2),
      }),
    )
    .min(4),
  lessonOverview: z.object({
    introduction: z.string().min(100),
    concepts: z
      .array(
        z.object({
          name: z.string().min(2),
          explanation: z.string().min(40),
        }),
      )
      .min(4),
  }),
  lab: z.object({
    environment: z.string(),
    authorizationNotice: z.string(),
    objective: z.string(),
    instructions: z.array(z.string()).min(3),
    expectedOutcome: z.string(),
    cleanup: z.array(z.string()).min(1),
  }),
  deliverable: z.object({
    description: z.string(),
    acceptanceCriteria: z.array(z.string()).min(2),
  }),
  knowledgeCheck: z.array(questionSchema).min(2),
  stretchChallenge: z.string(),
  commonMistakes: z.array(z.string()).min(2),
  troubleshooting: z.array(z.string()).min(2),
  defensiveConnection: z.string(),
  mitigationNotes: z.string(),
  completionChecklist: z.array(z.string()).min(4),
  tags: z.array(z.string()).min(2),
  project: z.object({
    name: z.string(),
    increment: z.string(),
    milestone: z.string(),
  }),
  sourceBasis: z.object({
    documents: z.array(z.string()).min(1),
    adaptation: z.string().min(40),
    excludedMaterial: z.array(z.string()),
  }),
  checkpoint: z.object({
    current: z.string(),
    completedSteps: z.array(z.string()),
    remainingSteps: z.array(z.string()),
  }).optional(),
});
export type Lesson = z.infer<typeof lessonSchema>;

export const phases = [
  {
    number: 1, name: "Existing Foundations / Bridge", range: [1, 3],
    theme: "Preserved foundations and the transition to marketing data",
  },
  {
    number: 2, name: "Python for Marketing Data", range: [4, 7],
    theme: "Practical transformations and deterministic campaign KPIs",
  },
  {
    number: 3, name: "Reliable Business Logic & Data Models", range: [8, 11],
    theme: "Typed domain models, pure rules, configuration, logs, and tests",
  },
  {
    number: 4, name: "APIs & Business Data Integration", range: [12, 15],
    theme: "Mock-first analytics, CRM, and advertising connectors",
  },
  {
    number: 5, name: "Backend & Persistence", range: [16, 19],
    theme: "FastAPI, SQLite, service boundaries, and operational evidence",
  },
  {
    number: 6, name: "LLM Engineering", range: [20, 23],
    theme: "Grounded structured recommendations without execution authority",
  },
  {
    number: 7, name: "Tools, Agents & Orchestration", range: [24, 27],
    theme: "Typed tools, bounded workflows, and justified specialized roles",
  },
  {
    number: 8, name: "Policy Engine & Human Oversight", range: [28, 31],
    theme: "Fail-closed policy, approvals, controlled adapters, and audit",
  },
  {
    number: 9, name: "Autonomous MarketingOps Capstone", range: [32, 36],
    theme: "A measured goal-driven loop inside policy, budget, and time bounds",
  },
] as const;

export const legacySecurityWeeklyTopics = [
  [
    "Run Python: values, data types, strings, input, and output",
    "Bash paths, quoting, and redirection",
    "Normalize and validate operator input",
    "Create a repository and useful commits",
    "Authorization, scope, and evidence",
    "Target-data normalizer foundation",
  ],
  [
    "Conditionals, Boolean logic, and importing modules",
    "PowerShell cmdlets and object pipelines",
    "Make scoped decisions from validated data",
    "Stage changes and inspect diffs",
    "Rules of engagement and safe defaults",
    "Scope-aware target validator",
  ],
  [
    "Lists, iteration, while loops, and range",
    "Bash pipelines and text tools",
    "Aggregate and deduplicate local evidence",
    "Read history and ignore generated data",
    "Evidence integrity and chain of custody",
    "Wordlist and evidence normalizer",
  ],
  [
    "Dictionaries, nested JSON, pip, virtual environments, and APIs",
    "PowerShell help, filtering, and functions",
    "Load structured configuration and a saved API response",
    "Remotes and GitHub fundamentals",
    "Reporting, remediation, and retesting",
    "JSON-configured normalizer release",
  ],
  [
    "Functions, parameters, return values, and scope",
    "Bash functions and arguments",
    "Build reusable validators and formatters",
    "Create and switch branches",
    "System attack surfaces",
    "Hash-based file-integrity utility",
  ],
  [
    "Classes, objects, attributes, methods, and state",
    "PowerShell parameters and pipeline input",
    "Model targets, observations, and findings",
    "Merge and resolve conflicts",
    "Least privilege",
    "Object-oriented evidence collector",
  ],
  [
    "Inheritance, composition, and reusable collectors",
    "Bash signals, traps, and exit status",
    "Add Linux and Windows collector plug-ins",
    "Tags and releases",
    "Secure process invocation",
    "Cross-platform evidence collector",
  ],
  [
    "Exceptions, reading, writing, and organizing files safely",
    "PowerShell error handling and services",
    "Handle evidence failures and dry-run file changes",
    "Issues and pull requests",
    "Evidence integrity review",
    "Tested evidence collector release",
  ],
  [
    "IPv4 addresses and CIDR",
    "Bash network inspection",
    "Enforce network scope",
    "Feature branches",
    "Attack-surface identification",
    "DNS and service inventory",
  ],
  [
    "TCP, UDP, ports, and sockets",
    "PowerShell network inspection",
    "Handle connection timeouts",
    "Review code changes",
    "Service enumeration methodology",
    "Bounded service checker",
  ],
  [
    "DNS records and resolution",
    "curl request construction",
    "Collect DNS evidence",
    "Pull-request workflow",
    "DNS testing methodology",
    "DNS inventory tool",
  ],
  [
    "HTTP requests and responses",
    "PowerShell web cmdlets",
    "Profile HTTP responses",
    "Protect GitHub credentials",
    "HTTP entry points",
    "HTTP response profiler",
  ],
  [
    "URLs, parsing, and encoding",
    "Bash JSON processing with jq",
    "Normalize and scope URLs",
    "Semantic versioning",
    "Input and output encoding",
    "Scoped URL collector",
  ],
  [
    "Headers, cookies, and sessions",
    "PowerShell JSON and custom objects",
    "Audit browser security metadata",
    "Write release notes",
    "Session and cookie testing",
    "Header and cookie security auditor",
  ],
  [
    "TLS verification and certificates",
    "SSH boundaries and controlled jobs",
    "Inspect TLS safely",
    "Practice code review",
    "Transport security testing",
    "TLS evidence reporter",
  ],
  [
    "REST APIs, pagination, retries, and rate limits",
    "PowerShell remoting boundaries",
    "Build a resilient API client",
    "Maintain a changelog",
    "API testing methodology",
    "API inventory client",
  ],
  [
    "Threads and thread pools",
    "Bash process substitution",
    "Bound concurrency",
    "Understand rebasing",
    "Resource exhaustion risk",
    "Concurrent service checker",
  ],
  [
    "asyncio tasks and asynchronous HTTP",
    "PowerShell background jobs",
    "Coordinate async requests",
    "Cherry-pick focused changes",
    "Service correlation",
    "Async inventory tool",
  ],
  [
    "Queues and worker coordination",
    "Bash file descriptors",
    "Build a work queue",
    "Revert safely",
    "Test data quality",
    "Evidence job coordinator",
  ],
  [
    "Semaphores and resource limits",
    "PowerShell parallel pipelines",
    "Enforce capacity limits",
    "Use Git hooks",
    "Safe scanning constraints",
    "Scope and rate policy",
  ],
  [
    "Cancellation and graceful shutdown",
    "Bash temporary files and traps",
    "Clean up interrupted jobs",
    "Create a CI workflow",
    "Audit trails",
    "Resumable collector",
  ],
  [
    "XML and structured output parsing",
    "PowerShell reusable modules",
    "Normalize tool output",
    "Test across environments",
    "Evidence provenance",
    "Parser plug-in system",
  ],
  [
    "SQLite schemas and queries",
    "ShellCheck and defensive Bash",
    "Store structured evidence",
    "Protect branches",
    "Evidence schemas",
    "SQLite evidence store",
  ],
  [
    "Checkpoints and resumable jobs",
    "Pester testing fundamentals",
    "Resume interrupted runs",
    "Automate releases",
    "Reproducibility",
    "Structured reconnaissance pipeline",
  ],
  [
    "HTML parsing",
    "Reusable Bash libraries",
    "Map forms and endpoints",
    "Define code ownership",
    "Authentication testing",
    "Endpoint mapper",
  ],
  [
    "Stateful HTTP workflows",
    "PowerShell users and groups",
    "Record authorized sessions",
    "Create issue templates",
    "Access-control testing",
    "Session recorder",
  ],
  [
    "Request and response comparison",
    "Strict shell input validation",
    "Explain response differences",
    "Create pull-request templates",
    "Injection concepts",
    "Response-comparison utility",
  ],
  [
    "Authorization test matrices",
    "PowerShell services and permissions",
    "Run non-destructive matrices",
    "Write a security policy",
    "Path traversal methodology",
    "Authorization regression tester",
  ],
  [
    "Identity and permission graphs",
    "Safe remote command patterns",
    "Model relationships",
    "Use security advisories",
    "Identity attack paths",
    "Identity relationship analyzer",
  ],
  [
    "Windows evidence analysis",
    "PowerShell registry and event logs",
    "Audit Windows configurations",
    "Practice responsible disclosure",
    "Windows misconfiguration",
    "Windows configuration auditor",
  ],
  [
    "Linux evidence analysis",
    "Normalize logs with Bash",
    "Audit Linux configurations",
    "Review dependencies",
    "Linux misconfiguration",
    "Linux configuration auditor",
  ],
  [
    "Regression and property-based tests",
    "Package shell utilities",
    "Verify remediations",
    "Maintain a repository",
    "Mitigation validation",
    "Remediation retest suite",
  ],
  [
    "Typed tool schemas with dataclasses and JSON",
    "Production Linux launcher",
    "Build an allowlisted agent tool registry",
    "Plan milestones",
    "Threat-model the tool",
    "Security agent foundation",
  ],
  [
    "Protocols, interfaces, and dependency injection",
    "Production Windows launcher",
    "Build a provider-neutral plan-act-observe loop",
    "Enforce CI quality gates",
    "Test abuse cases",
    "Agent and collector integrations",
  ],
  [
    "Async tool execution, timeouts, and observability",
    "Portable shell configuration",
    "Evaluate agent decisions with deterministic fixtures",
    "Prepare a versioned release",
    "Protect secrets and evidence",
    "Agent safety and performance hardening",
  ],
  [
    "Documentation, packaging, and secure release",
    "Cross-platform installation",
    "Ship a local authorized security agent",
    "Present the portfolio",
    "Final mitigation review",
    "Authorized-assessment agent framework release",
  ],
] as const;

const weeklyTopics = [
  ["Run Python: values, data types, strings, input, and output", "Bash paths, quoting, and redirection", "Normalize and validate operator input", "Create a repository and useful commits", "Authorization, scope, and evidence", "Target-data normalizer foundation"],
  ["Conditionals, Boolean logic, and importing modules", "PowerShell cmdlets and object pipelines", "Make scoped decisions from validated data", "Stage changes and inspect diffs", "Rules of engagement and safe defaults", "Scope-aware target validator"],
  ["Lists, iteration, while loops, and range", "Represent campaigns with lists, dictionaries, and sets", "Test loop state, boundaries, and termination", "Separate semantic edits from Git noise", "Apply deterministic CPA and spend thresholds", "Blank-file campaign rules mastery checkpoint"],
  ["Nested campaign dictionaries", "Filter and reshape campaign records", "Normalize reusable campaign transformations", "Review a blank-file implementation diff", "Preserve malformed-record evidence", "Campaign record transformer"],
  ["Functions, modules, and explicit contracts", "Read campaign CSV with pathlib", "Load JSON and handle file failures", "Exclude generated reports and local data", "Validate records before calculation", "Dual-format campaign loader"],
  ["Calculate CTR, CPC, CPA, and ROAS", "Handle zero denominators explicitly", "Build a deterministic KPI calculator", "Test formula boundaries and malformed numbers", "Keep arithmetic outside the LLM", "Campaign KPI summary"],
  ["Typing basics for data transformations", "Produce human and machine-readable summaries", "Compose the campaign analyzer", "Package a focused project release", "Audit rejected-record evidence", "Campaign Performance Analyzer"],
  ["Dataclasses for Campaign and MetricSnapshot", "Model immutable metric evidence", "Normalize at model boundaries", "Review type-driven changes", "Enforce model invariants", "Marketing domain model"],
  ["Enums for goal and action states", "Model BusinessGoal and Recommendation", "Write pure goal-progress functions", "Inspect separation-of-concerns diffs", "Apply safe dependency ordering", "Goal progress evaluator"],
  ["Type hints across module boundaries", "Model Evidence and ActionRequest", "Load validated configuration", "Review secret-safe configuration", "Redact structured logs", "Observable metrics run"],
  ["pytest, fixtures, and parametrization", "Build reusable marketing fixtures", "Test KPI and goal boundaries", "Run a blank-file testing checkpoint", "Prove negative behavior", "Reliable KPI Engine"],
  ["HTTP requests, responses, and REST", "Represent JSON API contracts", "Build a timeout-aware mock client", "Test HTTP success and failure", "Treat responses as untrusted data", "Mock analytics client"],
  ["Pagination and collection bounds", "Interpret rate-limit metadata", "Implement bounded exponential backoff", "Test retries and idempotent reads", "Stop at configured page and attempt limits", "Paginated metrics client"],
  ["Authentication and header concepts", "Load credentials from environment variables", "Validate CRM response schemas", "Inspect logs and diffs for secrets", "Apply least-privilege credentials", "Validated CRM connector"],
  ["Protocols and dependency injection", "Define canonical connector records", "Build mock Analytics, CRM, and Ads clients", "Run connector contract tests", "Keep live credentials optional", "Marketing Data API Connector"],
  ["Classes, composition, and service boundaries", "Define campaign and goal repositories", "Build application services", "Test services with fakes", "Separate domain decisions from I/O", "Campaign and goal services"],
  ["SQLite tables and parameterized SQL", "Model goal, metric, action, and evidence relationships", "Implement transactional CRUD", "Test with temporary databases", "Preserve integrity with constraints", "SQLite evidence repository"],
  ["FastAPI routes and dependency injection", "Define request and response schemas", "Expose MarketingOps resources", "Test API success and error responses", "Validate every API boundary", "MarketingOps API"],
  ["Correlation IDs and error boundaries", "Represent background-job state", "Add structured backend logging", "Plan schema migrations", "Audit persistent workflow state", "Persistent MarketingOps Backend"],
  ["Model API client interfaces", "Construct verified KPI context", "Build a mock-first model gateway", "Test timeout, retry, and cost metadata", "Deny direct model execution", "Model gateway"],
  ["System and user instruction roles", "Build evidence-referenced prompts", "Filter untrusted retrieved context", "Test prompt-injection boundaries", "Require source and evidence references", "Grounded analyst context builder"],
  ["Structured model outputs", "Model Recommendation schemas", "Validate and reject malformed AI output", "Test hallucination and fallback cases", "Fail closed on invalid recommendations", "Validated analyst recommendation"],
  ["Deterministic AI evaluations", "Create grounded recommendation fixtures", "Measure latency, tokens, cost, and uncertainty", "Review evaluation regressions", "Keep the analyst recommendation-only", "AI Performance Analyst"],
  ["Typed tool input and output", "Define tool success and failure records", "Build an allowlisted tool registry", "Test tool contracts", "Bound every tool capability", "Read-only marketing tool registry"],
  ["Planner and executor interfaces", "Represent plans and tasks", "Decompose campaign experiments", "Test proposal-versus-permission boundaries", "Prevent plans from granting authority", "Campaign experiment planner"],
  ["State machines and bounded loops", "Separate persistent and transient state", "Implement retry and idempotent recovery", "Test termination and restart", "Enforce step, time, and cost limits", "Resumable orchestrator"],
  ["Specialized agent contracts", "Define Strategist, Research, Content, and Analyst handoffs", "Coordinate bounded agent work", "Evaluate role-specific failures", "Add agents only for distinct responsibilities", "Agent Workflow"],
  ["Policy decision models", "Classify marketing actions", "Evaluate allow, deny, and approval-required rules", "Parametrize policy tables", "Default closed on missing policy data", "Policy evaluator"],
  ["Approval request models", "Bind approvals to parameters and expiry", "Build the Approval Service", "Test tampering and expired approval", "Require humans for higher-risk actions", "Approval Service"],
  ["Deterministic execution adapters", "Record receipts and idempotency keys", "Implement dry-run and bounded execution", "Test duplicates and partial failures", "Respect budget and approval decisions", "Controlled execution adapters"],
  ["Autonomy Levels 0 through 4", "Represent budget and monitoring state", "Schedule policy-controlled actions", "Evaluate every autonomy level", "Never let autonomy bypass deny rules", "Policy-Controlled Execution"],
  ["Goal-driven control-loop models", "Store baselines, horizons, and constraints", "Integrate plan, collection, and KPI measurement", "Test goal progress transitions", "Bound iteration count and budget", "Capstone control-loop foundation"],
  ["Research and recommendation integration", "Preserve research provenance and draft variants", "Coordinate grounded reasoning roles", "Evaluate uncertainty and evidence use", "Keep reasoning separate from execution", "Capstone reasoning layer"],
  ["Policy-aware action integration", "Join approvals to exact action requests", "Route actions through controlled adapters", "Test denial, expiry, and receipts", "Prove there is no LLM-to-action path", "Capstone action layer"],
  ["Outcome windows and causal caution", "Store before-and-after metric evidence", "Schedule measurement and bounded replanning", "Test delayed and missing outcomes", "Stop when goals, policy, or budgets require it", "Measured optimization loop"],
  ["Packaging, observability, and release", "Document privacy, trust, and operational boundaries", "Recover from end-to-end failures", "Run release quality gates", "Audit cost, evidence, policy, and reliability", "Autonomous MarketingOps Agent release"],
] as const;

const tracks = [
  "Python & domain models",
  "Data & interfaces",
  "Reliable automation",
  "Git & quality",
  "Policy & reliability",
  "Integrated project",
  "Review & recovery",
];

const pythonPages = [
  [
    "Python tutorial: an informal introduction",
    "https://docs.python.org/3/tutorial/introduction.html",
  ],
  [
    "Python tutorial: control flow and imports",
    "https://docs.python.org/3/tutorial/controlflow.html",
  ],
  [
    "Python tutorial: lists and looping techniques",
    "https://docs.python.org/3/tutorial/datastructures.html",
  ],
  [
    "Python tutorial: virtual environments and packages",
    "https://docs.python.org/3/tutorial/venv.html",
  ],
  [
    "Python tutorial: defining functions",
    "https://docs.python.org/3/tutorial/controlflow.html#defining-functions",
  ],
  [
    "Python tutorial: classes and objects",
    "https://docs.python.org/3/tutorial/classes.html",
  ],
  [
    "Python tutorial: inheritance",
    "https://docs.python.org/3/tutorial/classes.html#inheritance",
  ],
  [
    "Python tutorial: errors, exceptions, and files",
    "https://docs.python.org/3/tutorial/errors.html",
  ],
  [
    "ipaddress - IPv4 and IPv6 manipulation",
    "https://docs.python.org/3/library/ipaddress.html",
  ],
  [
    "socket - low-level networking interface",
    "https://docs.python.org/3/library/socket.html",
  ],
  [
    "socket getaddrinfo and name resolution",
    "https://docs.python.org/3/library/socket.html#socket.getaddrinfo",
  ],
  [
    "urllib.request - opening URLs",
    "https://docs.python.org/3/library/urllib.request.html",
  ],
  [
    "urllib.parse - URL parsing",
    "https://docs.python.org/3/library/urllib.parse.html",
  ],
  [
    "http.cookies and cookie parsing",
    "https://docs.python.org/3/library/http.cookies.html",
  ],
  [
    "ssl - TLS wrapper for sockets",
    "https://docs.python.org/3/library/ssl.html",
  ],
  [
    "json - JSON encoding and decoding",
    "https://docs.python.org/3/library/json.html",
  ],
  [
    "concurrent.futures - launching parallel tasks",
    "https://docs.python.org/3/library/concurrent.futures.html",
  ],
  [
    "asyncio - asynchronous I/O",
    "https://docs.python.org/3/library/asyncio.html",
  ],
  ["asyncio queues", "https://docs.python.org/3/library/asyncio-queue.html"],
  [
    "asyncio synchronization primitives",
    "https://docs.python.org/3/library/asyncio-sync.html",
  ],
  [
    "asyncio task cancellation",
    "https://docs.python.org/3/library/asyncio-task.html#task-cancellation",
  ],
  ["XML processing modules", "https://docs.python.org/3/library/xml.html"],
  [
    "sqlite3 - DB-API interface for SQLite",
    "https://docs.python.org/3/library/sqlite3.html",
  ],
  [
    "contextlib - context manager utilities",
    "https://docs.python.org/3/library/contextlib.html",
  ],
  [
    "html.parser - simple HTML parser",
    "https://docs.python.org/3/library/html.parser.html",
  ],
  [
    "http.cookiejar - cookie handling",
    "https://docs.python.org/3/library/http.cookiejar.html",
  ],
  [
    "difflib - helpers for computing deltas",
    "https://docs.python.org/3/library/difflib.html",
  ],
  [
    "itertools - iterator building blocks",
    "https://docs.python.org/3/library/itertools.html",
  ],
  [
    "collections - specialized containers",
    "https://docs.python.org/3/library/collections.html",
  ],
  [
    "winreg - Windows registry access",
    "https://docs.python.org/3/library/winreg.html",
  ],
  [
    "os - operating system interfaces",
    "https://docs.python.org/3/library/os.html",
  ],
  [
    "unittest.mock - mock objects",
    "https://docs.python.org/3/library/unittest.mock.html",
  ],
  [
    "typing - support for type hints",
    "https://docs.python.org/3/library/typing.html",
  ],
  ["abc - abstract base classes", "https://docs.python.org/3/library/abc.html"],
  [
    "asyncio development and debugging",
    "https://docs.python.org/3/library/asyncio-dev.html",
  ],
  [
    "Python packaging and distributing modules",
    "https://docs.python.org/3/distributing/index.html",
  ],
] as const;

function doc(
  title: string,
  publisher: string,
  url: string,
  resourceType: "documentation" | "guide" | "academy" = "documentation",
) {
  return { title, publisher, url, resourceType, required: true };
}

function shellSource(topic: string) {
  if (topic.startsWith("Bash:"))
    return [
      doc(
        "GNU Bash Reference Manual",
        "GNU Project",
        "https://www.gnu.org/software/bash/manual/bash.html",
      ),
    ];
  const slug = topic.includes("job")
    ? "about_jobs"
    : topic.includes("error")
      ? "about_error_handling"
      : topic.includes("module")
        ? "about_modules"
        : topic.includes("remoting")
          ? "about_remote"
          : topic.includes("JSON") || topic.includes("object")
            ? "about_objects"
            : "about_functions";
  return [
    doc(
      `PowerShell ${slug.replaceAll("_", " ")}`,
      "Microsoft",
      `https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/${slug}`,
    ),
  ];
}

function gitSource(week: number) {
  if (week <= 4)
    return [
      doc(
        "Pro Git - Git Basics",
        "Git",
        "https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository",
        "guide",
      ),
    ];
  if (week <= 8)
    return [
      doc(
        "Pro Git - Basic Branching and Merging",
        "Git",
        "https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging",
        "guide",
      ),
    ];
  if (week <= 16)
    return [
      doc(
        "GitHub pull request documentation",
        "GitHub",
        "https://docs.github.com/en/pull-requests",
      ),
    ];
  if (week <= 20)
    return [
      doc(
        "Pro Git - Rebasing",
        "Git",
        "https://git-scm.com/book/en/v2/Git-Branching-Rebasing",
        "guide",
      ),
    ];
  if (week <= 24)
    return [
      doc(
        "GitHub Actions documentation",
        "GitHub",
        "https://docs.github.com/en/actions",
      ),
    ];
  if (week <= 32)
    return [
      doc(
        "GitHub repository security settings",
        "GitHub",
        "https://docs.github.com/en/code-security/getting-started/securing-your-repository",
      ),
    ];
  return [
    doc(
      "GitHub release documentation",
      "GitHub",
      "https://docs.github.com/en/repositories/releasing-projects-on-github",
    ),
  ];
}

function securitySource(week: number) {
  if (week <= 8)
    return [
      doc(
        "OWASP Web Security Testing Guide - introduction and objectives",
        "OWASP",
        "https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/00-Introduction_and_Objectives/",
        "guide",
      ),
    ];
  if (week <= 11)
    return [
      doc(
        "OWASP WSTG - information gathering",
        "OWASP",
        "https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/01-Information_Gathering/",
        "guide",
      ),
    ];
  if (week <= 16)
    return [
      doc(
        "MDN HTTP guides",
        "MDN",
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides",
        "guide",
      ),
    ];
  if (week <= 24)
    return [
      doc(
        "OWASP Logging Cheat Sheet",
        "OWASP",
        "https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html",
        "guide",
      ),
    ];
  if (week <= 26)
    return [
      doc(
        "OWASP WSTG - authentication testing",
        "OWASP",
        "https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/04-Authentication_Testing/",
        "guide",
      ),
    ];
  if (week <= 28)
    return [
      doc(
        "PortSwigger access control",
        "PortSwigger",
        "https://portswigger.net/web-security/access-control",
        "academy",
      ),
    ];
  if (week <= 31)
    return [
      doc(
        "OWASP WSTG - configuration and deployment testing",
        "OWASP",
        "https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/02-Configuration_and_Deployment_Management_Testing/",
        "guide",
      ),
    ];
  if (week === 32)
    return [
      doc(
        "OWASP WSTG - reporting",
        "OWASP",
        "https://owasp.org/www-project-web-security-testing-guide/latest/5-Reporting/",
        "guide",
      ),
    ];
  return [
    doc(
      "OWASP Threat Modeling Cheat Sheet",
      "OWASP",
      "https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html",
      "guide",
    ),
  ];
}

function sourceFor(week: number, day: number, topic: string) {
  const python = doc(
    pythonPages[week - 1][0],
    "Python Software Foundation",
    pythonPages[week - 1][1],
  );
  if (week >= 4) {
    if (day === 4) return gitSource(week);
    return day === 7 ? [] : [python];
  }
  if (day === 1 || day === 3) return [python];
  if (day === 2) return shellSource(topic);
  if (day === 4) return gitSource(week);
  if (day === 5) return securitySource(week);
  if (day === 6) return [python, ...securitySource(week)];
  return [];
}

function sourceBasis(week: number, day: number, topic: string) {
  const isPython = day === 1 || day === 3 || day === 6;
  const citedDocuments = sourceFor(week, day, topic).map(
    (resource) => `${resource.publisher}: ${resource.title}`,
  );
  return {
    documents: [
      ...(citedDocuments.length
        ? citedDocuments
        : ["Weekly retrieval practice based on the week's official readings"]),
      ...(isPython
        ? [
            "Project-driven Python practice with blank-file retrieval and separate reference material",
            "Autonomous MarketingOps architecture and milestone roadmap",
          ]
        : []),
    ],
    adaptation: isPython
      ? `The lesson preserves explicit Python mechanics and applies them to ${topic.toLowerCase()} without hiding arithmetic, validation, policy, or execution behind an AI framework. Exercises use local fixtures and add only the current MarketingOps milestone slice.`
      : "The lesson connects official technical behavior to a testable MarketingOps component, a reviewed Git diff, or a deterministic reliability rule.",
    excludedMaterial: [
      "unrestricted model-to-action execution",
      "live credentials in beginner exercises",
      "future capstone functionality implemented ahead of the curriculum",
    ],
  };
}

function specializedConcept(topic: string, week: number, day: number) {
  if (day !== 1 && day !== 3 && day !== 6) return null;
  if (week <= 7)
    return `Build ${topic.toLowerCase()} as a transparent campaign-data pipeline: accept a local value, validate its shape, transform it deterministically, and return a structured result. Preserve rejected inputs and handle zero denominators or malformed values explicitly. The objective is independent Python fluency, not memorizing a recipe.`;
  if (week <= 19)
    return `Organize ${topic.toLowerCase()} behind typed domain, service, repository, or connector boundaries. Separate input, business rules, persistence, and presentation so fixtures and mocks can replace external dependencies. Record correlation and error details without leaking secrets or customer data.`;
  if (week <= 27)
    return `Treat ${topic.toLowerCase()} as untrusted proposed data crossing an AI boundary. Validate schemas, retain evidence references, bound tools, steps, retries, cost, and time, and separate planning from execution. Deterministic Python remains responsible for KPIs and policy.`;
  return `Route ${topic.toLowerCase()} through a typed action request, deterministic policy decision, human approval when required, and a narrow idempotent adapter. Record the decision and outcome. No model or retrieved string may bypass policy, budget, approval, dry-run, or tool constraints.`;
}

function guidedCode(topic: string, week: number, day: number) {
  if (day === 2)
    return `# Inspect a local campaign fixture without credentials\nfixture="./fixtures/week-${week}-campaigns.json"\nprintf 'Fixture: %s\\n' "$fixture"`;
  if (week >= 20)
    return `from dataclasses import dataclass\n\n@dataclass(frozen=True)\nclass Proposal:\n    kind: str\n    evidence_ids: tuple[str, ...]\n\nproposal = Proposal(${JSON.stringify(topic)}, ("evidence-demo",))\nprint({"proposal": proposal, "executable": False})`;
  if (week >= 8)
    return `from dataclasses import dataclass\n\n@dataclass(frozen=True)\nclass MetricEvidence:\n    campaign_id: str\n    value: float\n    source: str\n\nitem = MetricEvidence("campaign-demo", 1.0, "fixtures/week-${week}.json")\nprint(item)`;
  return `# Week ${week}: make campaign data flow visible\nrecord = {"campaign": "demo", "spend": 25.0, "conversions": 5}\nresult = {"topic": ${JSON.stringify(topic)}, "record": record, "valid": True}\nprint(result)`;
}

function projectForWeek(week: number) {
  const projects = [
    "Foundation and bridge portfolio",
    "Campaign Performance Analyzer",
    "Reliable KPI Engine",
    "Marketing Data API Connector",
    "Persistent MarketingOps Backend",
    "AI Performance Analyst",
    "Agent Workflow",
    "Policy-Controlled Execution",
    "Autonomous MarketingOps Agent",
  ];
  const phase = phases.find((item) => week >= item.range[0] && week <= item.range[1])!;
  return projects[phase.number - 1];
}

function realisticProject(week: number, day: number, topic: string) {
  const portfolio = projectForWeek(week);
  const safeTopic = topic.toLowerCase();
  const artifacts = [
    "a small Python module and a saved terminal transcript",
    "one Bash or PowerShell script plus a structured comparison note",
    "a reusable Python automation component and local fixture",
    "a focused Git history with a reviewed diff and recovery note",
    "a deterministic policy or reliability case with evidence fields",
    `a tested vertical slice of the ${portfolio}`,
    "a rebuilt example, review note, and recovery plan",
  ];
  const scenarios = [
    `A marketing analyst needs a dependable local utility that applies ${safeTopic} to saved fixture data without relying on copied code.`,
    `A teammate needs the same ${safeTopic} task performed predictably on a local workstation, including paths with spaces and a controlled failure.`,
    `The ${portfolio} needs a reusable component for ${safeTopic} that separates input, processing, and reporting.`,
    `A reviewer needs to understand and safely reproduce the ${safeTopic} change without losing unrelated work or committing generated evidence.`,
    `A reviewer needs a deterministic test for ${safeTopic} that distinguishes expected behavior, a failed operation, and an actual observation.`,
    `The weekly project needs a working ${safeTopic} increment that another student can run from the README against local fixtures.`,
    `The student needs evidence of which parts of ${safeTopic} can be recalled, rebuilt, and debugged without notes.`,
  ];
  return {
    name:
      day === 6
        ? `${portfolio}: week ${week} integration`
        : `${topic}: practical week ${week} task`,
    increment: scenarios[day - 1],
    milestone: `Produce ${artifacts[day - 1]} that demonstrates the lesson objectives and can be reviewed from saved local evidence.`,
    objective: `${scenarios[day - 1]} Build ${artifacts[day - 1]} that makes its inputs, result, authorization boundary, and failure behavior visible.`,
    instructions: [
      `Write a two-sentence problem statement explaining ${safeTopic} and the expected result in your own words.`,
      `Create ${artifacts[day - 1]} from a blank editor using only fictional data or saved fixtures inside the course workspace.`,
      "Run a normal case, a boundary case, and one deliberately invalid case; make the invalid case fail safely with a useful message.",
      "Compare the observed result with the expected result and correct the implementation until the behavior is repeatable.",
      "Save a short evidence note containing the input, timestamp, result, defensive relevance, and one situation in which this technique should not be used.",
    ],
    expectedOutcome: `A reviewer can run the ${safeTopic} project locally, observe deterministic normal and failure behavior, and trace each learning objective to code, output, or the evidence note.`,
    deliverable: `${artifacts[day - 1]} for ${topic}, accompanied by redacted output and a brief explanation of the result.`,
    criteria: [
      "The artifact runs from the documented command against local fixtures",
      "Every learning objective is demonstrated by code, output, or the evidence note",
      "Normal, boundary, and invalid cases are recorded and the invalid case is handled safely",
      "The authorization boundary and defensive relevance are stated clearly",
    ],
    expectedOutput: `A successful local run of the ${safeTopic} project with clearly labeled normal, boundary, and handled-failure results.`,
  };
}

function notionExplanation(
  topic: string,
  week: number,
  day: number,
  required: boolean,
) {
  if (!required) {
    return [
      `After six days of new material, the practical problem is no longer exposure to more information; it is discovering what you can retrieve and use without prompts. This review day treats recall as evidence. If you cannot explain ${topic.toLowerCase()} or rebuild the week's smallest working example, that concept belongs in the review queue rather than being hidden by another lesson.`,
      "Retrieval practice strengthens the path from a problem to a solution. Reconstruct the week's mental models in plain language, compare them with your saved evidence, and distinguish a forgotten detail from a missing foundation. Rest is also part of reliable engineering: fatigue increases syntax mistakes, weakens judgment, and makes unsafe defaults easier to overlook.",
      `The result of this lesson is a focused recovery decision. Keep concepts that you can explain, implement, and test; mark uncertain concepts for another short attempt; and record one concrete adjustment for week ${week + 1}. The objective is honest calibration, not producing new code for its own sake.`,
    ];
  }
  const technical = actualLessonSections(week, day, topic)[0].content;
  const track = tracks[day - 1];
  return [
    `Imagine a MarketingOps workflow where the existing component does not yet support ${topic.toLowerCase()}. The immediate problem is to turn a clear input into a result you can inspect and explain. In the ${track} track, small understandable components are easier to test, safer to operate, and easier to combine into the cumulative product.`,
    technical,
    `Keep one mental model in view: identify the input, apply the ${topic.toLowerCase()} rule, and observe the output or failure. A useful implementation does not hide malformed data, policy decisions, or tool errors. It makes those states explicit so another component can distinguish valid evidence from a failed operation and reproduce the result.`,
  ];
}

function guidedPracticeFor(topic: string, week: number, day: number) {
  if (week === 1 && day === 1)
    return [
      {
        title: "Classify the values",
        prompt:
          "A target record contains a hostname in quotes, a port without quotes, and the value True. Name the Python type of each value in that order.",
        responseType: "explanation" as const,
        requiredIdeas: [
          ["str", "string"],
          ["int", "integer"],
          ["bool", "boolean"],
        ],
        successFeedback:
          "Correct. Text is a string, a whole-number port is an integer, and True is a Boolean value.",
        hints: [
          "Quotation marks create text.",
          "The remaining types represent a whole number and a yes-or-no state.",
        ],
      },
      {
        title: "Explain assignment",
        prompt:
          'In your own words, explain what the equals sign does in target_name = "lab-server". Mention both the variable name and the value.',
        responseType: "explanation" as const,
        requiredIdeas: [
          ["variable", "name"],
          ["value", "lab-server"],
          ["assign", "store", "bind"],
        ],
        successFeedback:
          "Exactly. Assignment binds the descriptive variable name to the string value so the program can use it later.",
        hints: [
          "The equals sign is assignment here, not a question.",
          "Describe what is on its left and what is on its right.",
        ],
      },
      {
        title: "Predict the conversion failure",
        prompt:
          'What happens when Python evaluates int("HTTPS"), and why? Name the specific exception if you remember it.',
        responseType: "explanation" as const,
        requiredIdeas: [
          ["error", "exception", "valueerror"],
          ["not numeric", "non-numeric", "cannot convert", "whole number"],
        ],
        successFeedback:
          "Correct. Non-numeric text cannot represent an integer, so int raises ValueError instead of inventing a number.",
        hints: [
          "The text contains no digits that form a whole number.",
          "The exception name begins with Value.",
        ],
      },
      {
        title: "Write the safe decision",
        prompt:
          "Write only a try/except block that attempts to convert port_text with int and catches the specific conversion error. Do not write the complete project.",
        responseType: "code" as const,
        requiredIdeas: [["try:"], ["int("], ["except valueerror:"]],
        successFeedback:
          "Good. The risky conversion is isolated and the expected ValueError has a specific handler.",
        hints: [
          "The conversion belongs under try.",
          "Align except with try and indent the statements inside each block.",
        ],
      },
    ];
  if (week === 1 && day === 2)
    return [
      {
        title: "Choose the navigation command",
        prompt:
          "Which Bash command prints the current working directory, and which command changes to another directory?",
        responseType: "explanation" as const,
        requiredIdeas: [["pwd"], ["cd"]],
        successFeedback:
          "Correct. pwd reports the current location and cd changes the shell's working directory.",
        hints: [
          "One command means print working directory.",
          "The other means change directory.",
        ],
      },
      {
        title: "Explain quoting",
        prompt:
          "Explain why a path such as ./security notes must be quoted when it is passed to a Bash command.",
        responseType: "explanation" as const,
        requiredIdeas: [
          ["space", "spaces"],
          ["one", "single", "same argument", "argument"],
        ],
        successFeedback:
          "Correct. Quoting prevents the shell from splitting a path containing spaces into separate arguments.",
        hints: [
          "Consider how the shell separates arguments.",
          "The complete path must reach the command as one value.",
        ],
      },
      {
        title: "Distinguish redirection",
        prompt:
          "Explain the difference between > and >> when writing a report file.",
        responseType: "explanation" as const,
        requiredIdeas: [
          ["overwrite", "replace", "create"],
          ["append", "add"],
        ],
        successFeedback:
          "Correct. > creates or replaces the destination, while >> appends without erasing existing content.",
        hints: [
          "One operator can erase existing content.",
          "The doubled operator adds to the end.",
        ],
      },
      {
        title: "Write safe directory creation",
        prompt:
          "Write one mkdir command that safely creates the directory stored in folder, preserves spaces, and ends option parsing.",
        responseType: "code" as const,
        requiredIdeas: [["mkdir"], ["-p"], ["--"], ['"$folder"']],
        successFeedback:
          "Good. The command is repeatable, ends option parsing, and preserves the full quoted path.",
        hints: [
          "Use the option that tolerates an existing directory.",
          "Place -- before the quoted variable expansion.",
        ],
      },
    ];
  if (week === 1 && day === 3)
    return [
      {
        title: "Classify three inputs",
        prompt:
          "Classify lab-server.local, a padded uppercase hostname, and spaces-only input as valid, needs normalization, or invalid.",
        responseType: "explanation" as const,
        requiredIdeas: [["valid"], ["normalization", "normalize"], ["invalid"]],
        successFeedback:
          "Correct. The clean hostname is valid, the padded hostname needs normalization, and spaces-only input is invalid.",
        hints: [
          "Whitespace and letter case can be normalized.",
          "Ask what remains after stripping spaces-only input.",
        ],
      },
      {
        title: "Separate format from authorization",
        prompt:
          "Explain why a normalized production hostname must not be accepted automatically by an authorized lab tool.",
        responseType: "explanation" as const,
        requiredIdeas: [
          ["validate", "validation"],
          ["allowlist", "authorized", "authorization", "scope"],
        ],
        successFeedback:
          "Correct. Normalization fixes representation; validation must still enforce the explicit authorization boundary.",
        hints: [
          "Correct formatting is not permission.",
          "Name the collection of explicitly permitted targets.",
        ],
      },
      {
        title: "Order the pipeline",
        prompt:
          "Write the five operations in order: strip whitespace, lowercase, reject empty, check allowlist, and report.",
        responseType: "explanation" as const,
        requiredIdeas: [
          ["strip"],
          ["lower"],
          ["empty"],
          ["allowlist"],
          ["report"],
        ],
        successFeedback:
          "Good. Normalize first, reject unusable empty data, enforce scope, and only then report the decision.",
        hints: [
          "The empty check must happen before searching the allowlist.",
          "Reporting is the last operation.",
        ],
      },
      {
        title: "Write the validation decision",
        prompt:
          "Write only the if/elif/else decision that marks empty input invalid, allowlisted input authorized, and everything else outside the allowlist.",
        responseType: "code" as const,
        requiredIdeas: [
          ["if not normalized_target:"],
          ["in allowed_targets"],
          ["else:"],
        ],
        successFeedback:
          "Correct. The branches keep data validity and authorization membership as separate decisions.",
        hints: [
          "Check empty input first.",
          "The second branch needs Python's membership operator.",
        ],
      },
    ];
  const importantWords = topic
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((word) => word.length > 4)
    .slice(0, 2);
  return [
    {
      title: "Identify the practical problem",
      prompt: `In your own words, describe the operator problem that ${topic.toLowerCase()} solves and name the input and expected output.`,
      responseType: "explanation" as const,
      requiredIdeas: [
        [importantWords[0] || "input"],
        ["input"],
        ["output", "result"],
      ],
      successFeedback: `Good. You connected ${topic.toLowerCase()} to an observable input and result instead of treating it as isolated syntax.`,
      hints: [
        "Start with what the operator receives.",
        "End with what another component or reviewer can observe.",
      ],
    },
    {
      title: "Explain the notion",
      prompt: `Explain ${topic.toLowerCase()} in plain language without describing code line by line. Include one rule that controls its behavior.`,
      responseType: "explanation" as const,
      requiredIdeas: [
        [importantWords[0] || "rule"],
        ["rule", "because", "when", "only"],
      ],
      successFeedback:
        "Correct. Your explanation states both the notion and a rule that determines when or how it should be applied.",
      hints: [
        "Use a short definition first.",
        "Then explain one condition, boundary, or decision.",
      ],
    },
    {
      title: "Predict a failure",
      prompt: `Name one realistic invalid, boundary, or failure case for ${topic.toLowerCase()} and explain the safe result the tool should return.`,
      responseType: "explanation" as const,
      requiredIdeas: [
        ["invalid", "boundary", "error", "failure", "timeout"],
        ["safe", "reject", "message", "result", "stop"],
      ],
      successFeedback:
        "Good. Treating failure as expected data makes the later project safer and easier to debug.",
      hints: [
        "Choose malformed input or an unavailable local dependency.",
        "The tool should fail clearly without a destructive side effect.",
      ],
    },
    {
      title: "State the trust boundary",
      prompt: `Before implementing ${topic.toLowerCase()}, state which inputs are untrusted and how the result will preserve validation and evidence quality.`,
      responseType: "explanation" as const,
      requiredIdeas: [
        ["untrusted", "validate", "local", "fixture", "mock"],
        ["evidence", "log", "record", "redact"],
      ],
      successFeedback:
        "Correct. The implementation now has an explicit execution boundary and an evidence requirement before code is written.",
      hints: [
        "Use local fixtures or mock adapters until controlled integration is taught.",
        "Mention what the report records or redacts.",
      ],
    },
  ];
}

function lessonOverviewFor(topic: string, week: number, day: number) {
  const specific: Record<string, Array<[string, string]>> = {
    "1-1": [
      [
        "Value",
        "A piece of data used by Python, such as text, a whole number, or a True or False decision.",
      ],
      [
        "Variable",
        "A descriptive name that refers to a value so the program can read, reuse, or replace it later.",
      ],
      [
        "Assignment",
        "The equals sign operation that binds the name on its left to the value produced on its right.",
      ],
      [
        "Data type",
        "The category that determines what a value represents and which operations Python can perform on it.",
      ],
      [
        "String, integer, and Boolean",
        "The three types used in this lesson: text, whole numbers, and True or False states.",
      ],
      [
        "Formatted output",
        "Using print and f-strings to combine labels and values into a readable operator report.",
      ],
      [
        "Conversion and ValueError",
        "Converting numeric text with int and safely handling text that cannot represent a whole number.",
      ],
    ],
    "1-2": [
      [
        "Working directory",
        "The folder where the shell currently interprets relative paths and starts file operations.",
      ],
      [
        "Path",
        "A description of a file or directory location; relative paths begin from the current working directory.",
      ],
      [
        "Shell variable",
        "A name that stores text such as a workspace or report path for reuse by later commands.",
      ],
      [
        "Quoting",
        "Keeping a value containing spaces together as one argument and preventing unintended shell interpretation.",
      ],
      [
        "Directory creation",
        "Using mkdir deliberately and safely, including repeatable creation and the end-of-options marker.",
      ],
      [
        "Redirection",
        "Sending command output to a file with overwrite or append behavior instead of only displaying it.",
      ],
      [
        "Predictable output",
        "Using printf and explicit newline escapes to create reports with controlled formatting.",
      ],
    ],
    "1-3": [
      [
        "Raw input",
        "The original value supplied by a user or file before the program changes or evaluates it.",
      ],
      [
        "Normalization",
        "Transforming equivalent input into one consistent representation, such as trimming spaces and using lowercase.",
      ],
      [
        "Validation",
        "Checking whether normalized data satisfies the program's format, safety, and business rules.",
      ],
      [
        "Truthiness",
        "Python's rule that treats a non-empty string as true and an empty string as false in a condition.",
      ],
      [
        "Set and membership",
        "A collection of unique allowed values and the in operator used to test whether a value belongs to it.",
      ],
      [
        "Allowlist",
        "An explicit collection of authorized targets; valid formatting alone never establishes permission.",
      ],
      [
        "Structured result",
        "A dictionary that labels the original input, normalized value, and decision for later reporting.",
      ],
    ],
    "1-4": [
      [
        "Repository",
        "A project directory whose changes and saved history are managed by Git.",
      ],
      [
        "Working tree",
        "The files currently present in the project, including edits that have not been selected or committed.",
      ],
      [
        "Staging area",
        "The reviewed set of changes selected for the next commit; staging is not the same as committing.",
      ],
      [
        "Commit",
        "A named, timestamped checkpoint containing the staged snapshot and a link to earlier history.",
      ],
      [
        "Status and diff",
        "Commands used to discover file states and inspect exact changes before they become history.",
      ],
      [
        "Untracked and ignored",
        "Untracked files are unknown to Git; ignored files match deliberate rules that keep them local.",
      ],
      [
        ".gitignore",
        "A tracked rules file that prevents selected untracked artifacts from appearing in normal Git workflows.",
      ],
      [
        "History",
        "The ordered sequence of commits, inspected with git log to verify what was recorded and why.",
      ],
    ],
  };
  const concepts = specific[`${week}-${day}`] ?? [
    [
      topic,
      `The central notion for this lesson and the specific behavior you will explain, implement, and verify independently.`,
    ],
    [
      "Input",
      `The local value, fixture, command state, or authorized observation that ${topic.toLowerCase()} receives.`,
    ],
    [
      "Transformation or decision",
      "The rule-driven operation that converts the input or decides which safe path the program should follow.",
    ],
    [
      "Output",
      "The observable result returned to the operator, another component, a test, or a structured evidence record.",
    ],
    [
      "Normal, boundary, and failure cases",
      "Three perspectives used to prove the implementation works, handles limits, and fails clearly.",
    ],
    [
      "Authorization boundary",
      "The explicit local fixture, owned system, or written scope that limits where security-related work may run.",
    ],
    [
      "Evidence",
      "The redacted and reproducible record of inputs, decisions, outputs, errors, and relevant timestamps.",
    ],
  ];
  return {
    introduction: `This lesson introduces ${topic.toLowerCase()} before asking you to write commands or code. First build a mental model of the vocabulary and data flow below. You will then see the notion in a realistic authorized-lab situation, explain it in your own words, complete small guided checks, and finally build a project from a blank editor.`,
    concepts: concepts.map(([name, explanation]) => ({ name, explanation })),
  };
}

const dayOneContent = {
  title: "Values and variables: data types, strings, input, and output",
  summary:
    "Start with a realistic authorized-lab target, learn how Python stores strings, integers, and Boolean values, then build and debug a small target report that validates a port without crashing.",
  learningObjectives: [
    "Explain how a Python variable gives a value a meaningful name",
    "Create and identify string, integer, and Boolean values",
    "Display mixed values with print and format a readable report with f-strings",
    "Inspect types and convert numeric text into an integer",
    "Recognize a ValueError and handle invalid input with try and except",
    "Build and debug a small report for an explicitly authorized lab target",
  ],
  keyVocabulary: [
    {
      term: "value",
      definition:
        "A piece of data used by a program, such as text, a whole number, or True and False.",
    },
    {
      term: "variable",
      definition:
        "A meaningful name that refers to a value so the program can use it again.",
    },
    {
      term: "assignment",
      definition:
        "The equals sign operation that associates a variable name with a value.",
    },
    {
      term: "type",
      definition:
        "The category of a value, including str for text, int for whole numbers, and bool for True or False.",
    },
    {
      term: "f-string",
      definition:
        "A string prefixed with f that inserts values from expressions written inside braces.",
    },
    {
      term: "ValueError",
      definition:
        "An exception raised when a value has the correct general kind but cannot be converted as requested.",
    },
  ],
  conceptSections: [
    {
      heading: "A realistic authorized-target record",
      content:
        "A security automation tool needs clear names for the facts it handles. In this example, target_name and ip_address hold text, port holds a whole number, and is_authorized records a yes-or-no safety decision. The equals sign assigns the value on its right to the name on its left. Quotation marks create strings; 8080 without quotation marks is an integer; True is a Boolean keyword. These types are not decoration: they determine which operations Python can perform and help prevent a tool from confusing a label with a number.",
    },
    {
      heading: "Readable output with print and f-strings",
      content:
        'The print function displays values. Comma-separated arguments work, but print inserts spaces between them. An f-string gives precise control: prefix the quoted text with f and place a variable inside braces, such as f"Target {target_name}". Adjacent f-strings inside parentheses form one string, which keeps a long report readable. The escape sequence \\n starts a new output line. Every opening quote, parenthesis, and brace must have a matching closing character.',
    },
    {
      heading: "Types, conversion, and failure",
      content:
        'The type function reveals a value\'s category. The text "8080" is a str even though it contains digits, so arithmetic requires conversion with int(port_text). Valid numeric text becomes an integer; non-numeric text such as "HTTPS" raises ValueError. This is expected input behavior, not evidence that Python is broken. A reliable tool anticipates malformed operator input and reports exactly what needs correction.',
    },
    {
      heading: "Recover safely with try and except",
      content:
        "Place the conversion inside a try block and catch ValueError with a matching except block. If conversion succeeds, Python prints the report and skips the handler. If it fails, Python jumps to except ValueError and displays a useful message instead of terminating unexpectedly. The try and except keywords align at the far left, while the statements inside each block use four spaces. Catching the specific expected exception keeps unrelated programming defects visible.",
    },
  ],
  guidedExamples: [
    {
      title: "Describe an authorized practice server",
      explanation:
        "This realistic starting point stores four facts using three Python types, then produces a readable report. Change only fictional or explicitly authorized local-lab details.",
      code: `target_name = "lab-server"\nip_address = "192.0.2.20"\nport = 8080\nis_authorized = True\n\nprint(\n    f"Target {target_name} is available at "\n    f"{ip_address}:{port}. Authorized: {is_authorized}"\n)`,
    },
  ],
  practiceExercises: [
    {
      title: "Build an authorized-target report",
      instructions:
        "Starting from a blank editor, create meaningful target variables using string and Boolean values, convert the numeric port text, print a formatted three-line report, inspect the four resulting types, and demonstrate that invalid HTTPS port text is handled without crashing.",
      successCriteria:
        "The output matches the expected report and type summary, the invalid case is handled, and the submitted code demonstrates every learning objective listed in Project coverage.",
      expectedOutput:
        "Target: practice-server\nAddress: 192.0.2.50:8443\nAuthorized: True\nTypes: str, str, int, bool\nInvalid port: HTTPS must be a whole number.",
      validationMode: "exact" as const,
      requiredCodeSnippets: [
        "target_name",
        "ip_address",
        "port_text",
        "is_authorized",
        "int(",
        "type(",
        "try:",
        "except ValueError:",
        "<f-string>",
      ],
      hints: [
        "Decide which four facts are text, which value becomes a whole number, and which value represents yes or no.",
        "Build and test the successful report first; then add type inspection before testing malformed port text.",
        "Place the risky conversion in an error-handling block, keep its handler aligned, and use four-space indentation inside both blocks.",
      ],
    },
    {
      title: "Predict, break, and repair",
      instructions:
        'Before each run, predict the types and output. Deliberately try port_text = "HTTPS", observe why conversion fails, and repair the program without deleting input validation.',
      successCriteria:
        "Your notes correctly identify str, str, int, and bool and explain that non-numeric text cannot be converted to int.",
      expectedOutput: "Invalid port: HTTPS must be a whole number.",
      validationMode: "exact" as const,
      requiredCodeSnippets: ["int(", "try:", "except ValueError:"],
      hints: [
        "Use type(value) to inspect a category.",
        "A quoted sequence of digits remains a string until int converts it.",
      ],
    },
  ],
  lab: {
    environment: "local-interpreter",
    authorizationNotice:
      "Use only fictional documentation addresses, your own local VM, or another target for which you have explicit written authorization. This exercise makes no network connection.",
    objective:
      "Build a resilient report describing one explicitly authorized practice target.",
    instructions: [
      "Run the realistic example and match each variable to its value and type.",
      "Build the report with practice-server, 192.0.2.50, the text 8443, and True.",
      "Convert the port in a try block and print the name, address with port, and authorization state.",
      "Replace 8443 with HTTPS and confirm that except ValueError produces a useful message.",
    ],
    expectedOutcome:
      "A readable authorized-target report for valid input and a controlled error message for invalid port text.",
    cleanup: [
      "Keep only the Python source and redacted output; no live target data or credentials are required.",
    ],
  },
  deliverable: {
    description:
      "A documented Python authorized-target report with a normal case and a handled failure case.",
    acceptanceCriteria: [
      "The program uses descriptive variables with appropriate string, integer, and Boolean values",
      "The valid report includes practice-server and 192.0.2.50:8443",
      "Invalid port text is handled with except ValueError rather than an unhandled crash",
    ],
  },
  project: {
    name: "Authorized-target report",
    increment:
      "Store typed target details, validate the port, and produce a readable report without contacting a network.",
    milestone:
      "A working beginner Python script with both a successful path and a handled invalid-input path.",
  },
  commonMistakes: [
    "Writing expect instead of the Python keyword except",
    "Starting an f-string with f: instead of placing f immediately before the quote",
    "Adding unexpected indentation before a top-level try or except line",
    "Forgetting to include the converted port after the IP address",
  ],
  troubleshooting: [
    "Check matching quotes, parentheses, and braces, then confirm that try and except align and their contents use four spaces.",
    "If int fails, print or inspect port_text and confirm that it contains only a valid whole-number representation.",
  ],
  completionChecklist: [
    "I can explain values, variables, assignment, and the three types used",
    "I can write and run an f-string report without copying",
    "I can convert numeric text with int and predict a ValueError",
    "I can align and indent a try and except block correctly",
    "I tested both the valid 8443 case and invalid HTTPS case",
    "I kept the example restricted to fictional or authorized lab data",
  ],
};

const weekThreeDayOneCheckpointContent = {
  summary:
    "Resume the existing loop lesson at bounded range practice, then learn while-loop state changes, explicit termination, infinite-loop prevention, loop selection, and boundary tests before entering the MarketingOps bridge.",
  learningObjectives: [
    "Explain the exclusive stop value in range and predict bounded sequences",
    "Use while loops whose state changes make termination demonstrable",
    "Choose for for known iterables and while for condition-controlled repetition",
    "Test zero, one, boundary, and termination behavior without an infinite run",
  ],
  guidedExamples: [
    {
      title: "Resume: bounded retry numbers",
      explanation:
        "Predict every printed value before running. The next coaching question is why max_attempts + 1 is the stopping value; do not move to while until the student explains it.",
      code: `max_attempts = 3\n\nfor attempt in range(1, max_attempts + 1):\n    print(f"Attempt {attempt} of {max_attempts}")`,
    },
  ],
  practiceExercises: [
    {
      title: "Complete bounded range practice",
      instructions:
        "First explain why max_attempts + 1 is used. Predict and run zero-, one-, and three-attempt ranges, then describe the exclusive stopping boundary in your own words.",
      successCriteria:
        "The predictions match the observed sequence and the explanation correctly connects the exclusive stop to printing max_attempts.",
      expectedOutput:
        "Attempt 1 of 3\nAttempt 2 of 3\nAttempt 3 of 3",
      validationMode: "exact" as const,
      requiredCodeSnippets: ["range(", "max_attempts + 1"],
      hints: [
        "Write the start and stop values beside the sequence before running it.",
        "The stop argument itself is not produced.",
        "To include max_attempts, which integer must be the excluded stop?",
      ],
    },
    {
      title: "Prove while-loop termination",
      instructions:
        "After range practice is complete, write a condition-controlled loop with explicit initial state, a state change on every continuing path, and a bound. Test zero iterations, one iteration, normal termination, and the chosen upper boundary.",
      successCriteria:
        "The student can trace every state change, explain why the condition becomes false, choose between for and while, and run termination tests without hanging.",
      expectedOutput:
        "A finite trace whose final state makes the while condition false.",
      validationMode: "exit-code" as const,
      requiredCodeSnippets: ["while ", "assert"],
      hints: [
        "Name the state before the loop and the condition that permits another iteration.",
        "Mark every path through the body that must update state or terminate.",
        "Add a hard maximum and a test that would reveal a missing update.",
      ],
    },
  ],
  completionChecklist: [
    "I explained the exclusive range stop without notes",
    "I predicted and checked zero, one, and normal bounded sequences",
    "I wrote and traced a while loop with explicit state changes",
    "I proved termination and identified an infinite-loop failure",
    "I can choose for versus while and explain why",
    "I tested loop boundaries and termination",
  ],
  checkpoint: {
    current: "range()",
    completedSteps: [
      "Lists",
      "Sets vs lists",
      "for loops",
      "Accumulator filtering",
      "continue",
    ],
    remainingSteps: [
      "while loops",
      "State updates",
      "Termination conditions",
      "Infinite-loop prevention",
      "for vs while",
      "Boundary and termination tests",
    ],
  },
};

export function createCurriculum(): Lesson[] {
  const records: Lesson[] = [];
  for (let week = 1; week <= 36; week++) {
    const phase = phases.find(
      (item) => week >= item.range[0] && week <= item.range[1],
    )!;
    for (let day = 1; day <= 7; day++) {
      const topic =
        day === 7
          ? `Week ${week} retrieval practice and recovery`
          : weeklyTopics[week - 1][day - 1];
      const required = day !== 7;
      const lessonNumber = (week - 1) * 7 + day;
      const previous =
        lessonNumber > 1
          ? [
              `week-${String(Math.ceil((lessonNumber - 1) / 7)).padStart(2, "0")}-day-${String(((lessonNumber - 2) % 7) + 1).padStart(2, "0")}`,
            ]
          : [];
      const safety =
        "Use local fixtures and mock connectors until a lesson explicitly introduces a controlled integration. Never put credentials or customer data in source, prompts, logs, fixtures, or commits.";
      const projectBrief = realisticProject(week, day, topic);
      const lesson = {
        id: `week-${String(week).padStart(2, "0")}-day-${String(day).padStart(2, "0")}`,
        week,
        day,
        phase: phase.name,
        phaseNumber: phase.number,
        track: tracks[day - 1],
        title: topic,
        summary: required
          ? `Learn ${topic.toLowerCase()} through explanation, deliberate practice, and a safe project increment. This lesson connects week ${week}'s ${phase.theme.toLowerCase()} to evidence you can explain, test, and improve.`
          : `Pause new work, retrieve the six ideas from week ${week} without notes, correct weak explanations, and prepare a realistic catch-up plan.`,
        difficulty:
          week <= 8
            ? ("Beginner" as const)
            : week <= 24
              ? ("Intermediate" as const)
              : ("Advanced" as const),
        estimatedMinutes: required ? 90 : 0,
        required,
        prerequisiteLessonIds: previous,
        learningObjectives: [
          `Explain ${topic.toLowerCase()} in plain language`,
          `Implement a small ${tracks[day - 1].toLowerCase()} example without copying`,
          `Test normal, boundary, and failure behavior`,
          `Explain what this unlocks in MarketingOps AI`,
        ],
        keyVocabulary: [
          {
            term: "trust boundary",
            definition:
              "The point where input, model output, or an external response must be treated as untrusted and validated.",
          },
          {
            term: "evidence",
            definition:
              "Reproducible observations that support a technical conclusion without exposing secrets.",
          },
          {
            term: topic.split(/[ ,]/)[0],
            definition: `The central idea for this lesson: ${topic.toLowerCase()}, applied with clear inputs and observable results.`,
          },
        ],
        conceptSections: [
          ...actualLessonSections(week, day, topic),
          ...(specializedConcept(topic, week, day)
            ? [
                {
                  heading:
                    week >= 20
                      ? "What this unlocks in MarketingOps AI"
                      : "Build the deterministic component",
                  content: specializedConcept(topic, week, day)!,
                },
              ]
            : []),
        ],
        notionExplanation: notionExplanation(topic, week, day, required),
        guidedPractice: guidedPracticeFor(topic, week, day),
        lessonOverview: lessonOverviewFor(topic, week, day),
        officialResources: required ? sourceFor(week, day, topic) : [],
        guidedExamples: [
          {
            title: `Trace a ${topic} example`,
            explanation:
              "Read the input, predict the transformation, run it locally, and compare the observed result with the prediction.",
            code: guidedCode(topic, week, day),
          },
        ],
        practiceExercises: [
          {
            title: "Explain before running",
            instructions: `Starting from a blank editor, build the smallest working ${topic} project that demonstrates every item in Project coverage. Explain its inputs and outputs, include a normal result and a controlled failure path, then run it against local fixtures.`,
            successCriteria:
              "The student-written solution demonstrates every listed objective, names its input and output, handles one failure case, and completes successfully against local fixtures.",
            expectedOutput: projectBrief.expectedOutput,
            validationMode: "exit-code" as const,
            requiredCodeSnippets: [],
          },
          {
            title: "Break and repair",
            instructions:
              "Introduce one realistic input or syntax error, capture the failure, repair it, and record why the fix works.",
            successCriteria:
              "The corrected version handles both the normal case and the deliberately broken case.",
            expectedOutput:
              "The repaired program exits with code 0 after handling the deliberately introduced failure.",
            validationMode: "exit-code" as const,
            requiredCodeSnippets: [],
          },
        ],
        lab: {
          environment: "local-vm",
          authorizationNotice: safety,
          objective: projectBrief.objective,
          instructions: projectBrief.instructions,
          expectedOutcome: projectBrief.expectedOutcome,
          cleanup: [
            "Stop local services, remove temporary secrets, and keep only redacted fixtures and reports.",
          ],
        },
        deliverable: {
          description: projectBrief.deliverable,
          acceptanceCriteria: projectBrief.criteria,
        },
        knowledgeCheck: [
          {
            id: "mental-model",
            prompt: `What is the strongest evidence that you understand ${topic}?`,
            options: [
              "You can explain, implement, test, and debug it",
              "You watched a video",
              "You copied a working answer",
            ],
            answer: 0,
            explanation:
              "Transferable skill combines explanation, independent implementation, tests, and debugging.",
          },
          {
            id: "execution-boundary",
            prompt:
              "What may execute an external marketing action?",
            options: [
              "A deterministic adapter after validation, policy, and any required approval",
              "Raw model output",
              "Text retrieved by a research agent",
            ],
            answer: 0,
            explanation:
              "AI proposes; deterministic code and policy control execution, with human approval for higher-risk actions.",
          },
        ],
        stretchChallenge: `Rebuild the ${topic.toLowerCase()} exercise without notes, then add one safe failure mode and explain when this technique should not be used.`,
        commonMistakes: [
          "Copying before predicting the output",
          "Treating formatted terminal text as reliable structured data",
          "Skipping malformed, denied, timeout, or boundary cases",
        ],
        troubleshooting: [
          "Reduce the exercise to one input and one operation, then inspect each intermediate value.",
          "Confirm the shell, Python version, working directory, and fixture path before changing the design.",
        ],
        defensiveConnection: `Understanding ${topic.toLowerCase()} unlocks a testable part of MarketingOps AI while keeping arithmetic, policy, and side effects deterministic.`,
        mitigationNotes:
          "Record inputs, expected behavior, observed behavior, policy decisions, and a deterministic regression test without exposing secrets or customer data.",
        completionChecklist: [
          "I can explain the concept without notes",
          "I implemented it without copying",
          "I tested normal, boundary, and failure cases",
          "I recorded the trust boundary and redacted evidence",
          "I committed the project increment",
        ],
        tags: [
          phase.name.toLowerCase().replaceAll(" ", "-"),
          tracks[day - 1].toLowerCase().replaceAll(" ", "-"),
          `week-${week}`,
        ],
        project: {
          name: projectBrief.name,
          increment: projectBrief.increment,
          milestone:
            week % 4 === 0
              ? `${projectBrief.milestone} Complete the phase review, remediation exercise, reflection, and portfolio checkpoint.`
              : projectBrief.milestone,
        },
        sourceBasis: sourceBasis(week, day, topic),
        ...(week === 1 && day === 1 ? dayOneContent : {}),
        ...(week === 3 && day === 1
          ? weekThreeDayOneCheckpointContent
          : {}),
      };
      records.push(lessonSchema.parse(lesson));
    }
  }
  return records;
}

export const curriculum = createCurriculum();
export const curriculumById = new Map(
  curriculum.map((lesson) => [lesson.id, lesson]),
);

export type ContentReadiness = "Draft" | "Authored (partial)" | "Validated";

/** Readiness of authored course material, independent of learner progress. */
export function contentReadiness(lesson: Lesson): ContentReadiness {
  if (lesson.week <= 2) return "Validated";
  if (lesson.week === 3) return "Authored (partial)";
  return "Draft";
}

export function validateCurriculum(records = curriculum) {
  const parsed = z.array(lessonSchema).length(252).parse(records);
  const ids = new Set(parsed.map((lesson) => lesson.id));
  if (ids.size !== 252) throw new Error("Lesson IDs must be unique");
  for (let week = 1; week <= 36; week++) {
    const days = parsed.filter((lesson) => lesson.week === week);
    if (
      days.filter((lesson) => lesson.required).length !== 6 ||
      days.filter((lesson) => !lesson.required).length !== 1
    )
      throw new Error(`Week ${week} has an invalid rhythm`);
  }
  parsed
    .flatMap((lesson) => lesson.prerequisiteLessonIds)
    .forEach((id) => {
      if (!ids.has(id)) throw new Error(`Unknown prerequisite ${id}`);
    });
  return parsed;
}
