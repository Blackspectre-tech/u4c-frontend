// src/routes.js
import About from "./pages/about";
import Home2 from "./pages/index-2";
import NewsStandard from "./pages/news-standard";
import Project1 from "./pages/project-1";
import ProjectDetails from "./pages/project-details";

import Terms from "./pages/tandcs";
import PrivacyPolicy from "./pages/privacy";
import PasswordResetSuccess from "./pages/password";

const routes = [
  { path: "/index-2", Component: Home2 },
  { path: "/about", Component: About },
  //   { path: "/forgot-password", Component: ForgotPassword },
  // { path: "/login", Component: Login },
  { path: "/cvp", Component: NewsStandard },
  { path: "/explore", Component: Project1 },
  { path: "/project-details", Component: ProjectDetails },
  //   { path: "/sign-up", Component: SignUpPage },
  { path: "/terms-and-conditions", Component: Terms },
  { path: "/privacy-policy", Component: PrivacyPolicy },
  { path: "/password", Component: PasswordResetSuccess },
];

export default routes;
