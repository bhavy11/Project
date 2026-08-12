/* 90-Day Learning Roadmap Data */
const ROADMAP_DATA = [
  {
    week: 1,
    title: "Week 1: Python Data Science Foundation (NumPy & Pandas Basics)",
    days: [
      { day: 1, topicId: "numpy", title: "Day 1: NumPy Arrays, Strides, & Memory Layout" },
      { day: 2, topicId: "numpy", title: "Day 2: NumPy Broadcasting, Vectorization & Matrix Operations" },
      { day: 3, topicId: "pandas", title: "Day 3: Pandas Series, DataFrames & Indexing (.loc vs .iloc)" },
      { day: 4, topicId: "pandas", title: "Day 4: Data Cleaning, Missing Value Handling & Vectorized Filters" },
      { day: 5, topicId: "pandas", title: "Day 5: Aggregations, GroupBy & Pivot Tables" },
      { day: 6, topicId: "pandas", title: "Day 6: Merging, Joining & Memory Optimization Techniques" },
      { day: 7, topicId: "numpy", title: "Day 7: Week 1 Revision & Self Assessment Quiz" }
    ]
  },
  {
    week: 2,
    title: "Week 2: Data Visualization & Exploratory Data Analysis (EDA)",
    days: [
      { day: 8, topicId: "matplotlib", title: "Day 8: Matplotlib Object-Oriented API & Figure/Axes Layouts" },
      { day: 9, topicId: "matplotlib", title: "Day 9: Subplots, Line Trends & Custom Plot Annotations" },
      { day: 10, topicId: "seaborn", title: "Day 10: Seaborn Statistical Plots (Histograms, KDE & Violin Plots)" },
      { day: 11, topicId: "seaborn", title: "Day 11: Correlation Heatmaps & Pairwise Bivariate Distributions" },
      { day: 12, topicId: "scikit_learn", title: "Day 12: Scikit-Learn API Paradigm (Fit, Transform, Predict)" },
      { day: 13, topicId: "scikit_learn", title: "Day 13: Scikit-Learn Pipelines & Data Leakage Prevention" },
      { day: 14, topicId: "seaborn", title: "Day 14: Week 2 EDA Capstone Project" }
    ]
  },
  {
    week: 3,
    title: "Week 3: Advanced Python Libraries & Computer Vision Basics",
    days: [
      { day: 15, topicId: "nltk", title: "Day 15: NLTK Tokenization, Stopwords & Lexical Normalization" },
      { day: 16, topicId: "nltk", title: "Day 16: Stemming vs Lemmatization & POS Tagging" },
      { day: 17, topicId: "opencv", title: "Day 17: OpenCV Image Loading (BGR vs RGB) & Color Space Conversions" },
      { day: 18, topicId: "opencv", title: "Day 18: Image Thresholding, Edge Detection & Contour Extraction" },
      { day: 19, topicId: "fastapi", title: "Day 19: FastAPI Async Microservices & Pydantic Schemas" },
      { day: 20, topicId: "flask", title: "Day 20: Flask Web Framework & Model Serving Comparisons" },
      { day: 21, topicId: "fastapi", title: "Day 21: Week 3 Revision & Model API Pipeline Deployment" }
    ]
  },
  {
    week: 4,
    title: "Week 4: Deep Learning Frameworks (TensorFlow & PyTorch)",
    days: [
      { day: 22, topicId: "tensorflow", title: "Day 22: TensorFlow Keras Sequential & Functional APIs" },
      { day: 23, topicId: "tensorflow", title: "Day 23: GradientTape, Autodiff & tf.function Graph Compilation" },
      { day: 24, topicId: "pytorch", title: "Day 24: PyTorch Tensors, Autograd & Dynamic Computation Graphs" },
      { day: 25, topicId: "pytorch", title: "Day 25: PyTorch Custom nn.Module & Training Loops (zero_grad)" },
      { day: 26, topicId: "transformers", title: "Day 26: Hugging Face Pretrained Transformers & Tokenizers" },
      { day: 27, topicId: "transformers", title: "Day 27: Self-Attention Mechanisms & Attention Masking" },
      { day: 28, topicId: "pytorch", title: "Day 28: Week 4 Deep Learning Frameworks Benchmark" }
    ]
  },
  {
    week: 5,
    title: "Week 5: SQL Core Mastery (Beginner to Advanced)",
    days: [
      { day: 29, topicId: "sql_beginner", title: "Day 29: SQL Fundamentals, SELECT Statements & Clause Execution Order" },
      { day: 30, topicId: "sql_beginner", title: "Day 30: Filtering (WHERE, BETWEEN, LIKE) & Sorting (ORDER BY)" },
      { day: 31, topicId: "sql_intermediate", title: "Day 31: Group Aggregations (GROUP BY) & HAVING Filters" },
      { day: 32, topicId: "sql_intermediate", title: "Day 32: Aggregation Functions (COUNT, SUM, AVG, MIN, MAX)" },
      { day: 33, topicId: "sql_advanced", title: "Day 33: Conditional Logic (CASE WHEN) & NULL Handling (COALESCE)" },
      { day: 34, topicId: "sql_advanced", title: "Day 34: Set Operations (UNION vs UNION ALL, INTERSECT, EXCEPT)" },
      { day: 35, topicId: "sql_intermediate", title: "Day 35: Week 5 SQL Fundamentals Speed Drill" }
    ]
  },
  {
    week: 6,
    title: "Week 6: SQL Window Functions & Relational Joins",
    days: [
      { day: 36, topicId: "sql_joins", title: "Day 36: INNER JOIN, LEFT JOIN, RIGHT JOIN & FULL OUTER JOIN" },
      { day: 37, topicId: "sql_joins", title: "Day 37: Self Joins, Cross Joins & Multi-Table Relational Schema Queries" },
      { day: 38, topicId: "sql_window_functions", title: "Day 38: Ranking Window Functions (ROW_NUMBER, RANK, DENSE_RANK)" },
      { day: 39, topicId: "sql_window_functions", title: "Day 39: Value Window Functions (LAG, LEAD, FIRST_VALUE, LAST_VALUE)" },
      { day: 40, topicId: "sql_window_functions", title: "Day 40: Aggregate Window Functions (Running Totals & Moving Averages)" },
      { day: 41, topicId: "sql_subqueries", title: "Day 41: Scalar vs Multi-Row Subqueries & Correlated Subquery Optimization" },
      { day: 42, topicId: "sql_window_functions", title: "Day 42: Week 6 Advanced SQL Practice Challenge" }
    ]
  },
  {
    week: 7,
    title: "Week 7: Advanced SQL CTEs, Indexing & Query Tuning",
    days: [
      { day: 43, topicId: "sql_cte", title: "Day 43: Common Table Expressions (WITH Clause) & Query Modularization" },
      { day: 44, topicId: "sql_cte", title: "Day 44: Recursive CTEs for Hierarchical Tree Traversal" },
      { day: 45, topicId: "sql_views", title: "Day 45: Virtual Views vs Materialized Views & Refresh Strategies" },
      { day: 46, topicId: "sql_index", title: "Day 46: B-Tree Indexes: Clustered vs Non-Clustered Architecture" },
      { day: 47, topicId: "sql_index", title: "Day 47: Composite Indexes & Leftmost Prefix Search Rules" },
      { day: 48, topicId: "sql_optimization", title: "Day 48: EXPLAIN Execution Plans, SARGable Queries & Index Seek Tuning" },
      { day: 49, topicId: "sql_optimization", title: "Day 49: Week 7 MNC SQL Interview Scenario Drill" }
    ]
  },
  {
    week: 8,
    title: "Week 8: Machine Learning Mathematical Foundations & Preprocessing",
    days: [
      { day: 50, topicId: "ml_basics", title: "Day 50: Supervised vs Unsupervised ML & Bias-Variance Tradeoff" },
      { day: 51, topicId: "math_for_ml", title: "Day 51: Linear Algebra & Eigenvector Decomposition for Data Science" },
      { day: 52, topicId: "data_preprocessing", title: "Day 52: Data Cleaning & Missing Value Imputation (Mean/Median/KNN)" },
      { day: 53, topicId: "feature_scaling", title: "Day 53: Feature Scaling (StandardScaler vs MinMaxScaler vs RobustScaler)" },
      { day: 54, topicId: "encoding_techniques", title: "Day 54: Categorical Encoding (One-Hot, Ordinal, Target) & Dummy Trap" },
      { day: 55, topicId: "sampling_techniques", title: "Day 55: Stratified Sampling & Train-Test Data Partitioning" },
      { day: 56, topicId: "imbalanced_data", title: "Day 56: Handling Imbalanced Datasets (SMOTE & Class Weighting)" }
    ]
  },
  {
    week: 9,
    title: "Week 9: Supervised ML Algorithms & Model Evaluation",
    days: [
      { day: 57, topicId: "regression_models", title: "Day 57: Linear Regression, Ridge (L2) & Lasso (L1) Regularization" },
      { day: 58, topicId: "classification_models", title: "Day 58: Logistic Regression, Sigmoid Function & Decision Boundaries" },
      { day: 59, topicId: "classification_models", title: "Day 59: Support Vector Machines (SVM) & Kernel Trick" },
      { day: 60, topicId: "model_evaluation", title: "Day 60: Precision, Recall, F1-Score & ROC-AUC Curves" },
      { day: 61, topicId: "cross_validation", title: "Day 61: K-Fold & TimeSeriesSplit Cross Validation" },
      { day: 62, topicId: "hyperparameter_tuning", title: "Day 62: Grid Search, Random Search & Optuna Bayesian Optimization" },
      { day: 63, topicId: "feature_selection", title: "Day 63: Feature Selection Methods (Filter, Wrapper RFE, Embedded)" }
    ]
  },
  {
    week: 10,
    title: "Week 10: Ensembles, Clustering & Unsupervised Learning",
    days: [
      { day: 64, topicId: "ensemble_learning", title: "Day 64: Bagging & Random Forest Classifier/Regressor" },
      { day: 65, topicId: "ensemble_learning", title: "Day 65: Gradient Boosting, XGBoost, LightGBM & CatBoost" },
      { day: 66, topicId: "clustering_models", title: "Day 66: K-Means Clustering, Elbow Method & Silhouette Score" },
      { day: 67, topicId: "clustering_models", title: "Day 67: Density-Based Clustering (DBSCAN) & Noise Detection" },
      { day: 68, topicId: "dimensionality_reduction", title: "Day 68: Principal Component Analysis (PCA) & Variance Ratio" },
      { day: 69, topicId: "dimensionality_reduction", title: "Day 69: t-SNE & UMAP Manifold Visualization" },
      { day: 70, topicId: "time_series", title: "Day 70: Time Series Stationarity, ADF Test & ARIMA Models" }
    ]
  },
  {
    week: 11,
    title: "Week 11: Advanced ML Concepts, XAI & MLOps",
    days: [
      { day: 71, topicId: "recommender_systems", title: "Day 71: Collaborative Filtering, SVD Matrix Factorization & Cold Start" },
      { day: 72, topicId: "anomaly_detection", title: "Day 72: Isolation Forest & One-Class SVM Anomaly Detection" },
      { day: 73, topicId: "association_rules", title: "Day 73: Association Rule Mining (Apriori, FP-Growth, Support/Lift)" },
      { day: 74, topicId: "reinforcement_learning", title: "Day 74: Reinforcement Learning (MDP, Q-Learning, Bellman Equation)" },
      { day: 75, topicId: "optimization_algorithms", title: "Day 75: Optimization Algorithms (SGD, Momentum, Adam, AdamW)" },
      { day: 76, topicId: "xai", title: "Day 76: Explainable AI (SHAP Values & LIME Model Attribution)" },
      { day: 77, topicId: "mlops_fundamentals", title: "Day 77: MLOps: Experiment Tracking (MLflow) & Data/Concept Drift" }
    ]
  },
  {
    week: 12,
    title: "Week 12: Generative AI, LLMs & RAG Architecture",
    days: [
      { day: 78, topicId: "llm", title: "Day 78: LLM Autoregressive Decoding & KV Cache Architecture" },
      { day: 79, topicId: "prompt_engineering", title: "Day 79: Few-Shot Prompting, Chain-of-Thought & System Prompts" },
      { day: 80, topicId: "langchain", title: "Day 80: LangChain LCEL Expression Language & Runnable Chains" },
      { day: 81, topicId: "rag", title: "Day 81: RAG Architecture (Ingestion, Chunking, Retrieval & Generation)" },
      { day: 82, topicId: "embeddings", title: "Day 82: Text Embeddings, Cosine Similarity & Vector Distance Metrics" },
      { day: 83, topicId: "vector_db", title: "Day 83: Vector DB Architecture & HNSW Indexing" },
      { day: 84, topicId: "faiss", title: "Day 84: FAISS Vector Indexes & Product Quantization (PQ)" }
    ]
  },
  {
    week: 13,
    title: "Week 13: Big Data, Spark & Enterprise AI Deployment",
    days: [
      { day: 85, topicId: "hadoop", title: "Day 85: Hadoop HDFS Architecture & YARN Resource Scheduling" },
      { day: 86, topicId: "spark", title: "Day 86: Apache Spark DAG Engine & In-Memory Execution" },
      { day: 87, topicId: "pyspark", title: "Day 87: PySpark DataFrames, Catalyst Optimizer & Predicate Pushdown" },
      { day: 88, topicId: "broadcast_join", title: "Day 88: Spark Shuffling, Partitioning & Broadcast Hash Joins" },
      { day: 89, topicId: "delta_lake", title: "Day 89: Delta Lake ACID Transactions, Time Travel & Databricks" },
      { day: 90, topicId: "ml_interview_concepts", title: "Day 90: Final Top MNC Interview Preparation & Mock Assessment" }
    ]
  }
];
