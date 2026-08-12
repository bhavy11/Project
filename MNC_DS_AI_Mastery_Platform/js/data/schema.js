/* 
  Master Data Engine Schema Builder
  Enforces the 28-section Topic contract, 15-section Subtopic contract,
  guarantees 20 MNC Optimised + 10 Tricky Interview Questions for EVERY TOPIC,
  and normalizes syntax to prevent [object Object] while generating visual graph diagrams.
*/

const SchemaBuilder = {
  formatCode(code) {
    return code ? code.trim() : "";
  },

  // Generates 20 Topic-Specific MNC Optimised Interview Q&As
  generate20OptimisedQs(topicTitle, def, syntaxStr, paramsList, useCases, bestPractices, timeComplexity) {
    const cleanSyntax = typeof syntaxStr === 'string' ? syntaxStr : `${topicTitle.toLowerCase()}()`;
    return [
      {
        q: `1. What is ${topicTitle} and what core problem was it created to solve in production MNC systems?`,
        a: `${def} It was created to eliminate manual overhead, optimize execution efficiency, and provide standardized, scalable processing in production data science and AI pipelines.`,
        why_asked: "To evaluate whether the candidate understands the fundamental purpose and real-world business value of the topic.",
        common_mistake: "Giving a superficial 1-sentence answer without mentioning production problems or scalability."
      },
      {
        q: `2. How does ${topicTitle} work internally at the execution flow and memory allocation level?`,
        a: `${topicTitle} operates by taking input data payloads, allocating contiguous or structured memory buffers, executing optimized routines (often C/C++ or vectorized instructions), and generating output objects while minimizing cache misses.`,
        why_asked: "Assesses deep technical awareness of underlying memory layout, CPU/GPU execution, and buffer management.",
        common_mistake: "Confusing high-level API syntax with low-level internal memory behavior."
      },
      {
        q: `3. What is the standard syntax for ${topicTitle} and what are its key mandatory vs optional parameters?`,
        a: `Standard syntax: \`${cleanSyntax}\`. Key parameters include: ${paramsList.map(p => p.name).join(', ')}. Optional parameters allow customizing data types, chunking, or search thresholds.`,
        why_asked: "Verifies hands-on practical coding experience and parameter configuration mastery.",
        common_mistake: "Forgetting key parameters like axis, dtype, or inplace configurations."
      },
      {
        q: `4. What is the expected return value and data type produced by ${topicTitle}?`,
        a: `${topicTitle} returns processed data structures (such as ndarrays, DataFrames, Tensors, or metrics objects) matching target output schema specifications.`,
        why_asked: "Ensures the candidate understands downstream data type compatibility in pipelines.",
        common_mistake: "Expecting a scalar when a Series/DataFrame or Tensor is returned."
      },
      {
        q: `5. What are the key subtopics and core architectural components that make up ${topicTitle}?`,
        a: `Core subtopics include algorithmic theory, parameter tuning, underlying data structures, error handling, and performance optimization routines tailored for ${topicTitle}.`,
        why_asked: "Tests comprehensive domain knowledge beyond superficial usage.",
        common_mistake: "Listing unrelated functions or missing primary sub-components."
      },
      {
        q: `6. What is the Time and Space Complexity of primary operations in ${topicTitle}?`,
        a: `Primary operations generally execute with Time Complexity of ${timeComplexity || 'O(N)'} and Space Complexity of O(N) depending on input array sizes and partition counts.`,
        why_asked: "Crucial for algorithmic efficiency evaluation in MNC technical rounds.",
        common_mistake: "Stating O(1) time complexity for operations that iterate over N items."
      },
      {
        q: `7. How is ${topicTitle} utilized in real-world production projects at companies like FAANG, Big 4, and Tier-1 MNCs?`,
        a: `MNCs use ${topicTitle} for ${useCases || 'large-scale data processing, feature engineering pipelines, real-time scoring endpoints, and automated reporting systems'}.`,
        why_asked: "Evaluates industry readiness and enterprise deployment experience.",
        common_mistake: "Describing toy academic projects instead of production enterprise pipelines."
      },
      {
        q: `8. What are the primary advantages of using ${topicTitle} over alternative approaches?`,
        a: `Key advantages include high execution speed, built-in optimization routines, active community ecosystem, seamless interop with major data libraries, and standardized API contracts.`,
        why_asked: "Tests technological trade-off evaluation capabilities.",
        common_mistake: "Claiming a tool has zero drawbacks or works for all use cases."
      },
      {
        q: `9. What are the major limitations of ${topicTitle} and when should you NOT use it?`,
        a: `${topicTitle} may experience high memory consumption on massive un-chunked datasets, lack native multi-GPU scaling without specialized wrappers, or introduce overhead on trivial small inputs.`,
        why_asked: "Interviewer wants to know if you recognize architectural boundaries and anti-patterns.",
        common_mistake: "Failing to identify memory bounds or scaling limitations."
      },
      {
        q: `10. How do you handle missing values, NULLs, or unexpected data types when executing ${topicTitle}?`,
        a: "Pre-validate input schema shapes, impute missing values using median/mode strategy, or drop nulls explicitly to prevent runtime type errors or corrupted calculation metrics.",
        why_asked: "Assesses data cleaning rigor and defensive programming skills.",
        common_mistake: "Assuming real-world production data is always clean and non-null."
      },
      {
        q: `11. What performance optimization techniques apply when scaling ${topicTitle} to multi-gigabyte datasets?`,
        a: "Downcast numerical dtypes (float64 to float32), use chunked batching (`chunksize`), leverage vectorization or parallel worker pools (`n_jobs=-1`), and avoid Python for-loops.",
        why_asked: "Evaluates high-performance computing and resource optimization skills.",
        common_mistake: "Relying on standard Python loops for large dataset transformations."
      },
      {
        q: `12. What production coding best practices should be enforced when using ${topicTitle}?`,
        a: `${bestPractices.join(' ')} Modularize functions, enforce type hints, wrap in try-except error blocks, and write automated unit tests.`,
        why_asked: "Tests software engineering standards and clean code discipline.",
        common_mistake: "Writing monolithic unstructured script code without error handling."
      },
      {
        q: `13. What common beginner mistakes occur when working with ${topicTitle} and how do you fix them?`,
        a: "Common mistakes include chained indexing warnings, performing in-place mutations inadvertently, and failing to scale features before model fitting. Fix by using explicit accessors and pre-validation.",
        why_asked: "Evaluates practical debugging experience with real error cases.",
        common_mistake: "Ignoring warnings or swallowing exceptions silently."
      },
      {
        q: `14. How does ${topicTitle} integrate into end-to-end Machine Learning or Data Engineering pipelines?`,
        a: `It serves as a core transformation block inside Scikit-Learn Pipelines, PySpark DAGs, or FastAPI inference microservices, passing sanitized tensors/DataFrames to downstream estimators.`,
        why_asked: "Checks systemic pipeline architecture understanding.",
        common_mistake: "Viewing the topic in isolation without connecting to upstream/downstream nodes."
      },
      {
        q: `15. What mathematical formulas or statistical foundations govern ${topicTitle}?`,
        a: `${topicTitle} is grounded in linear algebra (matrix operations), calculus (gradient optimization), probability distributions, or distance metric geometries.`,
        why_asked: "Verifies theoretical mathematical literacy.",
        common_mistake: "Memorizing code syntax without understanding underlying math."
      },
      {
        q: `16. How do you perform automated unit testing on code logic utilizing ${topicTitle}?`,
        a: "Use PyTest or Vitest with synthetic mock data arrays (`np.array` or `pd.DataFrame`) to assert output shapes, data types, and edge-case calculation values.",
        why_asked: "Tests QA automation and production code reliability practices.",
        common_mistake: "Testing against live production databases directly instead of using mocks."
      },
      {
        q: `17. What memory management considerations apply when running ${topicTitle} in constrained RAM environments?`,
        a: "Monitor memory allocation via deep memory inspection, release unneeded objects using explicit garbage collection (`gc.collect()`), and avoid creating unneeded data copies.",
        why_asked: "Evaluates cloud infrastructure cost efficiency and RAM management.",
        common_mistake: "Creating multiple redundant DataFrame or Tensor copies in memory."
      },
      {
        q: `18. What is a real-life analogy that intuitively explains how ${topicTitle} operates?`,
        a: `Think of ${topicTitle} like an automated factory assembly line where raw materials are systematically inspected, transformed, filtered, and packaged into finalized products.`,
        why_asked: "Tests communication ability to explain complex technical concepts to non-technical stakeholders.",
        common_mistake: "Over-complicating explanations with jargon without clear analogies."
      },
      {
        q: `19. How do you debug runtime errors or unexpected output shapes when executing ${topicTitle}?`,
        a: "Inspect intermediate shapes (`.shape` or `.dtype`), print diagnostic summary stats (`.info()`), check log tracebacks, and isolate operations step-by-step using interactive debuggers.",
        why_asked: "Assesses systematic troubleshooting methodology.",
        common_mistake: "Randomly tweaking code parameters without reading error tracebacks."
      },
      {
        q: `20. How would you design a scalable production microservice utilizing ${topicTitle}?`,
        a: "Encapsulate logic inside clean function modules, expose REST endpoints via FastAPI/Uvicorn, validate schemas using Pydantic, containerize with Docker, and deploy with auto-scaling.",
        why_asked: "High-level system design evaluation for senior MNC engineering roles.",
        common_mistake: "Designing single-threaded non-containerized local scripts."
      }
    ];
  },

  // Generates 10 Topic-Specific Tricky MNC Questions
  generate10TrickyQs(topicTitle) {
    return [
      {
        q: `Tricky Q1. What happens during edge case execution when ${topicTitle} receives an empty array, 0-row DataFrame, or NULL input?`,
        a: "It can raise a ValueError, return an empty output object with 0 rows, or output NaN values depending on whether input validation is performed prior to execution.",
        explanation: "Always check `if len(data) == 0:` before executing mathematical transformations."
      },
      {
        q: `Tricky Q2. What subtle bug occurs when performing in-place mutation vs re-assigning variables in ${topicTitle}?`,
        a: "In-place mutations (`inplace=True` or `+=`) modify underlying memory buffers shared by other variables, potentially corrupting upstream reference data inadvertently.",
        explanation: "Variables sharing memory references will reflect in-place changes silently."
      },
      {
        q: `Tricky Q3. Why can calling ${topicTitle} inside a tight iterative loop cause severe memory leaks?`,
        a: "Creating data structures or figure objects in loops without clearing context references causes global memory retention, leading to Out-Of-Memory (OOM) crashes.",
        explanation: "Explicitly free references (`plt.close()`, `gc.collect()`) inside long iteration loops."
      },
      {
        q: `Tricky Q4. What happens if data types (dtypes) are mismatched during execution of ${topicTitle}?`,
        a: "Implicit type casting can occur (e.g. converting int to float64), doubling RAM consumption or triggering non-matching string comparison failures.",
        explanation: "Always verify `.dtypes` match expected schemas before executing operations."
      },
      {
        q: `Tricky Q5. How does ${topicTitle} behave in multi-threaded vs multi-process execution environments?`,
        a: "Due to Python's Global Interpreter Lock (GIL), multi-threaded execution may not accelerate CPU-bound operations unless delegates run in C extensions; use multi-processing or PyArrow.",
        explanation: "CPU-bound tasks require process spawning or C-extension parallel execution."
      },
      {
        q: `Tricky Q6. What is the difference between shallow memory views vs deep copies in ${topicTitle}?`,
        a: "Basic slicing returns a memory view sharing original memory buffers (modifications affect parent). Fancy indexing or `.copy()` creates a new independent RAM copy.",
        explanation: "Modifying a view mutates the original dataset; modifying a copy does not."
      },
      {
        q: `Tricky Q7. Why can accuracy metrics appear deceptively high when using ${topicTitle} on imbalanced datasets?`,
        a: "A model predicting 100% majority class achieves high raw accuracy while failing completely on minority targets. Use Precision-Recall AUC or F1-Score instead.",
        explanation: "Accuracy evaluates total correct counts, masking minority class failures."
      },
      {
        q: `Tricky Q8. How do you prevent data leakage when using ${topicTitle} for feature engineering?`,
        a: "Fit transformation parameters (mean, std, min, max) strictly on training data folds, and apply `transform()` to validation/test sets without recalculating parameters.",
        explanation: "Fitting on the entire dataset leaks test distribution statistics into training."
      },
      {
        q: `Tricky Q9. What happens if a worker node crashes while executing ${topicTitle} in a distributed cluster?`,
        a: "In Spark/Hadoop, the DAG Lineage graph recomputes lost partitions on healthy nodes. In local scripts, the entire process terminates with a worker failure.",
        explanation: "Distributed engines use lineage graphs for fault recovery; local scripts do not."
      },
      {
        q: `Tricky Q10. Why does ${topicTitle} fail to scale linearly on multi-gigabyte files without specialized batching?`,
        a: "In-memory processing engines require datasets to fit entirely within physical RAM. When data exceeds RAM, OS swapping or OOM memory exceptions halt execution.",
        explanation: "Scaling beyond RAM requires chunked streaming, disk-mapped arrays, or PySpark."
      }
    ];
  },

  // Builds a standardized 28-section Topic Object
  createTopic(config) {
    // 1. Rigorously normalize syntax strings to prevent [object Object]
    let basicSyntaxStr = "";
    let advancedSyntaxStr = "";

    if (typeof config.syntax === 'object' && config.syntax !== null) {
      basicSyntaxStr = config.syntax.basic || config.syntax.basic_syntax || config.syntax.code || "";
      advancedSyntaxStr = config.syntax.advanced || config.syntax.advanced_syntax || basicSyntaxStr;
    } else if (typeof config.syntax === 'string') {
      basicSyntaxStr = config.syntax;
      advancedSyntaxStr = (typeof config.syntax_advanced === 'string') ? config.syntax_advanced : basicSyntaxStr;
    }

    if (!basicSyntaxStr) {
      basicSyntaxStr = `${(config.title || 'method').toLowerCase().replace(/[^a-z0-9]/g, '_')}(data)`;
    }
    if (!advancedSyntaxStr) {
      advancedSyntaxStr = basicSyntaxStr;
    }

    const defaultParams = config.parameters || [
      { name: "data", type: "array / tensor / dataframe", required: true, default_val: "None", description: "Primary input data payload." }
    ];
    const defaultMethods = config.methods || [
      {
        name: "fit_transform()",
        definition: "Computes internal parameters and applies transformation in a single step.",
        syntax: "object.fit_transform(X)",
        parameters: "X: Input dataset matrix",
        return_type: "Transformed array",
        example: "scaler.fit_transform(X_train)",
        output: "Scaled matrix",
        best_practice: "Use fit_transform on training data only.",
        time_complexity: "O(N * M)",
        space_complexity: "O(N * M)"
      }
    ];
    const defaultUseCases = config.where_we_use || "Used extensively across top tech MNCs.";
    const defaultBestPractices = config.best_practices || [
      "Always use vectorization over manual Python loops.",
      "Validate input data shapes and null values before execution."
    ];

    // Combine custom Qs or auto-generate complete 20 Optimised + 10 Tricky questions per topic
    const customOptimised = (config.interview_questions && config.interview_questions.optimised) ? config.interview_questions.optimised : (Array.isArray(config.interview_questions) ? config.interview_questions : []);
    const customTricky = (config.interview_questions && config.interview_questions.tricky) ? config.interview_questions.tricky : (config.tricky_questions || []);

    const full20Optimised = customOptimised.length >= 20 
      ? customOptimised 
      : [...customOptimised, ...this.generate20OptimisedQs(config.title, config.definition || config.definition_beginner || '', basicSyntaxStr, defaultParams, defaultUseCases, defaultBestPractices, defaultMethods[0].time_complexity)].slice(0, 20);

    const full10Tricky = customTricky.length >= 10 
      ? customTricky 
      : [...customTricky, ...this.generate10TrickyQs(config.title)].slice(0, 10);

    return {
      id: config.id || "topic_" + Math.random().toString(36).substr(2, 9),
      title: config.title || "Untitled Topic",

      // 1. Introduction
      introduction: config.introduction || {
        what: config.definition || "Overview of " + config.title,
        why_created: "Created to address real-world computation and data challenges in production systems.",
        why_needed: "Essential for building robust, scalable production data science pipelines.",
        history: "Developed as part of modern computing and data engineering evolution."
      },

      // 2. Definition
      definition_beginner: config.definition_beginner || config.definition || "A foundational concept in data science.",
      definition_interview: config.definition_interview || config.interview_theory || "An essential production mechanism evaluated in MNC technical rounds.",

      // 3. Why We Use It
      why_we_use: {
        purpose: config.purpose || "To process, transform, or model complex data efficiently.",
        benefits: config.benefits || ["High performance", "Production reliability", "Scalable implementation"],
        problems_solved: config.problems_solved || ["Manual computation overhead", "Memory inefficiencies"],
        real_world_importance: defaultUseCases
      },

      // 4. Internal Working
      internal_working: {
        execution_flow: config.how_it_works || "Step-by-step processing across memory and CPU registers.",
        memory_behavior: config.memory_behavior || "Optimized memory allocation and continuous buffer management.",
        processing_flow: config.processing_flow || "Input -> Parsing -> Transformation -> Output.",
        diagram: config.diagram || `[Input Data] ──> [Processing Engine] ──> [Output Result]`
      },

      // 5. Syntax (Guaranteed string values)
      syntax: {
        basic: basicSyntaxStr,
        advanced: advancedSyntaxStr,
        variations: config.syntax_variations || ["Standard call", "Parameterized call"],
        keyword_explanation: config.keyword_explanation || "Key methods and parameters used in syntax call."
      },

      // 6. Parameters
      parameters: defaultParams,

      // 7. Return Value
      return_value: config.return_value || {
        type: "Object / Array / Scalar",
        output_description: "Transformed output structure or computed metrics.",
        examples: ["Output shape (N, M)", "Numeric scalar result"]
      },

      // 8. Supported Operations
      supported_operations: config.supported_operations || [
        "Data Transformation", "Filtering & Selection", "Aggregation", "Serialization"
      ],

      // 9. Methods / Functions
      methods: defaultMethods,

      // 10. Formulas
      formula: config.formula || null,
      formula_details: config.formula_details || (config.formula ? {
        formula: config.formula,
        variables: "Variables represent feature dimensions and weights.",
        numerical_example: "Sample numerical step-by-step substitution."
      } : null),

      // 11. Visual Explanation & Graph Chart Metadata
      visual_explanation: config.visual_explanation || {
        type: "Flowchart / Graph Diagram",
        content: `+-----------------------------------------------+
| Input Data Stream -> Processing -> Visualization |
+-----------------------------------------------+`
      },

      // 12. Real-Life Analogy
      real_life_analogy: config.real_life_analogy || "Think of this like an assembly line in a factory where raw parts are systematically processed into finished products.",

      // 13. Industry Use Cases
      industry_use_cases: config.industry_use_cases || [
        { company: "Tier-1 Tech MNCs", industry: "Finance & E-Commerce", application: "Real-time data scoring & analytics." }
      ],

      // 14. Real Project Example
      real_project_example: config.real_project_example || {
        title: config.title + " Production Pipeline",
        description: "An end-to-end production pipeline leveraging " + config.title + " for real-time processing.",
        code: config.example_code || "# Production code script\nprint('Running pipeline...')"
      },

      // 15. Complete Code Examples (4 Tiers)
      code_examples: config.code_examples || {
        beginner: {
          code: config.example_code || "print('Hello')",
          explanation: "Basic entry point example demonstrating syntax.",
          output: "Execution output result."
        },
        intermediate: {
          code: config.example_code || "print('Intermediate')",
          explanation: "Intermediate multi-step handling.",
          output: "Intermediate transformed output."
        },
        advanced: {
          code: config.example_code || "print('Advanced')",
          explanation: "Advanced performance-optimized execution.",
          output: "Advanced metric output."
        },
        production: {
          code: config.example_code || "# Production Script",
          explanation: "Enterprise-grade error-handled implementation.",
          output: "Production status 200 OK."
        }
      },

      // 16. Common Mistakes
      common_mistakes: config.common_mistakes || [
        { mistake: "Applying transformations on test data during fitting.", fix: "Strictly fit on training data and transform test data." }
      ],

      // 17. Best Practices
      best_practices: defaultBestPractices,

      // 18. Performance Tips
      performance_tips: config.performance_tips || [
        "Utilize in-place operations (`inplace=True` or C-extensions) where memory is constrained.",
        "Downcast numeric types to float32 or int32 for 50% RAM savings."
      ],

      // 19. Advantages
      advantages: config.advantages || ["High execution speed", "Scalable design", "Extensive ecosystem support"],

      // 20. Limitations
      limitations: config.limitations || ["High memory footprint if unoptimized", "Requires proper input scaling"],

      // 21. Comparison Table
      comparison_table: config.comparison_table || [
        { feature: "Primary Focus", this_concept: config.title, alternate: "Alternative Approach", winner: config.title }
      ],

      // 22. Frequently Asked Interview Questions (20 Optimised Qs per Topic)
      interview_questions: {
        optimised: full20Optimised,
        tricky: full10Tricky
      },

      // 23. Tricky Questions (10 Tricky Qs per Topic)
      tricky_questions: full10Tricky,

      // 24. Coding Questions (3 Challenges: Easy, Medium, Hard)
      coding_challenges: config.coding_challenges || [
        {
          difficulty: "Easy",
          problem: "Implement basic manipulation using " + config.title,
          input: "X = [1, 2, 3]",
          output: "[2, 4, 6]",
          solution: "# Easy Solution\nresult = [x * 2 for x in [1, 2, 3]]\nprint(result)",
          complexity: "Time: O(N), Space: O(N)"
        },
        {
          difficulty: "Medium",
          problem: "Filter and aggregate dataset metrics",
          input: "DataFrame with 100 rows",
          output: "Aggregated summary table",
          solution: "# Medium Solution\n# Filtering & Aggregation logic",
          complexity: "Time: O(N log N), Space: O(N)"
        },
        {
          difficulty: "Hard",
          problem: "Optimize large-scale memory transformation pipeline",
          input: "1,000,000 row stream",
          output: "Processed output tensor",
          solution: "# Hard Solution\n# Chunked vectorized pipeline",
          complexity: "Time: O(N), Space: O(1)"
        }
      ],

      // 25. Quizzes
      quiz: config.quiz || [
        {
          question: "What is the primary benefit of " + config.title + "?",
          options: ["Speed & Optimization", "Slow execution", "Takes infinite RAM", "None"],
          correct: 0,
          explanation: "Designed specifically for speed and memory optimization."
        }
      ],

      // 26. Revision Notes
      revision_notes: config.revision_notes || [
        config.title + " processes data in contiguous memory blocks.",
        "Always avoid manual for-loops; use vectorized operations.",
        "Check shape and null values prior to model fitting."
      ],

      // 27. Cheat Sheet
      cheat_sheet: config.cheat_sheet || {
        key_syntax: basicSyntaxStr,
        essential_methods: ["fit()", "transform()", "predict()"],
        key_interview_points: ["Vectorization", "Memory views vs copies", "Data leakage prevention"]
      },

      // 28. Related Topics
      related_topics: config.related_topics || [
        { title: "Prerequisite Concept", id: "python_basics" },
        { title: "Next Advanced Topic", id: "advanced_ml" }
      ],

      // Subtopics Array (Each Subtopic has complete 15-point schema)
      subtopics: (config.subtopics || []).map(st => typeof st === 'string' ? {
        title: st,
        definition: "Core theoretical aspect of " + st,
        theory: st + " forms an essential component of production workflows.",
        math: "Relevant mathematical representation where applicable.",
        formula: null,
        internal_working: "Executes in memory via optimized register operations.",
        code_example: "# Subtopic Example\nprint('" + st + "')",
        output: "Subtopic output",
        visualization: "[Subtopic Input] -> [Operation] -> [Result]",
        common_mistakes: "Confusing memory assignment with copies.",
        best_practices: "Use standard vectorized functions.",
        interview_qna: { q: "Why is " + st + " important?", a: "Improves execution efficiency and memory locality." },
        coding_q: { problem: "Demonstrate " + st, solution: "# Code\npass" },
        quiz: { question: "Does " + st + " optimize memory?", options: ["Yes", "No"], correct: 0, explanation: "Yes, it optimizes cache locality." },
        summary: st + " is crucial for production mastery."
      } : {
        title: st.title || "Subtopic",
        definition: st.definition || st.theory || "Core theoretical aspect of subtopic.",
        theory: st.theory || "Subtopic theoretical detail.",
        math: st.math || "Mathematical representation.",
        formula: st.formula || null,
        internal_working: st.internal_working || "Internal processing flow.",
        code_example: st.code_example || "# Code example\nprint('Subtopic')",
        output: st.output || "Execution output",
        visualization: st.visualization || "[Input] -> [Subtopic Process] -> [Output]",
        common_mistakes: st.common_mistakes || "Common pitfall in subtopic implementation.",
        best_practices: st.best_practices || "Production best practice.",
        interview_qna: st.interview_qna || { q: "Key question on " + (st.title || "subtopic"), a: "Detailed interview answer." },
        coding_q: st.coding_q || { problem: "Implement " + (st.title || "subtopic"), solution: "pass" },
        quiz: st.quiz || { question: "Is " + (st.title || "subtopic") + " performant?", options: ["Yes", "No"], correct: 0, explanation: "Yes." },
        summary: st.summary || "Subtopic summary point."
      })
    };
  }
};
