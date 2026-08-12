/* Python Libraries Module Data */
const PYTHON_DATA = {
  subject: "Python Libraries",
  icon: "code",
  description: "Master Python's primary ecosystem for Data Science, Machine Learning, Deep Learning, Computer Vision, NLP, and API services.",
  topics: [
    {
      id: "numpy",
      title: "NumPy",
      introduction: {
        what: "NumPy (Numerical Python) is the foundational library for scientific computing in Python, providing support for high-performance N-dimensional arrays (ndarrays).",
        why_created: "Created by Travis Oliphant in 2005 to unify Numeric and NumArray libraries into a single C-optimized numerical computation system.",
        why_needed: "Standard Python lists store full object pointers, making math loops 50x-100x slower. NumPy stores contiguous homogeneous memory buffers.",
        history: "Evolved from Numeric (1995) to modern NumPy (2005+), powering Pandas, SciPy, Scikit-Learn, PyTorch, and TensorFlow."
      },
      definition_beginner: "NumPy is a Python library used for working with numerical arrays and matrix calculations.",
      definition_interview: "A C-extension library providing homogeneous N-dimensional array buffers (ndarrays), SIMD vectorization, and stride-based memory access.",
      why_we_use: {
        purpose: "High-speed numerical linear algebra, array indexing, broadcasting, and matrix operations.",
        benefits: ["50x faster than Python lists", "Contiguous memory layout", "SIMD vectorization", "Low memory footprint"],
        problems_solved: ["Eliminates slow Python GIL loops", "Prevents memory fragmentation"],
        real_world_importance: "Used in all AI/ML tensor manipulation engines."
      },
      internal_working: {
        execution_flow: "Python function call -> C-extension routine -> SIMD vector instruction -> Memory buffer output.",
        memory_behavior: "Contiguous block of RAM storing homogenous data types with strides defining index offsets.",
        processing_flow: "Array creation -> Vectorized operations -> Output ndarray.",
        diagram: `[Python Interface] ──> [NumPy C Core] ──> [Contiguous RAM Buffer (SIMD)]`
      },
      syntax: {
        basic: "import numpy as np\narr = np.array([1, 2, 3])",
        advanced: "arr = np.zeros((3, 3), dtype=np.float64)\nres = np.dot(matrix_a, matrix_b)",
        variations: ["np.asarray()", "np.arange()", "np.linspace()"],
        keyword_explanation: "dtype specifies fixed data type; shape defines array dimensions; strides define memory jump offsets."
      },
      parameters: [
        { name: "object", type: "array_like", required: true, default_val: "None", description: "Input list, tuple, or scalar data." },
        { name: "dtype", type: "data-type", required: false, default_val: "None", description: "Desired data type (e.g. float64, int32)." }
      ],
      return_value: {
        type: "numpy.ndarray",
        output_description: "An N-dimensional array object containing contiguous element memory.",
        examples: ["array([1, 2, 3])", "array([[0., 0.], [0., 0.]])"]
      },
      supported_operations: [
        "Vectorized arithmetic (+, -, *, /)", "Matrix Multiplication (np.dot, @)", "Broadcasting", "Fancy Indexing & Slicing"
      ],
      methods: [
        {
          name: "np.array()",
          definition: "Creates an N-dimensional array from Python sequence.",
          syntax: "np.array(object, dtype=None)",
          parameters: "object: list/tuple, dtype: target data type",
          return_type: "ndarray",
          example: "a = np.array([1, 2, 3])",
          output: "[1 2 3]",
          best_practice: "Specify explicit dtype=np.float32 to save RAM.",
          time_complexity: "O(N)",
          space_complexity: "O(N)"
        },
        {
          name: "np.dot() / @",
          definition: "Computes dot product of two arrays or matrix multiplication.",
          syntax: "np.dot(a, b) or a @ b",
          parameters: "a: matrix/vector, b: matrix/vector",
          return_type: "ndarray",
          example: "res = np.dot([[1, 2]], [[3], [4]])",
          output: "[[11]]",
          best_practice: "Use @ operator for modern readable code.",
          time_complexity: "O(N^3) or O(N^2.81) via BLAS",
          space_complexity: "O(N^2)"
        }
      ],
      formula: `\\text{Memory Offset: } \\text{Offset} = \\sum_{i=0}^{n-1} \\text{index}_i \\times \\text{stride}_i`,
      subtopics: [
        {
          title: "NDArrays & Dtypes Memory Overhead",
          theory: "NumPy arrays store fixed-type elements in contiguous C-memory buffers, eliminating Python object pointer overhead and dynamic type-checking for fast CPU cache access.",
          internal_working: "Direct RAM block allocation without PyObject header wrappers.",
          code_example: "import numpy as np\na = np.array([1, 2, 3], dtype=np.int32)\nprint('Itemsize:', a.itemsize, 'bytes')",
          output: "Itemsize: 4 bytes",
          common_mistakes: "Using object dtypes which re-introduce slow Python pointers.",
          best_practices: "Use int32 or float32 for machine learning vectors."
        },
        {
          title: "C-Contiguous vs Fortran Memory Strides",
          theory: "C-contiguous arrays store elements row-by-row in adjacent memory locations (ideal for row operations), whereas Fortran-contiguous arrays store data column-by-column.",
          internal_working: "Memory stride jumps differ between row-major (C) and column-major (F) configurations.",
          code_example: "arr = np.ones((3, 3), order='C')\nprint(arr.flags['C_CONTIGUOUS'])",
          output: "True",
          common_mistakes: "Performing column iteration on C-contiguous memory causing CPU cache misses.",
          best_practices: "Match array memory order to primary calculation access loop."
        }
      ],
      code_examples: {
        beginner: {
          code: "import numpy as np\na = np.array([1, 2, 3])\nprint(a * 2)",
          explanation: "Vectorized scalar multiplication.",
          output: "[2 4 6]"
        },
        intermediate: {
          code: "import numpy as np\nA = np.ones((2, 3))\nB = np.arange(3)\nprint(A + B)",
          explanation: "Broadcasting a 1D vector across a 2D matrix.",
          output: "[[1. 2. 3.]\n [1. 2. 3.]]"
        },
        advanced: {
          code: "import numpy as np\nX = np.random.randn(1000, 100)\nW = np.random.randn(100, 10)\nY = X @ W\nprint('Y shape:', Y.shape)",
          explanation: "High-throughput matrix dot product multiplication.",
          output: "Y shape: (1000, 10)"
        },
        production: {
          code: "import numpy as np\ndef normalize_batch(batch):\n    mean = np.mean(batch, axis=0, keepdims=True)\n    std = np.std(batch, axis=0, keepdims=True) + 1e-8\n    return (batch - mean) / std\n\ndata = np.random.rand(100, 5)\nscaled = normalize_batch(data)\nprint('Scaled mean:', np.abs(scaled.mean()) < 1e-5)",
          explanation: "Production zero-mean unit-variance batch normalization function.",
          output: "Scaled mean: True"
        }
      },
      real_project_example: {
        title: "Image Brightness & Matrix Transformation Pipeline",
        description: "Applies array vectorization to adjust image pixel intensities across multi-channel image arrays.",
        code: "import numpy as np\nimage_tensor = np.random.randint(0, 256, (1080, 1920, 3), dtype=np.uint8)\nbrightened = np.clip(image_tensor.astype(np.uint16) + 30, 0, 255).astype(np.uint8)\nprint('Transformed Image Shape:', brightened.shape)"
      },
      common_mistakes: [
        { mistake: "Mixing slicing views and modifying them inadvertently mutating original data.", fix: "Use arr[1:5].copy() when a separate array is needed." }
      ],
      best_practices: [
        "Avoid Python for-loops on arrays; rely entirely on vectorized functions.",
        "Specify explicit integer/float dtypes to optimize cache alignment."
      ],
      performance_tips: [
        "Use in-place operators (`arr += 1`) to eliminate intermediate buffer allocation.",
        "Use BLAS-backed operations (@ matmul) for large matrix operations."
      ],
      advantages: ["Extremely fast", "Low memory footprint", "Seamless interop with C/C++ and PyTorch/TensorFlow"],
      limitations: ["Homogeneous data types only (cannot mix text and numbers in same array)"],
      comparison_table: [
        { feature: "Memory Layout", this_concept: "Contiguous C/Fortran Buffer", alternate: "Python List (Pointer Array)", winner: "NumPy" },
        { feature: "Execution Speed", this_concept: "C Vectorized SIMD", alternate: "Interpreted Python Loop", winner: "NumPy" }
      ],
      interview_questions: [
        {
          q: "1. Why is NumPy so much faster than standard Python lists?",
          a: "NumPy stores homogeneous data in continuous memory blocks, avoiding Python object pointer overhead and dynamic type checking, while leveraging C extensions and SIMD vector instructions.",
          why_asked: "To evaluate core memory and performance knowledge.",
          common_mistake: "Attributing speed solely to C without mentioning contiguous memory locality."
        }
      ],
      tricky_questions: [
        {
          q: "Tricky Q1: Why does `a = np.array([1,2]); b = a; b += 1` mutate `a`, but `b = b + 1` does NOT?",
          a: "`b += 1` invokes `__iadd__` performing in-place buffer mutation. `b = b + 1` allocates a new array and reassigns variable `b`.",
          explanation: "In-place operators mutate existing memory blocks directly."
        }
      ],
      coding_challenges: [
        {
          difficulty: "Easy",
          problem: "Create a 3x3 identity matrix and multiply it by scalar 5.",
          input: "None",
          output: "[[5, 0, 0], [0, 5, 0], [0, 0, 5]]",
          solution: "import numpy as np\nres = np.eye(3) * 5\nprint(res)",
          complexity: "Time: O(1), Space: O(1)"
        }
      ],
      quiz: [
        {
          question: "What happens when you slice a NumPy array (e.g. `b = a[1:4]`)?",
          options: ["Creates a deep copy", "Returns a memory view of original data", "Deletes original array", "Throws an exception"],
          correct: 1,
          explanation: "Basic slicing in NumPy returns a memory view sharing the original array buffer."
        }
      ],
      revision_notes: [
        "NumPy ndarrays store homogeneous elements in continuous memory.",
        "Basic slicing returns a view; fancy indexing returns a copy.",
        "Broadcasting aligns array shapes from right to left."
      ],
      cheat_sheet: {
        key_syntax: "import numpy as np; arr = np.array([1, 2, 3])",
        essential_methods: ["np.array()", "np.zeros()", "np.dot()", "np.reshape()", "np.transpose()"],
        key_interview_points: ["Contiguous memory buffer", "SIMD vectorization", "Views vs Copies", "Broadcasting rules"]
      },
      related_topics: [
        { title: "Python Data Structures", id: "python_basics" },
        { title: "Pandas DataFrames", id: "pandas" }
      ]
    },

    {
      id: "pandas",
      title: "Pandas",
      introduction: {
        what: "Pandas is the premier open-source data manipulation and analysis library for Python, providing flexible DataFrame (2D) and Series (1D) tabular data structures.",
        why_created: "Created by Wes McKinney in 2008 at AQR Capital Management to address the lack of flexible, high-performance quantitative financial data analysis tools in Python.",
        why_needed: "Raw NumPy arrays lack labeled column names, string indexing, heterogeneous dtypes, missing data handling, and relational join/groupby syntax.",
        history: "Open-sourced in 2009, Pandas became the fundamental pillar of Data Science, evolving to Pandas 2.0+ with PyArrow backend integration."
      },
      definition_beginner: "Pandas is a Python library used to read, clean, filter, transform, group, and analyze tabular data like Excel spreadsheets or SQL tables.",
      definition_interview: "A high-performance data manipulation engine wrapping 1D Series and 2D DataFrames with labeled alignment, hash-table indexing, relational joins, and Arrow memory backends.",
      why_we_use: {
        purpose: "Tabular data ingestion, cleaning, transformation, aggregation, joining, missing value imputation, and exploratory data analysis (EDA).",
        benefits: ["Heterogeneous column types", "Labeled index lookups O(1)", "Integrated SQL-like joins & groupbys", "Parquet/CSV/Excel I/O"],
        problems_solved: ["Eliminates manual file parsing loops", "Handles missing data cleanly", "Scales to multi-gigabyte files"],
        real_world_importance: "Used in 99% of enterprise Data Science and Analytics workflows."
      },
      internal_working: {
        execution_flow: "File Load -> Column Block Manager allocation -> PyArrow/NumPy Series creation -> Hash-table Index construction -> Output DataFrame.",
        memory_behavior: "DataFrames consist of a BlockManager holding column arrays grouped by dtype (e.g. FloatBlock, IntBlock, ObjectBlock/PyArrow block).",
        processing_flow: "Raw Input -> Parsing -> Column Placement in BlockManager -> DataFrame Ops.",
        diagram: `[Raw CSV/Parquet/DB] ──> [BlockManager (NumPy/PyArrow)] ──> [DataFrame / Series]`
      },
      syntax: {
        basic: "import pandas as pd\ndf = pd.read_csv('file.csv')\nprint(df.head())",
        advanced: "df.groupby('dept').agg(avg_sal=('salary', 'mean')).query('avg_sal > 80000')",
        variations: ["pd.DataFrame()", "pd.Series()", "pd.read_parquet()", "pd.read_sql()"],
        keyword_explanation: "index represents row labels; columns represent attribute names; dtypes specify per-column data types."
      },
      parameters: [
        { name: "filepath_or_buffer", type: "str / Path", required: true, default_val: "None", description: "Path to input file (CSV, Excel, JSON, Parquet)." },
        { name: "usecols", type: "list", required: false, default_val: "None", description: "Subset of column names to read (reduces memory usage)." }
      ],
      return_value: {
        type: "pandas.DataFrame / pandas.Series",
        output_description: "A 2D tabular DataFrame or 1D Series object with labeled axes.",
        examples: ["DataFrame shape (1000, 15)", "Series length 1000"]
      },
      supported_operations: [
        "Reading Data (read_csv, read_excel, read_json)",
        "Inspection (head, tail, sample, shape, columns, dtypes, info, describe)",
        "Selection (loc, iloc, at, iat)",
        "Filtering (Boolean indexing, query, isin, between)",
        "Sorting (sort_values, sort_index)",
        "Missing Values (isnull, notnull, fillna, dropna)",
        "Duplicates (duplicated, drop_duplicates)",
        "Grouping (groupby, agg, transform)",
        "Combining (merge, join, concat)",
        "String Operations (str.lower, str.upper, str.contains, str.replace, str.split)",
        "Datetime (.dt.year, .dt.month, .dt.day, to_datetime)",
        "Apply Functions (apply, map, replace, applymap)",
        "Statistics (mean, median, mode, std, var, min, max, sum, count, value_counts, unique, nunique)"
      ],
      methods: [
        {
          name: "pd.read_csv()",
          definition: "Reads comma-separated values (CSV) file into DataFrame.",
          syntax: "pd.read_csv(filepath, usecols=None, chunksize=None)",
          parameters: "filepath: str, usecols: list, chunksize: int",
          return_type: "DataFrame",
          example: "df = pd.read_csv('data.csv', usecols=['age', 'salary'])",
          output: "DataFrame with selected columns",
          best_practice: "Pass usecols and specify dtypes to minimize memory footprint.",
          time_complexity: "O(N * M)",
          space_complexity: "O(N * M)"
        },
        {
          name: "df.loc[]",
          definition: "Accesses a group of rows and columns by label(s) or boolean array.",
          syntax: "df.loc[row_label, col_label]",
          parameters: "row_label: label/slice/boolean, col_label: string/list",
          return_type: "DataFrame / Series / Scalar",
          example: "val = df.loc[df['age'] > 30, 'salary']",
          output: "Filtered salary Series",
          best_practice: "Always use .loc for assignments to avoid SettingWithCopyWarning.",
          time_complexity: "O(1) label lookup via hash index",
          space_complexity: "O(K) output size"
        },
        {
          name: "df.groupby()",
          definition: "Groups DataFrame using a mapper or by a Series of columns.",
          syntax: "df.groupby(by)['col'].agg(func)",
          parameters: "by: column name(s), as_index: bool",
          return_type: "DataFrameGroupBy",
          example: "df.groupby('dept')['salary'].mean()",
          output: "Average salary per department",
          best_practice: "Use as_index=False to keep grouping columns as regular DataFrame columns.",
          time_complexity: "O(N log N) or O(N) hash group",
          space_complexity: "O(K groups)"
        }
      ],
      formula: `\\text{Memory Reduction: } \\text{RAM}_{\\text{Category}} \\approx \\text{RAM}_{\\text{Object}} \\times 0.2`,
      subtopics: [
        {
          title: "1. Reading Data (pd.read_csv, pd.read_excel, pd.read_json)",
          definition: "Functions used to ingest structured files from local disk or URLs into Pandas DataFrames.",
          theory: "`pd.read_csv()` parses delimited text files. `pd.read_excel()` uses openpyxl to parse spreadsheet sheets. `pd.read_json()` parses JSON string objects or files.",
          internal_working: "Uses C-based parsers (or PyArrow in pandas 2.0) to allocate contiguous memory blocks per column.",
          code_example: "import pandas as pd\n# Simulating CSV data reading\ndf = pd.read_csv('https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv')\nprint('Read shape:', df.shape)",
          output: "Read shape: (150, 5)",
          common_mistakes: "Loading entire multi-gigabyte CSVs without specifying usecols or chunksize.",
          best_practices: "Use `usecols=['col1', 'col2']` and specify `dtype` parameter to cut RAM usage."
        },
        {
          title: "2. Inspection (head, tail, sample, shape, columns, dtypes, info, describe)",
          definition: "Attributes and methods for exploring the structural overview, memory usage, and statistical properties of a DataFrame.",
          theory: "`head(n)`/`tail(n)` view top/bottom $n$ rows. `sample(n)` returns random rows. `shape` gives tuple dimensions. `columns` lists names. `dtypes` lists per-column data types. `info()` displays memory usage and non-null counts. `describe()` outputs mean/std/quartiles.",
          internal_working: "Inspects metadata stored in DataFrame BlockManager without scanning all data values.",
          code_example: "print('Columns:', df.columns.tolist()[:3])\nprint('Memory info call:', df.info(verbose=False))",
          output: "Columns: ['sepal_length', 'sepal_width', 'petal_length']",
          common_mistakes: "Ignoring `object` dtypes which silently consume massive memory.",
          best_practices: "Run `df.info(memory_usage='deep')` immediately after loading new datasets."
        },
        {
          title: "3. Selection (loc, iloc, at, iat)",
          definition: "Indexing mechanisms for selecting rows and columns by string label or integer coordinate position.",
          theory: "`.loc[]` selects by explicit label (inclusive of stop boundary). `.iloc[]` selects by 0-indexed integer position (exclusive of stop boundary). `.at[]` and `.iat[]` are ultra-fast scalar accessors for retrieving a single value.",
          internal_working: "`.at` and `.iat` bypass array slice creation overhead, providing direct scalar pointer retrieval.",
          code_example: "df = pd.DataFrame({'A': [10, 20], 'B': [30, 40]}, index=['r1', 'r2'])\nprint('loc label:', df.loc['r1', 'A'])\nprint('iloc pos:', df.iloc[0, 0])\nprint('fast at:', df.at['r1', 'A'])",
          output: "loc label: 10\niloc pos: 10\nfast at: 10",
          common_mistakes: "Using `.loc[0:2]` expecting 2 rows (label slicing includes end boundary `2`!).",
          best_practices: "Use `.at[]` / `.iat[]` inside tight loops when extracting single scalar values."
        },
        {
          title: "4. Filtering (Boolean Indexing, query, isin, between)",
          definition: "Conditional extraction methods for isolating rows matching specific criteria.",
          theory: "Boolean indexing evaluates vector conditions (`df[df['age'] > 25]`). `.query()` parses string SQL-like expressions using NumExpr for speed. `.isin([val1, val2])` checks membership. `.between(left, right)` checks range bounds.",
          internal_working: "Generates a boolean bit-mask vector, executing C-level array masking.",
          code_example: "df = pd.DataFrame({'age': [20, 25, 30, 35], 'city': ['NY', 'LA', 'NY', 'SF']})\nres = df.query('age >= 25 and city == \"NY\"')\nprint('Query result:\\n', res)",
          output: "Query result: age=30, city=NY",
          common_mistakes: "Using Python boolean keywords `and` / `or` instead of bitwise `&` / `|` in boolean indexing.",
          best_practices: "Use `df.query()` for cleaner code when filtering complex multi-condition expressions."
        },
        {
          title: "5. Sorting (sort_values, sort_index)",
          definition: "Reorders DataFrame rows or columns by feature values or row index labels.",
          theory: "`sort_values(by='col', ascending=False)` sorts rows based on values in specified columns using Quicksort/Mergesort. `sort_index()` re-orders rows based on index labels.",
          internal_working: "Calls NumPy `argsort()` routines on column memory blocks.",
          code_example: "df = pd.DataFrame({'score': [88, 95, 72]})\nprint(df.sort_values(by='score', ascending=False))",
          output: "Sorted scores: 95, 88, 72",
          common_mistakes: "Forgetting that `sort_values` returns a new DataFrame unless `inplace=True` or reassigned.",
          best_practices: "Chain `.reset_index(drop=True)` after sorting to restore sequential integer indexing."
        },
        {
          title: "6. Missing Values (isnull, notnull, fillna, dropna)",
          definition: "Functions for identifying, removing, or imputing missing NaN/None values.",
          theory: "`isnull()` / `notnull()` return boolean masks indicating missing status. `fillna(val)` replaces NaNs with static values, mean, or median. `dropna()` removes rows or columns containing missing values.",
          internal_working: "Checks bitwise null-indicator masks on column memory blocks.",
          code_example: "import numpy as np\ndf = pd.DataFrame({'val': [10, np.nan, 30]})\ndf['filled'] = df['val'].fillna(df['val'].median())\nprint(df)",
          output: "filled: [10.0, 20.0, 30.0]",
          common_mistakes: "Imputing missing values with mean on skewed features containing extreme outliers.",
          best_practices: "Impute numerical columns with `.median()` and categorical columns with `.mode()[0]`."
        },
        {
          title: "7. Duplicates (duplicated, drop_duplicates)",
          definition: "Tools for identifying and removing duplicate rows across table features.",
          theory: "`duplicated(keep='first')` returns a boolean mask marking duplicate rows. `drop_duplicates(subset=['col'])` removes duplicate rows based on specified subset columns.",
          internal_working: "Builds a C hash table across tuple values to detect repeated occurrences.",
          code_example: "df = pd.DataFrame({'email': ['a@x.com', 'a@x.com', 'b@x.com']})\nclean = df.drop_duplicates(subset=['email'])\nprint('Cleaned rows:', len(clean))",
          output: "Cleaned rows: 2",
          common_mistakes: "Calling `drop_duplicates()` without specifying key `subset` columns.",
          best_practices: "Always check `df.duplicated().sum()` during preliminary data cleaning."
        },
        {
          title: "8. Grouping (groupby, agg, transform)",
          definition: "Split-Apply-Combine workflow engine for aggregating and transforming group data.",
          theory: "`groupby('col')` splits data into groups. `.agg({'col1': 'mean', 'col2': 'sum'})` computes summary metrics per group. `.transform(func)` computes group metrics but broadcasts results back to match the original DataFrame length.",
          internal_working: "Uses hash partitioning to split rows into memory bins before applying vectorized C aggregations.",
          code_example: "df = pd.DataFrame({'dept': ['IT', 'IT', 'HR'], 'sal': [100, 120, 80]})\ndf['dept_avg'] = df.groupby('dept')['sal'].transform('mean')\nprint(df)",
          output: "IT rows get dept_avg=110.0, HR gets 80.0",
          common_mistakes: "Confusing `agg()` (which reduces row count to group count) with `transform()` (which preserves original row count).",
          best_practices: "Use `transform()` to calculate feature ratios relative to group averages (e.g. `salary / dept_avg_salary`)."
        },
        {
          title: "9. Combining (merge, join, concat)",
          definition: "Functions for concatenating, joining, and merging multi-source DataFrames.",
          theory: "`pd.concat([df1, df2], axis=0)` stacks DataFrames vertically or horizontally. `pd.merge(df1, df2, on='key', how='inner')` executes database-style SQL joins. `df1.join(df2)` joins on index labels.",
          internal_working: "Executes Hash Joins or Sort-Merge Joins in compiled C code.",
          code_example: "d1 = pd.DataFrame({'id': [1, 2], 'val': ['A', 'B']})\nd2 = pd.DataFrame({'id': [1, 2], 'score': [90, 80]})\nmerged = pd.merge(d1, d2, on='id')\nprint(merged)",
          output: "Merged DataFrame with columns id, val, score",
          common_mistakes: "Performing `pd.merge()` on keys containing uncleaned duplicates, causing exponential row count blowup.",
          best_practices: "Always inspect `len(df1)` and `len(merged)` after merging to verify expected row counts."
        },
        {
          title: "10. String Operations (str.lower, str.upper, str.contains, str.replace, str.split)",
          definition: "Vectorized string manipulation accessors operating on object and StringDtype columns.",
          theory: "Accessible via `.str` namespace. `.str.lower()` / `.upper()` adjust case. `.str.contains('pattern')` performs regex matching. `.str.replace('old', 'new')` substitutes strings. `.str.split('delimiter')` splits strings into lists or expanding columns.",
          internal_working: "Iterates over string pointer arrays or executes Arrow vectorized string kernels.",
          code_example: "s = pd.Series(['Alice Smith', 'Bob Jones'])\nprint(s.str.lower())\nprint(s.str.contains('Alice'))",
          output: "series lowercased; boolean mask [True, False]",
          common_mistakes: "Forgetting the `.str` accessor prefix when calling string methods on Pandas Series.",
          best_practices: "Use Python 3.12 / Pandas 2.0+ `string[pyarrow]` dtypes for up to 30x faster string operations."
        },
        {
          title: "11. Datetime (to_datetime, .dt.year, .dt.month, .dt.day)",
          definition: "Tools for parsing strings into Timestamp objects and extracting temporal components.",
          theory: "`pd.to_datetime(s)` parses text into `datetime64[ns]` dtypes. The `.dt` accessor provides properties like `.dt.year`, `.dt.month`, `.dt.day`, `.dt.dayofweek`, and `.dt.is_month_end`.",
          internal_working: "Converts strings to 64-bit integer nanosecond timestamps since Unix epoch.",
          code_example: "s = pd.Series(['2024-01-15', '2024-06-20'])\ndts = pd.to_datetime(s)\nprint('Months:', dts.dt.month.tolist())",
          output: "Months: [1, 6]",
          common_mistakes: "Passing non-standard date formats to `to_datetime()` without specifying the `format` parameter (causes slow fallback parsing).",
          best_practices: "Always specify `format='%Y-%m-%d'` in `pd.to_datetime()` for fast C-level parsing."
        },
        {
          title: "12. Apply Functions (apply, map, replace, applymap)",
          definition: "Element-wise and row-wise transformation functions for mapping custom functions across DataFrames and Series.",
          theory: "`s.map(dict_or_func)` maps values in a Series using dictionary lookups or single-element functions. `s.replace(old, new)` substitutes target values. `df.apply(func, axis=1)` applies a function across DataFrame rows or columns. `applymap()` (now deprecated in favor of `df.map()` in pandas 2.1+) applies functions element-wise across an entire DataFrame.",
          internal_working: "Python loop invocation over underlying arrays.",
          code_example: "s = pd.Series(['male', 'female'])\nencoded = s.map({'male': 0, 'female': 1})\nprint('Encoded Series:', encoded.tolist())",
          output: "Encoded Series: [0, 1]",
          common_mistakes: "Using `df.apply(..., axis=1)` for simple math operations instead of fast native vectorized Series arithmetic.",
          best_practices: "Avoid `apply(axis=1)` whenever a vectorized Pandas/NumPy function exists."
        },
        {
          title: "13. Statistics (mean, median, mode, std, var, min, max, sum, count, value_counts, unique, nunique)",
          definition: "Descriptive statistical functions for computing summary metrics over Series and DataFrames.",
          theory: "`mean()`, `median()`, `mode()`, `std()`, `var()`, `min()`, `max()`, `sum()`, `count()` compute summary statistics while ignoring NaNs. `value_counts()` returns frequency counts of unique values. `unique()` returns an array of unique values. `nunique()` returns the scalar count of distinct unique non-null values.",
          internal_working: "Calls optimized Cython statistical accumulator loops.",
          code_example: "s = pd.Series(['A', 'B', 'A', 'A', 'C', np.nan])\nprint('Value Counts:\\n', s.value_counts())\nprint('Distinct count (nunique):', s.nunique())",
          output: "A: 3, B: 1, C: 1; nunique: 3",
          common_mistakes: "Confusing `count()` (which ignores NaNs) with `len()` (which counts total rows including NaNs).",
          best_practices: "Use `s.value_counts(normalize=True)` to get percentage frequency distributions directly."
        }
      ],
      code_examples: {
        beginner: {
          code: "import pandas as pd\ndf = pd.DataFrame({'name': ['Alice', 'Bob'], 'age': [25, 30]})\nprint(df.head())",
          explanation: "Creating a basic DataFrame and viewing top rows.",
          output: "name age\nAlice 25\nBob 30"
        },
        intermediate: {
          code: "import pandas as pd\ndf = pd.DataFrame({'dept': ['IT', 'IT', 'HR'], 'sal': [90000, 110000, 70000]})\nsummary = df.groupby('dept')['sal'].agg(['mean', 'max'])\nprint(summary)",
          explanation: "Grouping by department and computing aggregate statistics.",
          output: "mean max\nHR 70000 70000\nIT 100000 110000"
        },
        advanced: {
          code: "import pandas as pd\nimport numpy as np\ndf = pd.DataFrame({'date': pd.date_range('2024-01-01', periods=5), 'val': [10, np.nan, 30, 40, 50]})\ndf['val_filled'] = df['val'].fillna(df['val'].median())\ndf['year'] = df['date'].dt.year\nprint(df[['date', 'val_filled', 'year']])",
          explanation: "Handling missing values, parsing datetimes, and feature engineering.",
          output: "DataFrame with filled median values and extracted year."
        },
        production: {
          code: "import pandas as pd\n\ndef clean_customer_data(raw_df: pd.DataFrame) -> pd.DataFrame:\n    df = raw_df.copy()\n    df.columns = df.columns.str.lower().str.strip().str.replace(' ', '_')\n    df = df.drop_duplicates(subset=['customer_id'])\n    if 'email' in df.columns:\n        df['email'] = df['email'].str.lower().str.strip()\n    return df\n\nraw = pd.DataFrame({'Customer ID': [101, 101], ' Email ': [' ALICE@X.COM ', 'ALICE@X.COM']})\nclean = clean_customer_data(raw)\nprint(clean)",
          explanation: "Production cleaning pipeline sanitizing headers, removing duplicates, and normalizing text.",
          output: "Cleaned DataFrame with customer_id=101 and normalized email."
        }
      },
      real_project_example: {
        title: "E-Commerce Customer Churn Feature Pipeline",
        description: "Ingests raw transactional records, handles missing dates, computes customer-level total spend, order count, and churn status.",
        code: "import pandas as pd\norders = pd.DataFrame({'cust_id': [1, 1, 2], 'amount': [150, 200, 50], 'date': ['2024-01-01', '2024-02-01', '2024-01-10']})\norders['date'] = pd.to_datetime(orders['date'])\nfeatures = orders.groupby('cust_id').agg(total_spend=('amount', 'sum'), total_orders=('amount', 'count'), last_order=('date', 'max'))\nprint(features)"
      },
      common_mistakes: [
        { mistake: "Modifying a slice of a DataFrame triggering `SettingWithCopyWarning`.", fix: "Use `.loc[row_indexer, col_indexer] = value` explicitly." },
        { mistake: "Using `apply(axis=1)` for mathematical operations across columns.", fix: "Use vectorized Series arithmetic (`df['A'] + df['B']`) which runs in C speed." }
      ],
      best_practices: [
        "Convert string columns with low cardinality to `category` dtype for 80% RAM savings.",
        "Pass `usecols` when reading large CSV files to avoid loading unneeded columns into RAM."
      ],
      performance_tips: [
        "Use PyArrow engine backend (`pd.read_csv(..., engine='pyarrow')`) in pandas 2.0+ for 10x-30x faster parsing.",
        "Avoid row-wise iteration (`iterrows()`); use vectorized Series operations or `.to_numpy()`."
      ],
      advantages: ["Extremely expressive tabular API", "Seamless SQL/Parquet/Excel I/O", "Rich time-series and grouping capabilities"],
      limitations: ["In-memory processing engine (DataFrames must fit inside system RAM)"],
      comparison_table: [
        { feature: "Data Structure", this_concept: "2D Labeled DataFrame & Series", alternate: "NumPy 2D Array", winner: "Pandas" },
        { feature: "Heterogeneous Types", this_concept: "Supported (int, float, string in separate cols)", alternate: "Not supported (Single dtype only)", winner: "Pandas" },
        { feature: "Index Lookups", this_concept: "O(1) Hash-based Label Lookups", alternate: "Integer position indexing only", winner: "Pandas" }
      ],
      interview_questions: [
        {
          q: "1. What causes `SettingWithCopyWarning` in Pandas and how do you resolve it?",
          a: "It occurs when performing chained indexing `df[mask]['col'] = val`, making it ambiguous whether Pandas returned a view or a copy. Resolve by using `.loc[mask, 'col'] = val`.",
          why_asked: "Evaluates production Pandas debugging and memory reference awareness.",
          common_mistake: "Ignoring the warning, which leads to silent bugs where data is not updated."
        },
        {
          q: "2. What is the difference between `.loc[]` and `.iloc[]`?",
          a: "`.loc[]` selects data by string/label index (inclusive of endpoints). `.iloc[]` selects data by 0-indexed integer position (exclusive of stop index).",
          why_asked: "Fundamental indexing question asked in almost every MNC round.",
          common_mistake: "Assuming `.loc` is integer position based."
        },
        {
          q: "3. How do you optimize memory for a 10GB CSV file in Pandas?",
          a: "1) Read in chunks using `chunksize`. 2) Specify `usecols`. 3) Convert text columns to `category` dtypes. 4) Downcast numeric dtypes (`float64` to `float32`). 5) Use `engine='pyarrow'`.",
          why_asked: "Tests Big Data handling and memory optimization capability.",
          common_mistake: "Suggesting `pd.read_csv()` directly without chunking or dtype downcasting."
        },
        {
          q: "4. What is the difference between `groupby().agg()` and `groupby().transform()`?",
          a: "`agg()` aggregates rows, returning a DataFrame with row count equal to unique groups. `transform()` applies group calculations but broadcasts results back to match original DataFrame length.",
          why_asked: "Assesses feature engineering expertise for machine learning pipelines.",
          common_mistake: "Using `apply()` instead of `transform()` for group broadcasting."
        },
        {
          q: "5. How does `pd.merge()` handle duplicates in join keys?",
          a: "If join keys contain duplicate entries in both DataFrames, `merge()` computes the Cartesian product of matching keys, resulting in unexpected row count expansion.",
          why_asked: "Tests data integrity awareness when joining relational tables.",
          common_mistake: "Not checking `drop_duplicates()` on join keys prior to merging."
        }
      ],
      tricky_questions: [
        {
          q: "Tricky Q1: Why does `df.loc[0:2]` return 3 rows on an integer-indexed DataFrame, but `df.iloc[0:2]` return 2 rows?",
          a: "`.loc` uses label-based slicing which INCLUDES the stop label `2`. `.iloc` uses positional slicing which EXCLUDES the stop position index `2`.",
          explanation: "Label slicing includes the end boundary; positional slicing excludes it."
        },
        {
          q: "Tricky Q2: What happens when you call `df.apply(lambda row: row['A'] + row['B'], axis=1)` on a 1M row DataFrame?",
          a: "It runs a slow Python for-loop over 1,000,000 rows, taking 10-20 seconds. Native vectorization `df['A'] + df['B']` completes in 2 milliseconds.",
          explanation: "`apply(axis=1)` disables vectorization and executes row-by-row in interpreted Python."
        }
      ],
      coding_challenges: [
        {
          difficulty: "Easy",
          problem: "Filter rows where age > 25 and select 'name' and 'salary' columns.",
          input: "df with name, age, salary columns",
          output: "Filtered DataFrame",
          solution: "res = df.loc[df['age'] > 25, ['name', 'salary']]\nprint(res)",
          complexity: "Time: O(N), Space: O(K)"
        },
        {
          difficulty: "Medium",
          problem: "Calculate the percentage of total department salary contributed by each employee.",
          input: "df with dept, salary",
          output: "df with 'salary_ratio' column",
          solution: "df['dept_total'] = df.groupby('dept')['salary'].transform('sum')\ndf['salary_ratio'] = df['salary'] / df['dept_total']",
          complexity: "Time: O(N log N), Space: O(N)"
        },
        {
          difficulty: "Hard",
          problem: "Find the 2nd highest salary in each department.",
          input: "df with dept, salary",
          output: "DataFrame with top-2 salary per dept",
          solution: "df['rank'] = df.groupby('dept')['salary'].rank(method='dense', ascending=False)\nres = df[df['rank'] == 2]",
          complexity: "Time: O(N log N), Space: O(N)"
        }
      ],
      quiz: [
        {
          question: "Which accessor method provides fast scalar value retrieval by index label?",
          options: [".loc[]", ".at[]", ".iloc[]", ".head()"],
          correct: 1,
          explanation: "`.at[]` is specifically optimized for ultra-fast single scalar label access."
        },
        {
          question: "What is the primary benefit of converting low-cardinality string columns to `category` dtypes in Pandas?",
          options: ["Speeds up file saves", "Slashing memory usage by up to 80% by storing integer lookup codes", "Deletes null values", "Encrypts strings"],
          correct: 1,
          explanation: "Category dtypes replace repeated text strings with small integer keys, drastically cutting RAM consumption."
        }
      ],
      revision_notes: [
        "Use `.loc` for label-based selection and assignment; `.iloc` for positional selection.",
        "Always check `.info(memory_usage='deep')` for RAM optimization.",
        "Use `.groupby().transform()` to compute group metrics without reducing DataFrame row count.",
        "Prefer vectorized Series operations over `df.apply(axis=1)`."
      ],
      cheat_sheet: {
        key_syntax: "import pandas as pd; df = pd.read_csv('data.csv')",
        essential_methods: [
          "read_csv()", "head()", "loc[]", "iloc[]", "query()",
          "fillna()", "drop_duplicates()", "groupby()", "merge()", "to_datetime()"
        ],
        key_interview_points: [
          "SettingWithCopyWarning fix",
          "loc vs iloc slicing boundaries",
          "Memory optimization via Category & PyArrow",
          "Groupby agg vs transform",
          "Join duplicate key row explosion"
        ]
      },
      related_topics: [
        { title: "NumPy Fundamentals", id: "numpy" },
        { title: "Data Preprocessing in ML", id: "data_preprocessing" }
      ]
    },

    {
      id: "matplotlib",
      title: "Matplotlib",
      introduction: {
        what: "Matplotlib is a comprehensive library for creating static, animated, and interactive visualizations in Python.",
        why_created: "Created by John D. Hunter in 2003 to emulate MATLAB's plotting capabilities in open-source Python.",
        why_needed: "Essential for exploratory data analysis, visual diagnostic checks, and rendering publication-ready charts.",
        history: "The foundational parent plotting library in Python, serving as the rendering engine underlying Seaborn and Pandas plotting."
      },
      definition_beginner: "Matplotlib is a Python plotting library used to draw charts like line graphs, scatter plots, and histograms.",
      definition_interview: "An Object-Oriented visualization framework structured around Figure canvases and Axes subplots with customizable rendering backends.",
      why_we_use: {
        purpose: "Data visualization, diagnostic model plots (ROC, confusion matrices), trend analysis.",
        benefits: ["Total layout customization", "Fine-grained control over ticks, axes, legends", "Publication quality export"],
        problems_solved: ["Eliminates black-box charting limitations"],
        real_world_importance: "Used across research, finance, and AI engineering for model evaluation."
      },
      internal_working: {
        execution_flow: "Figure instantiation -> Axes creation -> Primitive rendering (Line2D, Text) -> Backend render (Agg/TkAgg) -> Display/Save.",
        memory_behavior: "Figures remain active in memory until explicitly closed via `plt.close()`.",
        processing_flow: "Data -> OO Canvas -> Renderer.",
        diagram: `[Figure Canvas] ──> [Axes Subplot] ──> [Graphics Primitives (Lines/Text)]`
      },
      syntax: {
        basic: "import matplotlib.pyplot as plt\nplt.plot([1, 2], [3, 4])\nplt.show()",
        advanced: "fig, ax = plt.subplots(figsize=(8, 5))\nax.plot(x, y)\nplt.close(fig)",
        variations: ["fig.add_subplot()", "plt.subplot()"],
        keyword_explanation: "Figure is the outer window canvas; Axes is the individual plot area containing data and axis lines."
      },
      parameters: [
        { name: "figsize", type: "tuple", required: false, default_val: "(6.4, 4.8)", description: "Width and height of figure in inches." }
      ],
      return_value: {
        type: "tuple (Figure, Axes)",
        output_description: "Top-level Figure object and child Axes subplot objects.",
        examples: ["(Figure(800x500), AxesSubplot)"]
      },
      supported_operations: ["Line plots", "Scatter plots", "Bar charts", "Histograms", "Subplot grids"],
      methods: [
        {
          name: "plt.subplots()",
          definition: "Creates a Figure and a set of subplots.",
          syntax: "fig, ax = plt.subplots(nrows=1, ncols=1, figsize=(8,5))",
          parameters: "nrows: int, ncols: int, figsize: tuple",
          return_type: "(Figure, Axes)",
          example: "fig, ax = plt.subplots()\nax.plot([1,2],[3,4])",
          output: "Line plot figure",
          best_practice: "Always call `plt.close(fig)` after saving/rendering to prevent memory leaks.",
          time_complexity: "O(N)",
          space_complexity: "O(Pixels)"
        }
      ],
      code_examples: {
        beginner: {
          code: "import matplotlib.pyplot as plt\nplt.plot([1, 2, 3], [4, 5, 6])\nplt.title('Basic Line')\nplt.close()",
          explanation: "Simple line plot creation.",
          output: "Rendered line plot."
        },
        intermediate: {
          code: "import matplotlib.pyplot as plt\nfig, ax = plt.subplots(figsize=(6, 4))\nax.scatter([1, 2, 3], [10, 20, 30], color='cyan')\nax.set_xlabel('X Axis')\nplt.close(fig)",
          explanation: "Object-oriented scatter plot customization.",
          output: "Scatter plot with styled markers."
        },
        advanced: {
          code: "import matplotlib.pyplot as plt\nfig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10, 4))\nax1.plot([1,2], [3,4])\nax2.bar(['A', 'B'], [10, 20])\nplt.tight_layout()\nplt.close(fig)",
          explanation: "Multi-subplot layout using tight_layout for margin adjustment.",
          output: "Side-by-side subplot layout."
        },
        production: {
          code: "import matplotlib.pyplot as plt\ndef save_metric_plot(epochs, acc, filename):\n    fig, ax = plt.subplots(figsize=(7, 4))\n    ax.plot(epochs, acc, label='Train Acc', color='#10b981')\n    ax.set_title('Training Accuracy Trend')\n    ax.legend()\n    fig.savefig(filename, dpi=300, bbox_inches='tight')\n    plt.close(fig)\n\nsave_metric_plot([1, 2, 3], [0.8, 0.88, 0.94], 'acc.png')",
          explanation: "Production chart generator saving high-DPI images with explicit figure closing.",
          output: "Saved 'acc.png' image file."
        }
      },
      real_project_example: {
        title: "Model ROC Curve Diagnostic Renderer",
        description: "Renders ROC-AUC decision boundary curves for machine learning model evaluation.",
        code: "import matplotlib.pyplot as plt\nfig, ax = plt.subplots()\nax.plot([0, 1], [0, 1], 'k--', label='Random Baseline')\nax.plot([0, 0.2, 1], [0, 0.9, 1], label='Model (AUC = 0.92)', color='#38bdf8')\nax.set_xlabel('False Positive Rate')\nax.set_ylabel('True Positive Rate')\nax.legend()\nplt.close(fig)"
      },
      common_mistakes: [{ mistake: "Creating figures inside loops without calling `plt.close()`, causing severe memory leaks.", fix: "Call `plt.close(fig)` after every figure creation loop." }],
      best_practices: ["Use Object-Oriented `fig, ax = plt.subplots()` instead of global `plt.plot()`."],
      performance_tips: ["Use `plt.close('all')` in long loops to clear canvas buffers."],
      advantages: ["Unmatched layout control", "Integrates natively with Pandas and Seaborn"],
      limitations: ["Requires verbose code for complex multi-group plots"],
      comparison_table: [
        { feature: "API Paradigm", this_concept: "Object-Oriented (Figure/Axes)", alternate: "Pyplot Procedural State", winner: "Object-Oriented" }
      ],
      interview_questions: [{ q: "What is the difference between Figure and Axes in Matplotlib?", a: "Figure is the top-level outer canvas window. Axes is an individual subplot region containing ticks, labels, and rendered data points." }],
      tricky_questions: [{ q: "Tricky Q1: Why does creating 1000 plots in a loop crash Python if you don't call `plt.close()`?", a: "Matplotlib stores all created Figure canvas objects in global memory state until explicitly closed." }],
      coding_challenges: [{ difficulty: "Easy", problem: "Create a 2x1 subplot grid.", input: "None", output: "2 subplots", solution: "fig, axes = plt.subplots(2, 1)\nplt.close(fig)", complexity: "O(1)" }],
      quiz: [{ question: "Which object represents the individual plot region with x/y axes in Matplotlib?", options: ["Figure", "Axes", "Canvas", "Backend"], correct: 1, explanation: "Axes represents the individual plot area containing ticks and labels." }],
      revision_notes: ["Figure = Canvas, Axes = Plot region.", "Always call `plt.close(fig)` to free memory."],
      cheat_sheet: { key_syntax: "fig, ax = plt.subplots()", essential_methods: ["plot()", "scatter()", "bar()", "savefig()"], key_interview_points: ["Figure vs Axes", "Memory leaks in loops"] },
      related_topics: [{ title: "Seaborn Statistical Plots", id: "seaborn" }]
    },

    {
      id: "seaborn",
      title: "Seaborn",
      introduction: { what: "High-level statistical visualization library built on top of Matplotlib.", why_created: "Created by Michael Waskom to make statistical plotting intuitive and DataFrame-integrated.", why_needed: "Simplifies complex statistical plots like KDEs, violin plots, and correlation heatmaps.", history: "Integrates natively with Pandas DataFrames." },
      definition_beginner: "Seaborn is a Python library that creates beautiful statistical graphs automatically from Pandas DataFrames.",
      definition_interview: "A high-level statistical plotting interface built on Matplotlib, providing automated statistical aggregation, KDE estimations, and categorical encodings.",
      why_we_use: { purpose: "Exploratory Data Analysis (EDA), distribution checks, correlation matrix visualization.", benefits: ["DataFrame integrated", "Built-in statistical estimation", "Beautiful default themes"], problems_solved: ["Reduces 30 lines of Matplotlib code to 1 line"], real_world_importance: "Standard tool for initial data distribution exploration." },
      internal_working: { execution_flow: "DataFrame Input -> Statistical aggregation -> Matplotlib Axes rendering.", memory_behavior: "Delegates canvas allocation to Matplotlib.", processing_flow: "Input -> Aggregation -> Render.", diagram: `[Pandas DataFrame] ──> [Seaborn Stat Engine] ──> [Matplotlib Rendering]` },
      syntax: { basic: "import seaborn as sns\nsns.histplot(df['col'])", advanced: "sns.catplot(data=df, x='cat', y='val', hue='group', kind='box')", variations: ["sns.displot()", "sns.heatmap()"], keyword_explanation: "data accepts DataFrame; hue splits data by categorical colors." },
      parameters: [{ name: "data", type: "DataFrame", required: true, default_val: "None", description: "Source tabular dataset." }],
      return_value: { type: "Matplotlib Axes / FacetGrid", output_description: "Rendered statistical plot object.", examples: ["AxesSubplot"] },
      supported_operations: ["Distribution plots (displot, histplot, kdeplot)", "Categorical plots (boxplot, violinplot)", "Matrix plots (heatmap, pairplot)"],
      methods: [{ name: "sns.heatmap()", definition: "Renders a 2D color-encoded matrix (e.g. correlation matrix).", syntax: "sns.heatmap(data, annot=True, cmap='coolwarm')", parameters: "data: 2D matrix, annot: bool", return_type: "Axes", example: "sns.heatmap(df.corr(), annot=True)", output: "Correlation heatmap", best_practice: "Pass `annot=True` to display numerical correlation values.", time_complexity: "O(N^2)", space_complexity: "O(N^2)" }],
      code_examples: {
        beginner: { code: "import seaborn as sns\nimport pandas as pd\ndf = pd.DataFrame({'age': [20, 25, 30, 35]})\nsns.histplot(df['age'])\nplt.close()", explanation: "Basic distribution histogram.", output: "Histogram plot." },
        intermediate: { code: "import seaborn as sns\nimport numpy as np\nmatrix = np.random.rand(4, 4)\nsns.heatmap(matrix, annot=True)\nplt.close()", explanation: "Annotated correlation heatmap.", output: "2D Heatmap." },
        advanced: { code: "import seaborn as sns\ndf = sns.load_dataset('iris')\nsns.pairplot(df, hue='species')\nplt.close()", explanation: "Pairwise bivariate scatter plot matrix with categorical hue.", output: "Pairplot grid." },
        production: { code: "import seaborn as sns\nimport matplotlib.pyplot as plt\ndef save_corr_heatmap(df, filepath):\n    fig, ax = plt.subplots(figsize=(8, 6))\n    sns.heatmap(df.corr(), annot=True, fmt='.2f', cmap='Blues', ax=ax)\n    fig.savefig(filepath)\n    plt.close(fig)", explanation: "Production modular heatmap generator function.", output: "Saved heatmap image." }
      },
      real_project_example: { title: "Feature Correlation Bottleneck Detector", description: "Visualizes collinear features to select independent variables for regression.", code: "import seaborn as sns\nimport pandas as pd\ndf = pd.DataFrame({'A': [1,2,3], 'B': [2,4,6], 'C': [5,2,1]})\nsns.heatmap(df.corr(), annot=True)" },
      common_mistakes: [{ mistake: "Passing non-numeric columns to `df.corr()` in newer Pandas versions.", fix: "Use `df.select_dtypes(include='number').corr()`." }],
      best_practices: ["Use `sns.pairplot()` for initial multi-feature exploratory analysis."],
      performance_tips: ["Downsample massive datasets (>1M rows) before rendering pairplots to avoid freezing."],
      advantages: ["Minimal code for statistical plots", "Automatic categorical color encodings"],
      limitations: ["Less customizable for non-standard custom shapes than raw Matplotlib"],
      comparison_table: [{ feature: "Syntax Level", this_concept: "High-level Statistical", alternate: "Low-level Graphic Primitives", winner: "Seaborn" }],
      interview_questions: [{ q: "What is `sns.pairplot()` used for in EDA?", a: "It renders pairwise scatter plots across all numerical features along with distribution histograms along the main diagonal." }],
      tricky_questions: [{ q: "Tricky Q1: How do you access the underlying Matplotlib object from a Seaborn plot?", a: "Seaborn functions return Matplotlib `Axes` or `FacetGrid` objects directly, allowing standard `ax.set_title()` calls." }],
      coding_challenges: [{ difficulty: "Easy", problem: "Plot a boxplot of feature 'salary'.", input: "df", output: "Boxplot", solution: "sns.boxplot(y=df['salary'])\nplt.close()", complexity: "O(N)" }],
      quiz: [{ question: "Which Seaborn function displays pairwise bivariate scatter plots across all numeric features?", options: ["heatmap()", "pairplot()", "catplot()", "histplot()"], correct: 1, explanation: "pairplot() generates a matrix grid of pairwise scatter plots." }],
      revision_notes: ["Seaborn wraps Matplotlib with high-level statistical functions.", "heatmap() requires numeric 2D correlation matrices."],
      cheat_sheet: { key_syntax: "import seaborn as sns; sns.histplot(df['col'])", essential_methods: ["histplot()", "heatmap()", "pairplot()", "boxplot()"], key_interview_points: ["DataFrame integration", "Pairplot grid analysis"] },
      related_topics: [{ title: "Matplotlib Core", id: "matplotlib" }]
    },

    {
      id: "scikit_learn",
      title: "Scikit-Learn",
      introduction: { what: "The premier classical Machine Learning library in Python.", why_created: "Started as a Google Summer of Code project by David Cournapeau in 2007.", why_needed: "Provides unified estimator APIs (`fit`, `transform`, `predict`) for all classical ML algorithms.", history: "Maintained by INRIA and community, built on NumPy, SciPy, and Cython." },
      definition_beginner: "Scikit-Learn is a Python library containing algorithms for classification, regression, clustering, and data preprocessing.",
      definition_interview: "A unified machine learning framework designed around Transformer (`fit`/`transform`) and Estimator (`fit`/`predict`) object contracts with Pipeline encapsulation.",
      why_we_use: { purpose: "Data preprocessing, feature scaling, model training, cross-validation, hyperparameter tuning, metric evaluation.", benefits: ["Consistent API contract", "Built-in pipelines preventing data leakage", "Highly optimized Cython code"], problems_solved: ["Eliminates custom ML algorithm coding from scratch"], real_world_importance: "Industry standard for tabular Machine Learning." },
      internal_working: { execution_flow: "Pipeline instantiation -> fit() computes train stats -> transform() applies scaling -> predict() executes model inference.", memory_behavior: "Operates on contiguous C-ordered NumPy arrays.", processing_flow: "Input -> Transformer -> Estimator -> Prediction.", diagram: `[Raw Data] ──> [ColumnTransformer] ──> [Pipeline] ──> [Model Predict]` },
      syntax: { basic: "from sklearn.linear_model import LogisticRegression\nmodel = LogisticRegression()\nmodel.fit(X_train, y_train)", advanced: "from sklearn.pipeline import Pipeline\npipe = Pipeline([('scaler', StandardScaler()), ('clf', LogisticRegression())])", variations: ["model.fit()", "model.predict()", "model.predict_proba()"], keyword_explanation: "fit computes internal parameters; transform modifies data; predict yields target labels." },
      parameters: [{ name: "estimator", type: "BaseEstimator", required: true, default_val: "None", description: "Scikit-Learn ML algorithm object." }],
      return_value: { type: "numpy.ndarray", output_description: "Predicted target labels or scaled numerical matrices.", examples: ["array([0, 1, 1, 0])"] },
      supported_operations: ["Preprocessing (StandardScaler, OneHotEncoder)", "Pipelines", "Model Training (Linear, Trees, Ensembles)", "Evaluation Metrics"],
      methods: [{ name: "model.fit()", definition: "Computes model weights or transformation parameters from training data.", syntax: "model.fit(X_train, y_train)", parameters: "X_train: features, y_train: targets", return_type: "self", example: "clf.fit(X, y)", output: "Fitted model object", best_practice: "Call fit ONLY on training data splits.", time_complexity: "O(N * M)", space_complexity: "O(Weights)" }],
      code_examples: {
        beginner: { code: "from sklearn.linear_model import LogisticRegression\nimport numpy as np\nX = np.array([[1], [2], [3], [4]])\ny = np.array([0, 0, 1, 1])\nclf = LogisticRegression().fit(X, y)\nprint(clf.predict([[2.5]]))", explanation: "Basic fitting and prediction.", output: "[1]" },
        intermediate: { code: "from sklearn.preprocessing import StandardScaler\nimport numpy as np\nX = np.array([[10.0], [20.0], [30.0]])\nscaler = StandardScaler()\nscaled = scaler.fit_transform(X)\nprint('Scaled mean:', scaled.mean())", explanation: "StandardScaler transformation.", output: "Scaled mean: 0.0" },
        advanced: { code: "from sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\npipe = Pipeline([('scaler', StandardScaler()), ('clf', LogisticRegression())])\npipe.fit(X, y)\nprint('Pipeline score:', pipe.score(X, y))", explanation: "Encapsulated pipeline setup.", output: "Pipeline score metric." },
        production: { code: "from sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.ensemble import RandomForestClassifier\nimport joblib\n\ndef train_and_export(X, y, filepath):\n    pipe = Pipeline([('scaler', StandardScaler()), ('rf', RandomForestClassifier(n_estimators=50))])\n    pipe.fit(X, y)\n    joblib.dump(pipe, filepath)\n    return 'Model Exported'\n\nprint(train_and_export(X, y, 'model.joblib'))", explanation: "Production training and serialization workflow.", output: "Model Exported" }
      },
      real_project_example: { title: "Automated Customer Churn Classifier", description: "Chains ColumnTransformer preprocessing and Random Forest classifier inside a single pipeline.", code: "from sklearn.pipeline import Pipeline\nfrom sklearn.ensemble import RandomForestClassifier\npipe = Pipeline([('clf', RandomForestClassifier())])" },
      common_mistakes: [{ mistake: "Calling `fit_transform()` on test data, introducing severe data leakage.", fix: "Call `fit_transform()` on train data, but ONLY `transform()` on test data." }],
      best_practices: ["Always wrap preprocessing and estimators inside a `Pipeline`."],
      performance_tips: ["Set `n_jobs=-1` in estimators to utilize all CPU cores in parallel."],
      advantages: ["Unified API across hundreds of algorithms", "Prevents data leakage via Pipelines"],
      limitations: ["No native GPU support for classical algorithms (use cuML for GPU)"],
      comparison_table: [{ feature: "API Uniformity", this_concept: "Unified fit/predict contract", alternate: "Custom per-algorithm methods", winner: "Scikit-Learn" }],
      interview_questions: [{ q: "What is data leakage and how do Scikit-Learn Pipelines prevent it?", a: "Data leakage happens when test dataset statistics leak into training. Pipelines prevent this by applying `fit()` strictly on training folds during CV." }],
      tricky_questions: [{ q: "Tricky Q1: Why must you use `scaler.transform(X_test)` instead of `fit_transform(X_test)`?", a: "`fit_transform` recalculates mean/std from the test set, leaking test distribution information into preprocessing." }],
      coding_challenges: [{ difficulty: "Easy", problem: "Split dataset into 80% train and 20% test splits.", input: "X, y", output: "X_train, X_test, y_train, y_test", solution: "from sklearn.model_selection import train_test_split\nX_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2)", complexity: "O(N)" }],
      quiz: [{ question: "Which method computes transformation parameters AND transforms training data in a single call?", options: ["fit()", "transform()", "fit_transform()", "predict()"], correct: 2, explanation: "fit_transform() combines parameter fitting and array transformation." }],
      revision_notes: ["Transformers use fit/transform; Estimators use fit/predict.", "Always fit scalers on training splits only."],
      cheat_sheet: { key_syntax: "from sklearn.pipeline import Pipeline", essential_methods: ["fit()", "transform()", "predict()", "score()"], key_interview_points: ["Data leakage prevention", "Pipeline architecture", "fit vs transform"] },
      related_topics: [{ title: "Feature Scaling in ML", id: "feature_scaling" }]
    },

    {
      id: "nltk",
      title: "NLTK",
      introduction: { what: "Natural Language Toolkit for symbolic and statistical NLP in Python.", why_created: "Created by Steven Bird and Edward Loper at UPenn in 2001 for NLP education.", why_needed: "Provides tokenization, stemming, lemmatization, and POS tagging routines.", history: "The classic foundational NLP toolkit in Python." },
      definition_beginner: "NLTK is a Python library used to break text into words, find root words, and analyze sentence structures.",
      definition_interview: "A suite of text processing libraries providing tokenization, morphological stemming, WordNet lemmatization, and syntactic POS tagging.",
      why_we_use: { purpose: "Text preprocessing, tokenization, lemmatization, sentiment preprocessing.", benefits: ["Rich linguistic corpora", "WordNet morphological integration"], problems_solved: ["Standardizes raw text strings into numeric tokens"], real_world_importance: "Used for text preprocessing in classical NLP pipelines." },
      internal_working: { execution_flow: "Raw Text -> Tokenizer -> Stemmer/Lemmatizer -> POS Tagger -> Clean Tokens.", memory_behavior: "Loads NLTK corpora dictionaries into memory on demand.", processing_flow: "String -> Tokens -> Lemmas.", diagram: `[Raw Text String] ──> [Word Tokenizer] ──> [WordNet Lemmatizer]` },
      syntax: { basic: "import nltk\nfrom nltk.tokenize import word_tokenize\ntokens = word_tokenize('Hello world')", advanced: "from nltk.stem import WordNetLemmatizer\nlem = WordNetLemmatizer()\nlem.lemmatize('running', pos='v')", variations: ["sent_tokenize()", "word_tokenize()"], keyword_explanation: "word_tokenize splits text into word tokens using Penn Treebank rules." },
      parameters: [{ name: "text", type: "str", required: true, default_val: "None", description: "Input string text to tokenize or process." }],
      return_value: { type: "list[str]", output_description: "List of tokenized word strings.", examples: ["['Hello', 'world']"] },
      supported_operations: ["Tokenization", "Stemming (Porter, Snowball)", "Lemmatization (WordNet)", "POS Tagging"],
      methods: [{ name: "word_tokenize()", definition: "Splits string text into word tokens.", syntax: "word_tokenize(text)", parameters: "text: str", return_type: "list[str]", example: "word_tokenize('Data Science')", output: "['Data', 'Science']", best_practice: "Download 'punkt' NLTK resource before tokenizing.", time_complexity: "O(N)", space_complexity: "O(N)" }],
      code_examples: {
        beginner: { code: "import nltk\nfrom nltk.tokenize import word_tokenize\nprint(word_tokenize('Python is great'))", explanation: "Basic word tokenization.", output: "['Python', 'is', 'great']" },
        intermediate: { code: "from nltk.stem import PorterStemmer, WordNetLemmatizer\ns = PorterStemmer()\nprint('Stemmed:', s.stem('running'))", explanation: "Porter stemming example.", output: "Stemmed: run" },
        advanced: { code: "from nltk.corpus import stopwords\nfrom nltk.tokenize import word_tokenize\nsw = set(stopwords.words('english'))\ntokens = [w for w in word_tokenize('This is a test') if w.lower() not in sw]\nprint(tokens)", explanation: "Stopword removal pipeline.", output: "['test']" },
        production: { code: "from nltk.stem import WordNetLemmatizer\nfrom nltk.tokenize import word_tokenize\ndef clean_nlp_text(text):\n    lem = WordNetLemmatizer()\n    tokens = word_tokenize(text.lower())\n    return [lem.lemmatize(t) for t in tokens if t.isalnum()]\n\nprint(clean_nlp_text('The 2 cats were running fast!'))", explanation: "Production text cleaning and lemmatization pipeline.", output: "['the', '2', 'cat', 'were', 'running', 'fast']" }
      },
      real_project_example: { title: "Customer Review Sentiment Text Preprocessor", description: "Tokenizes customer reviews, removes stopwords, and lemmatizes root words before TF-IDF vectorization.", code: "from nltk.tokenize import word_tokenize\ntokens = word_tokenize('Great product!')" },
      common_mistakes: [{ mistake: "Using Stemming instead of Lemmatization when valid words are required for reporting.", fix: "Use WordNetLemmatizer with proper POS tags." }],
      best_practices: ["Pass explicit POS tags to `lemmatize(word, pos='v')` for accurate verb root restoration."],
      performance_tips: ["Use SpaCy or HuggingFace Tokenizers for high-speed multi-threaded production pipelines."],
      advantages: ["Extensive linguistic corpora", "Comprehensive rule-based NLP tools"],
      limitations: ["Slower execution speed compared to SpaCy or C++ tokenizers"],
      comparison_table: [{ feature: "Root Word Output", this_concept: "Lemmatization (Valid Lemma)", alternate: "Stemming (Heuristic Chopping)", winner: "Lemmatization" }],
      interview_questions: [{ q: "What is the key difference between Stemming and Lemmatization?", a: "Stemming uses simple heuristic rules to chop word ends (often yielding invalid words). Lemmatization uses morphological dictionaries to return valid base words (lemmas)." }],
      tricky_questions: [{ q: "Tricky Q1: Why does NLTK word_tokenize split 'don't' into ['do', \"n't\"]?", a: "It uses Penn Treebank tokenization rules to isolate auxiliary verbs and negation tokens for POS parsing." }],
      coding_challenges: [{ difficulty: "Easy", problem: "Tokenize a sentence into words.", input: "text", output: "tokens list", solution: "from nltk.tokenize import word_tokenize\ntokens = word_tokenize(text)", complexity: "O(N)" }],
      quiz: [{ question: "Which NLTK technique guarantees returning valid dictionary base words?", options: ["Stemming", "Lemmatization", "Tokenization", "Regex"], correct: 1, explanation: "Lemmatization uses WordNet dictionary lookup to guarantee valid root lemmas." }],
      revision_notes: ["Stemming = rule chopping; Lemmatization = dictionary lookup.", "WordNet requires POS tag context."],
      cheat_sheet: { key_syntax: "from nltk.tokenize import word_tokenize", essential_methods: ["word_tokenize()", "sent_tokenize()", "lemmatize()", "stem()"], key_interview_points: ["Stemming vs Lemmatization", "Penn Treebank tokenization"] },
      related_topics: [{ title: "NLP Fundamentals", id: "nlp_fundamentals" }]
    },

    {
      id: "opencv",
      title: "OpenCV",
      introduction: { what: "Open Source Computer Vision Library for real-time image and video processing.", why_created: "Created by Intel in 1999 to accelerate vision-intensive applications.", why_needed: "Processes image matrices, edge detection, facial recognition, and video camera streams in real time.", history: "Written in C++, with Python, Java, and MATLAB bindings." },
      definition_beginner: "OpenCV is a Python library used to read, edit, process, and analyze images and video camera feeds.",
      definition_interview: "A real-time C++ computer vision library with Python bindings that models images as 3D BGR NumPy arrays.",
      why_we_use: { purpose: "Image resizing, grayscale conversion, Canny edge detection, contour extraction, facial detection.", benefits: ["Ultra-fast C++ backend", "Real-time camera frame processing", "Direct NumPy interop"], problems_solved: ["Eliminates slow Python pixel loops"], real_world_importance: "Used in autonomous driving, security cameras, and visual AI." },
      internal_working: { execution_flow: "Image File/Camera Stream -> C++ Image Decoder -> BGR NumPy 3D Array -> Vision Kernel -> Render.", memory_behavior: "Loads images directly as uint8 3D NumPy arrays.", processing_flow: "Image -> BGR Array -> Vision Filter -> Output.", diagram: `[Camera Feed / Image] ──> [OpenCV C++ Engine] ──> [3D BGR NumPy Array]` },
      syntax: { basic: "import cv2\nimg = cv2.imread('photo.jpg')\ngray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)", advanced: "edges = cv2.Canny(gray, 100, 200)\ncontours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)", variations: ["cv2.imread()", "cv2.imwrite()", "cv2.resize()"], keyword_explanation: "COLOR_BGR2GRAY converts 3-channel BGR into 1-channel grayscale." },
      parameters: [{ name: "filename", type: "str", required: true, default_val: "None", description: "Path to input image file." }],
      return_value: { type: "numpy.ndarray (uint8)", output_description: "3D BGR image tensor (height, width, channels).", examples: ["ndarray shape (1080, 1920, 3)"] },
      supported_operations: ["Image Loading/Saving", "Color Space Conversions (BGR, RGB, HSV, GRAY)", "Canny Edge Detection", "Contour Finding"],
      methods: [{ name: "cv2.imread()", definition: "Loads an image from file into a BGR NumPy ndarray.", syntax: "cv2.imread(filename, flags=cv2.IMREAD_COLOR)", parameters: "filename: str, flags: int", return_type: "ndarray", example: "img = cv2.imread('car.png')", output: "3D BGR ndarray", best_practice: "Always check `if img is None:` to verify file loading succeeded.", time_complexity: "O(H * W)", space_complexity: "O(H * W * C)" }],
      code_examples: {
        beginner: { code: "import cv2\nimport numpy as np\nimg = np.zeros((100, 100, 3), dtype=np.uint8)\nprint('Image shape:', img.shape)", explanation: "Synthetic image matrix creation.", output: "Image shape: (100, 100, 3)" },
        intermediate: { code: "import cv2\nimport numpy as np\nimg = np.zeros((100, 100, 3), dtype=np.uint8)\ngray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)\nprint('Gray shape:', gray.shape)", explanation: "Converting color BGR to grayscale.", output: "Gray shape: (100, 100)" },
        advanced: { code: "import cv2\nimport numpy as np\nimg = np.zeros((200, 200), dtype=np.uint8)\ncv2.rectangle(img, (50, 50), (150, 150), 255, -1)\nedges = cv2.Canny(img, 100, 200)\nprint('Edges non-zero count:', np.count_nonzero(edges))", explanation: "Canny edge detection on shape boundaries.", output: "Non-zero edge pixel count." },
        production: { code: "import cv2\nimport numpy as np\ndef preprocess_vision_frame(frame_bgr, target_size=(224, 224)):\n    if frame_bgr is None: return None\n    rgb = cv2.cvtColor(frame_bgr, cv2.COLOR_BGR2RGB)\n    resized = cv2.resize(rgb, target_size)\n    normalized = resized.astype(np.float32) / 255.0\n    return normalized\n\nframe = np.random.randint(0, 256, (480, 640, 3), dtype=np.uint8)\nprocessed = preprocess_vision_frame(frame)\nprint('Processed tensor shape:', processed.shape)", explanation: "Production vision preprocessing pipeline for Deep Learning inference.", output: "Processed tensor shape: (224, 224, 3)" }
      },
      real_project_example: { title: "Automated License Plate Contour Extractor", description: "Converts camera frames to grayscale, applies Canny edge detection, and locates rectangular license plate contours.", code: "import cv2\ncontours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)" },
      common_mistakes: [{ mistake: "Displaying OpenCV BGR images using Matplotlib without converting to RGB (colors appear blue-swapped!).", fix: "Call `cv2.cvtColor(img, cv2.COLOR_BGR2RGB)` before plotting with Matplotlib." }],
      best_practices: ["Check `if img is None:` after `imread()` to catch missing file path errors cleanly."],
      performance_tips: ["Downsample frame resolution using `cv2.resize()` before running heavy contour detection."],
      advantages: ["Ultra-fast C++ backend", "Native 3D NumPy tensor representation"],
      limitations: ["Uses legacy BGR color channel order by default"],
      comparison_table: [{ feature: "Channel Order", this_concept: "BGR (Blue, Green, Red)", alternate: "RGB (Red, Green, Blue)", winner: "Requires Conversion for Matplotlib" }],
      interview_questions: [{ q: "Why does OpenCV load images in BGR format instead of RGB?", a: "Historical artifact from early camera hardware manufacturers who standardized on BGR byte ordering." }],
      tricky_questions: [{ q: "Tricky Q1: Why does `cv2.findContours` fail on a raw color image?", a: "Contour detection requires a 1-channel binary thresholded image (white objects on black background)." }],
      coding_challenges: [{ difficulty: "Easy", problem: "Resize an image to 100x100 pixels.", input: "img array", output: "resized array", solution: "resized = cv2.resize(img, (100, 100))", complexity: "O(H * W)" }],
      quiz: [{ question: "What default color channel order does OpenCV use when reading images?", options: ["RGB", "BGR", "HSV", "YUV"], correct: 1, explanation: "OpenCV loads color images in BGR order by default." }],
      revision_notes: ["OpenCV loads images as BGR NumPy arrays.", "Use Canny for edge detection and findContours for shape boundaries."],
      cheat_sheet: { key_syntax: "import cv2; img = cv2.imread('photo.jpg')", essential_methods: ["imread()", "cvtColor()", "resize()", "Canny()", "findContours()"], key_interview_points: ["BGR channel order", "Canny edge detection", "Contour finding"] },
      related_topics: [{ title: "PyTorch Computer Vision", id: "pytorch" }]
    },

    {
      id: "tensorflow",
      title: "TensorFlow",
      introduction: { what: "Google's open-source end-to-end platform for machine learning and deep neural networks.", why_created: "Created by Google Brain in 2015 as the successor to DistBelief.", why_needed: "Scales deep neural network training across CPU, GPU, and TPU clusters with XLA compilation.", history: "Evolved from static graphs (TF 1.x) to Keras integration and Eager Execution (TF 2.x)." },
      definition_beginner: "TensorFlow is Google's deep learning library used to build, train, and deploy artificial neural networks.",
      definition_interview: "An end-to-end ML platform leveraging computational graphs, XLA compilation, automatic differentiation (`tf.GradientTape`), and Keras high-level APIs.",
      why_we_use: { purpose: "Deep neural networks, CNN image classification, RNN sequence modeling, TFLite mobile AI deployment.", benefits: ["Production serving via TF Serving", "Mobile deployment via TFLite", "TPU hardware acceleration"], problems_solved: ["Scales model training to petabytes"], real_world_importance: "Powers Google Search, YouTube recommendations, and Waymo autonomous driving." },
      internal_working: { execution_flow: "Keras Layer instantiation -> Automatic Differentiation via tf.GradientTape -> XLA Compilation -> GPU/TPU kernel execution.", memory_behavior: "Allocates GPU VRAM pools dynamically.", processing_flow: "Tensor Input -> Layers -> Loss -> Backprop -> Weight Update.", diagram: `[Input Tensor] ──> [Keras Sequential Model] ──> [tf.GradientTape Autodiff]` },
      syntax: { basic: "import tensorflow as tf\nmodel = tf.keras.Sequential([tf.keras.layers.Dense(10)])", advanced: "@tf.function\ndef train_step(x, y):\n    with tf.GradientTape() as tape:\n        pred = model(x)\n        loss = loss_fn(y, pred)\n    grads = tape.gradient(loss, model.trainable_variables)", variations: ["tf.keras.Sequential()", "tf.keras.Model()"], keyword_explanation: "GradientTape records operations for automatic backpropagation differentiation." },
      parameters: [{ name: "units", type: "int", required: true, default_val: "None", description: "Number of output neuron nodes in Dense layer." }],
      return_value: { type: "tf.Tensor / Keras Model", output_description: "Tensor object or compiled Keras neural network.", examples: ["Tensor shape=(32, 10)"] },
      supported_operations: ["Keras Model Building", "Automatic Differentiation (GradientTape)", "Graph Execution (@tf.function)", "TF Serving"],
      methods: [{ name: "tf.GradientTape()", definition: "Context manager recording operations for computing automatic gradients.", syntax: "with tf.GradientTape() as tape: loss = ...", parameters: "persistent: bool", return_type: "GradientTape", example: "with tf.GradientTape() as tape:\n    y = x ** 2\ngrad = tape.gradient(y, x)", output: "Gradient tensor", best_practice: "Use persistent=True if calculating multiple gradients from single tape.", time_complexity: "O(Forward Pass)", space_complexity: "O(Graph Size)" }],
      code_examples: {
        beginner: { code: "import tensorflow as tf\nmodel = tf.keras.Sequential([tf.keras.layers.Dense(1, input_shape=(1,))])\nprint(model.summary())", explanation: "Basic Keras model summary.", output: "Keras model architecture table." },
        intermediate: { code: "import tensorflow as tf\nx = tf.Variable(3.0)\nwith tf.GradientTape() as tape:\n    y = x ** 2\ngrad = tape.gradient(y, x)\nprint('dy/dx at x=3:', grad.numpy())", explanation: "Automatic differentiation via GradientTape.", output: "dy/dx at x=3: 6.0" },
        advanced: { code: "import tensorflow as tf\n@tf.function\ndef fast_add(a, b):\n    return a + b\nprint(fast_add(tf.constant(2), tf.constant(3)).numpy())", explanation: "AutoGraph execution with @tf.function.", output: "5" },
        production: { code: "import tensorflow as tf\ndef build_production_classifier(num_classes=2):\n    inputs = tf.keras.Input(shape=(10,))\n    x = tf.keras.layers.Dense(32, activation='relu')(inputs)\n    x = tf.keras.layers.Dropout(0.2)(x)\n    outputs = tf.keras.layers.Dense(num_classes, activation='softmax')(x)\n    model = tf.keras.Model(inputs=inputs, outputs=outputs)\n    model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])\n    return model\n\nm = build_production_classifier()\nprint('Model compiled successfully.')", explanation: "Functional API Keras production classifier architecture.", output: "Model compiled successfully." }
      },
      real_project_example: { title: "Production Image Classification Pipeline", description: "Builds a CNN image classifier compiled with XLA for fast GPU inference.", code: "model = tf.keras.Sequential([tf.keras.layers.Conv2D(32, 3), tf.keras.layers.Dense(10)])" },
      common_mistakes: [{ mistake: "Executing heavy loops inside Eager mode instead of decorating with `@tf.function`.", fix: "Decorate production training steps with `@tf.function` for graph compilation." }],
      best_practices: ["Use `@tf.function` to compile eager routines into optimized static computation graphs."],
      performance_tips: ["Use `tf.data.Dataset.prefetch(buffer_size=tf.data.AUTOTUNE)` to prevent GPU input starvation."],
      advantages: ["Seamless production serving via TF Serving", "Native mobile AI via TFLite"],
      limitations: ["Higher API abstraction complexity compared to PyTorch"],
      comparison_table: [{ feature: "Graph Mode", this_concept: "AutoGraph (@tf.function)", alternate: "Dynamic Autograd Graph", winner: "TensorFlow" }],
      interview_questions: [{ q: "What context manager is used in TensorFlow to record operations for automatic differentiation?", a: "`tf.GradientTape()` records forward operations onto a tape to calculate backward gradients." }],
      tricky_questions: [{ q: "Tricky Q1: What is the difference between Eager Execution and @tf.function Graph Execution?", a: "Eager execution evaluates operations imperatively step-by-step. @tf.function compiles Python code into a C++ AutoGraph computational graph." }],
      coding_challenges: [{ difficulty: "Easy", problem: "Compute gradient of y = x^3 at x = 2.", input: "x = 2.0", output: "12.0", solution: "x = tf.Variable(2.0)\nwith tf.GradientTape() as t:\n    y = x**3\nprint(t.gradient(y, x).numpy())", complexity: "O(1)" }],
      quiz: [{ question: "Which feature compiles Python functions into optimized C++ computational graphs in TensorFlow 2.x?", options: ["@tf.function", "tf.GradientTape()", "Keras", "TFLite"], correct: 0, explanation: "@tf.function converts eager Python code into optimized AutoGraph graphs." }],
      revision_notes: ["GradientTape records autodiff operations.", "@tf.function compiles AutoGraph speedups."],
      cheat_sheet: { key_syntax: "import tensorflow as tf; model = tf.keras.Sequential()", essential_methods: ["GradientTape()", "@tf.function", "Sequential()", "compile()"], key_interview_points: ["tf.GradientTape autodiff", "@tf.function AutoGraph"] },
      related_topics: [{ title: "PyTorch Framework", id: "pytorch" }]
    },

    {
      id: "pytorch",
      title: "PyTorch",
      introduction: { what: "Meta's open-source deep learning framework based on dynamic computation graphs.", why_created: "Created by Adam Paszke, Sam Gross, Soumith Chintala at Meta AI in 2016.", why_needed: "Offers dynamic define-by-run computation graphs and Pythonic debugging.", history: "Dominates AI research and Large Language Model (LLM) development." },
      definition_beginner: "PyTorch is Meta's deep learning library used to train neural networks using Pythonic code.",
      definition_interview: "An open-source deep learning framework built on dynamic computation graphs (Autograd) and C++ LibTorch backend.",
      why_we_use: { purpose: "LLM fine-tuning, research prototyping, computer vision, generative AI (Stable Diffusion).", benefits: ["Dynamic computation graph (define-by-run)", "Intuitive Pythonic debugging", "Native PyTorch 2.0 torch.compile()"], problems_solved: ["Eliminates rigid static graph debugging friction"], real_world_importance: "Used by Meta, OpenAI, Hugging Face, and 80%+ of AI research." },
      internal_working: { execution_flow: "Tensor creation -> Dynamic Autograd DAG construction during forward pass -> loss.backward() -> optimizer.step().", memory_behavior: "Autograd tracks operations in dynamic node memory buffers.", processing_flow: "Forward Pass -> DAG Built -> Backward Pass -> Optimizer Step.", diagram: `[Input Tensor] ──> [Dynamic Autograd DAG] ──> [loss.backward()]` },
      syntax: { basic: "import torch\nx = torch.randn(3, 3, requires_grad=True)", advanced: "class Net(nn.Module):\n    def __init__(self): super().__init__(); self.fc = nn.Linear(10, 2)\n    def forward(self, x): return self.fc(x)", variations: ["nn.Module", "torch.tensor()"], keyword_explanation: "requires_grad=True instructs Autograd to track tensor operations." },
      parameters: [{ name: "requires_grad", type: "bool", required: false, default_val: "False", description: "If True, tracks operations for backward Autograd differentiation." }],
      return_value: { type: "torch.Tensor", output_description: "Multi-dimensional tensor object with GPU support.", examples: ["tensor([1.0, 2.0])"] },
      supported_operations: ["Dynamic Autograd", "nn.Module Model Building", "GPU CUDA Acceleration", "torch.compile()"],
      methods: [{ name: "loss.backward()", definition: "Computes the sum of gradients of given tensor w.r.t. graph leaves.", syntax: "loss.backward()", parameters: "None", return_type: "None", example: "loss = (x**2).sum()\nloss.backward()\nprint(x.grad)", output: "Gradients populated in x.grad", best_practice: "Always call optimizer.zero_grad() before backward().", time_complexity: "O(Graph Size)", space_complexity: "O(Graph Size)" }],
      code_examples: {
        beginner: { code: "import torch\nx = torch.tensor([2.0], requires_grad=True)\ny = x ** 3\ny.backward()\nprint('dy/dx:', x.grad.item())", explanation: "Dynamic Autograd derivative calculation.", output: "dy/dx: 12.0" },
        intermediate: { code: "import torch\nimport torch.nn as nn\nmodel = nn.Linear(5, 1)\nx = torch.randn(2, 5)\nprint('Output shape:', model(x).shape)", explanation: "nn.Linear layer forward pass.", output: "Output shape: torch.Size([2, 1])" },
        advanced: { code: "import torch\nimport torch.nn as nn\nclass MLP(nn.Module):\n    def __init__(self):\n        super().__init__()\n        self.fc = nn.Linear(10, 2)\n    def forward(self, x):\n        return self.fc(x)\n\nm = MLP()\nprint(m)", explanation: "Custom nn.Module architecture subclassing.", output: "MLP model architecture description." },
        production: { code: "import torch\nimport torch.nn as nn\nimport torch.optim as optim\n\ndef train_step_production(model, optimizer, criterion, inputs, targets):\n    model.train()\n    optimizer.zero_grad()\n    outputs = model(inputs)\n    loss = criterion(outputs, targets)\n    loss.backward()\n    optimizer.step()\n    return loss.item()\n\nprint('Production training step loop defined.')", explanation: "Production training step enforcing zero_grad, backward, and step execution order.", output: "Production training step loop defined." }
      },
      real_project_example: { title: "LLM Fine-Tuning Training Loop Engine", description: "Implements the core training loop for backpropagating gradients during transformer fine-tuning.", code: "optimizer.zero_grad()\nloss.backward()\noptimizer.step()" },
      common_mistakes: [{ mistake: "Forgetting `optimizer.zero_grad()` in training loops, causing gradient accumulation across iterations.", fix: "Always call `optimizer.zero_grad()` before `loss.backward()`." }],
      best_practices: ["Use `with torch.no_grad():` during evaluation to disable Autograd and save VRAM."],
      performance_tips: ["Use `torch.compile(model)` in PyTorch 2.0+ for 20-30% speedups on modern GPUs."],
      advantages: ["Dynamic define-by-run graphs", "Pythonic debugging", "Dominates AI research and LLMs"],
      limitations: ["Requires manual write of training loops compared to high-level Keras"],
      comparison_table: [{ feature: "Graph Construction", this_concept: "Dynamic (Define-by-run)", alternate: "Static / AutoGraph", winner: "PyTorch" }],
      interview_questions: [{ q: "Why is `optimizer.zero_grad()` required before `loss.backward()` in PyTorch?", a: "PyTorch accumulates gradients into `tensor.grad` (`+=`) by default across backward calls. Zeroing clears old gradients." }],
      tricky_questions: [{ q: "Tricky Q1: What is the difference between model.eval() and with torch.no_grad():?", a: "`model.eval()` toggles layer behavior (disables Dropout/BatchNorm updating). `torch.no_grad()` disables Autograd memory tracking." }],
      coding_challenges: [{ difficulty: "Easy", problem: "Compute gradient of y = 2x^2 at x = 3.", input: "x = 3.0", output: "12.0", solution: "x = torch.tensor([3.0], requires_grad=True)\ny = 2 * x**2\ny.backward()\nprint(x.grad.item())", complexity: "O(1)" }],
      quiz: [{ question: "Which method in PyTorch calculates backward gradients via Autograd?", options: ["loss.backward()", "optimizer.step()", "zero_grad()", "forward()"], correct: 0, explanation: "loss.backward() computes gradients along the dynamic Autograd DAG." }],
      revision_notes: ["PyTorch uses dynamic graphs.", "Call zero_grad() -> backward() -> step() in training loops."],
      cheat_sheet: { key_syntax: "import torch; import torch.nn as nn", essential_methods: ["backward()", "zero_grad()", "step()", "no_grad()"], key_interview_points: ["Dynamic Autograd DAG", "zero_grad requirement", "model.eval vs no_grad"] },
      related_topics: [{ title: "TensorFlow Engine", id: "tensorflow" }]
    },

    {
      id: "transformers",
      title: "Transformers",
      introduction: { what: "Hugging Face library providing state-of-the-art pretrained transformer models (BERT, GPT, RoBERTa, LLaMA).", why_created: "Created by Hugging Face in 2018 to democratize NLP models.", why_needed: "Downloads and fine-tunes Transformer models with simple high-level APIs.", history: "Based on Vaswani et al. 2017 paper 'Attention Is All You Need'." },
      definition_beginner: "Transformers is a Hugging Face library used to run and fine-tune AI models for text, vision, and audio.",
      definition_interview: "A state-of-the-art model repository and fine-tuning framework implementing Multi-Head Self-Attention architectures.",
      why_we_use: { purpose: "Text classification, translation, summarization, LLM fine-tuning (LoRA), zero-shot inference.", benefits: ["Access to 500,000+ pretrained weights", "Subword tokenization", "PEFT/LoRA integration"], problems_solved: ["Eliminates building transformers from scratch"], real_world_importance: "Powers modern Generative AI." },
      internal_working: { execution_flow: "Text Input -> Subword Tokenizer -> Token IDs & Attention Mask -> Multi-Head Self-Attention -> Softmax Output.", memory_behavior: "Loads multi-billion parameter weights into VRAM.", processing_flow: "Text -> Tokens -> Self-Attention -> Generated Output.", diagram: `[Raw Text] ──> [Subword Tokenizer] ──> [Self-Attention Heads] ──> [Output]` },
      syntax: { basic: "from transformers import pipeline\npipe = pipeline('sentiment-analysis')\nprint(pipe('Great course'))", advanced: "from transformers import AutoTokenizer, AutoModel\ntok = AutoTokenizer.from_pretrained('bert-base-uncased')", variations: ["pipeline()", "AutoModelForCausalLM"], keyword_explanation: "pipeline provides end-to-end zero-shot task execution." },
      parameters: [{ name: "task", type: "str", required: true, default_val: "None", description: "Target NLP/Vision task (e.g. 'sentiment-analysis', 'text-generation')." }],
      return_value: { type: "Pipeline / PreTrainedModel", output_description: "Task inference result or model weight object.", examples: ["[{'label': 'POSITIVE', 'score': 0.99}]"] },
      supported_operations: ["Zero-Shot Pipeline Inference", "Subword Tokenization", "PEFT / LoRA Fine-Tuning"],
      methods: [{ name: "pipeline()", definition: "High-level utility wrapping tokenization and model inference into a single call.", syntax: "pipeline(task, model=None)", parameters: "task: str, model: str", return_type: "Pipeline", example: "nlp = pipeline('summarization')\nres = nlp(text)", output: "Summarized text output", best_practice: "Specify explicit model name to avoid default fallback warnings.", time_complexity: "O(Seq Length^2)", space_complexity: "O(Seq Length^2)" }],
      code_examples: {
        beginner: { code: "from transformers import pipeline\nclf = pipeline('sentiment-analysis')\nprint(clf('I love AI!'))", explanation: "Basic zero-shot sentiment analysis.", output: "[{'label': 'POSITIVE', 'score': 0.999}]" },
        intermediate: { code: "from transformers import AutoTokenizer\ntok = AutoTokenizer.from_pretrained('bert-base-uncased')\ninputs = tok('Hello world', return_tensors='pt')\nprint(inputs.keys())", explanation: "Extracting input_ids and attention_mask tensors.", output: "dict_keys(['input_ids', 'token_type_ids', 'attention_mask'])" },
        advanced: { code: "from transformers import AutoModelForSequenceClassification\nmodel = AutoModelForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=2)\nprint('Model layers:', len(list(model.parameters())))", explanation: "Loading sequence classification model head.", output: "Number of trainable parameter tensors." },
        production: { code: "from transformers import AutoTokenizer, AutoModelForCausalLM\ndef generate_llm_response(prompt, model_id='gpt2'):\n    tok = AutoTokenizer.from_pretrained(model_id)\n    model = AutoModelForCausalLM.from_pretrained(model_id)\n    inputs = tok(prompt, return_tensors='pt')\n    outputs = model.generate(**inputs, max_new_tokens=20)\n    return tok.decode(outputs[0], skip_special_tokens=True)\n\nprint(generate_llm_response('Data Science is'))", explanation: "Production autoregressive generation pipeline.", output: "Generated text continuation." }
      },
      real_project_example: { title: "Enterprise Document Summarizer API", description: "Downloads pretrained Summarization Transformer model to generate executive summaries of PDF reports.", code: "summarizer = pipeline('summarization')" },
      common_mistakes: [{ mistake: "Omitting `attention_mask` when passing batched token inputs to transformer models.", fix: "Pass `attention_mask` so self-attention ignores zero-padded tokens." }],
      best_practices: ["Use `AutoTokenizer` and `AutoModel` for model-agnostic code."],
      performance_tips: ["Use LoRA (PEFT) for fine-tuning to cut VRAM usage by 80%."],
      advantages: ["Access to 500k+ pretrained models", "High-level pipeline interface"],
      limitations: ["Self-attention scales quadratically O(N^2) with sequence length"],
      comparison_table: [{ feature: "Tokenization", this_concept: "Subword (BPE/WordPiece)", alternate: "Word-level tokenization", winner: "Subword (No OOV errors)" }],
      interview_questions: [{ q: "What is the purpose of the `attention_mask` in Transformer models?", a: "It informs self-attention softmax which tokens are real context vs padding zeros, instructing the model to ignore padding." }],
      tricky_questions: [{ q: "Tricky Q1: How does subword tokenization prevent Out-Of-Vocabulary (OOV) errors?", a: "Unknown words are broken into smaller subword chunks (e.g. 'unaffable' -> 'un', 'aff', 'able') present in the vocabulary." }],
      coding_challenges: [{ difficulty: "Easy", problem: "Run sentiment analysis on 'Great product'.", input: "text", output: "POSITIVE", solution: "from transformers import pipeline\nclf = pipeline('sentiment-analysis')\nprint(clf('Great product'))", complexity: "O(N^2)" }],
      quiz: [{ question: "Which tensor instructs self-attention to ignore zero-padded tokens?", options: ["input_ids", "attention_mask", "token_type_ids", "position_ids"], correct: 1, explanation: "attention_mask (1 for real, 0 for pad) instructs attention to ignore padding." }],
      revision_notes: ["Subword tokenization prevents OOV errors.", "Attention mask tells model to ignore padding."],
      cheat_sheet: { key_syntax: "from transformers import pipeline; pipe = pipeline('text-generation')", essential_methods: ["pipeline()", "AutoTokenizer", "AutoModel", "generate()"], key_interview_points: ["Multi-Head Self-Attention", "Attention mask role", "LoRA PEFT"] },
      related_topics: [{ title: "LLM Fundamentals", id: "llm" }]
    },

    {
      id: "fastapi",
      title: "FastAPI",
      introduction: { what: "Modern, high-performance web framework for building APIs with Python based on standard type hints and Pydantic.", why_created: "Created by Sebastián Ramírez in 2018 to combine OpenAPI, Pydantic, and ASGI speed.", why_needed: "Offers high concurrency matching Node.js/Go speeds for serving machine learning models.", history: "Built on top of Starlette and Pydantic." },
      definition_beginner: "FastAPI is a Python web framework used to quickly build fast REST APIs with automatic Swagger documentation.",
      definition_interview: "An ASGI web framework utilizing Pydantic data validation and Python type hints to serve concurrent endpoints with auto-generated OpenAPI documentation.",
      why_we_use: { purpose: "Serving Machine Learning & LLM inference endpoints, microservices, high-concurrency APIs.", benefits: ["ASGI async concurrency", "Automatic Pydantic validation", "Auto-generated Swagger UI docs"], problems_solved: ["Eliminates manual API schema validation code"], real_world_importance: "Industry standard for serving AI models in production." },
      internal_working: { execution_flow: "HTTP Request -> Uvicorn ASGI Server -> Pydantic Schema Validation -> Route Execution -> JSON Output.", memory_behavior: "Non-blocking event loop handles async coroutines.", processing_flow: "HTTP -> Pydantic -> Route -> JSON.", diagram: `[Client HTTP] ──> [Uvicorn ASGI Event Loop] ──> [Pydantic Validation] ──> [FastAPI Route]` },
      syntax: { basic: "from fastapi import FastAPI\napp = FastAPI()\n@app.get('/')\ndef root(): return {'msg': 'OK'}", advanced: "from pydantic import BaseModel\nclass Input(BaseModel): features: list[float]\n@app.post('/predict')\nasync def predict(data: Input): return {'pred': 1}", variations: ["@app.get()", "@app.post()"], keyword_explanation: "BaseModel enforces Pydantic data validation schemas." },
      parameters: [{ name: "app", type: "FastAPI", required: true, default_val: "None", description: "FastAPI application instance." }],
      return_value: { type: "dict / JSONResponse", output_description: "JSON response payload returned to HTTP client.", examples: ["{'status': 'success'}"] },
      supported_operations: ["Async Routing (async def)", "Pydantic Request Validation", "Swagger UI Auto-Docs (/docs)"],
      methods: [{ name: "@app.post()", definition: "Registers a route that handles HTTP POST requests.", syntax: "@app.post(path)", parameters: "path: str", return_type: "Decorator", example: "@app.post('/predict')\ndef p(data: Data): return {'status': 'ok'}", output: "API Route endpoint", best_practice: "Use standard `def` for CPU-bound ML predictions; `async def` for I/O bound operations.", time_complexity: "O(1) routing", space_complexity: "O(Request)" }],
      code_examples: {
        beginner: { code: "from fastapi import FastAPI\napp = FastAPI()\n@app.get('/')\ndef read_root(): return {'status': 'active'}", explanation: "Basic FastAPI GET route.", output: "{'status': 'active'}" },
        intermediate: { code: "from fastapi import FastAPI\nfrom pydantic import BaseModel\napp = FastAPI()\nclass ModelInput(BaseModel):\n    val: float\n@app.post('/predict')\ndef predict(data: ModelInput):\n    return {'result': data.val * 2}", explanation: "POST route with Pydantic request validation.", output: "{'result': 40.0}" },
        advanced: { code: "from fastapi import FastAPI, HTTPException\napp = FastAPI()\n@app.get('/item/{item_id}')\ndef get_item(item_id: int):\n    if item_id < 0: raise HTTPException(status_code=400, detail='Invalid ID')\n    return {'item_id': item_id}", explanation: "Path parameter with HTTP exception error handling.", output: "{'item_id': 5}" },
        production: { code: "from fastapi import FastAPI\nfrom pydantic import BaseModel, Field\n\napp = FastAPI(title='ML Inference Service')\nclass InferencePayload(BaseModel):\n    vector: list[float] = Field(..., example=[0.1, 0.5, 0.9])\n\n@app.post('/api/v1/predict')\ndef serve_model(payload: InferencePayload):\n    pred = sum(payload.vector)\n    return {'prediction': pred, 'status': 200}\n\nprint('FastAPI production app instantiated.')", explanation: "Production inference API endpoint with Pydantic Field specifications.", output: "FastAPI production app instantiated." }
      },
      real_project_example: { title: "Production Scikit-Learn Model API Server", description: "Serves a trained Random Forest model over HTTP REST endpoints with Pydantic request validation.", code: "app = FastAPI()\n@app.post('/predict')\ndef p(d: Item): return {'pred': model.predict([d.vector])[0]}" },
      common_mistakes: [{ mistake: "Using `async def` for heavy CPU-bound numpy/torch model prediction routes, blocking the single asyncio event loop.", fix: "Use standard `def` for CPU-heavy prediction routes so FastAPI runs them on a thread pool." }],
      best_practices: ["Use standard `def` for CPU-intensive ML inference; `async def` for DB/network I/O."],
      performance_tips: ["Run with `uvicorn main:app --workers 4` to spawn multi-process workers."],
      advantages: ["ASGI non-blocking concurrency", "Auto-generated Swagger /docs", "Native Pydantic validation"],
      limitations: ["Requires Uvicorn/Hypercorn ASGI server runner"],
      comparison_table: [{ feature: "Architecture", this_concept: "ASGI (Asynchronous)", alternate: "WSGI (Synchronous)", winner: "FastAPI (ASGI)" }],
      interview_questions: [{ q: "When should you use `async def` vs standard `def` in FastAPI routes?", a: "Use `async def` for non-blocking I/O routes (DB queries). Use standard `def` for CPU-heavy ML predictions so FastAPI runs them on background thread pools." }],
      tricky_questions: [{ q: "Tricky Q1: What happens if a CPU-heavy prediction route is defined with `async def` without thread offloading?", a: "It blocks the single-threaded asyncio event loop, queuing all incoming HTTP requests for all concurrent users." }],
      coding_challenges: [{ difficulty: "Easy", problem: "Create a GET route '/health' returning {'status': 'healthy'}.", input: "None", output: "JSON response", solution: "from fastapi import FastAPI\napp = FastAPI()\n@app.get('/health')\ndef h(): return {'status': 'healthy'}", complexity: "O(1)" }],
      quiz: [{ question: "Which command runs FastAPI applications in production with multi-worker support?", options: ["python main.py", "uvicorn main:app --workers 4", "flask run", "gunicorn"], correct: 1, explanation: "Uvicorn is the high-performance ASGI server runner for FastAPI." }],
      revision_notes: ["FastAPI is built on ASGI, Starlette, and Pydantic.", "Use def for CPU-heavy ML routes."],
      cheat_sheet: { key_syntax: "from fastapi import FastAPI; app = FastAPI()", essential_methods: ["@app.get()", "@app.post()", "BaseModel", "HTTPException"], key_interview_points: ["ASGI vs WSGI", "async def vs def thread offloading", "Pydantic auto-validation"] },
      related_topics: [{ title: "Flask Framework", id: "flask" }]
    },

    {
      id: "flask",
      title: "Flask",
      introduction: { what: "Lightweight WSGI web application framework in Python.", why_created: "Created by Armin Ronacher in 2010 as an April Fools' joke that grew into a major framework.", why_needed: "Simple micro-framework for building web applications and small REST APIs.", history: "Based on Werkzeug WSGI utility and Jinja2 template engine." },
      definition_beginner: "Flask is a simple Python web framework used to quickly create websites and web APIs.",
      definition_interview: "A lightweight WSGI web framework utilizing Werkzeug and Jinja2 in a synchronous thread-per-request model.",
      why_we_use: { purpose: "Small web microservices, legacy ML model serving, proof-of-concept web apps.", benefits: ["Simple minimal setup", "Jinja2 HTML rendering", "Extensive ecosystem extensions"], problems_solved: ["Easy setup for small web apps"], real_world_importance: "Used in lightweight internal web tools and legacy APIs." },
      internal_working: { execution_flow: "HTTP Request -> WSGI Server -> Werkzeug Routing -> Flask View Function -> HTML/JSON Response.", memory_behavior: "Synchronous thread-per-request execution.", processing_flow: "HTTP -> WSGI -> View -> Response.", diagram: `[Client HTTP] ──> [WSGI Server (Gunicorn)] ──> [Flask View Function]` },
      syntax: { basic: "from flask import Flask\napp = Flask(__name__)\n@app.route('/')\ndef home(): return 'Hello'", advanced: "from flask import request, jsonify\n@app.route('/api', methods=['POST'])\ndef api(): data = request.get_json(); return jsonify(data)", variations: ["@app.route()", "jsonify()"], keyword_explanation: "@app.route registers URL endpoints." },
      parameters: [{ name: "import_name", type: "str", required: true, default_val: "None", description: "Package or module name (usually `__name__`)." }],
      return_value: { type: "str / Response", output_description: "HTML string or JSON HTTP response.", examples: ["'Hello World'"] },
      supported_operations: ["WSGI Routing", "Jinja2 HTML Templating", "JSON Responses"],
      methods: [{ name: "@app.route()", definition: "Binds a URL function to a endpoint.", syntax: "@app.route(rule, methods=['GET'])", parameters: "rule: str, methods: list", return_type: "Decorator", example: "@app.route('/health')\ndef h(): return 'OK'", output: "Endpoint route", best_practice: "Explicitly specify `methods=['GET', 'POST']`.", time_complexity: "O(1)", space_complexity: "O(1)" }],
      code_examples: {
        beginner: { code: "from flask import Flask\napp = Flask(__name__)\n@app.route('/')\ndef root(): return 'Flask App Active'", explanation: "Basic Flask route.", output: "'Flask App Active'" },
        intermediate: { code: "from flask import Flask, jsonify, request\napp = Flask(__name__)\n@app.route('/predict', methods=['POST'])\ndef predict():\n    return jsonify({'status': 'success'})", explanation: "POST route returning JSON.", output: "{'status': 'success'}" },
        advanced: { code: "from flask import Flask, render_template_string\napp = Flask(__name__)\n@app.route('/user/<name>')\ndef user(name):\n    return render_template_string('<h1>Hello {{ name }}</h1>', name=name)", explanation: "Jinja2 HTML template rendering.", output: "Rendered HTML page." },
        production: { code: "from flask import Flask, jsonify\napp = Flask(__name__)\n\n@app.route('/health')\ndef health():\n    return jsonify({'status': 'healthy', 'framework': 'Flask WSGI'}), 200\n\nprint('Flask production app initialized.')", explanation: "Production health check endpoint returning HTTP 200 code.", output: "Flask production app initialized." }
      },
      real_project_example: { title: "Legacy ML Model Microservice Endpoint", description: "Serves model predictions over WSGI HTTP endpoints.", code: "app = Flask(__name__)\n@app.route('/predict')\ndef p(): return jsonify({'pred': 1})" },
      common_mistakes: [{ mistake: "Running `app.run()` in production instead of deploying via a WSGI server like Gunicorn.", fix: "Deploy with Gunicorn/uWSGI in production environments." }],
      best_practices: ["Use Flask Blueprints to modularize large application routes."],
      performance_tips: ["Deploy behind Gunicorn with multiple worker processes."],
      advantages: ["Extremely simple to get started", "Built-in Jinja2 templating"],
      limitations: ["Synchronous WSGI protocol lacks native async concurrency"],
      comparison_table: [{ feature: "Protocol", this_concept: "WSGI (Synchronous)", alternate: "ASGI (Asynchronous)", winner: "FastAPI for async" }],
      interview_questions: [{ q: "What is the difference between WSGI (Flask) and ASGI (FastAPI)?", a: "WSGI handles requests synchronously per thread. ASGI supports async coroutines and non-blocking I/O event loops." }],
      tricky_questions: [{ q: "Tricky Q1: Why should `app.run(debug=True)` NEVER be used in production?", a: "Debug mode enables an interactive web debugger that allows arbitrary remote code execution on the server!" }],
      coding_challenges: [{ difficulty: "Easy", problem: "Create a Flask route returning JSON {'status': 'ok'}.", input: "None", output: "JSON response", solution: "from flask import Flask, jsonify\napp = Flask(__name__)\n@app.route('/')\ndef r(): return jsonify({'status': 'ok'})", complexity: "O(1)" }],
      quiz: [{ question: "Which component in Flask handles HTML template rendering?", options: ["Werkzeug", "Jinja2", "Gunicorn", "Pydantic"], correct: 1, explanation: "Jinja2 is Flask's built-in HTML template engine." }],
      revision_notes: ["Flask uses WSGI and Jinja2.", "Never run debug=True in production."],
      cheat_sheet: { key_syntax: "from flask import Flask; app = Flask(__name__)", essential_methods: ["@app.route()", "jsonify()", "render_template()"], key_interview_points: ["WSGI thread model", "Gunicorn deployment", "Flask vs FastAPI"] },
      related_topics: [{ title: "FastAPI Framework", id: "fastapi" }]
    }
  ],

  interview_questions: {
    optimised: [
      { q: "1. How does NumPy achieve 50x-100x faster execution compared to native Python lists?", a: "NumPy arrays (ndarrays) store contiguous homogeneous memory buffers without Python object pointer overhead or dynamic type-checking. Operations leverage compiled C/Fortran extensions, SIMD vectorization, and CPU L1/L2 cache locality." },
      { q: "2. What is the memory management difference between slicing vs fancy indexing in NumPy/Pandas?", a: "Basic slicing (`arr[1:5]` or `df[1:5]`) returns a memory view sharing the original data buffer. Modifying a view mutates the parent dataset. Fancy indexing (`arr[[1, 3, 5]]`) returns a deep copy with a newly allocated RAM buffer." },
      { q: "3. What is the difference between `pd.merge()`, `pd.concat()`, and `df.join()` in Pandas?", a: "`pd.concat()` stacks DataFrames vertically or horizontally based on axis. `pd.merge()` performs relational database SQL joins (inner, left, right, outer) on matching key columns. `df.join()` merges DataFrames on their index labels." },
      { q: "4. How can you optimize Pandas memory usage when loading multi-gigabyte CSV datasets?", a: "1) Use `usecols` to load required columns only. 2) Downcast numeric dtypes (`float64` to `float32`). 3) Convert high-cardinality strings to `category` dtypes. 4) Process in chunks using `chunksize`. 5) Enable PyArrow engine backend." },
      { q: "5. What is data leakage in Scikit-Learn pipelines and how do you prevent it?", a: "Data leakage occurs when evaluation statistics (e.g. mean/std scaling) from the test set leak into training. Scikit-Learn `Pipeline` prevents this by strictly applying `fit()` only on training folds during cross-validation." },
      { q: "6. How does PyTorch autograd engine perform automatic differentiation during backpropagation?", a: "PyTorch builds a Dynamic Computation Graph (DAG) during the forward pass. Calling `.backward()` computes gradients of loss w.r.t model tensors using the chain rule, storing gradients in `.grad` attributes." },
      { q: "7. What is the fundamental difference between TensorFlow 1.x Static Graphs and TensorFlow 2.x Eager Execution?", a: "TF 1.x required defining a static symbolic graph executed inside a `tf.Session()`. TF 2.x uses Eager Execution by default, evaluating operations immediately like standard Python, with `@tf.function` compiling graphs JIT." },
      { q: "8. What is the role of `n_jobs=-1` in Scikit-Learn estimators?", a: "`n_jobs=-1` instructs Scikit-Learn to parallelize model fitting, feature extraction, or cross-validation across all available CPU cores using `joblib` multi-processing." },
      { q: "9. How does `pd.groupby().transform()` differ from `pd.groupby().agg()`?", a: "`agg()` reduces each group down to a single summary row, shortening output DataFrame length. `transform()` calculates group metrics and broadcasts them back to match original DataFrame row length." },
      { q: "10. What is the difference between `model.train()` and `model.eval()` in PyTorch?", a: "`model.train()` enables training behaviors like Dropout and BatchNorm update. `model.eval()` disables Dropout and freezes BatchNorm stats for deterministic evaluation/inference." },
      { q: "11. Why is `torch.no_grad()` used during PyTorch model inference?", a: "`torch.no_grad()` disables gradient tracking autograd engine computations, reducing RAM/VRAM consumption and speeding up forward-pass inference." },
      { q: "12. How does OpenCV handle image color channel order compared to Matplotlib and PIL?", a: "OpenCV reads images in BGR (Blue, Green, Red) format by default. Matplotlib and PIL expect RGB (Red, Green, Blue). Convert using `cv2.cvtColor(img, cv2.COLOR_BGR2RGB)`." },
      { q: "13. What is the difference between `iloc[]`, `loc[]`, `at[]`, and `iat[]` in Pandas?", a: "`loc[]` is label-based (inclusive). `iloc[]` is integer-positional (exclusive end). `at[]` and `iat[]` are high-speed scalar accessors optimized for fetching single cell values." },
      { q: "14. How does FastAPI achieve asynchronous concurrency compared to Flask?", a: "FastAPI is built on ASGI (Starlette) and uses an `asyncio` event loop for non-blocking I/O. Flask is built on WSGI (Werkzeug) and uses a synchronous thread-per-request model." },
      { q: "15. What are Transformers Attention Masks and why are they necessary in Hugging Face models?", a: "Attention masks are binary tensors indicating which tokens are real content (1) vs padding (0), preventing self-attention layers from attending to padded sequence positions." },
      { q: "16. What is the difference between Seaborn and Matplotlib?", a: "Matplotlib provides low-level object-oriented plotting primitives (`Axes`, `Figure`). Seaborn is built on top of Matplotlib, offering high-level statistical visualization themes and native Pandas integration." },
      { q: "17. What is NLTK tokenization vs Hugging Face WordPiece/BPE Tokenization?", a: "NLTK uses regex/rule-based word and sentence splitting. Hugging Face subword tokenizers (WordPiece, BPE) split words into subword units, resolving out-of-vocabulary (OOV) token errors." },
      { q: "18. How does Scikit-Learn `ColumnTransformer` simplify feature preprocessing?", a: "`ColumnTransformer` applies distinct preprocessing steps (e.g. OneHotEncoder on categorical, StandardScaler on numerical) to different column subsets in a unified pipeline." },
      { q: "19. How do you deploy PyTorch or TensorFlow models to production microservices?", a: "Export trained model weights to ONNX or TorchScript, encapsulate inference in FastAPI or TensorFlow Serving, containerize with Docker, and run behind an API Gateway." },
      { q: "20. What are vector broadcasting rules in NumPy?", a: "Broadcasting pairs arrays along trailing dimensions if dimensions are equal or if one dimension is 1. If dimensions mismatch and neither is 1, a `ValueError` is raised." }
    ],
    tricky: [
      { q: "Tricky Q1. Why does `a = np.array([1, 2]); b = a; b += 1` mutate `a`, but `b = b + 1` does NOT?", a: "`b += 1` calls in-place operator `__iadd__` mutating memory buffer. `b = b + 1` allocates a new array and rebinds variable name `b`." },
      { q: "Tricky Q2. What happens if you define a CPU-heavy prediction route in FastAPI with `async def` without offloading?", a: "Defining a CPU-bound sync task inside `async def` blocks the single-threaded asyncio event loop, halting HTTP request handling for all concurrent users!" },
      { q: "Tricky Q3. Why should `Flask(debug=True)` or `app.run()` NEVER be executed in production?", a: "Flask debug mode enables an interactive web debugger that allows arbitrary remote code execution on the server!" },
      { q: "Tricky Q4. What subtle bug occurs when calling `df.drop_duplicates()` on a DataFrame with un-indexed floats?", a: "Floating-point precision errors (e.g., `0.1 + 0.2 != 0.3`) cause nearly identical float values to be treated as unique, failing duplicate removal." },
      { q: "Tricky Q5. Why does `optimizer.zero_grad()` MUST be called inside PyTorch training loops before `loss.backward()`?", a: "PyTorch accumulates gradients in `.grad` by default. Omitting `zero_grad()` causes gradients to sum across epochs, corrupting optimizer weight updates." },
      { q: "Tricky Q6. What happens when calling `df.query('age > 25')` vs standard boolean indexing `df[df['age'] > 25]`?", a: "`df.query()` evaluates string expressions using NumExpr engine, avoiding memory copies for large DataFrames, but fails if column names contain spaces or special syntax." },
      { q: "Tricky Q7. What is the SettingWithCopyWarning in Pandas and how do you resolve it?", a: "It warns when mutating a slice of a DataFrame where Pandas cannot guarantee whether the slice is a view or a copy. Resolve using `.loc[]` or explicit `.copy()`." },
      { q: "Tricky Q8. Why does `np.nan == np.nan` evaluate to `False` in Python?", a: "Following IEEE 754 floating-point standard, NaN represents undefined value, so NaN is not equal to anything, including itself! Use `np.isnan()` or `pd.isna()`." },
      { q: "Tricky Q9. Why does fitting a `StandardScaler` on the full dataset BEFORE train_test_split cause Data Leakage?", a: "StandardScaler calculates population mean and std. Fitting on full data leaks test fold distribution parameters into training feature values." },
      { q: "Tricky Q10. What happens if you modify a NumPy array created with `np.asarray()` vs `np.array()`?", a: "`np.asarray()` passes existing ndarrays by reference (no copy). Modifying the resulting array mutates the original. `np.array()` creates a fresh memory copy by default." }
    ]
  }
};
