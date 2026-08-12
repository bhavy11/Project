/* Machine Learning Module Data */
const ML_DATA = {
  subject: "Machine Learning",
  icon: "brain",
  description: "Comprehensive end-to-end Machine Learning mastery covering mathematical foundations, algorithms, feature engineering, evaluation, XAI, MLOps, and interview scenarios.",
  topics: [
    {
      id: "ml_basics",
      title: "Machine Learning Basics",
      introduction: {
        what: "Machine Learning is a domain of Artificial Intelligence focused on building algorithms that infer statistical patterns from data.",
        why_created: "To replace rigid hand-coded heuristic rule systems with self-improving algorithms driven by empirical data.",
        why_needed: "Essential for solving complex non-linear problems like speech recognition, computer vision, and predictive scoring.",
        history: "Originated with Arthur Samuel (1959) and Frank Rosenblatt's Perceptron, evolving to modern Deep Learning and LLMs."
      },
      definition_beginner: "Machine Learning is teaching computers to learn patterns from data and make predictions without explicit rules.",
      definition_interview: "A statistical learning framework optimizing parameter weights $\\theta$ to minimize empirical risk $\\mathcal{L}(\\theta)$ over target data distributions.",
      why_we_use: {
        purpose: "Pattern recognition, automated decision making, predictive modeling, continuous learning.",
        benefits: ["Automates complex decisions", "Scales to high-dimensional datasets", "Self-improving accuracy"],
        problems_solved: ["Eliminates thousands of manual if-else statements"],
        real_world_importance: "Powers search engines, recommendation systems, fraud detection, and autonomous systems."
      },
      internal_working: {
        execution_flow: "Data Ingestion -> Feature Extraction -> Loss Calculation -> Gradient Descent Optimization -> Model Evaluation.",
        memory_behavior: "Allocates feature matrices and parameter weight vectors in RAM.",
        processing_flow: "Features X -> Model Weights W -> Predicted y_hat -> Loss -> Weights Updated.",
        diagram: `[Input Features X] ──> [Model Parameters W] ──> [Loss Function L] ──> [Optimizer]`
      },
      syntax: {
        basic: "from sklearn.model_selection import train_test_split\nX_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2)",
        advanced: "model.fit(X_tr, y_tr); y_pred = model.predict(X_te)",
        variations: ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning"],
        keyword_explanation: "Supervised relies on target y labels; Unsupervised parses unlabeled features X."
      },
      parameters: [{ name: "test_size", type: "float", required: false, default_val: "0.25", description: "Proportion of dataset to include in test split." }],
      return_value: { type: "tuple of DataFrames/arrays", output_description: "Partitioned train and test data splits.", examples: ["(X_train, X_test, y_train, y_test)"] },
      supported_operations: ["Supervised Regression", "Supervised Classification", "Unsupervised Clustering", "Dimensionality Reduction"],
      methods: [{ name: "fit()", definition: "Optimizes model weights on training dataset.", syntax: "model.fit(X, y)", parameters: "X: features, y: target", return_type: "self", example: "clf.fit(X_train, y_train)", output: "Fitted model", best_practice: "Fit only on training data.", time_complexity: "O(N)", space_complexity: "O(W)" }],
      formula: `\\text{Loss Minimization: } \\min_{\\theta} \\frac{1}{N} \\sum_{i=1}^N \\mathcal{L}(y_i, f_{\\theta}(x_i))`,
      subtopics: [
        {
          title: "Supervised vs Unsupervised vs Semi-Supervised vs RL",
          theory: "Supervised ML learns mappings $f(X) \\rightarrow y$ from labeled pairs. Unsupervised ML finds patterns in unlabeled data $X$. Semi-Supervised combines small labeled with large unlabeled datasets. RL optimizes actions via environment rewards.",
          internal_working: "Supervised uses target loss signals; Unsupervised uses geometric distance/density metrics.",
          code_example: "from sklearn.cluster import KMeans\nkmeans = KMeans(n_clusters=3).fit(X)",
          output: "Unsupervised cluster labels",
          common_mistakes: "Attempting supervised metrics (accuracy) on unsupervised clustering.",
          best_practices: "Use Silhouette Score for evaluating unsupervised clustering."
        },
        {
          title: "Bias-Variance Tradeoff",
          theory: "Bias is error from underfitting overly simple models. Variance is sensitivity to training set noise causing overfitting. Total error equals $\\text{Bias}^2 + \\text{Variance} + \\text{Irreducible Error}$.",
          internal_working: "High bias locks parameters; High variance over-fits to random noise.",
          code_example: "# Polynomial degree controls bias vs variance\n# Low degree = High Bias; High degree = High Variance",
          output: "Bias-Variance curve",
          common_mistakes: "Increasing model complexity when experiencing high variance.",
          best_practices: "Use L1/L2 regularization or add training data to reduce high variance."
        }
      ],
      code_examples: {
        beginner: { code: "import numpy as np\nX = np.array([[1], [2], [3]])\ny = np.array([2, 4, 6])\nprint('Data shape:', X.shape)", explanation: "Inspecting feature matrix dimensions.", output: "Data shape: (3, 1)" },
        intermediate: { code: "from sklearn.model_selection import train_test_split\nimport numpy as np\nX = np.arange(10).reshape(5, 2)\ny = np.array([0, 0, 1, 1, 1])\nX_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2)\nprint('Train size:', len(X_tr))", explanation: "Partitioning dataset into train and test splits.", output: "Train size: 4" },
        advanced: { code: "from sklearn.datasets import make_classification\nfrom sklearn.linear_model import LogisticRegression\nX, y = make_classification(n_samples=100, n_features=4)\nclf = LogisticRegression().fit(X, y)\nprint('Model Accuracy:', clf.score(X, y))", explanation: "End-to-end model fitting and scoring.", output: "Model Accuracy score." },
        production: { code: "from sklearn.base import BaseEstimator, ClassifierMixin\nclass DummyClassifier(BaseEstimator, ClassifierMixin):\n    def fit(self, X, y): return self\n    def predict(self, X): return np.zeros(len(X))\n\nprint('Custom Scikit-Learn Estimator instantiated.')", explanation: "Production custom estimator inheriting BaseEstimator.", output: "Custom Scikit-Learn Estimator instantiated." }
      },
      real_project_example: { title: "Supervised Fraud Detection Classifier", description: "Trains a binary classification model to detect fraudulent transactions.", code: "clf = LogisticRegression().fit(X_train, y_train)" },
      common_mistakes: [{ mistake: "Evaluating model accuracy on the exact same dataset used for training (optimistic bias).", fix: "Always evaluate performance on a separate holdout test set or CV." }],
      best_practices: ["Establish a simple baseline model (e.g. Logistic Regression) before building complex models."],
      performance_tips: ["Downcast numerical data types to float32 before training."],
      advantages: ["Automates complex predictions", "Scales to massive data distributions"],
      limitations: ["Garbage in, garbage out (requires high-quality clean training data)"],
      comparison_table: [{ feature: "Target Labels", this_concept: "Supervised (Required)", alternate: "Unsupervised (None)", winner: "Supervised for prediction" }],
      interview_questions: [{ q: "What is the Bias-Variance Tradeoff?", a: "Bias is error from underfitting simple models. Variance is error from overfitting to noise. Total Error = Bias^2 + Variance + Irreducible Error." }],
      tricky_questions: [{ q: "Tricky Q1: Can a model have zero bias and zero variance simultaneously on noisy real data?", a: "No! Irreducible noise in real data prevents zero total error." }],
      coding_challenges: [{ difficulty: "Easy", problem: "Split X, y into 80% train and 20% test sets.", input: "X, y", output: "Splits", solution: "X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2)", complexity: "O(N)" }],
      quiz: [{ question: "Which metric represents error caused by an underfitting model that is too simple?", options: ["High Bias", "High Variance", "Overfitting", "Zero Noise"], correct: 0, explanation: "High Bias occurs when a model is too simple to capture data patterns." }],
      revision_notes: ["Bias = underfitting; Variance = overfitting.", "Always evaluate models on holdout test sets."],
      cheat_sheet: { key_syntax: "from sklearn.model_selection import train_test_split", essential_methods: ["fit()", "predict()", "score()"], key_interview_points: ["Bias-Variance tradeoff", "Supervised vs Unsupervised"] },
      related_topics: [{ title: "Regression Models", id: "regression_models" }]
    },

    {
      id: "regression_models",
      title: "Regression Models",
      introduction: {
        what: "Regression Models are supervised learning algorithms used to predict continuous numerical target variables $y \\in \\mathbb{R}$.",
        why_created: "Originating with Carl Friedrich Gauss and Francis Galton (1800s) to model physical and biological continuous variable relationships.",
        why_needed: "Essential for estimating exact continuous quantities like stock prices, real estate valuations, sales revenue, and temperatures.",
        history: "From Ordinary Least Squares (OLS) in 1805 to modern Regularized Regression (Ridge/Lasso) and Gradient Boosted Decision Trees."
      },
      definition_beginner: "Regression is a machine learning method used to predict continuous numbers (like house prices or temperatures) based on input features.",
      definition_interview: "A supervised learning framework that models conditional expectation $E[y \\mid X] = f(X, \\beta)$ by minimizing continuous empirical loss functions (e.g. Mean Squared Error).",
      why_we_use: {
        purpose: "Continuous numerical forecasting, trend analysis, feature effect estimation.",
        benefits: ["Interpretable linear coefficients", "Smooth continuous outputs", "Built-in regularization (L1/L2)"],
        problems_solved: ["Predicts exact continuous values rather than discrete classes"],
        real_world_importance: "Used across real estate, wall street trading, demand forecasting, and engineering."
      },
      internal_working: {
        execution_flow: "Feature Ingestion -> Weight Initialization -> Hypothesis $y_{hat} = X\\beta + b$ -> Loss Calculation -> Gradient Descent Update -> Optimal Weights $\\beta^*$.",
        memory_behavior: "Stores feature matrix $X \\in \\mathbb{R}^{N \\times p}$ and coefficient vector $\\beta \\in \\mathbb{R}^p$ in RAM.",
        processing_flow: "Inputs X -> Matrix Math X * beta -> Predictions y_hat -> Error Loss -> Gradient Update.",
        diagram: `[Input Matrix X] ──> [Weights β] ──> [Hypothesis Xβ] ──> [MSE Loss] ──> [Gradient Descent]`
      },
      syntax: {
        basic: "from sklearn.linear_model import LinearRegression\nreg = LinearRegression()\nreg.fit(X_train, y_train)",
        advanced: "from sklearn.linear_model import Ridge, Lasso, ElasticNet\nreg = ElasticNet(alpha=0.1, l1_ratio=0.5).fit(X_tr, y_tr)",
        variations: ["LinearRegression()", "Ridge()", "Lasso()", "ElasticNet()", "PolynomialFeatures()"],
        keyword_explanation: "alpha is the regularization penalty strength $\\lambda$; l1_ratio balances L1 vs L2 penalties."
      },
      parameters: [
        { name: "alpha", type: "float", required: false, default_val: "1.0", description: "Constant penalty multiplier that multiplies the regularization terms." },
        { name: "l1_ratio", type: "float", required: false, default_val: "0.5", description: "ElasticNet mixing parameter (0 = L2 Ridge, 1 = L1 Lasso)." }
      ],
      return_value: {
        type: "numpy.ndarray",
        output_description: "Array of continuous predicted numerical values matching input row count.",
        examples: ["array([250000.5, 420100.0, 189000.2])"]
      },
      supported_operations: [
        "Linear Regression (OLS)",
        "Ridge (L2 Regularization)",
        "Lasso (L1 Regularization & Feature Selection)",
        "ElasticNet (L1 + L2 Hybrid)",
        "Polynomial Regression (Non-Linear Curves)",
        "Cost Function Minimization (MSE, RMSE, MAE, Huber Loss)",
        "OLS Assumptions Verification (VIF, Residual Plots)",
        "Metric Evaluation (R-Squared, Adjusted R-Squared)"
      ],
      methods: [
        {
          name: "LinearRegression.fit()",
          definition: "Computes Ordinary Least Squares (OLS) closed-form solution $\\beta = (X^T X)^{-1} X^T y$.",
          syntax: "reg.fit(X_train, y_train)",
          parameters: "X_train: (N, p) feature matrix, y_train: (N,) target vector",
          return_type: "self",
          example: "reg.fit(X, y)\nprint(reg.coef_, reg.intercept_)",
          output: "Coefficients and Intercept",
          best_practice: "Scale features before fitting if using regularized variants (Ridge/Lasso).",
          time_complexity: "O(p^2 N + p^3) for OLS matrix inversion",
          space_complexity: "O(p) for weights"
        },
        {
          name: "Lasso.fit()",
          definition: "Fits linear model with L1 penalty, driving uninformative feature weights to exact zero.",
          syntax: "Lasso(alpha=0.1).fit(X, y)",
          parameters: "alpha: float regularization strength",
          return_type: "self",
          example: "lasso = Lasso(alpha=0.1).fit(X, y)",
          output: "Fitted Lasso model with sparse coefficients",
          best_practice: "Use Lasso for automatic feature selection when p is large.",
          time_complexity: "O(N * p) per coordinate descent iteration",
          space_complexity: "O(p)"
        }
      ],
      formula: `\\text{OLS Cost: } J(\\beta) = \\frac{1}{2N} \\sum_{i=1}^N (y_i - X_i \\beta)^2, \\quad \\text{Lasso: } J + \\lambda \\sum |\\beta_j|, \\quad \\text{Ridge: } J + \\lambda \\sum \\beta_j^2`,
      subtopics: [
        {
          title: "1. Linear Regression & Ordinary Least Squares (OLS)",
          definition: "Fits a linear equation $y = \\beta_0 + \\beta_1 X_1 + \\dots + \\beta_p X_p + \\epsilon$ by minimizing Sum of Squared Residuals.",
          theory: "OLS finds the unique global minimum closed-form solution $\\hat{\\beta} = (X^T X)^{-1} X^T y$ where loss gradient $\\nabla_{\\beta} J = 0$.",
          math: "Derivative of MSE loss w.r.t weights yields normal equations: $X^T X \\beta = X^T y$.",
          formula: "\\hat{\\beta} = (X^T X)^{-1} X^T y",
          internal_working: "Solves matrix inversion $(X^T X)^{-1}$ or SVD decomposition.",
          code_example: "from sklearn.linear_model import LinearRegression\nimport numpy as np\nX = np.array([[1], [2], [3]])\ny = np.array([2, 4, 6])\nreg = LinearRegression().fit(X, y)\nprint('Slope:', reg.coef_[0], 'Intercept:', reg.intercept_)",
          output: "Slope: 2.0 Intercept: 0.0",
          common_mistakes: "Assuming OLS works well when features exhibit severe multicollinearity.",
          best_practices: "Check VIF (Variance Inflation Factor) to detect multicollinearity before fitting OLS."
        },
        {
          title: "2. Ridge Regression (L2 Regularization)",
          definition: "Adds a squared magnitude weight penalty $\\lambda \\sum \\beta_j^2$ to the loss function to shrink feature weights and control variance.",
          theory: "L2 regularization adds a circular constraint boundary in parameter space, shrinking weights smoothly toward zero without driving them to absolute zero.",
          math: "Loss: $J(\\beta) = \\text{MSE} + \\lambda \\sum_{j=1}^p \\beta_j^2$. Closed form: $\\hat{\\beta} = (X^T X + \\lambda I)^{-1} X^T y$.",
          formula: "\\hat{\\beta}_{\\text{Ridge}} = (X^T X + \\lambda I)^{-1} X^T y",
          internal_working: "The added $\\lambda I$ term guarantees matrix invertibility even when $X^T X$ is singular due to multicollinearity.",
          code_example: "from sklearn.linear_model import Ridge\nreg = Ridge(alpha=1.0).fit(X, y)\nprint('Ridge coefs:', reg.coef_)",
          output: "Shrunken coefficients array",
          common_mistakes: "Failing to scale features prior to fitting Ridge (features with large raw numbers absorb penalties unfairly).",
          best_practices: "Always apply `StandardScaler` before training Ridge regression."
        },
        {
          title: "3. Lasso Regression (L1 Regularization & Feature Selection)",
          definition: "Adds an absolute value weight penalty $\\lambda \\sum |\\beta_j|$ to the loss function, forcing uninformative feature weights to exact zero.",
          theory: "L1 regularization forms a diamond-shaped constraint boundary with sharp corners at coordinate axes, driving coefficients to zero for automatic feature selection.",
          math: "Loss: $J(\\beta) = \\text{MSE} + \\lambda \\sum_{j=1}^p |\\beta_j|$.",
          formula: "J(\\beta) = \\frac{1}{2N} \\sum (y_i - X_i \\beta)^2 + \\lambda \\sum_{j=1}^p |\\beta_j|",
          internal_working: "Uses Coordinate Descent optimization to iteratively minimize parameters.",
          code_example: "from sklearn.linear_model import Lasso\nreg = Lasso(alpha=0.5).fit([[1, 2], [2, 4], [3, 6]], [2, 4, 6])\nprint('Lasso coefs:', reg.coef_)",
          output: "One coefficient set to 0.0",
          common_mistakes: "Using Lasso on highly correlated feature groups (Lasso arbitrarily selects 1 feature and zeroes out the rest).",
          best_practices: "Use ElasticNet if features exhibit high correlation."
        },
        {
          title: "4. ElasticNet Regression (L1 + L2 Hybrid)",
          definition: "Combines L1 (Lasso) and L2 (Ridge) penalties into a single regularized loss function.",
          theory: "ElasticNet balances Lasso's feature selection capability with Ridge's group stability for correlated features.",
          math: "Loss: $\\text{MSE} + \\lambda \\cdot \\text{l1\\_ratio} \\sum |\\beta_j| + \\frac{\\lambda(1-\\text{l1\\_ratio})}{2} \\sum \\beta_j^2$.",
          formula: "J(\\beta) = \\text{MSE} + \\alpha \\rho \\sum |\\beta_j| + \\frac{\\alpha(1-\\rho)}{2} \\sum \\beta_j^2",
          internal_working: "Solves via coordinate descent algorithm.",
          code_example: "from sklearn.linear_model import ElasticNet\nreg = ElasticNet(alpha=0.1, l1_ratio=0.5).fit(X, y)\nprint('ElasticNet coefs:', reg.coef_)",
          output: "Balanced shrunken coefficients array",
          common_mistakes: "Not tuning `l1_ratio` via cross-validation.",
          best_practices: "Use `ElasticNetCV` to search optimal alpha and l1_ratio values automatically."
        },
        {
          title: "5. Polynomial Regression (Non-Linear Curves)",
          definition: "Transforms linear features into polynomial combinations ($X_1^2, X_1 X_2$) to fit non-linear curves using linear regression models.",
          theory: "Applies non-linear feature engineering while retaining a linear weight model structure $y = \\beta_0 + \\beta_1 X + \\beta_2 X^2$.",
          math: "Transforms feature vector $[x_1, x_2] \\rightarrow [1, x_1, x_2, x_1^2, x_1 x_2, x_2^2]$.",
          formula: "y = \\beta_0 + \\beta_1 X + \\beta_2 X^2 + \\dots + \\beta_d X^d",
          internal_working: "Generates expanded feature matrix before OLS fitting.",
          code_example: "from sklearn.preprocessing import PolynomialFeatures\nfrom sklearn.linear_model import LinearRegression\npoly = PolynomialFeatures(degree=2)\nX_poly = poly.fit_transform([[2]])\nprint('Poly expansion:', X_poly)",
          output: "Poly expansion: [[1. 2. 4.]]",
          common_mistakes: "Using polynomial degree > 4, causing extreme combinatorial feature explosion and severe overfitting.",
          best_practices: "Keep polynomial degree $\\le 3$ and pair with Ridge regularization."
        },
        {
          title: "6. Cost Functions (MSE, RMSE, MAE, Huber Loss)",
          definition: "Loss functions measuring prediction error distance between actual targets $y$ and predictions $\\hat{y}$.",
          theory: "MSE penalizes large errors quadratically. RMSE brings units back to target scale. MAE measures median absolute error robust to outliers. Huber Loss combines MSE near 0 with MAE for large errors.",
          math: "$\\text{MSE} = \\frac{1}{N} \\sum (y - \\hat{y})^2, \\quad \\text{MAE} = \\frac{1}{N} \\sum |y - \\hat{y}|$.",
          formula: "\\text{MSE} = \\frac{1}{N} \\sum_{i=1}^N (y_i - \\hat{y}_i)^2",
          internal_working: "Evaluates error residual vectors.",
          code_example: "from sklearn.metrics import mean_squared_error, mean_absolute_error\nimport numpy as np\ny_true = [10, 20, 30]\ny_pred = [12, 18, 33]\nprint('MSE:', mean_squared_error(y_true, y_pred))\nprint('MAE:', mean_absolute_error(y_true, y_pred))",
          output: "MSE: 5.666, MAE: 2.333",
          common_mistakes: "Using MSE when training datasets contain severe uncleaned extreme outliers.",
          best_practices: "Use MAE or Huber Loss when datasets contain significant outliers."
        },
        {
          title: "7. OLS Assumptions & Diagnostics (Linearity, Homoscedasticity, Normality, Multicollinearity)",
          definition: "The 5 core statistical assumptions required for OLS linear regression to be unbiased and optimal (Gauss-Markov Theorem).",
          theory: "1) Linearity (linear relationship), 2) Homoscedasticity (constant residual variance), 3) Normality of Residuals, 4) No Multicollinearity (VIF < 5), 5) No Autocorrelation (Durbin-Watson $\\approx 2$).",
          math: "\\text{VIF}_j = \\frac{1}{1 - R_j^2}",
          internal_working: "Checked via residual vs fitted plots and Variance Inflation Factor (VIF).",
          code_example: "# VIF calculation concept\n# VIF > 5-10 indicates high multicollinearity requiring feature drop or Ridge",
          output: "VIF scores array",
          common_mistakes: "Ignoring VIF score checks, leading to unstable coefficient estimates.",
          best_practices: "Drop features with VIF > 10 or apply Ridge regression."
        },
        {
          title: "8. Evaluation Metrics (R-Squared & Adjusted R-Squared)",
          definition: "Metrics quantifying the proportion of target variance explained by the regression model.",
          theory: "$R^2 = 1 - \\frac{SS_{\\text{res}}}{SS_{\\text{tot}}}$. Adjusted $R^2$ penalizes adding irrelevant features that do not improve model fit.",
          math: "R_{\\text{adj}}^2 = 1 - \\left[ \\frac{(1 - R^2)(N - 1)}{N - p - 1} \\right]",
          formula: "R_{\\text{adj}}^2 = 1 - \\frac{(1 - R^2)(N - 1)}{N - p - 1}",
          internal_working: "Compares model residual sum of squares against total variance baseline.",
          code_example: "from sklearn.metrics import r2_score\ny_true = [3, -0.5, 2, 7]\ny_pred = [2.5, 0.0, 2, 8]\nprint('R2 Score:', r2_score(y_true, y_pred))",
          output: "R2 Score: 0.948",
          common_mistakes: "Relying solely on standard $R^2$ when comparing models with different numbers of features (standard $R^2$ always increases when adding features!).",
          best_practices: "Always use Adjusted $R^2$ when evaluating multi-variable regression models."
        }
      ],
      code_examples: {
        beginner: {
          code: "from sklearn.linear_model import LinearRegression\nimport numpy as np\nX = np.array([[1], [2], [3], [4]])\ny = np.array([3, 5, 7, 9]) # y = 2x + 1\nreg = LinearRegression().fit(X, y)\nprint('Slope:', reg.coef_[0], 'Intercept:', reg.intercept_)",
          explanation: "Fitting standard OLS Linear Regression.",
          output: "Slope: 2.0 Intercept: 1.0"
        },
        intermediate: {
          code: "from sklearn.linear_model import Ridge, Lasso\nfrom sklearn.preprocessing import StandardScaler\nimport numpy as np\nX = np.array([[1, 2], [2, 4], [3, 6], [4, 8]])\ny = np.array([3, 5, 7, 9])\nX_scaled = StandardScaler().fit_transform(X)\nridge = Ridge(alpha=1.0).fit(X_scaled, y)\nlasso = Lasso(alpha=0.1).fit(X_scaled, y)\nprint('Ridge coefs:', ridge.coef_)\nprint('Lasso coefs:', lasso.coef_)",
          explanation: "Comparing Ridge L2 vs Lasso L1 coefficient shrinkage.",
          output: "Ridge retains small non-zero weights; Lasso zeroes out collinear weights."
        },
        advanced: {
          code: "from sklearn.linear_model import ElasticNetCV\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.pipeline import Pipeline\nimport numpy as np\nX = np.random.randn(100, 5)\ny = X[:, 0] * 3 + X[:, 1] * 1.5 + np.random.randn(100) * 0.1\npipe = Pipeline([('scaler', StandardScaler()), ('net', ElasticNetCV(l1_ratio=[0.1, 0.5, 0.9], cv=3))])\npipe.fit(X, y)\nprint('Best L1 Ratio:', pipe.named_steps['net'].l1_ratio_)",
          explanation: "ElasticNetCV cross-validation hyperparameter search pipeline.",
          output: "Best L1 Ratio metric."
        },
        production: {
          code: "from sklearn.linear_model import Ridge\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.metrics import r2_score, mean_squared_error\nimport numpy as np\n\ndef train_production_regressor(X_tr, y_tr, X_te, y_te):\n    pipe = Pipeline([('scaler', StandardScaler()), ('reg', Ridge(alpha=1.0))])\n    pipe.fit(X_tr, y_tr)\n    preds = pipe.predict(X_te)\n    r2 = r2_score(y_te, preds)\n    rmse = np.sqrt(mean_squared_error(y_te, preds))\n    return pipe, {'r2': r2, 'rmse': rmse}\n\nX_tr, y_tr = np.random.randn(80, 3), np.random.randn(80)\nX_te, y_te = np.random.randn(20, 3), np.random.randn(20)\nmodel, metrics = train_production_regressor(X_tr, y_tr, X_te, y_te)\nprint('Production Model Evaluated Metrics:', metrics)",
          explanation: "Production regularized regression training and evaluation function.",
          output: "Production Model Evaluated Metrics: {'r2': ..., 'rmse': ...}"
        }
      },
      real_project_example: {
        title: "Real Estate Housing Price Estimation Engine",
        description: "Applies Ridge regression with StandardScaler preprocessing to estimate property values based on square footage, bedrooms, and location coordinates.",
        code: "from sklearn.pipeline import Pipeline\nfrom sklearn.linear_model import Ridge\nmodel = Pipeline([('scaler', StandardScaler()), ('reg', Ridge(alpha=10.0))])"
      },
      common_mistakes: [
        { mistake: "Failing to scale features prior to fitting Lasso or Ridge regression.", fix: "Always apply `StandardScaler` first so regularization penalties apply equally across features." },
        { mistake: "Using standard R-Squared instead of Adjusted R-Squared when adding multiple features.", fix: "Use Adjusted R-Squared to penalize non-informative extra variables." }
      ],
      best_practices: [
        "Always scale features before regularized regression (Ridge, Lasso, ElasticNet).",
        "Check VIF (Variance Inflation Factor < 5) to ensure no severe multicollinearity."
      ],
      performance_tips: [
        "Use `RidgeCV` or `LassoCV` to compute optimal alpha values efficiently during cross-validation.",
        "Use Coordinate Descent solver for high-dimensional Lasso regressions."
      ],
      advantages: ["Extremely fast", "Highly interpretable coefficients", "L1 Lasso performs automatic feature selection"],
      limitations: ["Assumes linear feature-target relationships unless polynomial features are created"],
      comparison_table: [
        { feature: "Penalty Term", this_concept: "L1 Lasso (Absolute)", alternate: "L2 Ridge (Squared)", winner: "Lasso for Feature Selection" },
        { feature: "Weight Zeroing", this_concept: "Yes (Exact Zero)", alternate: "No (Smooth Shrinkage)", winner: "Lasso" },
        { feature: "Multicollinearity Handling", this_concept: "Selects 1 arbitrary feature", alternate: "Shrinks weights together", winner: "Ridge" }
      ],
      interview_questions: [
        {
          q: "1. Explain the difference between Ridge (L2) and Lasso (L1) Regularization.",
          a: "Ridge adds a squared penalty $\\lambda \\sum \\beta_j^2$, shrinking coefficients smoothly toward zero without setting them to 0. Lasso adds an absolute penalty $\\lambda \\sum |\\beta_j|$, driving uninformative feature weights to exact zero for automatic feature selection.",
          why_asked: "Core machine learning interview question asked in almost every MNC technical round.",
          common_mistake: "Stating that Ridge sets weights to zero."
        },
        {
          q: "2. Why is Adjusted R-Squared preferred over standard R-Squared in multi-variable regression?",
          a: "Standard $R^2$ monotonically increases whenever any new feature is added, even if irrelevant. Adjusted $R^2$ includes a penalty term for the number of parameters $p$, increasing only if the new feature improves model fit beyond random chance.",
          why_asked: "Tests understanding of model complexity evaluation.",
          common_mistake: "Confusing R-Squared with correlation coefficient."
        },
        {
          q: "3. What are the 5 core OLS assumptions under the Gauss-Markov Theorem?",
          a: "1) Linearity, 2) Homoscedasticity (constant error variance), 3) Independence / No Autocorrelation, 4) Normality of Residuals, 5) No Multicollinearity (VIF < 5).",
          why_asked: "Evaluates statistical modeling rigor.",
          common_mistake: "Confusing normality of features with normality of residual errors."
        },
        {
          q: "4. What is the closed-form Normal Equation for OLS Linear Regression?",
          a: "$\\hat{\\beta} = (X^T X)^{-1} X^T y$. It computes exact optimal weights by setting the gradient of MSE loss to zero.",
          why_asked: "Tests mathematical linear algebra foundations.",
          common_mistake: "Forgetting the matrix transpose $X^T$."
        },
        {
          q: "5. When should you use ElasticNet over Lasso or Ridge?",
          a: "Use ElasticNet when datasets contain high-dimensional, strongly correlated feature groups. Lasso arbitrarily picks one feature; ElasticNet stabilizes selection by combining L1 and L2 penalties.",
          why_asked: "Assesses practical algorithm selection expertise.",
          common_mistake: "Using Lasso on highly collinear data."
        }
      ],
      tricky_questions: [
        {
          q: "Tricky Q1: Why does Ordinary Least Squares (OLS) fail or produce unstable weights when $p > N$ (more features than data rows)?",
          a: "When $p > N$, the matrix $X^T X$ is singular and non-invertible (rank deficiency), making $(X^T X)^{-1}$ impossible to compute without Ridge regularization.",
          explanation: "Ridge adds $\\lambda I$, making $(X^T X + \\lambda I)$ non-singular and strictly invertible."
        },
        {
          q: "Tricky Q2: Why MUST feature scaling be applied before Ridge/Lasso, but NOT before OLS Linear Regression?",
          a: "In OLS, coefficients scale inversely to input feature units, yielding identical predictions. In Ridge/Lasso, penalty $\\lambda \\sum \\beta_j^2$ penalizes large raw feature weights unfairly.",
          explanation: "Regularization penalties require uniform feature variance."
        }
      ],
      coding_challenges: [
        {
          difficulty: "Easy",
          problem: "Fit a Linear Regression model on X=[1,2,3], y=[2,4,6] and predict for X=4.",
          input: "X, y",
          output: "8.0",
          solution: "from sklearn.linear_model import LinearRegression\nreg = LinearRegression().fit([[1],[2],[3]], [2,4,6])\nprint(reg.predict([[4]])[0])",
          complexity: "Time: O(1), Space: O(1)"
        },
        {
          difficulty: "Medium",
          problem: "Calculate MSE and R2 Score for actual vs predicted regression vectors.",
          input: "y_true, y_pred",
          output: "MSE and R2 metrics",
          solution: "from sklearn.metrics import mean_squared_error, r2_score\nmse = mean_squared_error(y_true, y_pred)\nr2 = r2_score(y_true, y_pred)",
          complexity: "Time: O(N), Space: O(1)"
        },
        {
          difficulty: "Hard",
          problem: "Build a Ridge regression cross-validation pipeline with StandardScaler.",
          input: "X, y",
          output: "Optimal alpha score",
          solution: "from sklearn.linear_model import RidgeCV\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.pipeline import Pipeline\npipe = Pipeline([('s', StandardScaler()), ('r', RidgeCV(alphas=[0.1, 1.0, 10.0]))])\npipe.fit(X, y)",
          complexity: "Time: O(N * p), Space: O(p)"
        }
      ],
      quiz: [
        {
          question: "Which regularization method can shrink feature coefficients to EXACTLY zero for automatic feature selection?",
          options: ["Ridge (L2)", "Lasso (L1)", "Ordinary Least Squares (OLS)", "Polynomial Features"],
          correct: 1,
          explanation: "Lasso (L1 regularization) uses absolute weight penalties, driving irrelevant feature coefficients to exact zero."
        },
        {
          question: "What is the primary advantage of Adjusted R-Squared over standard R-Squared?",
          options: ["It runs faster", "It penalizes adding extra non-informative features that do not improve model fit", "It converts outputs to integers", "It eliminates outliers"],
          correct: 1,
          explanation: "Adjusted R-Squared penalizes adding unnecessary variables that do not increase explanation power beyond random chance."
        }
      ],
      revision_notes: [
        "OLS normal equation: \\hat{\\beta} = (X^T X)^{-1} X^T y.",
        "L1 Lasso = Feature selection (exact zero weights).",
        "L2 Ridge = Smooth shrinkage (handles multicollinearity).",
        "Always apply StandardScaler before Ridge/Lasso/ElasticNet.",
        "Use Adjusted R-Squared for multi-variable regression evaluation."
      ],
      cheat_sheet: {
        key_syntax: "from sklearn.linear_model import LinearRegression, Ridge, Lasso, ElasticNet",
        essential_methods: ["fit()", "predict()", "score()", "mean_squared_error()", "r2_score()"],
        key_interview_points: [
          "Ridge (L2) vs Lasso (L1) vs ElasticNet",
          "OLS Normal Equation derivation",
          "Gauss-Markov 5 OLS assumptions & VIF",
          "R-Squared vs Adjusted R-Squared",
          "Feature scaling requirement for regularized models"
        ]
      },
      related_topics: [
        { title: "Machine Learning Basics", id: "ml_basics" },
        { title: "Classification Models", id: "classification_models" }
      ]
    }
  ],

  interview_questions: {
    optimised: [
      { q: "1. Explain the Bias-Variance Tradeoff mathematically and how regularization affects both components.", a: "Total Error = $\\text{Bias}^2 + \\text{Variance} + \\text{Irreducible Error}$. High bias results from overly simple models underfitting data. High variance occurs when complex models overfit training noise. Regularization ($\\lambda$) constrains parameter weights, reducing variance at the expense of a slight increase in bias to minimize total generalization error." },
      { q: "2. How does Stochastic Gradient Descent (SGD) differ from Batch Gradient Descent and Mini-Batch GD?", a: "Batch GD computes loss gradients across the entire dataset $N$ before each parameter update (slow, high memory). SGD updates weights per single sample $i$ (fast, noisy trajectory). Mini-Batch GD updates weights per batch of size $B$ (e.g. 32, 64), balancing vectorization speed and stable convergence." },
      { q: "3. What is the difference between L1 (Lasso) and L2 (Ridge) Regularization?", a: "L2 Ridge adds a squared penalty $\\lambda \\sum \\beta_j^2$, shrinking coefficients smoothly toward zero without setting them to 0. L1 Lasso adds an absolute penalty $\\lambda \\sum |\\beta_j|$, driving uninformative feature weights to exact zero for automatic feature selection." },
      { q: "4. Why is Precision-Recall AUC preferred over ROC-AUC when evaluating models on imbalanced datasets?", a: "ROC-AUC plots True Positive Rate vs False Positive Rate. On highly imbalanced datasets with a large negative class, FPR remains artificially low, inflating ROC-AUC. Precision-Recall AUC focuses strictly on the positive class performance." },
      { q: "5. What are the 5 core OLS assumptions under the Gauss-Markov Theorem?", a: "1) Linearity of parameters. 2) Homoscedasticity (constant residual error variance). 3) Independence / No Autocorrelation. 4) Normality of Residuals. 5) No Multicollinearity (VIF < 5)." },
      { q: "6. How does XGBoost achieve superior speed and performance over standard Gradient Boosting Machines (GBM)?", a: "XGBoost uses 2nd-order Taylor expansion loss gradients (Hessians), hardware-aware cache block pre-fetching, column subsampling, built-in L1/L2 tree regularization, and automated handling of missing values." },
      { q: "7. What is the Curse of Dimensionality and how do PCA and t-SNE mitigate it?", a: "In high dimensions, data space volume grows exponentially, making data points sparse and distance metrics ($L_2$) equidistant. PCA applies linear orthogonal projection maximizing variance. t-SNE applies non-linear probabilistic distance matching for 2D/3D visualization." },
      { q: "8. How does Random Forest prevent overfitting compared to a single Decision Tree?", a: "Random Forest builds an ensemble of decorrelated decision trees using Bagging (Bootstrap Aggregation) and Random Subspace method (selecting a random subset $\\sqrt{p}$ of features per split), reducing total variance through averaging." },
      { q: "9. What is SMOTE (Synthetic Minority Over-sampling Technique) and how does it prevent overfitting?", a: "SMOTE creates synthetic minority samples by selecting k-nearest neighbors in feature space and interpolating new feature points along line segments connecting neighbors, avoiding exact duplicate duplication." },
      { q: "10. Explain the mathematical intuition behind Support Vector Machine (SVM) Kernel Trick.", a: "The Kernel Trick maps non-linearly separable input data $X$ into a higher-dimensional feature space $\\Phi(X)$ via kernel functions $K(x_i, x_j) = \\langle \\Phi(x_i), \\Phi(x_j) \\rangle$ without explicitly computing high-dimensional coordinates." },
      { q: "11. What is the difference between Hard Margin and Soft Margin SVM?", a: "Hard Margin SVM requires data to be strictly linearly separable with zero misclassifications. Soft Margin SVM introduces slack variables $\\xi_i$ and penalty parameter $C$ allowing controlled misclassifications." },
      { q: "12. How does K-Means Clustering assign cluster centroids and why is K-Means++ initialization necessary?", a: "K-Means minimizes Within-Cluster Sum of Squares (WCSS) iteratively. Standard random initialization can cause convergence to poor local minima. K-Means++ selects initial centroids with probabilities proportional to squared distance from existing centroids." },
      { q: "13. What is the difference between Parametric and Non-Parametric Machine Learning models?", a: "Parametric models (Linear Regression, Logistic Regression) summarize data with a fixed number of parameters $\\theta$. Non-Parametric models (KNN, Decision Trees, SVM with RBF kernel) grow parameters dynamically with training dataset size." },
      { q: "14. What is the difference between Bagging and Boosting?", a: "Bagging (Random Forest) trains independent base models in parallel on bootstrap samples to reduce variance. Boosting (AdaBoost, Gradient Boosting) trains sequential base models iteratively, where each model focuses on correcting residual errors of preceding models to reduce bias." },
      { q: "15. What is SHAP (SHapley Additive exPlanations) and how is it used in Explainable AI (XAI)?", a: "SHAP calculates game-theoretic Shapley values to compute the marginal contribution of each feature to an individual model prediction, providing local feature attribution." },
      { q: "16. How does Early Stopping prevent neural network and boosted tree overfitting?", a: "Early Stopping monitors validation loss during training iterations. If validation loss fails to improve after a set number of epochs (patience), training terminates, returning parameter weights from the best validation checkpoint." },
      { q: "17. What is the Silhouette Coefficient in Clustering?", a: "Silhouette Score $s = \\frac{b - a}{\\max(a, b)}$ measures how similar an object is to its own cluster ($a$) compared to neighboring clusters ($b$). Values near +1 indicate dense, well-separated clusters." },
      { q: "18. How does Isolation Forest detect anomalies in high-dimensional data?", a: "Isolation Forest isolates anomalies by randomly selecting a feature and split value. Because anomalies are sparse and different, they require fewer random partition splits to isolate than normal instances." },
      { q: "19. What is the role of Learning Rate Schedulers (e.g. Cosine Annealing, ReduceLROnPlateau)?", a: "Learning rate schedulers decay step size $\\eta$ over training time, allowing fast initial progress followed by fine-grained gradient updates near local minima." },
      { q: "20. How do you design an End-to-End Machine Learning Pipeline for production deployment?", a: "Incorporate Data Ingestion -> Schema Validation -> Feature Scaling/Encoding -> Model Fitting -> Cross-Validation -> Metric Scoring -> Model Serialization -> FastAPI Microservice -> Monitoring." }
    ],
    tricky: [
      { q: "Tricky Q1. Can adding MORE features to an OLS Linear Regression model ever INCREASE Training MSE?", a: "NO! Adding features to OLS Linear Regression can NEVER increase training MSE because weights can always be set to zero. However, Test MSE can increase significantly due to high variance!" },
      { q: "Tricky Q2. Why does K-Means Clustering fail on non-spherical clusters (e.g. concentric circles or elongated ellipses)?", a: "K-Means uses Euclidean distance, implicitly assuming clusters are spherical and equal size. Use DBSCAN or Gaussian Mixture Models (GMM) for non-spherical geometries." },
      { q: "Tricky Q3. What subtle bug occurs if you apply `OneHotEncoder(drop='first')` when using Ridge or Lasso Regression?", a: "Dropping the first dummy column prevents dummy variable multicollinearity in OLS, but in Lasso/Ridge, dropping a column alters the relative L1/L2 penalty assigned to categories!" },
      { q: "Tricky Q4. Why can a Decision Tree achieve 100% training accuracy while performing terribly on test data?", a: "Without max_depth constraints or min_samples_leaf pruning, a decision tree will split until every leaf node contains a single sample, memorizing noise (overfitting)." },
      { q: "Tricky Q5. Why does standard Feature Scaling (StandardScaler) fail when applied to sparse matrices produced by OneHotEncoder or TF-IDF?", a: "`StandardScaler(with_mean=True)` subtracts column means, converting explicit zeroes to dense non-zero floats and destroying sparse matrix RAM efficiency! Use `with_mean=False` or `MaxAbsScaler`." },
      { q: "Tricky Q6. In Logistic Regression, why does setting regularization $C \\rightarrow \\infty$ approach unregularized maximum likelihood?", a: "$C$ is inverse regularization strength $C = \\frac{1}{\\lambda}$. As $C \\rightarrow \\infty$, penalty $\\lambda \\rightarrow 0$, eliminating regularization penalties." },
      { q: "Tricky Q7. What happens if you evaluate a time-series forecasting model using standard K-Fold Cross-Validation?", a: "Standard K-Fold shuffles data randomly, using future data points to predict past data points (Data Leakage / Lookahead Bias). Use `TimeSeriesSplit` (rolling origin) instead." },
      { q: "Tricky Q8. Why is Naive Bayes called 'Naive'?", a: "It naïvely assumes that all input features are conditionally independent given the class label $P(x_1, x_2 \\mid y) = P(x_1 \\mid y) P(x_2 \\mid y)$, an assumption rarely true in real data." },
      { q: "Tricky Q9. What happens if you train an SVM with an RBF kernel setting gamma $\\rightarrow \\infty$?", a: "As $\\gamma \\rightarrow \\infty$, the RBF kernel Gaussian radius shrinks to 0. Every training sample becomes its own support vector, causing extreme overfitting." },
      { q: "Tricky Q10. Why does PCA component loading sign (+/-) sometimes flip across different training runs or OS platforms?", a: "Eigenvectors $v$ and $-v$ satisfy the eigenvalue equation $A v = \\lambda v$ equally. The sign orientation is mathematically arbitrary and does not change variance explained." }
    ]
  }
};
