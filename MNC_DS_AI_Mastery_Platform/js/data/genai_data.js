/* Generative AI Module Data */
const GENAI_DATA = {
  subject: "Generative AI",
  icon: "cpu",
  description: "Master Large Language Models (LLMs), RAG, Autonomous Agents, Embeddings, Vector Databases, LangChain, and production AI orchestration.",
  topics: [
    {
      id: "llm",
      title: "LLM (Large Language Models)",
      formula: `P(w_1, w_2, \\dots, w_T) = \\prod_{t=1}^T P(w_t \\mid w_1, w_2, \\dots, w_{t-1})`,
      subtopics: [
        {
          title: "Autoregressive Next-Token Prediction",
          theory: "LLMs output text token by token. At each step, the model computes Softmax probability distributions over its vocabulary, appending the predicted token to context for the next generation step."
        },
        {
          title: "KV (Key-Value) Cache Optimization",
          theory: "KV Cache stores Key and Value attention matrices of past tokens in GPU VRAM, preventing quadratic $O(N^2)$ recomputation and dropping step latency to $O(N)$."
        },
        {
          title: "Sampling Hyperparameters (Temperature, Top-P, Top-K)",
          theory: "Temperature scales logits before Softmax (lower = deterministic). Top-K restricts sampling to the K most probable tokens. Top-P (Nucleus) samples from tokens whose cumulative probability reaches P."
        },
        {
          title: "Model Quantization (GGUF, AWQ, GPTQ)",
          theory: "Quantization converts 16-bit floating-point weights down to 4-bit or 8-bit integers, reducing memory footprint by ~75% while preserving >95% model accuracy."
        }
      ],
      definition: "Large Language Models are deep learning Transformer models trained on vast corpora of text to understand, generate, and process human language autoregressively.",
      syntax: `import openai\nresponse = client.chat.completions.create(\n  model="gpt-4o",\n  messages=[{"role": "user", "content": "Explain KV Cache"}]\n)`,
      how_it_works: "LLMs predict the probability distribution of the next token given preceding tokens using stacked Transformer decoder blocks, Multi-Head Self-Attention, Positional Encodings (RoPE), and KV Cache optimization during decoding.",
      where_we_use: "Autonomous conversational AI, code generation, summarization, complex reasoning pipelines, document intelligence, and enterprise copilots.",
      interview_theory: "MNC Core Question: Explain KV (Key-Value) Cache in LLM inference. In autoregressive decoding, KV Cache stores past token keys and values in GPU VRAM to avoid recomputing self-attention matrices for pre-existing tokens.",
      example_code: `# Concept: Next-Token Decoding Probabilities Simulation
import numpy as np

vocab = ["Data", "Science", "Model", "AI"]
logits = np.array([2.1, 4.5, 1.2, 3.8])
# Softmax conversion to probabilities
exp_logits = np.exp(logits - np.max(logits))
probs = exp_logits / np.sum(exp_logits)

for word, prob in zip(vocab, probs):
    print(f"Token: '{word}' -> Probability: {prob * 100:.2f}%")`,
      quiz: [
        {
          question: "What is the primary function of KV (Key-Value) Caching during LLM text generation?",
          options: [
            "To cache prompt text on local hard drives",
            "To save computed Key and Value tensors of past tokens in VRAM to prevent quadratic recomputation during autoregressive generation",
            "To encrypt model weights",
            "To reduce context window size"
          ],
          correct: 1,
          explanation: "KV Cache stores Key and Value attention matrices for past tokens so only the newly generated token needs attention projection, dropping step latency from O(N^2) to O(N)."
        }
      ]
    },
    {
      id: "prompt_engineering",
      title: "Prompt Engineering",
      subtopics: [
        {
          title: "In-Context Learning (Zero-Shot & Few-Shot)",
          theory: "Zero-shot relies on pretrained model instructions. Few-shot includes 2-5 structured input-output example pairs in the prompt context to guide response style and task formatting."
        },
        {
          title: "Chain-of-Thought (CoT) & Tree-of-Thought (ToT)",
          theory: "CoT instructs LLMs to generate step-by-step intermediate reasoning tokens ('Let's think step by step'), giving the Transformer extra compute cycles before outputting final answers."
        },
        {
          title: "System Role Persona & Delimiter Guards",
          theory: "System prompts define strict operational boundaries, personas, and response rules. Delimiters (e.g. ```xml) separate system instructions from untrusted user inputs to prevent prompt injection."
        }
      ],
      definition: "Prompt Engineering is the discipline of structuring text inputs to effectively guide LLMs toward accurate, context-aware, and deterministic output generation.",
      syntax: `prompt = """You are a Principal Data Engineer.\nContext: {context}\nQuestion: {question}\nRespond strictly in valid JSON format."""`,
      how_it_works: "Prompts guide the LLM's attention heads across the context window. Advanced techniques include Zero-Shot, Few-Shot (In-Context Learning), Chain-of-Thought (CoT) reasoning, ReAct (Reasoning + Acting), and System Role Constraint.",
      where_we_use: "Reducing hallucinations, formatting API outputs, controlling response tone, extracting structured data (JSON/YAML), and complex multi-step problem solving.",
      interview_theory: "Interview Question: What is Chain-of-Thought (CoT) prompting and why does 'Let's think step by step' improve mathematical accuracy? (Forces the model to generate intermediate reasoning tokens, allocating more computation iterations before producing the final answer).",
      example_code: `system_prompt = "You are a Python linter. Return JSON with 'valid': bool, 'error': str."
user_prompt = "Code: def foo(): print('Hello'"

print("Structured Prompt Template Formatted:")
print(f"System: {system_prompt}\\nUser: {user_prompt}")`,
      quiz: [
        {
          question: "Why does Chain-of-Thought (CoT) prompting significantly boost LLM performance on complex mathematical tasks?",
          options: [
            "It trains a smaller model in the background",
            "Generating intermediate step-by-step tokens provides the Transformer with more compute steps to refine context representations before generating the final answer",
            "It increases model parameter weights",
            "It bypasses tokenization limits"
          ],
          correct: 1,
          explanation: "Since LLMs generate text token by token, forcing explicit step-by-step reasoning outputs extra context tokens that inform the subsequent calculation step."
        }
      ]
    },
    {
      id: "langchain",
      title: "LangChain",
      subtopics: [
        {
          title: "LangChain Expression Language (LCEL)",
          theory: "LCEL composes modular Runnable objects using pipe `|` operators into declarative execution graphs supporting async invocation, streaming, and automatic fallback handling."
        },
        {
          title: "Output Parsers & Structured Outputs",
          theory: "Parsers like `PydanticOutputParser` parse raw LLM completion text into validated Pydantic schemas, raising structured parsing errors if outputs violate schema contracts."
        },
        {
          title: "Memory Strategies (Buffer vs Summary)",
          theory: "`ConversationBufferMemory` preserves exact raw chat turn history. `ConversationSummaryMemory` uses an LLM to compress prior context into running summaries to manage context window limits."
        }
      ],
      definition: "LangChain is a framework for developing applications powered by language models through modular abstractions (Chains, LCEL, Agents, Memory, Document Loaders, and Output Parsers).",
      syntax: `from langchain_core.prompts import ChatPromptTemplate\nfrom langchain_openai import ChatOpenAI\nchain = prompt | model | StrOutputParser()\nres = chain.invoke({"input": "Explain RAG"})`,
      how_it_works: "LangChain Expression Language (LCEL) uses pipe `|` operators to construct declarative composition graphs that support parallel execution (`RunnableParallel`), streaming (`stream()`), and async fallbacks (`astream()`).",
      where_we_use: "Building complex RAG applications, conversational memory bots, tool-calling agents, document QA systems, and multi-model routing.",
      interview_theory: "MNC Focus: Explain LCEL architecture, parallel runnable invocation, and memory management strategies (`ConversationBufferMemory` vs `ConversationSummaryVectorStoreMemory`).",
      example_code: `from langchain_core.prompts import PromptTemplate

# Constructing declarative prompt runnable component
template = PromptTemplate.from_template("Translate {text} into {language}.")
formatted = template.format(text="Machine Learning is awesome", language="French")

print("Formatted LCEL Prompt Runnable Input:")
print(formatted)`,
      quiz: [
        {
          question: "What does the LCEL pipe operator (`|`) represent in LangChain?",
          options: [
            "Bitwise OR comparison",
            "Chaining Runnables where the output of one component becomes the input to the next component",
            "Regex pattern matching",
            "String concatenation"
          ],
          correct: 1,
          explanation: "In LCEL, the `|` pipe operator composes generic Runnable objects sequentially, passing outputs seamlessly through the pipeline."
        }
      ]
    },
    {
      id: "rag",
      title: "RAG (Retrieval-Augmented Generation)",
      formula: `\\text{Similarity: } \\cos(\\theta) = \\frac{\\mathbf{q} \\cdot \\mathbf{d}}{\\|\\mathbf{q}\\| \\|\\mathbf{d}\\|}`,
      subtopics: [
        {
          title: "Document Ingestion & Chunking Strategies",
          theory: "Chunking divides text documents into smaller segments (e.g. 500 tokens with 10-20% overlap). Overlap preserves contextual continuity across chunk boundaries."
        },
        {
          title: "Hybrid Search & Reciprocal Rank Fusion (RRF)",
          theory: "Hybrid Search combines Sparse BM25 keyword matching with Dense Vector semantic search, merging rank scores via RRF to capture exact numbers and concept meanings."
        },
        {
          title: "Re-ranking Models (Cohere Rerank)",
          theory: "Cross-Encoder re-rankers evaluate query-chunk pairs jointly, scoring true semantic relevance to filter top-K contexts before LLM prompt injection."
        },
        {
          title: "RAG Evaluation (RAGAS Framework)",
          theory: "Evaluates RAG quality using the RAG Triad: Groundedness (faithfulness to context), Context Relevance (retrieval precision), and Answer Relevance (query satisfaction)."
        }
      ],
      definition: "RAG is an AI architecture that enhances LLM responses by retrieving relevant facts from external knowledge bases before generating a response, preventing hallucinations.",
      syntax: `retriever = vectorstore.as_retriever(search_kwargs={"k": 3})\ndocs = retriever.invoke(query)\nresponse = llm.invoke(format_rag_prompt(docs, query))`,
      how_it_works: "1) Ingestion: Documents are chunked (e.g. 500 tokens with 50 overlap), embedded into dense vectors, and saved in a Vector DB. 2) Retrieval: User query vector is matched via HNSW/Cosine similarity. 3) Generation: Top-K chunks are injected into LLM prompt context.",
      where_we_use: "Enterprise internal document search, legal/financial compliance bots, real-time factual QA, and customer support assistants.",
      interview_theory: "Advanced MNC Question: How to fix RAG failure modes? Discuss Hybrid Search (BM25 keyword search + Dense Vector search), Cross-Encoder Reranking (Cohere Rerank), Parent Document Retrievers, and Hypothetical Document Embeddings (HyDE).",
      example_code: `import numpy as np

# Cosine Similarity between Query vector and Document vector
q_vec = np.array([0.2, 0.8, 0.5])
doc_vec = np.array([0.25, 0.75, 0.55])

cos_sim = np.dot(q_vec, doc_vec) / (np.linalg.norm(q_vec) * np.linalg.norm(doc_vec))
print(f"RAG Document Vector Similarity Score: {cos_sim:.4f}")`,
      quiz: [
        {
          question: "What technique combines sparse keyword search (BM25) with dense vector search to improve RAG retrieval recall?",
          options: ["Fine-tuning", "Hybrid Search with Reciprocal Rank Fusion (RRF)", "Quantization", "FlashAttention"],
          correct: 1,
          explanation: "Hybrid Search combines sparse BM25 (exact keyword match) with dense vector embeddings (semantic match), merged via Reciprocal Rank Fusion (RRF)."
        }
      ]
    },
    {
      id: "agents",
      title: "AI Agents & Multi-Agent Frameworks",
      subtopics: [
        {
          title: "ReAct (Reasoning + Acting) Cycle",
          theory: "The agent prompts the LLM to write a 'Thought', execute an external 'Action' tool, observe the tool's output 'Observation', and iterate until reaching a final answer."
        },
        {
          title: "Tool Schema & JSON Function Calling",
          theory: "Tools register JSON schemas describing functions and argument types. LLMs inspect schemas and emit structured JSON calls when tool execution is required."
        },
        {
          title: "State Graphs (LangGraph)",
          theory: "LangGraph models agent workflows as stateful cyclic graphs, enabling multi-agent collaboration, branching logic, state persistence, and human approval breakpoints."
        }
      ],
      definition: "AI Agents are autonomous systems that leverage LLMs as central reasoning engines to perceive environments, execute tools, plan multi-step goals, and reflect on outputs.",
      syntax: `from langchain.agents import create_react_agent\nagent_executor = AgentExecutor(agent=agent, tools=[search_tool, sql_tool])\nres = agent_executor.invoke({"input": "Check DB stock for item X"})`,
      how_it_works: "The ReAct framework loops: The LLM writes a 'Thought', selects a registered 'Action' tool with arguments, parses the tool's 'Observation' output, and loops until reaching a 'Final Answer'.",
      where_we_use: "Automated software engineering, automated data analysis, multi-step web scraping, autonomous workflow orchestration, and customer resolution pipelines.",
      interview_theory: "MNC Discussion: State management in AI Agents (LangGraph state graphs vs basic loops), human-in-the-loop approval breakpoints, and handling infinite tool loops.",
      example_code: `# Simulated ReAct Agent Tool Dispatch Logic
tools = {"calculator": lambda x: eval(x), "weather": lambda loc: "Sunny 25C"}

action = "calculator"
action_input = "25 * 4 + 10"

if action in tools:
    result = tools[action](action_input)
    print(f"Agent Executed Tool [{action}] -> Result: {result}")`,
      quiz: [
        {
          question: "In the ReAct agent framework, what does the agent do after receiving an 'Observation' from a tool execution?",
          options: [
            "Terminates immediately",
            "Evaluates the observation to produce a new 'Thought' and decide the next Action or Final Answer",
            "Clears its memory",
            "Re-embeds the vector database"
          ],
          correct: 1,
          explanation: "After a tool returns an Observation, the agent inspects the feedback, generates a new Thought, and determines if further tools are required or if the task is complete."
        }
      ]
    },
    {
      id: "embeddings",
      title: "Embeddings",
      formula: `\\text{Euclidean Distance: } D(\\mathbf{u}, \\mathbf{v}) = \\sqrt{\\sum_{i=1}^d (u_i - v_i)^2}`,
      subtopics: [
        {
          title: "Continuous Vector Space Representations",
          theory: "Text embeddings project words and sentences into 768-dimensional or 1536-dimensional continuous vector space using contrastive learning loss models."
        },
        {
          title: "Cosine Similarity vs Euclidean Distance",
          theory: "Cosine similarity measures vector angle regardless of magnitude, making it ideal for text length invariance. Euclidean distance measures straight-line point spatial distance."
        }
      ],
      definition: "Embeddings are dense numerical vector representations of text, images, or audio that capture semantic relationships in high-dimensional continuous vector space.",
      syntax: `from langchain_openai import OpenAIEmbeddings\nembeddings = OpenAIEmbeddings(model="text-embedding-3-small")\nvector = embeddings.embed_query("Data Science")`,
      how_it_works: "Trained using contrastive learning (InfoNCE loss) so that semantically similar concepts (e.g. 'King' and 'Queen') lie close together in 1536-dimensional or 768-dimensional space.",
      where_we_use: "Vector search, semantic deduplication, clustering, anomaly detection, sentiment classification, and content recommendation systems.",
      interview_theory: "MNC Question: Why is Cosine Similarity preferred over Euclidean Distance for text embeddings? (Cosine measures directional angle regardless of vector magnitude length differences caused by text length).",
      example_code: `import numpy as np

# Vector Distance Calculation
v1 = np.array([0.1, 0.9, 0.4])
v2 = np.array([0.15, 0.85, 0.38])

euclidean = np.linalg.norm(v1 - v2)
print(f"Embedding Space Distance: {euclidean:.4f}")`,
      quiz: [
        {
          question: "Why is Cosine Similarity usually preferred over Euclidean Distance for comparing text embeddings?",
          options: [
            "Cosine similarity is faster on CPU",
            "Cosine similarity measures the angle/direction of vectors, ignoring magnitude differences caused by variations in text length",
            "Euclidean distance cannot work on negative numbers",
            "Cosine similarity converts vectors to integers"
          ],
          correct: 1,
          explanation: "Cosine similarity measures vector orientation rather than magnitude, preventing document length from distorting semantic similarity scores."
        }
      ]
    },
    {
      id: "vector_db",
      title: "Vector Databases",
      subtopics: [
        {
          title: "HNSW (Hierarchical Navigable Small World) Index",
          theory: "HNSW constructs a multi-layer graph where upper layers contain sparse long-range links and lower layers contain dense local links, enabling sub-linear $O(\\log N)$ nearest neighbor search."
        },
        {
          title: "Product Quantization (PQ) Vector Compression",
          theory: "PQ breaks high-dimensional vectors into sub-vectors and quantizes them to codebook centroids, shrinking RAM footprint by ~90%."
        }
      ],
      definition: "Vector Databases are specialized database systems built to store, index, and query billions of high-dimensional vector embeddings with sub-millisecond latency.",
      syntax: `import pinecone\nindex = pinecone.Index("enterprise-rag")\nindex.upsert(vectors=[("id1", [0.1, 0.2, ...], {"metadata": "text"})])`,
      how_it_works: "Unlike traditional B-Trees, Vector DBs construct Approximate Nearest Neighbor (ANN) index graphs like HNSW (Hierarchical Navigable Small World) or IVF (Inverted File Index) for fast approximate search.",
      where_we_use: "Production RAG platforms, enterprise search engines, biometric face matching, and personalized recommendation systems.",
      interview_theory: "MNC Scenario: Explain HNSW graph architecture vs Flat Index (exact KNN). Flat index is 100% accurate but scales O(N); HNSW trades ~2% recall accuracy for O(log N) scale speed.",
      example_code: `# Concept: Approximate Search Index Metadata Filter
query_filter = {"category": "finance", "year": {"$gte": 2024}}
print("Vector DB Search Payload Filter Created:", query_filter)`,
      quiz: [
        {
          question: "What index structure enables Vector DBs to achieve sub-millisecond Approximate Nearest Neighbor (ANN) search over millions of vectors?",
          options: ["B-Tree", "HNSW (Hierarchical Navigable Small World)", "Hash Index", "LSM Tree"],
          correct: 1,
          explanation: "HNSW builds a multi-layer navigable graph structure allowing sub-linear O(log N) vector similarity traversal."
        }
      ]
    },
    {
      id: "faiss",
      title: "FAISS",
      subtopics: [
        {
          title: "Meta FAISS Architecture (CPU & GPU C++ Engines)",
          theory: "FAISS provides optimized C++ vector indexing algorithms supporting exact L2/Inner Product search, Inverted File Indexing (IVF), and Product Quantization (IVFPQ)."
        }
      ],
      definition: "FAISS (Facebook AI Similarity Search) is an open-source C++ library (with Python bindings) developed by Meta for efficient dense vector similarity search and clustering.",
      syntax: `import faiss\nindex = faiss.IndexFlatL2(d=1536)\nindex.add(vectors_np)\nD, I = index.search(query_np, k=5)`,
      how_it_works: "Provides CPU and GPU acceleration for vector indexing. Supports Flat indexes (exact L2/Inner Product), `IndexIVFFlat` (inverted file clustering), and Product Quantization (`IndexIVFPQ` for 10x memory compression).",
      where_we_use: "Local offline vector search, memory-constrained similarity matching, and large-scale embedding clustering.",
      interview_theory: "Interview Topic: What is Product Quantization (PQ) in FAISS? (PQ compresses high-dimensional float32 vectors into short byte codes, reducing RAM footprint by 80-90%).",
      example_code: `import numpy as np

# Simulating FAISS Flat Search Index logic with NumPy
dimension = 4
nb_vectors = 10
np.random.seed(42)

database = np.random.random((nb_vectors, dimension)).astype('float32')
query = np.random.random((1, dimension)).astype('float32')

# L2 Distance calculation
distances = np.linalg.norm(database - query, axis=1)
top_k_idx = np.argsort(distances)[:3]

print("Top 3 Nearest Vector Indices:", top_k_idx)
print("Distances:", distances[top_k_idx])`,
      quiz: [
        {
          question: "How does Product Quantization (PQ) benefit large-scale FAISS vector indexes?",
          options: [
            "Increases embedding dimensions",
            "Compresses vector embeddings into smaller byte codes, dramatically reducing RAM usage",
            "Eliminates GPU requirements",
            "Encrypts vector data"
          ],
          correct: 1,
          explanation: "Product Quantization breaks vectors into sub-vectors and quantizes them to codebook centroids, reducing memory footprint by up to 90%."
        }
      ]
    },
    {
      id: "chroma",
      title: "Chroma DB",
      subtopics: [
        {
          title: "In-Process Embedded DB Architecture",
          theory: "Chroma runs embedded inside Python process space via SQLite and HNSW, enabling local vector persistence without running separate server clusters."
        }
      ],
      definition: "Chroma is an open-source, developer-friendly embedding database designed to simplify building AI applications with native Python and JavaScript integrations.",
      syntax: `import chromadb\nclient = chromadb.PersistentClient(path="./chroma_db")\ncollection = client.create_collection(name="docs")\ncollection.add(documents=["text1"], ids=["id1"])`,
      how_it_works: "Runs embedded in-process or as a standalone server. Uses DuckDB/SQLite for metadata persistence and ClickHouse/HNSW for vector index search.",
      where_we_use: "Rapid prototyping, desktop RAG apps, local LLM knowledge bases, and python agent long-term memory.",
      interview_theory: "Comparison: Chroma vs Pinecone. Chroma is open-source, run locally in-process or self-hosted. Pinecone is a fully managed cloud-native SaaS serverless vector DB.",
      example_code: `# In-memory metadata query conceptual structure
chroma_metadata = {"source": "annual_report_2024.pdf", "page": 12}
print("Chroma Document Metadata Record:", chroma_metadata)`,
      quiz: [
        {
          question: "What is a major architectural advantage of Chroma DB during local developer prototyping?",
          options: [
            "It requires a distributed 10-node cluster setup",
            "It can run completely in-process embedded inside your Python application without external cloud server setup",
            "It does not support embeddings",
            "It only works with C++"
          ],
          correct: 1,
          explanation: "Chroma can be run in-memory or persisted to local disk directly inside Python via SQLite/HNSW, avoiding complex infrastructure setups."
        }
      ]
    },
    {
      id: "openai",
      title: "OpenAI API",
      subtopics: [
        {
          title: "Chat Completions & Function Calling API",
          theory: "Developers pass system/user/assistant turns to OpenAI API endpoints. Function calling emits valid JSON arguments matching target tool schemas."
        }
      ],
      definition: "The OpenAI API provides developer access to industry-leading frontier AI models (GPT-4o, GPT-4o-mini, o1, Text-Embedding-3, Whisper, and DALL-E 3).",
      syntax: `from openai import OpenAI\nclient = OpenAI()\ncompletion = client.chat.completions.create(\n  model="gpt-4o",\n  messages=[{"role": "system", "content": "You are helpful."}]\n)`,
      how_it_works: "HTTPS REST API with SSE (Server-Sent Events) streaming support. Developers pass messages arrays (`system`, `user`, `assistant`, `tool`), parameters (`temperature`, `top_p`, `response_format={'type': 'json_object'}`).",
      where_we_use: "Enterprise language tasks, function calling tool integration, multimodal vision analysis, structured JSON generation.",
      interview_theory: "MNC Question: What is OpenAI Function Calling (Tools API)? (Enables the model to detect when a tool should be called and return structured JSON arguments matching a JSON Schema).",
      example_code: `# Simulating OpenAI API Tool Definition Schema
tool_schema = {
    "type": "function",
    "function": {
        "name": "get_stock_price",
        "parameters": {
            "type": "object",
            "properties": {"symbol": {"type": "string"}},
            "required": ["symbol"]
        }
    }
}
print("OpenAI Tool JSON Schema Configured.")`,
      quiz: [
        {
          question: "How does OpenAI's Function Calling feature assist AI applications?",
          options: [
            "Executes Python code automatically on OpenAI servers",
            "Parses user intent and returns a structured JSON object containing function name and arguments matching your schema",
            "Decreases model pricing by 50%",
            "Generates C++ code"
          ],
          correct: 1,
          explanation: "Function calling allows the model to output valid JSON arguments for your predefined tools, which your backend then executes securely."
        }
      ]
    },
    {
      id: "azure_openai",
      title: "Azure OpenAI Service",
      subtopics: [
        {
          title: "Enterprise Data Privacy & VNet Isolation",
          theory: "Azure OpenAI Service hosts dedicated model deployments within enterprise Azure VNets, guaranteeing customer data is never retained or used to retrain base models."
        }
      ],
      definition: "Azure OpenAI Service offers enterprise-grade access to OpenAI models combined with Microsoft Azure’s security, compliance, regional data residency, and VNet privacy guarantees.",
      syntax: `from openai import AzureOpenAI\nclient = AzureOpenAI(\n  azure_endpoint="https://my-res.openai.azure.com/",\n  api_key="...", api_version="2024-02-01"\n)`,
      how_it_works: "Hosts dedicated OpenAI deployments within specific Azure regions. Integrates with Managed Identities (Entra ID), Azure Virtual Networks (VNet), RBAC authorization, and custom Content Safety moderation.",
      where_we_use: "Healthcare, banking, government, and Fortune 500 enterprise environments requiring HIPAA/SOC2 compliance and zero data retention for training.",
      interview_theory: "MNC Architectural Core: Why do Fortune 500 companies choose Azure OpenAI over direct OpenAI public endpoints? (Data privacy guarantees: Azure does NOT use customer prompts to train underlying base models, plus RBAC & VNet isolation).",
      example_code: `# Azure OpenAI Environment Variable Setup Representation
azure_config = {
    "AZURE_OPENAI_ENDPOINT": "https://enterprise-ai.openai.azure.com/",
    "AZURE_OPENAI_DEPLOYMENT": "gpt-4o-prod",
    "API_VERSION": "2024-06-01-preview"
}
print("Azure Endpoint Configured:", azure_config["AZURE_OPENAI_ENDPOINT"])`,
      quiz: [
        {
          question: "What is a primary reason enterprise organizations select Azure OpenAI over public API endpoints?",
          options: [
            "Azure OpenAI models are completely free",
            "Azure guarantees enterprise data privacy (prompts are not used for model retraining), Private VNet security, and SOC2/HIPAA compliance",
            "Azure models use zero GPU memory",
            "Azure OpenAI does not require API keys"
          ],
          correct: 1,
          explanation: "Azure OpenAI guarantees strict data privacy, enterprise SLA, Private VNet isolation, and ensures customer data is never used to re-train OpenAI models."
        }
      ]
    },
    {
      id: "ollama",
      title: "Ollama",
      subtopics: [
        {
          title: "Local GGUF Quantized Execution",
          theory: "Ollama executes open GGUF model weights locally via `llama.cpp` C++ routines, dynamically offloading layers between CPU RAM and GPU VRAM."
        }
      ],
      definition: "Ollama is a lightweight, open-source tool for running, serving, and customizing open LLMs (LLaMA 3, Mistral, Gemma, DeepSeek) locally on macOS, Linux, and Windows.",
      syntax: `# Terminal Command:\nollama run llama3.1\n# Python SDK:\nimport ollama\nres = ollama.chat(model='llama3.1', messages=[{'role': 'user', 'content': 'Hi'}])`,
      how_it_works: "Packages model weights, configuration, and prompt templates into a unified `Modelfile`. Powered by `llama.cpp`, it executes GGUF quantized models with CPU/Metal/CUDA GPU layer offloading.",
      where_we_use: "Offline AI development, privacy-sensitive local processing, zero-API-cost testing, and local RAG desktop agents.",
      interview_theory: "MNC Discussion: What is GGUF format and quantization (Q4_K_M vs FP16)? Quantization maps 16-bit floating point weights to 4-bit integers, allowing a 7B parameter model to run on an 8GB laptop RAM.",
      example_code: `modelfile_content = """FROM llama3.1
PARAMETER temperature 0.2
SYSTEM You are a local secure SQL assistant."""

print("Ollama Custom Modelfile Created:")
print(modelfile_content)`,
      quiz: [
        {
          question: "How does GGUF quantization (e.g. 4-bit Q4_K_M) benefit local model execution via Ollama?",
          options: [
            "It increases model weight size by 4x",
            "It reduces RAM/VRAM footprint by ~75%, allowing large 7B/8B models to run smoothly on standard laptops",
            "It converts text to audio",
            "It disables prompt templates"
          ],
          correct: 1,
          explanation: "Quantization converts 16-bit float weights down to 4-bit representations, slashing VRAM consumption while preserving ~95%+ of full model accuracy."
        }
      ]
    },
    {
      id: "huggingface",
      title: "Hugging Face",
      formula: `\\text{LoRA Update: } W = W_0 + \\frac{\\alpha}{r} (B \\times A)`,
      subtopics: [
        {
          title: "LoRA & Parameter-Efficient Fine-Tuning",
          theory: "LoRA freezes original base model weight matrix $W_0$ and trains low-rank decomposition matrices $A$ and $B$, cutting VRAM usage by >80% during fine-tuning."
        }
      ],
      definition: "Hugging Face is the central AI platform and ecosystem providing open-source access to over 500,000 pretrained models, datasets, Space apps, and the `transformers`, `datasets`, and `peft` libraries.",
      syntax: `from datasets import load_dataset\nfrom peft import LoraConfig, get_peft_model\ndataset = load_dataset("imdb")`,
      how_it_works: "Provides the Hub registry for model weights. The `peft` library enables Parameter-Efficient Fine-Tuning via LoRA (Low-Rank Adaptation), freezing base model weights $W_0$ and training small rank matrices $A$ and $B$.",
      where_we_use: "Custom model fine-tuning, domain-specific adaptation (medical/legal LLMs), downloading open weights, and hosting model demos via Gradio/Streamlit Spaces.",
      interview_theory: "Interview Favorite: Explain LoRA (Low-Rank Adaptation). Why does LoRA reduce fine-tuning memory by 80%? (It freezes original model $W_0$ parameters and only computes gradients for small low-rank decomposition matrices $A$ and $B$).",
      example_code: `peft_config_info = {
    "r": 16, # Rank dimension
    "lora_alpha": 32,
    "target_modules": ["q_proj", "v_proj"],
    "lora_dropout": 0.05
}
print("LoRA Parameter Efficient Fine-Tuning Config:", peft_config_info)`,
      quiz: [
        {
          question: "How does LoRA (Low-Rank Adaptation) make LLM fine-tuning dramatically more memory-efficient?",
          options: [
            "By retraining all 70 billion parameters from scratch",
            "By freezing base model weights and inserting trainable low-rank rank-decomposition matrices into Transformer layers",
            "By deleting model attention heads",
            "By converting models to plain text"
          ],
          correct: 1,
          explanation: "LoRA freezes original base weights and only updates small low-rank adapter matrices $A$ and $B$, cutting VRAM requirements and trainable parameters by >90%."
        }
      ]
    }
  ],

  interview_questions: {
    optimised: [
      {
        q: "1. What is the fundamental architecture of the Transformer model and how does Self-Attention work?",
        a: "Transformers eliminate recurrent connections using Multi-Head Self-Attention. Input tokens are projected into Query ($Q$), Key ($K$), and Value ($V$) matrices. Scaled Dot-Product Attention calculates $\\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$, allowing tokens to attend to all other context tokens in parallel."
      },
      {
        q: "2. What is RAG and how does it prevent LLM hallucinations in enterprise applications?",
        a: "Retrieval-Augmented Generation fetches verified facts from an external vector database matching the user query before passing the retrieved text chunks as grounding context inside the LLM prompt. This forces the model to synthesize answers from source documents."
      },
      {
        q: "3. Explain the difference between Fine-Tuning an LLM vs using RAG.",
        a: "Fine-tuning updates internal model parameters to learn domain style, format, or specific syntax. RAG injects dynamic, real-time factual knowledge into the context window without altering model weights. RAG is better for rapidly changing factual data."
      },
      {
        q: "4. What is the ReAct agent framework and how does it execute multi-step reasoning?",
        a: "ReAct stands for Reasoning + Acting. The agent prompts the LLM to generate a 'Thought', choose a registered 'Action' tool with arguments, observe the tool's 'Observation' output, and iteratively loop until reaching a 'Final Answer'."
      },
      {
        q: "5. What is the difference between Cosine Similarity and Dot Product for normalized vectors?",
        a: "If vectors are normalized to unit length (L2 norm = 1.0), Cosine Similarity is mathematically identical to Dot Product. Dot Product is faster to compute because it avoids calculating vector magnitudes at query time."
      },
      {
        q: "6. How does HNSW (Hierarchical Navigable Small World) index work in Vector Databases?",
        a: "HNSW builds a multi-layer graph where upper layers contain sparse long-range highway links for fast routing, and lower layers contain dense short-range local links, enabling sub-linear O(log N) nearest neighbor search."
      },
      {
        q: "7. Explain Parameter-Efficient Fine-Tuning (PEFT) and LoRA.",
        a: "LoRA (Low-Rank Adaptation) freezes original base model weight matrices $W_0 \\in \\mathbb{R}^{d \\times k}$ and injects trainable low-rank rank-decomposition matrices $B \\times A$ where $r \\ll \\min(d, k)$, reducing trainable parameters by 99%."
      },
      {
        q: "8. What is Temperature, Top-P (Nucleus Sampling), and Top-K in LLM generation sampling?",
        a: "Temperature scales logit scores before Softmax (lower = deterministic, higher = creative). Top-K restricts sampling to the K highest probability tokens. Top-P samples from the smallest set of tokens whose cumulative probability exceeds threshold P."
      },
      {
        q: "9. What is KV (Key-Value) Cache and how does it improve generation latency?",
        a: "During autoregressive decoding, past tokens' Key and Value tensors remain unchanged. KV Cache stores them in GPU memory, avoiding redundant matrix multiplications and reducing per-token generation complexity from $O(N^2)$ to $O(N)$."
      },
      {
        q: "10. How does Hybrid Search work in RAG systems?",
        a: "Hybrid search combines Sparse keyword search (BM25 for exact keyword/part-number matching) and Dense vector search (semantic embedding matching). Results are merged using algorithms like Reciprocal Rank Fusion (RRF)."
      },
      {
        q: "11. What is the difference between Zero-Shot, Few-Shot, and Chain-of-Thought Prompting?",
        a: "Zero-Shot gives direct instructions. Few-Shot includes 2-5 input/output example pairs in context. Chain-of-Thought explicitly instructs the model to step through logical reasoning intermediate steps."
      },
      {
        q: "12. How do you evaluate a RAG pipeline's quality using RAGAS or TruLens?",
        a: "Using the RAG Triad metrics: 1) Groundedness (Is output supported by retrieved context?), 2) Context Relevance (Is retrieved context relevant to query?), 3) Answer Relevance (Does answer address the query?)."
      },
      {
        q: "13. What is OpenAI Function Calling / Tool Use?",
        a: "It allows developers to supply JSON schemas of external APIs. When user intent matches a tool signature, the LLM stops text generation and returns structured JSON containing arguments to invoke your backend tool."
      },
      {
        q: "14. How does Chunk Size and Chunk Overlap affect RAG performance?",
        a: "Small chunks (250 tokens) provide precise vector similarity but may lack context. Large chunks (1000 tokens) provide rich context but dilute embedding specificity. Overlap (10-20%) preserves sentence boundary context across chunks."
      },
      {
        q: "15. Explain how System Prompts differ from User Prompts.",
        a: "System prompts set persona, behavioral boundaries, response rules, and output formatting guidelines at high priority. User prompts contain the dynamic turn query or document payload."
      },
      {
        q: "16. What is the role of Vector Quantization (e.g. Product Quantization)?",
        a: "Product Quantization divides vectors into sub-vectors and quantizes them to codebook indexes, compressing vector memory by 80-90% at a minor cost in search accuracy."
      },
      {
        q: "17. What is LangChain Expression Language (LCEL)?",
        a: "LCEL is a declarative syntax using pipe `|` operators to compose Runnables into unified production chains supporting async execution, streaming, tracing, and fallback routing."
      },
      {
        q: "18. How do local models via Ollama run on consumer hardware?",
        a: "Ollama uses `llama.cpp` to execute GGUF quantized models (e.g. 4-bit integer weights), offloading model layers dynamically between system RAM and GPU VRAM."
      },
      {
        q: "19. What is GraphRAG and when should it be used instead of Standard RAG?",
        a: "GraphRAG builds a Knowledge Graph (Entities & Relationships) from documents using LLMs. It excels at complex multi-hop global summarization queries (e.g. 'What are the main themes across all reports?') where vector similarity fails."
      },
      {
        q: "20. How do you prevent Prompt Injection attacks in AI applications?",
        a: "1) Use strict input validation and delimiters. 2) Employ secondary guardrail models (Llama Guard). 3) Enforce privileged vs unprivileged context separation. 4) Use structured JSON outputs."
      }
    ],
    tricky: [
      {
        q: "TRICKY 1. Why can an LLM generate completely different outputs even when Temperature is set to 0.0?",
        a: "Due to floating-point non-determinism in GPU parallel matrix operations (CUDA atomicAdd operations execute in non-deterministic order), small numeric rounding differences can alter top-token selection when logits are extremely close."
      },
      {
        q: "TRICKY 2. In RAG, why does increasing top_k retrieval (e.g. from k=3 to k=50) sometimes DECREASE final answer accuracy?",
        a: "This is known as the 'Lost in the Middle' phenomenon. LLMs attend strongly to tokens at the very beginning and end of context windows, while getting confused or missing facts buried in the middle of long retrieved context lists."
      },
      {
        q: "TRICKY 3. Why does Cosine Similarity fail if embedding vectors are NOT normalized and contain negative offset values?",
        a: "Cosine similarity measures vector angle, not magnitude. If two vectors have identical direction but wildly different scale or uncentered offsets, cosine similarity will report 1.0 even if their feature magnitudes are totally different."
      },
      {
        q: "TRICKY 4. What happens if a tool in a LangChain ReAct agent returns an error string instead of throwing an exception?",
        a: "The LLM receives the error string as an 'Observation'. It will attempt to analyze the error text, correct its tool arguments, and retry the tool execution autonomously!"
      },
      {
        q: "TRICKY 5. Why is fine-tuning an LLM on factual data often a BAD idea compared to RAG?",
        a: "Fine-tuning induces parametric memory which is prone to hallucination, difficult to update, lacks source attribution, and cannot enforce real-time access control security permissions."
      },
      {
        q: "TRICKY 6. In vector search, what is the subtle bug when storing normalized vectors in an inner-product (IP) index vs L2 index?",
        a: "If vectors are normalized, Inner Product (IP) equals Cosine Similarity. If vectors are UN-NORMALIZED, Inner Product prefers longer vectors over semantically closer vectors!"
      },
      {
        q: "TRICKY 7. What happens if you pass an input sequence longer than the model's `max_position_embeddings` to a Transformer without RoPE?",
        a: "The model will crash with an IndexOutOfBounds or Shape mismatch error because standard absolute positional embedding lookup tables do not exist for index positions beyond the pre-trained max length."
      },
      {
        q: "TRICKY 8. Why does Hugging Face `tokenizer.encode('Hello')` return a different length than `len('Hello')`?",
        a: "`len('Hello')` counts characters (5). `tokenizer.encode()` adds special control tokens like `[CLS]` (start of sequence) and `[SEP]` (end of sequence), returning token IDs `[101, 7592, 102]` (length 3)."
      },
      {
        q: "TRICKY 9. In Azure OpenAI, why might a deployment return 429 Rate Limit Errors even when your average RPM is well below the quota limit?",
        a: "Azure OpenAI enforces TPM (Tokens Per Minute) in addition to RPM. A single massive prompt containing 50,000 tokens can exhaust your TPM budget instantaneously, triggering rate limiting."
      },
      {
        q: "TRICKY 10. Why is setting `temperature=1.5` and `top_p=0.1` simultaneously bad practice?",
        a: "They compete in sampling selection. `top_p=0.1` truncates 90% of the token distribution first, neutralizing the high temperature creative distribution across the rest of the vocabulary."
      }
    ]
  }
};
