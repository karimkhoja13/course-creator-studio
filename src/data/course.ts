import type { CourseManifest } from '../types/course'

export const course: CourseManifest = {
  id: 1,
  title: "Building Autonomous Agents: From Chains to Loops",
  description:
    "Master the transition from linear LLM chains to cyclical, stateful agents capable of reasoning, tool use, and self-correction.",
  repository: {
    repoUrl: "https://github.com/fluidcast-io/course-agent-patterns",
    branch: "main",
    devContainerConfigUrl: ".devcontainer/devcontainer.json",
  },
  initialCodeState: `Empty uv project with:
- pyproject.toml (uv-generated, basic Python project config)
- Empty src/ directory structure
- .gitignore for Python projects
- No Python files exist yet

The student will create all application code from scratch, starting with the agent state definition.`,
  speakers: [
    {
      id: 1,
      name: "Sarah",
      personality: `Senior Staff Engineer and primary instructor. Patient and highly experienced, focuses on system design, trade-offs, and the "why" behind decisions.

Role: Primary instructor who answers all user questions and leads explanations.

Teaching Style: Uses metaphors effectively (like "relay race vs conversation" for chains vs agents). Explains concepts before showing code. Encourages best practices without being dogmatic.

Q&A Behavior: Always takes the lead when answering user questions. Gives direct, clear explanations grounded in code examples. Patient with confusion, concise with simple questions.

Tone: Warm but professional. Encouraging without being condescending.`,
    },
    {
      id: 2,
      name: "Alex",
      personality: `Junior developer learning alongside the user. Sharp but inexperienced, asks the questions the user might be thinking.

Role: Secondary speaker who represents the learner's perspective. Does NOT answer user questions - defers to Sarah.

Teaching Style: Learns by asking clarifying questions. Often interrupts with "Wait, why didn't we just..." or "So you're saying..." to voice common misconceptions.

Q&A Behavior: When the user asks a question, Alex might echo curiosity ("Oh, I was wondering that too!") but always lets Sarah provide the actual answer.

Tone: Enthusiastic and curious. Occasionally makes mistakes that Sarah gently corrects.`,
    },
  ],
  northStar: {
    transformationDescription:
      "Point A: The student can write a linear specific prompt (Chain). Point B: The student can architect a state machine where the LLM decides the control flow (Agent).",
    targetAudience:
      "Mid-level Python developers who have used the OpenAI API but struggle to make it do complex, multi-step tasks reliably.",
    prerequisites:
      "Python 3.10+, Basic understanding of REST APIs, OpenAI API Key.",
    gapAndFriction:
      "Most tutorials show 'toy' agents that hallucinate or get stuck in loops. This course addresses the specific friction of 'State Management' and 'Tool Divergence' that breaks production agents.",
    capstoneProject: {
      title: "The 'Deep Research' Assistant",
      description:
        "A CLI-based agent that accepts a vague topic (e.g., 'Future of batteries'), browses the web, summarizes 3 distinct sources, and writes a cited markdown report to disk.",
    },
  },
  chapters: [
    {
      id: 101,
      title: "The Loop: Breaking Linearity",
      sequenceOrder: 1,
      learningObjective:
        "Understand why linear chains fail for dynamic tasks and how to implement a basic `User -> Agent -> Tool -> Agent` loop.",
      endCodeState: `By the end of this chapter, the codebase contains:

1. **src/legacy/linear_chain.py** - A simple chain implementation that demonstrates the limitations of linear execution. Contains a simple_chain function with hardcoded steps.

2. **src/agent_state.py** - A new file with an AgentState TypedDict class containing a 'messages' key that holds a list of BaseMessage objects. This is the "baton" that gets passed around the agent loop to maintain conversation history.`,
      units: [
        {
          id: 1001,
          title: "The Problem with Chains",
          directive: `
- Open \`src/legacy/linear_chain.py\` and highlight the \`simple_chain\` function
- Explain how chains work for single-step questions ("What is the capital of France?")
- Walk through the hardcoded execution sequence in \`simple_chain\` - show how each step is predetermined
- Demonstrate why chains fail for multi-step questions ("What is the capital of France and what is its population?")
- Use the "relay race" metaphor: chains are like a relay race with fixed handoffs - the route is predetermined regardless of what happens
- Contrast with "conversation" metaphor: agents are like a conversation - dynamic back-and-forth based on context
- Key insight: in a chain, the engineer hardcodes the flow; in an agent, the AI chooses the next step
          `.trim(),
          realizationPoints: [
            {
              concept: "Understanding why linear chains fail for dynamic tasks",
              suggestedApproach:
                "Ask the student to explain what happens when a multi-step question is asked in a chain",
              hints: [
                "Think about whether the chain can adapt its steps based on the question",
                "Consider what happens if the LLM needs information from a previous step",
              ],
            },
          ],
          attachments: [
            {
              type: "CODE_REF",
              id: 501,
              filePath: "src/legacy/linear_chain.py",
              commitHash: "a1b2c3d4",
              note: "Focus on the hardcoded execution sequence in the main function.",
            },
          ],
          endCodeState:
            "The student has examined src/legacy/linear_chain.py which contains a simple_chain function with hardcoded execution steps. No code changes made - this unit is about understanding existing limitations.",
        },
        {
          id: 1002,
          title: "Defining the State",
          directive: `
- Transition from the chain example: "Now let's build something better - but first, we need a way to remember"
- Create new file \`src/agent_state.py\`
- Explain the need for persistent memory that survives between LLM calls - without it, each call is isolated
- Write a \`TypedDict\` class named \`AgentState\` with:
  - Import \`BaseMessage\` from \`langchain_core.messages\`
  - Import \`TypedDict\` from \`typing\`
  - Single key \`messages\` typed as \`list[BaseMessage]\`
- Use the "baton" metaphor: this object is like a baton in a relay race - it accumulates conversation history and tool outputs as it passes through each node
- Emphasize: the state is the agent's memory - everything the agent knows is in this object
          `.trim(),
          realizationPoints: [
            {
              concept:
                "Understanding the role of state in breaking linear chains",
              suggestedApproach:
                "Ask why we need state that persists between LLM calls",
              hints: [
                "Think about what happens to variables after a function returns",
                "Consider how the LLM can 'remember' previous interactions",
              ],
            },
          ],
          attachments: [
            {
              type: "CODE_REF",
              id: 502,
              filePath: "src/agent_state.py",
              note: "The TypedDict definition should be at the top of the file.",
            },
            {
              type: "DOC_REF",
              id: 503,
              note: "Reference the 'State Schema' diagram on page 2.",
            },
          ],
          endCodeState: `Created \`src/agent_state.py\` with:
- Import \`TypedDict\` from \`typing\`
- Import \`BaseMessage\` from \`langchain_core.messages\`
- Class \`AgentState(TypedDict)\` with single key \`messages: list[BaseMessage]\`

This state object will be the "baton" passed through the agent loop, accumulating conversation history.`,
        },
      ],
      fluidDefense: [
        {
          id: 901,
          type: "MCQ",
          question:
            "Why do we need a cyclical graph instead of a DAG (Directed Acyclic Graph) for this agent?",
          progressiveHints: [
            "Think about a search task. Does the agent always find the answer on the first try?",
            "If the agent searches and fails, what should it do next? Stop or try again?",
          ],
          options: [
            "Because graphs are faster than chains.",
            "Because we don't know in advance how many steps the agent needs to take to solve the problem.",
            "Because Python's recursion limit is too low.",
          ],
          correctOptionIndex: 1,
          followUpQuestion:
            "Exactly. Since we don't know the step count, we must define an exit condition. What happens if we don't?",
        },
      ],
    },
    {
      id: 102,
      title: "Tools & Interfaces",
      sequenceOrder: 2,
      learningObjective:
        "Learn how to define Python functions as tools and bind them to the LLM so it knows *how* and *when* to call them.",
      endCodeState: `Building on Chapter 1, the codebase now includes:

1. **src/agent_state.py** - (from Chapter 1) AgentState TypedDict with messages list.

2. **src/tools/search.py** - A new file with a mock_search function decorated with @tool. The function has a descriptive docstring that tells the LLM when to use it, and uses Pydantic for argument validation.

3. **src/agent.py** - Initializes ChatOpenAI and binds tools using the .bind_tools() method. The tools are now "known" to the model but not yet executed.`,
      units: [
        {
          id: 1003,
          title: "Defining Tools",
          directive: `
- Transition: "Now that we have state, let's give our agent something to do - a tool"
- Create new file \`src/tools/search.py\`
- Write a \`mock_search\` function with:
  - Import \`@tool\` decorator from \`langchain_core.tools\`
  - Function signature: \`mock_search(query: str) -> str\`
  - Docstring: "Search the web for information about a topic. Use this when you need to find current information."
  - Return a mock response string
- Key insight: the docstring is NOT just for humans - it's a "job description" that tells the LLM when to use this tool
- Use "job posting" metaphor: the docstring is like a job posting - it describes what the tool does and when to use it
- Common mistake: forgetting the docstring means the model won't know when to call this tool
          `.trim(),
          realizationPoints: [
            {
              concept:
                "Understanding the dual purpose of docstrings in tool definitions",
              suggestedApproach:
                "Ask what role the docstring plays in the @tool decorator",
              hints: [
                "Think about what information the LLM needs to decide when to use a tool",
                "Consider how the LLM 'sees' the available tools",
              ],
            },
          ],
          attachments: [
            {
              type: "CODE_REF",
              id: 504,
              filePath: "src/tools/search.py",
              note: "The mock_search function definition.",
            },
          ],
          endCodeState: `Created \`src/tools/search.py\` with:
- Import \`@tool\` from \`langchain_core.tools\`
- Function \`mock_search(query: str) -> str\` decorated with \`@tool\`
- Docstring explaining the tool searches the web for information
- Returns a mock response string

This tool will be bound to the LLM in the next unit.`,
        },
        {
          id: 1004,
          title: "Binding Tools to the Model",
          directive: `
- Transition: "Now let's connect our tool to a model"
- Create new file \`src/agent.py\`
- Write the agent initialization:
  - Import \`ChatOpenAI\` from \`langchain_openai\`
  - Import \`mock_search\` from \`tools.search\`
  - Create \`llm = ChatOpenAI()\`
  - Call \`llm_with_tools = llm.bind_tools([mock_search])\`
- Key distinction: binding doesn't RUN tools - it makes the model AWARE of them
- Use "phone number" analogy: bind_tools is like giving someone your phone number - they know how to reach you, but haven't called yet
- Optional: show how to print \`llm_with_tools.kwargs\` to see the JSON schema the model receives
          `.trim(),
          realizationPoints: [
            {
              concept:
                "Understanding the difference between binding and executing tools",
              suggestedApproach:
                "Ask what happens when we call bind_tools() - does it execute the tool?",
              hints: [
                "Think about the two phases: making tools available vs. using them",
                "Consider what the LLM needs to know before it can decide to call a tool",
              ],
            },
          ],
          attachments: [
            {
              type: "CODE_REF",
              id: 505,
              filePath: "src/agent.py",
              note: "Look for the llm.bind_tools() call.",
            },
          ],
          endCodeState: `Created \`src/agent.py\` with:
- Import \`ChatOpenAI\` from \`langchain_openai\`
- Import \`mock_search\` from \`tools.search\`
- \`llm = ChatOpenAI()\` instance
- \`llm_with_tools = llm.bind_tools([mock_search])\`

The model now knows about the tool (has its JSON schema) but hasn't executed anything yet.`,
        },
      ],
      fluidDefense: [
        {
          id: 903,
          type: "CODING_CHALLENGE",
          question:
            "Create a new calculator tool that adds two integers and bind it to the existing model.",
          progressiveHints: [
            "Remember to use the @tool decorator.",
            "Ensure you type hint the arguments as int.",
          ],
          startState:
            "# Define your tool here\n\n# Bind it to the model\nmodel = ChatOpenAI()",
          solutionState:
            '@tool\ndef add(a: int, b: int) -> int:\n    """Adds a and b."""\n    return a + b\n\nmodel = ChatOpenAI().bind_tools([add])',
          successCriteria:
            "Must define a function with @tool, correct type hints, and bind it to the model.",
        },
      ],
    },
    {
      id: 103,
      title: "The Brain: Routing Logic",
      sequenceOrder: 3,
      learningObjective:
        "Implement the conditional logic that parses the LLM's response and decides whether to execute a tool or return the final answer to the user.",
      endCodeState: `Building on Chapters 1-2, the codebase now includes a complete agent:

1. **src/agent_state.py** - AgentState TypedDict with messages list.
2. **src/tools/search.py** - mock_search tool with @tool decorator.
3. **src/agent.py** - ChatOpenAI with tools bound.

4. **src/graph.py** - NEW: Contains the full graph implementation:
   - should_continue(state) function that checks if the last message has tool_calls
   - Returns 'tools' if tool calls exist, '__end__' otherwise
   - Graph nodes: 'agent' (calls LLM) and 'tools' (ToolNode)
   - Conditional edge from agent to should_continue
   - Critical back-edge from ToolNode to agent (creates the cycle)
   - Entry point set to 'agent', end condition on '__end__'`,
      units: [
        {
          id: 1005,
          title: "The Conditional Edge",
          directive: `
- Explain the "Conditional Edge" concept
- Contrast: standard graph (A always → B) vs agent (A → B *or* C based on state)
- Open \`src/graph.py\` and scaffold the \`should_continue\` function
- Show how to inspect the last message in \`state['messages']\`
- Implement logic: if message has \`tool_calls\`, return 'tools'; otherwise return '__end__'
          `.trim(),
          realizationPoints: [
            {
              concept: "Understanding conditional edges vs standard edges",
              suggestedApproach:
                "Ask how a conditional edge differs from a regular edge in a graph",
              hints: [
                "Think about what determines which path the execution takes",
                "Consider what information the edge needs to make its decision",
              ],
            },
          ],
          attachments: [
            {
              type: "CODE_REF",
              id: 506,
              filePath: "src/graph.py",
              note: "The should_continue function logic.",
            },
          ],
          endCodeState:
            "Created src/graph.py with a should_continue function. The function takes state as input, gets the last message from state['messages'], checks if it has tool_calls attribute, and returns 'tools' or '__end__' accordingly.",
        },
        {
          id: 1006,
          title: "Closing the Loop",
          directive: `
- Connect the nodes in the graph
- Draw edge from \`agent\` → \`should_continue\`
- Define conditional branches:
  - 'tools' → \`ToolNode\`
  - '__end__' → \`END\`
- **Critical:** Emphasize that \`ToolNode\` must have an edge pointing *back* to \`agent\` (this creates the cycle)
- Explain why the back-edge is essential for the agent to process tool results
          `.trim(),
          realizationPoints: [
            {
              concept:
                "Understanding why the cycle is necessary for agent operation",
              suggestedApproach:
                "Ask what would happen if ToolNode didn't have an edge back to agent",
              hints: [
                "Think about what happens after a tool executes",
                "Consider who needs to interpret the tool's output",
                "What happens if the agent never sees the tool result?",
              ],
            },
          ],
          attachments: [
            {
              type: "DOC_REF",
              id: 507,
              note: "Refer to the Cyclical Graph Architecture diagram on page 5.",
            },
          ],
          endCodeState:
            "Completed src/graph.py with full graph wiring: StateGraph(AgentState) initialized, 'agent' and 'tools' nodes added, conditional edge from agent using should_continue, and critically - an edge from 'tools' back to 'agent' creating the cycle. Graph compiled and ready to run.",
        },
      ],
      fluidDefense: [
        {
          id: 904,
          type: "OPEN_QUESTION",
          question:
            "Describe what happens if the 'ToolNode' does not have an edge pointing back to the 'agent'?",
          progressiveHints: [
            "Trace the execution flow after a tool is called.",
            "Who interprets the output of the tool?",
          ],
          evaluationCriteria: [
            "Mention that the execution would stop after the tool runs.",
            "Mention that the LLM never sees the result of the tool.",
            "Explain that the loop is broken.",
          ],
        },
      ],
    },
  ],
};
