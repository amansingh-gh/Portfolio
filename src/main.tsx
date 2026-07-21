import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";
import SplashCursor from './app/components/SplashCursor.jsx';
createRoot(document.getElementById("root")!).render(
<>
<SplashCursor
  DENSITY_DISSIPATION={3.5}
  VELOCITY_DISSIPATION={2}
  PRESSURE={0.1}
  CURL={3}
  SPLAT_RADIUS={0.2}
  SPLAT_FORCE={2000}
  COLOR_UPDATE_SPEED={7}
  SHADING
  RAINBOW_MODE={true}
  COLOR="#A855F7"
/>
<App />
</>

);
