// r3O4P16oHkm7t59M


import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Sparkles,
} from "lucide-react";

export const Login = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });

  const changeTab = (tab) => {
    setActiveTab(tab);
    setErrors({});
  };


  // email Validations
  const changeInputHandler = (event, type) => {
    const { name, value } = event.target;

    if (type === "signup") {
      setSignupInput((currentInput) => ({ ...currentInput, [name]: value }));
    } else {
      setLoginInput((currentInput) => ({ ...currentInput, [name]: value }));
    }

    setErrors((currentErrors) => ({ ...currentErrors, [name]: "" }));
  };

  // validate email

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  // validate login

  const validateLogin = (event) => {
    event.preventDefault();
    const nextErrors = {};

    if (!loginInput.email.trim()) {
      nextErrors.email = "Email address is required.";
    } else if (!validateEmail(loginInput.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!loginInput.password) {
      nextErrors.password = "Password is required.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      console.log("Sign in submitted:", loginInput);
    }
  };

  // validate signup

  const validateSignup = (event) => {
    event.preventDefault();
    const nextErrors = {};

    if (signupInput.name.trim().length < 2) {
      nextErrors.name = "Enter your name.";
    }

    if (!signupInput.email.trim()) {
      nextErrors.email = "Email address is required.";
    } else if (!validateEmail(signupInput.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (signupInput.password.length < 8) {
      nextErrors.password = "Use at least 8 characters for your password.";
    } else if (!/(?=.*[A-Za-z])(?=.*\d)/.test(signupInput.password)) {
      nextErrors.password = "Use at least one letter and one number.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      console.log("Create account submitted:", signupInput);
    }
  };

  const inputClassName = (fieldName) =>
    errors[fieldName] ? "input-wrap input-error" : "input-wrap";



  return (
    <main className="auth-page">
      <section
        className="auth-visual"
        aria-label="Learning Management System introduction"
      >
        <div className="brand-mark">
          <span className="brand-icon">
            <BookOpen size={18} strokeWidth={2.5} />
          </span>
          <span>Learnly</span>
        </div>

        <div className="visual-copy">
          <p className="eyebrow">
            <Sparkles size={14} /> Your learning, in one place
          </p>
          <h1>
            Make progress
            <br />
            <em>feel natural.</em>
          </h1>
          <p className="visual-description">
            A calmer way to learn, teach, and keep every milestone moving
            forward.
          </p>
        </div>

        <div className="progress-card">
          <div className="progress-card-top">
            <div>
              <span className="progress-label">Your weekly rhythm</span>
              <strong>4 of 5 days</strong>
            </div>
            <span className="progress-badge">On track</span>
          </div>
          <div className="progress-bar">
            <span />
          </div>
          <div className="week-days" aria-label="Weekly progress">
            {["M", "T", "W", "T", "F"].map((day, index) => (
              <span
                className={index < 4 ? "complete" : ""}
                key={`${day}-${index}`}
              >
                {index < 4 ? <Check size={13} /> : day}
              </span>
            ))}
          </div>
        </div>

        <span className="visual-coordinate">40.7128° N, 74.0060° W</span>
      </section>

      <section className="auth-panel">
        <div className="auth-form-wrap">
          <div className="mobile-brand brand-mark">
            <span className="brand-icon">
              <BookOpen size={18} strokeWidth={2.5} />
            </span>
            <span>Learnly</span>
          </div>
          <div className="form-heading">
            <p className="form-kicker">Welcome back</p>
            <h2>Continue your journey</h2>
            <p>Sign in to pick up right where you left off.</p>
          </div>

          <div
            className="auth-tabs"
            role="tablist"
            aria-label="Authentication options"
          >
            <button
              className={activeTab === "login" ? "active" : ""}
              onClick={() => changeTab("login")}
              role="tab"
              aria-selected={activeTab === "login"}
              type="button"
            >
              Sign in
            </button>
            <button
              className={activeTab === "signup" ? "active" : ""}
              onClick={() => changeTab("signup")}
              role="tab"
              aria-selected={activeTab === "signup"}
              type="button"
            >
              Create account
            </button>
          </div>

          {activeTab === "login" ? (
            <form
              className="auth-form"
              onSubmit={validateLogin}
              role="tabpanel"
            >
              <label htmlFor="email">Email address</label>
              <div className={inputClassName("email")}>
                <Mail size={17} aria-hidden="true" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={loginInput.email}
                  onChange={(event) => changeInputHandler(event, "login")}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "login-email-error" : undefined}
                />
              </div>
              {errors.email && <p className="field-error" id="login-email-error">{errors.email}</p>}

              <div className="label-row">
                <label htmlFor="password">Password</label>
                <a href="#forgot-password">Forgot password?</a>
              </div>
              <div className={inputClassName("password")}>
                <LockKeyhole size={17} aria-hidden="true" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={loginInput.password}
                  onChange={(event) => changeInputHandler(event, "login")}
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={errors.password ? "login-password-error" : undefined}
                />
                <button
                  className="visibility-button"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
              {errors.password && <p className="field-error" id="login-password-error">{errors.password}</p>}

              <label className="remember-me">
                <input type="checkbox" />
                <span>Keep me signed in</span>
              </label>
              <button className="submit-button" type="submit">
                Sign in <ArrowRight size={17} />
              </button>
            </form>
          ) : (
            <form
              className="auth-form"
              onSubmit={validateSignup}
              role="tabpanel"
            >
              <label htmlFor="name">Full name</label>
              <div className={inputClassName("name")}>
                <BookOpen size={17} aria-hidden="true" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your full name"
                  autoComplete="name"
                  value={signupInput.name}
                  onChange={(event) => changeInputHandler(event, "signup")}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "signup-name-error" : undefined}
                />
              </div>
              {errors.name && <p className="field-error" id="signup-name-error">{errors.name}</p>}

              <label htmlFor="new-email">Email address</label>
              <div className={inputClassName("email")}>
                <Mail size={17} aria-hidden="true" />
                <input
                  id="new-email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={signupInput.email}
                  onChange={(event) => changeInputHandler(event, "signup")}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "signup-email-error" : undefined}
                />
              </div>
              {errors.email && <p className="field-error" id="signup-email-error">{errors.email}</p>}
              <label htmlFor="new-password">Create a password</label>
              <div className={inputClassName("password")}>
                <LockKeyhole size={17} aria-hidden="true" />
                <input
                  id="new-password"
                  name="password"
                  type="password"
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
                  value={signupInput.password}
                  onChange={(event) => changeInputHandler(event, "signup")}
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={errors.password ? "signup-password-error" : undefined}
                />
              </div>
              {errors.password && <p className="field-error" id="signup-password-error">{errors.password}</p>}
              <button className="submit-button" type="submit">
                Create account <ArrowRight size={17} />
              </button>
            </form>
          )}

          <p className="form-footer">
            By continuing, you agree to our{" "}
            <a href="#terms">Terms of Service</a> and{" "}
            <a href="#privacy">Privacy Policy</a>.
          </p>
        </div>
      </section>
    </main>
  );
};
