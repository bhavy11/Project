/* SQL Module Data */
const SQL_DATA = {
  subject: "SQL (Structured Query Language)",
  icon: "database",
  description: "Master relational database query design from basic queries to advanced window functions, CTEs, indexing, execution plans, and query optimization.",
  topics: [
    {
      id: "sql_beginner",
      title: "SQL Beginner Concepts",
      formula: `\\text{Execution Order: } \\text{FROM} \\rightarrow \\text{WHERE} \\rightarrow \\text{GROUP BY} \\rightarrow \\text{HAVING} \\rightarrow \\text{SELECT} \\rightarrow \\text{ORDER BY} \\rightarrow \\text{LIMIT}`,
      subtopics: [
        {
          title: "Relational Database Architecture",
          theory: "Relational databases structure data into normalized tables consisting of rows (tuples) and columns (attributes) linked via Primary and Foreign Key constraints."
        },
        {
          title: "DDL vs DML Commands",
          theory: "DDL (Data Definition Language: CREATE, ALTER, DROP, TRUNCATE) mutates database schema structure. DML (Data Manipulation Language: SELECT, INSERT, UPDATE, DELETE) manipulates table data rows."
        },
        {
          title: "Logical Execution Order of SQL Clauses",
          theory: "SQL statements do NOT execute top-to-bottom! The database engine evaluates `FROM` first, followed by `WHERE` row filtering, `GROUP BY` aggregation, `HAVING` group filtering, `SELECT` column projection, `ORDER BY` sorting, and `LIMIT` capping."
        },
        {
          title: "Filtering & Wildcards (WHERE, BETWEEN, IN, LIKE)",
          theory: "`WHERE` filters row tuples before aggregation. Wildcard `%` matches 0 or more characters; `_` matches exactly 1 character in `LIKE` string comparisons."
        }
      ],
      definition: "Foundational Relational Database concepts covering DDL (Data Definition Language), DML (Data Manipulation Language), basic SELECT queries, WHERE filtering, and ORDER BY sorting.",
      syntax: `SELECT first_name, salary \nFROM employees \nWHERE department = 'Engineering' AND salary > 75000 \nORDER BY salary DESC;`,
      how_it_works: "Database engine evaluates the `FROM` table clause first, filters row tuples using the `WHERE` clause condition, projects target columns in `SELECT`, sorts remaining rows in `ORDER BY`, and caps output rows via `LIMIT`.",
      where_we_use: "Basic database querying, data extraction, initial report generation.",
      interview_theory: "MNC Fundamental: What is the logical execution order of a standard SQL SELECT statement? (FROM -> ON -> JOIN -> WHERE -> GROUP BY -> HAVING -> SELECT -> DISTINCT -> ORDER BY -> LIMIT). Note that SELECT runs AFTER WHERE!",
      example_code: `SELECT emp_id, first_name, salary
FROM employees
WHERE salary BETWEEN 50000 AND 90000
ORDER BY salary DESC
LIMIT 5;`,
      quiz: [
        {
          question: "Which clause in a SQL SELECT statement is evaluated FIRST logically by the database execution engine?",
          options: ["SELECT", "WHERE", "FROM", "ORDER BY"],
          correct: 2,
          explanation: "The database engine evaluates `FROM` first to locate source tables before applying filters or column projections."
        }
      ]
    },
    {
      id: "sql_intermediate",
      title: "SQL Intermediate Concepts",
      subtopics: [
        {
          title: "Aggregate Functions & Grouping Rules",
          theory: "Aggregate functions (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`) compute summary values across row groups. Any non-aggregated column in the `SELECT` list MUST be included in `GROUP BY`."
        },
        {
          title: "HAVING vs WHERE Clause Filtering",
          theory: "`WHERE` filters raw individual rows BEFORE `GROUP BY` aggregation occurs. `HAVING` filters aggregated group summary metrics AFTER `GROUP BY` takes place."
        },
        {
          title: "COUNT(*) vs COUNT(column) vs COUNT(DISTINCT)",
          theory: "`COUNT(*)` counts total table rows including NULLs. `COUNT(col)` ignores NULL entries. `COUNT(DISTINCT col)` counts unique non-null column values."
        }
      ],
      definition: "Multi-table aggregations and group filtering using `GROUP BY`, aggregate functions (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`), `HAVING`, and string/date formatting.",
      syntax: `SELECT department, COUNT(*) as emp_count, AVG(salary) as avg_sal\nFROM employees\nGROUP BY department\nHAVING AVG(salary) > 80000;`,
      how_it_works: "Aggregates rows sharing identical values across `GROUP BY` columns into single summary rows. The `HAVING` clause filters aggregated group rows (whereas `WHERE` filters individual raw rows before grouping).",
      where_we_use: "Departmental salary summaries, KPI dashboards, monthly sales aggregation, customer segmentation summaries.",
      interview_theory: "MNC Essential: What is the difference between `WHERE` and `HAVING`? (`WHERE` filters individual rows BEFORE `GROUP BY` aggregation takes place. `HAVING` filters group summaries AFTER aggregation takes place).",
      example_code: `SELECT dept_id, COUNT(emp_id) AS total_staff, SUM(salary) AS total_budget
FROM employees
WHERE status = 'Active' -- Filter raw rows first
GROUP BY dept_id
HAVING COUNT(emp_id) >= 5; -- Filter aggregated groups`,
      quiz: [
        {
          question: "What is the primary difference between the `WHERE` clause and the `HAVING` clause?",
          options: [
            "`HAVING` is evaluated before `WHERE`",
            "`WHERE` filters individual rows before grouping; `HAVING` filters aggregated group rows after `GROUP BY`",
            "`WHERE` works only on text columns",
            "There is no difference"
          ],
          correct: 1,
          explanation: "`WHERE` filters raw table rows prior to aggregation; `HAVING` filters group summary metrics generated by `GROUP BY`."
        }
      ]
    },
    {
      id: "sql_advanced",
      title: "SQL Advanced Concepts",
      subtopics: [
        {
          title: "Conditional Branching (CASE WHEN)",
          theory: "`CASE WHEN` performs if-then-else logical evaluation within SQL queries, transforming values or creating dynamic category columns."
        },
        {
          title: "NULL Handling (COALESCE vs NULLIF)",
          theory: "`COALESCE(val1, val2, ...)` returns the first non-null argument. `NULLIF(val1, val2)` returns NULL if `val1 == val2`, preventing division-by-zero errors."
        },
        {
          title: "UNION vs UNION ALL Set Operations",
          theory: "`UNION` merges result sets and executes an expensive sorting step to eliminate duplicates. `UNION ALL` appends result sets directly including duplicates (faster)."
        },
        {
          title: "ACID Transactions & Isolation Levels",
          theory: "ACID guarantees Atomicity, Consistency, Isolation, and Durability. Isolation levels (Read Committed, Repeatable Read, Serializable) prevent anomalies like Dirty Reads."
        }
      ],
      definition: "Complex relational operations including conditional expressions (`CASE WHEN`), NULL handling (`COALESCE`, `NULLIF`), set operations (`UNION`, `INTERSECT`, `EXCEPT`), and dynamic transaction control.",
      syntax: `SELECT name, salary,\n  CASE WHEN salary > 100000 THEN 'High'\n       ELSE 'Standard' END as salary_tier\nFROM employees;`,
      how_it_works: "`CASE WHEN` performs if-then-else logical branching inside queries. `COALESCE(col1, col2, 0)` returns the first non-null argument. `UNION` merges result sets and removes duplicates; `UNION ALL` preserves duplicates (faster).",
      where_we_use: "Dynamic column transformation, data cleaning, combining heterogeneous data sources, transaction processing.",
      interview_theory: "MNC Question: Why is `UNION ALL` faster than `UNION`? (`UNION` requires an additional sorting and deduplication pass over combined datasets, whereas `UNION ALL` simply concatenates result sets).",
      example_code: `SELECT product_id, 
       COALESCE(discount_price, list_price, 0.0) AS final_price,
       CASE WHEN stock = 0 THEN 'Out of Stock' ELSE 'In Stock' END AS status
FROM inventory;`,
      quiz: [
        {
          question: "Why should `UNION ALL` be preferred over `UNION` when duplicate removal is not required?",
          options: [
            "`UNION ALL` encrypts data",
            "`UNION ALL` skips the expensive sorting and deduplication step, executing significantly faster",
            "`UNION` drops primary keys",
            "`UNION ALL` works on single tables only"
          ],
          correct: 1,
          explanation: "`UNION` performs an explicit sort and distinct check across all combined rows, whereas `UNION ALL` appends rows directly."
        }
      ]
    },
    {
      id: "sql_window_functions",
      title: "Window Functions",
      formula: `\\text{Syntax: } \\text{Function}() \\text{ OVER } (\\text{PARTITION BY } \\text{col}_1 \\text{ ORDER BY } \\text{col}_2 \\text{ ROWS BETWEEN } \\dots)`,
      subtopics: [
        {
          title: "Ranking Functions (ROW_NUMBER, RANK, DENSE_RANK)",
          theory: "For tied values `[100, 100, 90]`: `ROW_NUMBER()` assigns sequential numbers `(1, 2, 3)`. `RANK()` assigns `(1, 1, 3)` (skips rank 2). `DENSE_RANK()` assigns `(1, 1, 2)` (no skips)."
        },
        {
          title: "Value & Offset Functions (LAG, LEAD)",
          theory: "`LAG(col, n)` fetches column values from $n$ rows prior to current row. `LEAD(col, n)` fetches values $n$ rows after, enabling growth rate computations."
        },
        {
          title: "Window Framing (ROWS / RANGE BETWEEN)",
          theory: "Window frames specify moving calculation boundaries relative to current row, e.g. `ROWS BETWEEN 2 PRECEDING AND CURRENT ROW` for 3-day moving averages."
        }
      ],
      definition: "Window Functions compute calculations across a set of table rows related to the current row, without collapsing rows into a single summary output like `GROUP BY`.",
      syntax: `SELECT name, dept, salary,\n  ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC) as rank\nFROM employees;`,
      how_it_works: "1) Ranking: `ROW_NUMBER()` (unique sequential), `RANK()` (ties get same rank, skips next), `DENSE_RANK()` (ties get same rank, no skips). 2) Value: `LAG(col, 1)` (prior row value), `LEAD(col, 1)` (next row value). 3) Aggregate: `SUM() OVER (PARTITION BY ... ORDER BY ...)` cumulative running totals.",
      where_we_use: "Finding Top-N items per category, computing month-over-month growth rates, running totals, session gap analysis.",
      interview_theory: "MNC Essential Question: Explain `ROW_NUMBER()`, `RANK()`, and `DENSE_RANK()` for values `[100, 100, 90]`. `ROW_NUMBER()`: 1, 2, 3. `RANK()`: 1, 1, 3. `DENSE_RANK()`: 1, 1, 2.",
      example_code: `SELECT employee_id, department_id, salary,
  DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS sal_rank,
  LAG(salary, 1) OVER (PARTITION BY department_id ORDER BY salary DESC) AS prev_sal
FROM employees;`,
      quiz: [
        {
          question: "For a salary list of `[100k, 100k, 80k]`, what ranks will `DENSE_RANK()` assign?",
          options: ["1, 2, 3", "1, 1, 3", "1, 1, 2", "1, 2, 2"],
          correct: 2,
          explanation: "`DENSE_RANK()` assigns 1 to tied top values and 2 to the next distinct value without skipping ranks."
        }
      ]
    },
    {
      id: "sql_joins",
      title: "SQL Joins",
      subtopics: [
        {
          title: "Join Types (INNER, LEFT, RIGHT, FULL, CROSS)",
          theory: "INNER returns matching keys. LEFT returns all left rows + matching right rows. FULL returns all rows. CROSS produces Cartesian product ($N \\times M$ rows)."
        },
        {
          title: "Self Join & Hierarchy Traversal",
          theory: "Self Join joins a table to itself using aliases (e.g. `employees e LEFT JOIN employees m ON e.manager_id = m.employee_id`) to resolve parent-child hierarchies."
        },
        {
          title: "Right-Table Duplication Pitfall",
          theory: "If the right table contains duplicate matching keys, the left row is duplicated in the output for every matching right row, inflating row count unexpectedly."
        }
      ],
      definition: "Joins combine columns from one or more tables based on a related column relationship (foreign key to primary key).",
      syntax: `SELECT e.name, d.dept_name\nFROM employees e\nLEFT JOIN departments d ON e.dept_id = d.dept_id;`,
      how_it_works: "1) `INNER JOIN`: returns rows with matching keys in both tables. 2) `LEFT JOIN`: returns all rows from left table + matched right rows (NULLs if missing). 3) `RIGHT JOIN`. 4) `FULL OUTER JOIN`. 5) `CROSS JOIN` (Cartesian product $N \\times M$). 6) `SELF JOIN`.",
      where_we_use: "Combining relational normalized schema tables, building reporting views, fetching customer order details.",
      interview_theory: "MNC Trick Question: What happens during a `LEFT JOIN` if the right table contains duplicate matching keys? (The left row is DUPLICATED in the output for every matching row in the right table! Can unexpectedly blow up row count).",
      example_code: `SELECT e.employee_id, e.first_name, m.first_name AS manager_name
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.employee_id; -- Self Join`,
      quiz: [
        {
          question: "What is the result of a `CROSS JOIN` between a table with 10 rows and a table with 20 rows?",
          options: ["30 rows", "20 rows", "200 rows (Cartesian product 10 x 20)", "10 rows"],
          correct: 2,
          explanation: "A `CROSS JOIN` produces the Cartesian product of both tables ($10 \\times 20 = 200$ rows)."
        }
      ]
    },
    {
      id: "sql_subqueries",
      title: "Subqueries & Nested Queries",
      subtopics: [
        {
          title: "Scalar vs Multi-Row vs Correlated Subqueries",
          theory: "Scalar subqueries return 1 value. Multi-row subqueries use `IN`, `ANY`, `ALL`. Correlated subqueries reference outer query columns, re-evaluating for every outer row."
        },
        {
          title: "EXISTS vs IN Short-Circuit Performance",
          theory: "`EXISTS` uses short-circuit evaluation, stopping search as soon as 1 matching row is found. `IN` materializes the entire subquery result set first."
        }
      ],
      definition: "A Subquery is a SQL query nested inside a larger outer query (`SELECT`, `INSERT`, `UPDATE`, or `DELETE`).",
      syntax: `SELECT name, salary FROM employees \nWHERE salary > (SELECT AVG(salary) FROM employees);`,
      how_it_works: "1) Scalar Subquery: returns a single value (1 row, 1 col). 2) Multi-row Subquery: uses `IN`, `ANY`, `ALL`, `EXISTS`. 3) Correlated Subquery: inner query references outer query table columns, executing once per outer row (slow).",
      where_we_use: "Filtering rows against global metrics, checking record existence (`EXISTS`), complex multi-level filtering.",
      interview_theory: "MNC Comparison: Why is `EXISTS` usually faster than `IN` for subqueries? (`EXISTS` uses short-circuit evaluation—it stops searching as soon as 1 matching row is found; `IN` fetches and materializes the entire subquery result set).",
      example_code: `SELECT d.department_name
FROM departments d
WHERE EXISTS (
  SELECT 1 FROM employees e 
  WHERE e.department_id = d.department_id AND e.salary > 120000
);`,
      quiz: [
        {
          question: "Why is `EXISTS` generally more performant than `IN` when evaluating subqueries against large tables?",
          options: [
            "`EXISTS` ignores indexes",
            "`EXISTS` uses short-circuit evaluation, terminating the subquery scan as soon as the first matching row is encountered",
            "`IN` cannot work on numbers",
            "`EXISTS` creates temporary tables"
          ],
          correct: 1,
          explanation: "`EXISTS` returns a boolean true/false instantly upon finding the first matching row, avoiding full subquery scan materialization."
        }
      ]
    },
    {
      id: "sql_cte",
      title: "Common Table Expressions (CTE)",
      subtopics: [
        {
          title: "WITH Clause Syntax & Readability",
          theory: "CTEs define named temporary result sets before the main query, eliminating deeply nested subqueries and improving code readability."
        },
        {
          title: "Recursive CTE Architecture",
          theory: "Recursive CTEs feature an Anchor member, `UNION ALL`, and a Recursive member referencing the CTE name, traversing manager hierarchies and graph trees."
        }
      ],
      definition: "A CTE (Common Table Expression) is a temporary named result set defined within the execution scope of a single `SELECT`, `INSERT`, `UPDATE`, or `DELETE` statement using the `WITH` clause.",
      syntax: `WITH HighEarners AS (\n  SELECT * FROM employees WHERE salary > 100000\n)\nSELECT department, COUNT(*) FROM HighEarners GROUP BY department;`,
      how_it_works: "Improves query readability compared to deeply nested subqueries. Recursive CTEs iteratively process hierarchical data structures (e.g. org charts, bill of materials, graph trees).",
      where_we_use: "Organizing complex multi-step queries, traversing organizational reporting hierarchies, building clean data transformation pipelines.",
      interview_theory: "MNC Problem: How do you query an organizational manager-employee hierarchy tree in SQL? (Using a Recursive CTE with an Anchor query finding root managers `WHERE manager_id IS NULL`, joined recursively to sub-employees).",
      example_code: `WITH RECURSIVE OrgChart AS (
  -- Anchor Member
  SELECT employee_id, first_name, manager_id, 1 AS level
  FROM employees WHERE manager_id IS NULL
  UNION ALL
  -- Recursive Member
  SELECT e.employee_id, e.first_name, e.manager_id, o.level + 1
  FROM employees e
  INNER JOIN OrgChart o ON e.manager_id = o.employee_id
)
SELECT * FROM OrgChart ORDER BY level;`,
      quiz: [
        {
          question: "What keyword initiates a Common Table Expression (CTE) in standard SQL?",
          options: ["CREATE TEMP TABLE", "WITH", "DECLARE", "SUBQUERY"],
          correct: 1,
          explanation: "CTEs are declared using the `WITH` clause syntax before the main query statement."
        }
      ]
    },
    {
      id: "sql_views",
      title: "Views & Materialized Views",
      subtopics: [
        {
          title: "Virtual Views vs Materialized Views",
          theory: "Standard Views are virtual (store query text, execute dynamically, 0 disk storage). Materialized Views physically persist query results to disk, requiring periodic `REFRESH`."
        }
      ],
      definition: "A View is a virtual table defined by a stored SQL query. A Materialized View physically computes and stores the result dataset on disk for fast retrieval.",
      syntax: `CREATE VIEW active_eng_v AS\nSELECT emp_id, name FROM employees WHERE dept = 'Eng';\n\n-- Materialized:\nCREATE MATERIALIZED VIEW mv_dept_sales AS ...;\nREFRESH MATERIALIZED VIEW mv_dept_sales;`,
      how_it_works: "Standard Views execute the underlying query dynamically every time they are queried (zero storage, fresh data). Materialized Views cache output rows on disk (requires periodic `REFRESH`, ultra-fast read response).",
      where_we_use: "Enforcing security access controls (hiding sensitive columns like SSN/salary), simplifying complex joins for BI analysts, caching expensive reporting aggregations.",
      interview_theory: "MNC Comparison: View vs Materialized View. Standard Views save zero disk data (run query live). Materialized Views physically store table data on disk, speeding up complex aggregate queries at the cost of data staleness until refreshed.",
      example_code: `# Concept SQL Statements
view_def = "CREATE VIEW public_employees AS SELECT emp_id, first_name FROM employees;"
mat_view_def = "CREATE MATERIALIZED VIEW sales_summary_mv AS SELECT region, SUM(amount) FROM sales GROUP BY region;"

print("Virtual View:", view_def)
print("Materialized View:", mat_view_def)`,
      quiz: [
        {
          question: "What is the key storage difference between a Standard View and a Materialized View?",
          options: [
            "Standard views require 100GB disk; Materialized views require 0 disk",
            "Standard views store zero data on disk (executing dynamically); Materialized views physically persist query results to disk for fast reads",
            "Materialized views cannot be refreshed",
            "Standard views only work in PostgreSQL"
          ],
          correct: 1,
          explanation: "Standard Views are virtual (dynamic query text). Materialized Views cache actual data rows on disk for rapid retrieval."
        }
      ]
    },
    {
      id: "sql_index",
      title: "SQL Indexing Architectures",
      formula: `\\text{B-Tree Search Complexity: } O(\\log N)`,
      subtopics: [
        {
          title: "B-Tree Index Data Structure & O(log N) Search",
          theory: "B-Tree indexes maintain sorted balanced tree structures, reducing row search time from full table scan $O(N)$ down to logarithmic search $O(\\log N)$."
        },
        {
          title: "Clustered vs Non-Clustered Indexes",
          theory: "Clustered index dictates physical storage order of data pages on disk (only 1 per table). Non-clustered index is a separate B-Tree storing pointers to physical rows."
        },
        {
          title: "Leftmost Prefix Rule for Composite Indexes",
          theory: "A composite index on `(colA, colB)` satisfies queries filtering on `colA` or `(colA, colB)`, but CANNOT be used for queries filtering on `colB` alone."
        }
      ],
      definition: "A SQL Index is a data structure (typically B-Tree or Hash) that speeds up data retrieval operations on a database table at the cost of additional storage and slower writes.",
      syntax: `CREATE INDEX idx_emp_email ON employees(email);\nCREATE UNIQUE INDEX idx_emp_code ON employees(emp_code);`,
      how_it_works: "1) Clustered Index: determines physical order of rows on disk (only 1 per table, usually Primary Key). 2) Non-Clustered Index: separate B-Tree structure storing indexed column values and pointers (Row IDs / Primary Key) to physical rows.",
      where_we_use: "Speeding up `WHERE`, `JOIN` ON conditions, and `ORDER BY` queries on multi-million row tables.",
      interview_theory: "MNC Crucial Question: Why do Indexes speed up SELECT queries but SLOW DOWN INSERT / UPDATE / DELETE operations? (Every write operation mutates physical table data AND requires updating all associated B-Tree index structures!).",
      example_code: `CREATE TABLE users (
  user_id INT PRIMARY KEY, -- Clustered Index
  email VARCHAR(255),
  created_at TIMESTAMP
);
CREATE INDEX idx_users_email ON users(email); -- Non-Clustered B-Tree Index`,
      quiz: [
        {
          question: "Why does adding multiple indexes to a database table SLOW DOWN `INSERT` and `DELETE` queries?",
          options: [
            "Indexes lock the CPU",
            "Every write operation must modify table data AND rebuild/update all associated B-Tree index structures",
            "Indexes delete foreign keys",
            "It turns off memory"
          ],
          correct: 1,
          explanation: "When rows are inserted or deleted, the database engine must update both the raw table pages and every associated index B-Tree node."
        }
      ]
    },
    {
      id: "sql_optimization",
      title: "Query Optimization & Execution Plans",
      subtopics: [
        {
          title: "EXPLAIN ANALYZE Execution Plans",
          theory: "`EXPLAIN ANALYZE` reveals the physical execution plan, showing step-by-step cost, actual time, and whether the engine used Index Seeks or Seq Scans."
        },
        {
          title: "SARGable Search Arguments",
          theory: "Queries are SARGable when columns are evaluated without function wrappers (`WHERE date >= '2024-01-01'`), enabling B-Tree Index Seek lookups."
        }
      ],
      definition: "Query Optimization is the process of analyzing, tuning, and restructuring SQL queries and database indexes to minimize query execution time and resource consumption.",
      syntax: `EXPLAIN ANALYZE \nSELECT e.name, d.dept_name \nFROM employees e JOIN departments d ON e.dept_id = d.dept_id \nWHERE e.salary > 80000;`,
      how_it_works: "1) Inspect `EXPLAIN ANALYZE` execution plans. 2) Look for `Seq Scan` (Full Table Scan) on large tables. 3) Add Composite Indexes `(col1, col2)`. 4) Avoid `SELECT *`. 5) Avoid applying functions on indexed columns in `WHERE` (`WHERE YEAR(date) = 2024` prevents index usage!).",
      where_we_use: "Tuning slow database queries, eliminating database CPU bottlenecks, optimizing high-throughput OLTP systems.",
      interview_theory: "MNC Optimization Trap: Why does `WHERE UPPER(email) = 'ALICE@GMAIL.COM'` fail to use a standard index on `email`? (Wrapping an indexed column inside a function prevents Index Seek, forcing a Full Table Scan! Solution: Expression/Function-based Index or store normalized lower text).",
      example_code: `-- BAD QUERY (Prevents Index Usage due to function wrapper):
-- SELECT * FROM orders WHERE YEAR(order_date) = 2024;

-- OPTIMIZED QUERY (SARGable - Uses Index Range Scan):
SELECT order_id, order_date, total_amount 
FROM orders 
WHERE order_date >= '2024-01-01' AND order_date < '2025-01-01';`,
      quiz: [
        {
          question: "Why does writing `WHERE YEAR(order_date) = 2024` prevent the database optimizer from using a standard index on `order_date`?",
          options: [
            "YEAR is an invalid keyword",
            "Applying a function to an indexed column makes the query non-SARGable, preventing Index Seek and forcing a Full Table Scan",
            "Dates cannot be indexed",
            "It turns the query into a view"
          ],
          correct: 1,
          explanation: "Wrapping an indexed column in a function prevents the query optimizer from using B-Tree index range lookups (non-SARGable condition)."
        }
      ]
    }
  ],

  interview_questions: {
    optimised: [
      {
        q: "1. What is the logical execution order of a standard SQL query containing all clauses?",
        a: "1) `FROM` (and JOINs), 2) `WHERE`, 3) `GROUP BY`, 4) `HAVING`, 5) `SELECT`, 6) `DISTINCT`, 7) `ORDER BY`, 8) `LIMIT / OFFSET`. Crucially, `WHERE` executes BEFORE `GROUP BY` and `SELECT`."
      },
      {
        q: "2. What is the difference between `WHERE` and `HAVING` clauses?",
        a: "`WHERE` filters individual table rows BEFORE `GROUP BY` aggregation takes place (cannot contain aggregate functions like `SUM()`). `HAVING` filters aggregated group rows AFTER `GROUP BY` takes place."
      },
      {
        q: "3. Explain `INNER JOIN`, `LEFT JOIN`, `RIGHT JOIN`, `FULL OUTER JOIN`, and `CROSS JOIN`.",
        a: "`INNER`: matching keys in both tables. `LEFT`: all left rows + matching right rows (NULL if missing). `RIGHT`: all right rows + matching left rows. `FULL OUTER`: all rows from both tables. `CROSS`: Cartesian product ($N \\times M$ rows)."
      },
      {
        q: "4. What is the difference between `UNION` and `UNION ALL`?",
        a: "`UNION` combines result sets and performs a distinct sorting step to eliminate duplicate rows. `UNION ALL` appends result sets directly including duplicates, executing significantly faster."
      },
      {
        q: "5. Explain Window Functions and contrast `ROW_NUMBER()`, `RANK()`, and `DENSE_RANK()`.",
        a: "Window functions compute across related rows without collapsing them into single summary rows. For tied values `[100, 100, 90]`: `ROW_NUMBER()` assigns unique sequential numbers `(1, 2, 3)`. `RANK()` assigns `(1, 1, 3)` (skips rank 2). `DENSE_RANK()` assigns `(1, 1, 2)` (no rank skips)."
      },
      {
        q: "6. How do `LAG()` and `LEAD()` window functions work and what are their common use cases?",
        a: "`LAG(col, n)` accesses values from $n$ rows BEFORE the current row. `LEAD(col, n)` accesses values from $n$ rows AFTER the current row. Common for computing Month-over-Month (MoM) growth rates and session duration gaps."
      },
      {
        q: "7. What is a Common Table Expression (CTE) and how does a Recursive CTE work?",
        a: "A CTE (`WITH` clause) defines a temporary named result set within query scope. A Recursive CTE consists of an Anchor member, a `UNION ALL`, and a Recursive member referencing the CTE name, used to traverse hierarchical tree data (e.g. org charts)."
      },
      {
        q: "8. What is the difference between a Correlated Subquery and a Non-Correlated Subquery?",
        a: "A Non-Correlated subquery runs independently once, returning a result set to the outer query. A Correlated subquery references columns from the outer query, re-executing once for EVERY row evaluated by the outer query (slow)."
      },
      {
        q: "9. Why is `EXISTS` generally faster than `IN` for subqueries on large tables?",
        a: "`EXISTS` uses short-circuit evaluation—it terminates the subquery scan as soon as the first matching row is found. `IN` materializes and checks the entire list of subquery values."
      },
      {
        q: "10. What is a Database Index? Explain Clustered vs Non-Clustered Indexes.",
        a: "An Index is a B-Tree structure speeding up row retrieval. A Clustered Index dictates the physical storage order of table data on disk (only 1 per table). A Non-Clustered Index is a separate structure storing indexed keys pointing to physical row IDs."
      },
      {
        q: "11. Why do Indexes speed up SELECT statements but slow down INSERT, UPDATE, and DELETE statements?",
        a: "Because whenever table data is modified or inserted, the database engine must write raw table pages AND rebuild/update corresponding B-Tree node pointers across all indexes associated with the table."
      },
      {
        q: "12. What makes a SQL query 'SARGable' and why does wrapping an indexed column in a function degrade performance?",
        a: "SARGable (Search Argument Able) means the optimizer can use an Index Seek. Applying functions to indexed columns (e.g. `WHERE YEAR(date) = 2024` or `WHERE UPPER(name) = 'ALICE'`) prevents the engine from traversing B-Tree indexes, forcing a Full Table Scan."
      },
      {
        q: "13. What is the difference between a Standard View and a Materialized View?",
        a: "A Standard View is a virtual table containing stored query text (executes dynamically, uses 0 data storage). A Materialized View physically computes and persists query results to disk, requiring periodic `REFRESH` but providing instant read access."
      },
      {
        q: "14. How do you find the 2nd Highest Salary in an `employees` table?",
        a: "Using Window Functions: `WITH Ranked AS (SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) as rk FROM employees) SELECT DISTINCT salary FROM Ranked WHERE rk = 2;` or `SELECT DISTINCT salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 1;`."
      },
      {
        q: "15. What are Database Normalization forms (1NF, 2NF, 3NF, BCNF) and why denormalize?",
        a: "1NF: Atomic column values. 2NF: 1NF + no partial key dependencies. 3NF: 2NF + no transitive non-key dependencies. Denormalization intentionally adds redundant data to 3NF schemas to reduce expensive JOINs in analytical read-heavy data warehouses."
      },
      {
        q: "16. Explain Database ACID Properties.",
        a: "Atomicity (all-or-nothing transactions), Consistency (database transitions from one valid state to another enforcing constraints), Isolation (concurrent transactions execute independently), Durability (committed transactions persist permanently even during crash)."
      },
      {
        q: "17. What are Transaction Isolation Levels and what anomalies do they prevent?",
        a: "Levels: Read Uncommitted, Read Committed, Repeatable Read, Serializable. Anomalies prevented: Dirty Read (reading uncommitted data), Non-Repeatable Read (rereading row yields changed values), Phantom Read (rereading table yields new inserted rows)."
      },
      {
        q: "18. How does `GROUP BY` handle `NULL` values?",
        a: "All `NULL` values are grouped together into a single summary group row, because SQL treats `NULL` values as equal for grouping purposes (unlike comparisons where `NULL = NULL` evaluates to `UNKNOWN`)."
      },
      {
        q: "19. How do you delete duplicate rows in a table while retaining 1 instance?",
        a: "Using a CTE with `ROW_NUMBER()`: `WITH CTE AS (SELECT emp_id, ROW_NUMBER() OVER (PARTITION BY email ORDER BY emp_id) as rn FROM users) DELETE FROM users WHERE emp_id IN (SELECT emp_id FROM CTE WHERE rn > 1);`."
      },
      {
        q: "20. What is a Composite Index and why does column order matter?",
        a: "A Composite Index indexes multiple columns `(colA, colB)`. Column order follows Leftmost Prefix Rule: the index can satisfy queries filtering on `(colA)` or `(colA, colB)`, but CANNOT be used for queries filtering on `(colB)` alone!"
      }
    ],
    tricky: [
      {
        q: "TRICKY 1. What does the expression `SELECT NULL = NULL;` evaluate to in SQL?",
        a: "It evaluates to `NULL` (UNKNOWN), NOT True! In SQL, `NULL` represents an missing unknown value, so comparing two unknown values yields unknown. You must use `IS NULL` or `IS NOT NULL`."
      },
      {
        q: "TRICKY 2. Why does `SELECT COUNT(*)` return 5, but `SELECT COUNT(commission)` return 3 on a table with 5 rows?",
        a: "`COUNT(*)` counts total table rows regardless of content. Aggregate functions like `COUNT(column_name)` explicitly IGNORE `NULL` values, returning only non-null occurrences!"
      },
      {
        q: "TRICKY 3. Why does `SELECT * FROM employees WHERE status NOT IN ('Active', 'Pending', NULL);` return ZERO rows?",
        a: "`NOT IN` expands to `status != 'Active' AND status != 'Pending' AND status != NULL`. Because any comparison with `NULL` yields `UNKNOWN`, the entire `AND` condition evaluates to `UNKNOWN`, returning 0 rows!"
      },
      {
        q: "TRICKY 4. What happens during a `LEFT JOIN` if you put a right table filter in the `WHERE` clause vs the `ON` clause?",
        a: "Putting right table filter `WHERE r.status = 'Active'` silently converts the `LEFT JOIN` into an `INNER JOIN` (because NULL right rows get filtered out by WHERE). Putting `ON r.status = 'Active'` preserves the `LEFT JOIN` behavior."
      },
      {
        q: "TRICKY 5. Can a table have multiple Clustered Indexes?",
        a: "NO! A Clustered Index dictates the physical storage order of data pages on disk. Since data can only be physically sorted on disk in one single order, a table can have at most ONE Clustered Index."
      },
      {
        q: "TRICKY 6. Why does `SELECT department_id, salary FROM employees GROUP BY department_id;` throw a Syntax Error in standard SQL?",
        a: "Because `salary` is neither enclosed inside an aggregate function (`SUM(salary)`) nor listed in the `GROUP BY` clause. Standard SQL forbids selecting non-aggregated columns that are un-grouped."
      },
      {
        q: "TRICKY 7. What is the subtle trap when using `BETWEEN '2024-01-01' AND '2024-01-31'` on a `DATETIME` column?",
        a: "'2024-01-31' implicitly casts to '2024-01-31 00:00:00'. Any order placed on January 31st at 10:30 AM will be EXCLUDED! Resolution: Use `>= '2024-01-01' AND < '2024-02-01'`."
      },
      {
        q: "TRICKY 8. Why does `ROW_NUMBER() OVER (ORDER BY salary DESC)` produce non-deterministic results across query executions?",
        a: "If multiple employees share identical salaries (ties), `ROW_NUMBER()` assigns arbitrary numbers to tied rows. To make ranking deterministic, add a unique tie-breaker column: `ORDER BY salary DESC, employee_id ASC`."
      },
      {
        q: "TRICKY 9. What is the difference between `TRUNCATE` and `DELETE` in SQL?",
        a: "`DELETE` is DML, deletes rows one by one, logs every row deletion in transaction log (can be rolled back), and triggers table DELETE triggers. `TRUNCATE` is DDL, deallocates data pages instantly, resets identity counters, and is much faster."
      },
      {
        q: "TRICKY 10. Why does a query using a Composite Index on `(country, city)` fail to use the index when querying `WHERE city = 'Paris'`?",
        a: "Because B-Tree composite indexes follow the **Leftmost Prefix Rule**. An index on `(country, city)` is sorted by `country` first, then `city`. Searching by `city` alone skips the leading index key, forcing a Full Table Scan."
      }
    ]
  }
};
