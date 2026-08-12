/* Big Data Module Data */
const BIGDATA_DATA = {
  subject: "Big Data & Apache Spark",
  icon: "database",
  description: "Master distributed computing architectures, Hadoop ecosystem, PySpark DataFrames, Spark SQL optimizations, Broadcast Joins, and Delta Lake Medallion pipelines.",
  topics: [
    {
      id: "hadoop",
      title: "Hadoop Ecosystem",
      formula: `\\text{HDFS Storage Efficiency: } \\text{Total Storage} = \\text{File Size} \\times 3`,
      subtopics: [
        {
          title: "HDFS Storage & Block Replication",
          theory: "HDFS divides files into 128MB blocks across DataNodes with a default 3x replication factor, distributing replicas across server racks to guarantee fault tolerance."
        },
        {
          title: "YARN Resource Allocation (RM & NM)",
          theory: "YARN decouples storage from compute. ResourceManager allocates CPU memory containers; NodeManager monitors node containers."
        }
      ],
      definition: "Hadoop is an open-source framework for distributed storage (HDFS) and processing (MapReduce / YARN) of massive datasets across commodity hardware clusters.",
      syntax: `hdfs dfs -ls /user/data/\nhdfs dfs -put localfile.txt /user/data/`,
      how_it_works: "HDFS stores files in 128MB blocks replicated 3x across DataNodes. NameNode manages metadata RAM. YARN (Yet Another Resource Negotiator) allocates cluster CPU/RAM resources.",
      where_we_use: "Legacy enterprise data lakes, batch raw log storage, ETL pipelines.",
      interview_theory: "MNC Question: What happens if NameNode crashes in Hadoop 1.x vs 2.x? (Hadoop 1.x had a Single Point of Failure. Hadoop 2.x introduced NameNode High Availability with Active/Standby NameNodes and Zookeeper).",
      example_code: `# Command CLI HDFS replication check simulation
hdfs_cmd = "hdfs dfs -setrep -w 3 /data/logs/2024-data.csv"
print("HDFS Replication Command:", hdfs_cmd)`,
      quiz: [
        {
          question: "What is the default block size in HDFS for modern Hadoop clusters?",
          options: ["64 KB", "128 MB", "1 GB", "4 KB"],
          correct: 1,
          explanation: "Default HDFS block size is 128 MB, reducing NameNode metadata RAM overhead for large sequential streaming reads."
        }
      ]
    },
    {
      id: "spark_core",
      title: "Apache Spark Core Architecture",
      subtopics: [
        {
          title: "Driver, Executors & Cluster Manager",
          theory: "Driver translates code into DAG execution physical plans. Executors run tasks in JVM processes on worker nodes."
        },
        {
          title: "In-Memory RAM RDD Lineage Graphs",
          theory: "Spark keeps intermediate partitions in executor RAM. If a partition fails, Spark uses the RDD DAG lineage graph to recompute missing partitions."
        }
      ],
      definition: "Apache Spark is a unified multi-language engine for executing data engineering, data science, and machine learning on single-node machines or clusters.",
      syntax: `from pyspark.sql import SparkSession\nspark = SparkSession.builder.appName("Mastery").getOrCreate()`,
      how_it_works: "Driver program coordinates Executor JVM processes. Operations construct a Directed Acyclic Graph (DAG) of RDD lineage stages. Executes in-memory, achieving 100x speed over MapReduce.",
      where_we_use: "Real-time streaming, large-scale ETL pipelines, distributed ML training, petabyte graph analytics.",
      interview_theory: "MNC Insight: How does Spark achieve fault tolerance without writing intermediate data to disk? (Through RDD Lineage Graphs! If a partition fails, Spark re-evaluates the transformation lineage path).",
      example_code: `from pyspark.sql import SparkSession

spark = SparkSession.builder.master("local[2]").appName("TestSpark").getOrCreate()
print(f"Spark Version: {spark.version} initialized in local mode.")
spark.stop()`,
      quiz: [
        {
          question: "How does Spark achieve fault tolerance for lost partitions during cluster execution?",
          options: [
            "By saving all data to local hard drives",
            "By recomputing lost partitions using the RDD Directed Acyclic Graph (DAG) Lineage graph",
            "By restarting the entire cluster",
            "By turning off memory"
          ],
          correct: 1,
          explanation: "Spark remembers the transformation DAG lineage graph. If a partition is lost, it re-executes only the missing parent operations."
        }
      ]
    },
    {
      id: "pyspark",
      title: "PySpark DataFrames",
      subtopics: [
        {
          title: "PySpark Python-JVM Py4J Bridge",
          theory: "PySpark bridges Python to JVM via Py4J. Standard Python UDFs serialize data back and forth; PyArrow vectorized UDFs bypass serialization overhead."
        }
      ],
      definition: "PySpark is the Python API for Apache Spark, combining Python's simplicity with Spark's distributed computing engine.",
      syntax: `from pyspark.sql import functions as F\ndf = df.filter(F.col("age") > 25).groupBy("dept").agg(F.avg("salary"))`,
      how_it_works: "PySpark DataFrames are structured distributed collections of data organized into named columns, powered by Py4J Java bridge and Catalyst Optimizer.",
      where_we_use: "Large-scale data transformation, distributed feature engineering, Parquet data lake processing.",
      interview_theory: "MNC Comparison: Python UDF vs Pandas Vectorized PyArrow UDF in PySpark. Standard Python UDFs incur high Py4J serialization overhead. Vectorized PyArrow UDFs process Apache Arrow memory chunks in C++.",
      example_code: `# Concept: PySpark DataFrame Operations
from pyspark.sql import SparkSession
from pyspark.sql import functions as F

spark = SparkSession.builder.appName("Demo").getOrCreate()
data = [("IT", 100000), ("HR", 60000), ("IT", 120000)]
df = spark.createDataFrame(data, ["Dept", "Salary"])

res = df.groupBy("Dept").agg(F.avg("Salary").alias("AvgSalary"))
res.show()
spark.stop()`,
      quiz: [
        {
          question: "Why are Pandas Vectorized UDFs (using PyArrow) significantly faster than standard Python UDFs in PySpark?",
          options: [
            "They run on GPUs",
            "PyArrow enables zero-copy memory transfers between the JVM and Python process space, bypassing expensive serialization",
            "Standard UDFs do not support numbers",
            "They delete missing data"
          ],
          correct: 1,
          explanation: "PyArrow allows PySpark to transfer data batches directly in contiguous memory between Python and JVM without Py4J serialization."
        }
      ]
    },
    {
      id: "spark_sql",
      title: "Spark SQL & Catalyst Optimizer",
      subtopics: [
        {
          title: "Catalyst 4-Stage Optimization Pipeline",
          theory: "Catalyst processes queries through 4 stages: Analysis, Logical Optimization (Predicate Pushdown, Column Pruning), Physical Planning, and Code Generation."
        }
      ],
      definition: "Spark SQL is a Spark module for structured data processing that optimizes SQL queries using the Catalyst Optimizer.",
      syntax: `df.createOrReplaceTempView("employees")\nspark.sql("SELECT dept, AVG(salary) FROM employees GROUP BY dept")`,
      how_it_works: "Catalyst passes queries through 4 phases: 1) Analysis, 2) Logical Optimization (Predicate Pushdown, Constant Folding), 3) Physical Planning, 4) Code Generation (Tungsten byte-code).",
      where_we_use: "BI reporting queries on Data Lakes, Data Warehouse transformations, SQL-based ETL pipelines.",
      interview_theory: "MNC Question: What is Predicate Pushdown in Spark SQL? (Catalyst pushes `WHERE` filter conditions down to the file storage layer (Parquet/ORC), scanning only matching row groups).",
      example_code: `sql_query = "SELECT department, COUNT(*) FROM global_temp.sales WHERE year = 2024 GROUP BY department"
print("Spark Catalyst SQL Query Plan Formatted:", sql_query)`,
      quiz: [
        {
          question: "What is Predicate Pushdown in Spark SQL Catalyst Optimizer?",
          options: [
            "Pushing queries to cloud storage",
            "Filtering data at the storage layer (e.g. Parquet) before loading unnecessary rows into Spark memory",
            "Deleting invalid columns",
            "Sorting data in ascending order"
          ],
          correct: 1,
          explanation: "Predicate Pushdown evaluates filter expressions directly at the file reader layer (e.g. Parquet footers), skipping unneeded data blocks."
        }
      ]
    },
    {
      id: "rdd",
      title: "Resilient Distributed Datasets (RDD)",
      subtopics: [
        {
          title: "Transformations (Lazy) vs Actions (Eager)",
          theory: "Transformations (`map`, `filter`) are lazy and build the DAG graph. Actions (`count`, `collect`) trigger physical cluster execution."
        }
      ],
      definition: "RDD is the fundamental low-level fault-tolerant collection of immutable distributed objects in Apache Spark.",
      syntax: `rdd = sc.parallelize([1, 2, 3, 4])\nrdd_squared = rdd.map(lambda x: x * x)\nres = rdd_squared.collect()`,
      how_it_works: "Transformations (`map`, `filter`) are LAZY and return new RDDs. Actions (`count`, `collect`) are EAGER and trigger execution of the DAG physical plan.",
      where_we_use: "Unstructured data parsing, custom low-level map-side operations, legacy Spark codebases.",
      interview_theory: "MNC Essential: What is the difference between Transformation and Action in Spark? (Transformations are lazy and append nodes to the DAG. Actions trigger actual execution).",
      example_code: `# Concept: RDD Lazy Transformation vs Action
data = [1, 2, 3, 4, 5]
# Lazy map evaluation
mapped = [x * 2 for x in data]
# Action trigger
total_sum = sum(mapped)
print("Action Result Output:", total_sum)`,
      quiz: [
        {
          question: "Which of the following Spark operations is an ACTION that triggers physical execution?",
          options: ["map()", "filter()", "flatMap()", "collect()"],
          correct: 3,
          explanation: "`collect()` is an Action that gathers results from worker executors back to the Driver, triggering DAG physical execution."
        }
      ]
    },
    {
      id: "partitioning",
      title: "Data Partitioning & Coalesce",
      subtopics: [
        {
          title: "repartition() vs coalesce() Shuffling",
          theory: "`repartition()` forces a full cluster data shuffle to balance partitions. `coalesce()` collapses local partitions without a full shuffle."
        }
      ],
      definition: "Data Partitioning divides a distributed dataset into smaller physical chunks (partitions) stored across cluster nodes.",
      syntax: `df_repart = df.repartition(10) # Full shuffle\ndf_coal = df.coalesce(1) # No shuffle reduction`,
      how_it_works: "Determines parallelism. `repartition(N)` increases/decreases partitions by performing a full cluster shuffle. `coalesce(N)` decreases partitions without a shuffle.",
      where_we_use: "Fixing skew, optimizing output Parquet file sizes, preventing OOM errors on driver.",
      interview_theory: "MNC Scenario: When to use `coalesce()` over `repartition()`? Use `coalesce()` when decreasing partition counts (e.g. before saving to 1 CSV), as it avoids a full cluster shuffle.",
      example_code: `# Concept: Partition Reduction Strategy
num_partitions = 100
target_partitions = 10

print(f"Reducing partitions from {num_partitions} to {target_partitions} using coalesce() to avoid full network shuffle.")`,
      quiz: [
        {
          question: "Why is `coalesce(N)` preferred over `repartition(N)` when decreasing the number of DataFrame partitions?",
          options: [
            "`coalesce` works only on GPUs",
            "`coalesce` merges adjacent local partitions without performing a full expensive network shuffle across cluster nodes",
            "`repartition` deletes data",
            "There is no performance difference"
          ],
          correct: 1,
          explanation: "`coalesce` avoids shuffling data across the network by collapsing existing partitions on the same worker node."
        }
      ]
    },
    {
      id: "shuffling",
      title: "Shuffle & Wide vs Narrow Dependencies",
      subtopics: [
        {
          title: "Narrow Dependencies vs Wide Dependencies",
          theory: "Narrow dependencies (`map`, `filter`) require data from 1 parent partition. Wide dependencies (`groupBy`, `join`) require data from multiple parent partitions, forcing network shuffles."
        }
      ],
      definition: "Shuffling is the process of redistributing data across cluster nodes during wide transformation operations.",
      syntax: `df_grouped = df.groupBy("department").sum("salary") # Triggers Shuffle`,
      how_it_works: "Narrow Dependencies: each parent partition is used by at most 1 child partition (no shuffle). Wide Dependencies: multiple child partitions depend on data in 1 parent partition (forces disk I/O and network shuffle).",
      where_we_use: "Understanding Spark bottleneck performance, tuning shuffle partitions (`spark.sql.shuffle.partitions`).",
      interview_theory: "MNC Question: What is a Wide Dependency in Spark? Operations like `groupBy()`, `distinct()`, and `join()` require data from all nodes, forcing a costly network shuffle.",
      example_code: `# Concept: Checking wide dependency shuffle partition configuration
shuffle_partitions = 200 # Default Spark config
print("Spark Default Shuffle Partitions:", shuffle_partitions)`,
      quiz: [
        {
          question: "Which Spark transformation introduces a WIDE dependency requiring a network shuffle?",
          options: ["map()", "filter()", "groupByKey()", "union()"],
          correct: 2,
          explanation: "`groupByKey()` requires data sharing identical keys across the entire cluster to be sent to the same executor, forcing a wide network shuffle."
        }
      ]
    },
    {
      id: "broadcast_join",
      title: "Broadcast Joins",
      subtopics: [
        {
          title: "Broadcast Hash Join (BHJ) Mechanics",
          theory: "BHJ copies a small lookup table to the RAM of every worker node, converting a wide shuffle join into a fast local narrow map join."
        }
      ],
      definition: "A Broadcast Join copies a small DataFrame to all worker nodes to avoid shuffling a large DataFrame across the network.",
      syntax: `from pyspark.sql.functions import broadcast\nlarge_df.join(broadcast(small_df), "id")`,
      how_it_works: "When joining a large DataFrame with a small DataFrame (default threshold < 10MB), Spark broadcasts the small table to every executor RAM, turning a Shuffle Hash Join into a fast Map-Side Join.",
      where_we_use: "Joining large transaction tables with small dimension lookup tables (e.g. Country Codes, Category Names).",
      interview_theory: "MNC Performance Optimization: How do you eliminate shuffle overhead when joining a 1TB table with a 5MB dimension lookup table? Use `broadcast(small_df)`!",
      example_code: `# Concept: Broadcast Join Hint Injection
from pyspark.sql.functions import broadcast

print("Injecting Broadcast Hint: large_df.join(broadcast(small_dim_df), 'city_id')")`,
      quiz: [
        {
          question: "What major bottleneck does a Broadcast Hash Join eliminate when joining a 1TB fact table with a 5MB dimension table?",
          options: [
            "Disk storage limits",
            "Network shuffle overhead across cluster nodes",
            "Python version incompatibility",
            "Primary key constraints"
          ],
          correct: 1,
          explanation: "Broadcasting the 5MB table to executor RAM eliminates the need to shuffle the 1TB fact table across the network."
        }
      ]
    },
    {
      id: "spark_optimization",
      title: "Spark Optimization Techniques",
      subtopics: [
        {
          title: "Adaptive Query Execution (AQE) & Salting",
          theory: "AQE dynamic re-optimizes query plans at runtime based on completed stage metrics. Salting adds random keys to fix data skew."
        }
      ],
      definition: "Strategies and configurations to maximize cluster throughput, prevent memory spills, and eliminate data skew bottlenecks.",
      syntax: `spark.conf.set("spark.sql.adaptive.enabled", "true")\n# Salting data skew:\ndf = df.withColumn("salted_key", F.concat(F.col("key"), F.lit("_"), F.floor(F.rand() * 10)))`,
      how_it_works: "1) AQE (Adaptive Query Execution): dynamically coalesces shuffle partitions, converts sort-merge joins to broadcast joins at runtime. 2) Salting: appends random prefixes to skewed join keys to distribute data evenly across executors.",
      where_we_use: "Optimizing production PySpark jobs running on AWS EMR, Databricks, or GCP Dataproc.",
      interview_theory: "MNC Advanced Scenario: How to resolve Data Skew in PySpark joins? (Use Key Salting! Append random integers to skewed keys in table A and explode matching keys in table B).",
      example_code: `# Concept: Key Salting for Data Skew Resolution
skewed_key = "NULL_KEY"
salted_key = f"{skewed_key}_{np.random.randint(0, 5)}"
print(f"Original Skewed Key [{skewed_key}] -> Salted Key [{salted_key}]")`,
      quiz: [
        {
          question: "What technique resolves severe Data Skew where 90% of join keys belong to a single key (e.g. NULL)?",
          options: [
            "Increasing cluster CPU cores",
            "Key Salting (appending random suffix numbers to distribute the skewed key across partitions)",
            "Deleting the NameNode",
            "Converting DataFrames to text"
          ],
          correct: 1,
          explanation: "Key Salting appends random integers to skewed keys, distributing heavy key workloads across multiple executor partitions evenly."
        }
      ]
    },
    {
      id: "delta_lake",
      title: "Delta Lake Architecture",
      subtopics: [
        {
          title: "ACID Transactions via _delta_log & Time Travel",
          theory: "Delta Lake stores JSON transaction logs in `_delta_log/` to enforce ACID guarantees and enable historic version rollback (Time Travel)."
        }
      ],
      definition: "Delta Lake is an open-source storage layer that brings ACID transactions and reliability to Apache Spark data lakes.",
      syntax: `df.write.format("delta").mode("overwrite").save("/mnt/delta/sales")\n# Time Travel:\ndf_past = spark.read.format("delta").option("versionAsOf", 3).load("/mnt/delta/sales")`,
      how_it_works: "Combines Parquet data files with a transaction log (`_delta_log/` containing JSON commits). Enables ACID guarantees, Time Travel (querying historic snapshots), schema enforcement, and `VACUUM` log cleanup.",
      where_we_use: "Building modern Lakehouse data architectures, streaming audit trails, financial data lakes.",
      interview_theory: "MNC Question: How does Delta Lake implement ACID transactions on cloud storage (S3/ADLS)? (Via atomic transaction logs in `_delta_log/` using commit protocol rules).",
      example_code: `# Concept: Delta Lake Time Travel Query Syntax
time_travel_query = "SELECT * FROM sales VERSION AS OF 5"
print("Delta Time Travel SQL Query Executed:", time_travel_query)`,
      quiz: [
        {
          question: "What underlying component in Delta Lake provides ACID transaction guarantees and Time Travel capability?",
          options: ["HDFS NameNode", "The `_delta_log/` transaction commit log", "Python GIL", "B-Tree Indexes"],
          correct: 1,
          explanation: "Delta Lake records every data mutation as an atomic JSON commit in the `_delta_log/` directory."
        }
      ]
    },
    {
      id: "databricks",
      title: "Databricks Platform",
      subtopics: [
        {
          title: "Medallion Architecture (Bronze, Silver, Gold)",
          theory: "Bronze holds raw unvalidated ingestion dumps. Silver cleans and validates data. Gold aggregates metrics for BI and AI modeling."
        }
      ],
      definition: "Databricks is a unified cloud-based analytics platform founded by the creators of Apache Spark, featuring Lakehouse architecture, MLflow, and Auto Loader.",
      syntax: `display(spark.readStream.format("cloudFiles").option("cloudFiles.format", "json").load(path))`,
      how_it_works: "Implements Medallion Architecture: Bronze (raw ingestion), Silver (filtered, cleaned data), Gold (business-level aggregated metrics). Powered by Photon C++ vector engine.",
      where_we_use: "Enterprise Data Lakehouse, end-to-end AI/ML model development, real-time streaming pipelines.",
      interview_theory: "MNC Architecture: Explain Medallion Architecture in Databricks (Bronze -> Silver -> Gold data layers).",
      example_code: `medallion_layers = {
    "Bronze": "Raw un-validated ingestion dump",
    "Silver": "Cleaned, deduplicated, validated tables",
    "Gold": "Business aggregations for BI & ML"
}
for layer, desc in medallion_layers.items():
    print(f"Layer [{layer}]: {desc}")`,
      quiz: [
        {
          question: "In Databricks Medallion Architecture, what characterizes the 'Silver' data layer?",
          options: [
            "Raw uncleaned JSON dumps",
            "Cleaned, deduplicated, and enriched tabular data ready for analytics",
            "High-level executive dashboard aggregations",
            "Deleted trash files"
          ],
          correct: 1,
          explanation: "The Silver layer cleans, validates, and enriches raw Bronze data into structured tables."
        }
      ]
    }
  ],

  interview_questions: {
    optimised: [
      {
        q: "1. What is the fundamental architecture of Apache Spark and how does it execute jobs?",
        a: "Spark follows a Driver/Executor model. Driver creates the SparkSession, converts user code into a Logical Plan, optimizes it via Catalyst into a Physical Plan (DAG of RDD stages), and schedules tasks to Executor JVMs on worker nodes."
      },
      {
        q: "2. What is the difference between RDD, DataFrame, and Dataset in Spark?",
        a: "RDD: low-level immutable collection, lacks Catalyst optimization. DataFrame: structured 2D table optimized by Catalyst and Tungsten, untyped in Scala/Java. Dataset: strongly typed domain objects + Catalyst optimization (Scala/Java only)."
      },
      {
        q: "3. Explain Narrow vs Wide Dependencies in Spark.",
        a: "Narrow dependencies (map, filter): each parent partition is used by at most one child partition (no shuffle). Wide dependencies (groupBy, join): multiple child partitions depend on data from parent partitions, requiring a network shuffle."
      },
      {
        q: "4. What is a Broadcast Join and when should it be used?",
        a: "A Broadcast Join copies a small DataFrame (< 10MB default) to every executor RAM, converting a Wide Shuffle Join into a Narrow Map-Side Join, eliminating network shuffle overhead."
      },
      {
        q: "5. How do `repartition()` and `coalesce()` differ?",
        a: "`repartition(N)` increases or decreases partitions by performing a full cluster shuffle. `coalesce(N)` decreases partitions by merging local adjacent partitions without a shuffle."
      },
      {
        q: "6. What is Data Skew in PySpark and how do you resolve it?",
        a: "Data Skew happens when one partition receives a disproportionate amount of data (e.g. 90% of rows share one key), stalling cluster completion. Resolved via Key Salting or Adaptive Query Execution (AQE)."
      },
      {
        q: "7. How does Spark Catalyst Optimizer optimize SQL queries?",
        a: "Catalyst passes queries through 4 stages: Analysis, Logical Optimization (Predicate Pushdown, Column Pruning), Physical Planning, and Code Generation (Tungsten bytecode generation)."
      },
      {
        q: "8. What is Delta Lake and how does it provide ACID transactions on object storage?",
        a: "Delta Lake adds an atomic transaction log (`_delta_log/`) containing JSON commit records over Parquet files, enabling ACID compliance and Time Travel versioning."
      },
      {
        q: "9. What is the Medallion Architecture in Databricks?",
        a: "Bronze: raw unvalidated file ingestion layer. Silver: cleaned, deduplicated, and validated structure. Gold: high-level business metrics aggregated for BI and ML."
      },
      {
        q: "10. How does HDFS achieve fault tolerance for stored files?",
        a: "HDFS splits files into 128MB blocks and replicates them (default 3x) across different server racks. NameNode monitors DataNode heartbeat signals."
      },
      {
        q: "11. What is the role of YARN in the Hadoop/Spark ecosystem?",
        a: "YARN (Yet Another Resource Negotiator) manages cluster resources. The ResourceManager allocates CPU/RAM containers, while NodeManagers execute tasks."
      },
      {
        q: "12. What is Adaptive Query Execution (AQE) in Spark 3.0+?",
        a: "AQE re-optimizes physical query plans at runtime based on actual stage metrics, dynamically coalescing shuffle partitions and converting sort-merge joins to broadcast joins."
      },
      {
        q: "13. Why are PySpark Pandas UDFs (PyArrow) faster than standard Python UDFs?",
        a: "PyArrow uses Apache Arrow shared memory format, transferring data batches directly between JVM and Python processes without Py4J serialization."
      },
      {
        q: "14. How do you handle Out-Of-Memory (OOM) errors on Spark Driver vs Executors?",
        a: "Driver OOM: caused by calling `collect()` on large DataFrames. Fix: increase `spark.driver.memory` or use `take(N)`. Executor OOM: caused by data skew or large shuffle blocks. Fix: increase `executor.memory`, increase partition count, or apply key salting."
      },
      {
        q: "15. What is the difference between `cache()` and `persist()` in PySpark?",
        a: "`cache()` is a shortcut that saves DataFrames in memory with `MEMORY_ONLY` (or `MEMORY_AND_DISK` in Spark 3.0+). `persist(StorageLevel)` allows explicit storage level selection (e.g. `MEMORY_ONLY_SER`, `DISK_ONLY`)."
      },
      {
        q: "16. What is Predicate Pushdown in Parquet data scanning?",
        a: "Predicate Pushdown evaluates filter expressions directly at the file reader layer using Parquet file metadata footers, skipping unneeded row group blocks."
      },
      {
        q: "17. Explain the difference between MapReduce and Apache Spark.",
        a: "MapReduce writes intermediate results to disk after every Map and Reduce stage (slow I/O). Spark keeps intermediate partitions in executor RAM, running up to 100x faster."
      },
      {
        q: "18. What is a Sort-Merge Join in Spark?",
        a: "The default join for large tables: 1) Sorts both DataFrames on join keys within partitions, 2) Merges sorted partitions linearly. Replaced by Broadcast Join when one table is small."
      },
      {
        q: "19. How does `VACUUM` work in Delta Lake and why is caution required?",
        a: "`VACUUM` deletes data files no longer referenced by the Delta transaction log older than a retention threshold (default 7 days). Caution: deletes historic versions needed for Time Travel!"
      },
      {
        q: "20. How do you optimize Spark write operations to prevent the 'Small File Problem'?",
        a: "Coalesce or repartition DataFrames before writing, or enable Databricks Auto-Optimize and Auto-Compaction to merge small Parquet files into target 128MB files."
      }
    ],
    tricky: [
      {
        q: "TRICKY 1. What happens when you execute `df.map(...)` in PySpark on a 100GB dataset and then call `df.collect()`?",
        a: "`collect()` fetches the ENTIRE 100GB dataset from worker executors into the single Driver node memory, immediately triggering a `java.lang.OutOfMemoryError: Java heap space` on the Driver!"
      },
      {
        q: "TRICKY 2. Why does `df.count()` execute instantly on a Delta Lake table, but take minutes on a raw CSV folder?",
        a: "Delta Lake stores pre-computed table statistics (including exact row count) inside its `_delta_log/` transaction metadata. CSV requires a full scan of all raw text files."
      },
      {
        q: "TRICKY 3. In PySpark, why can calling `df.persist()` actually DECREASE performance if available executor RAM is low?",
        a: "If memory is insufficient, Spark continuously spills cached partitions to disk and deserializes them back, introducing heavy disk I/O and garbage collection pauses."
      },
      {
        q: "TRICKY 4. Why does `coalesce(1)` run on a single thread and slow down preceding parallel transformations?",
        a: "Spark pushes `coalesce(1)` upstream, forcing all preceding pipeline transformations to execute on a single partition and thread on 1 node!"
      },
      {
        q: "TRICKY 5. What is the subtle trap when using `df.dropna()` before a `groupBy()` aggregation?",
        a: "If grouping columns contain NULL values, `groupBy()` inherently groups NULLs into a single group. Using `dropna()` deletes those rows completely, altering target group counts!"
      },
      {
        q: "TRICKY 6. Why does broadcasting a 50MB table in PySpark crash executors if `spark.sql.autoBroadcastJoinThreshold` is increased carelessly?",
        a: "The broadcast table is deserialized into Java objects on EVERY executor. If an executor runs 4 task threads, memory consumption spikes 4x, causing Executor OOM."
      },
      {
        q: "TRICKY 7. What happens if two concurrent Spark jobs write to the same Delta Lake table simultaneously?",
        a: "Delta Lake uses Optimistic Concurrency Control (OCC). If both jobs mutate the same files, the second job fails with a `ConcurrentAppendException` and automatically retries."
      },
      {
        q: "TRICKY 8. Why does `df.repartition(10, 'country')` produce skewed output Parquet files even if total row count is balanced?",
        a: "Spark uses Hash Partitioning on 'country'. If 80% of rows belong to 'USA', 80% of data lands in 1 partition file while other partition files remain nearly empty."
      },
      {
        q: "TRICKY 9. In PySpark, why does `df.isLocal()` return `False` for distributed DataFrames?",
        a: "`isLocal()` returns `True` ONLY if the DataFrame runs without executors (e.g. `createDataFrame` with 1 local row). For cluster DataFrames, it returns `False`."
      },
      {
        q: "TRICKY 10. Why does calling `sc.stop()` inside a Python script running PySpark jobs background threads throw errors?",
        a: "Stopping `SparkContext` destroys the JVM Py4J gateway bridge, causing active background threads to throw `Py4JNetworkError`."
      }
    ]
  }
};
