import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";
import SplashCursor from './app/components/SplashCursor.jsx';
createRoot(document.getElementById("root")!).render(
<>
<SplashCursor
  DENSITY_DISSIPATION={2.5}
  VELOCITY_DISSIPATION={3.0}
  PRESSURE={0.8}
  CURL={0.5}
  SPLAT_RADIUS={0.1}
  SPLAT_FORCE={1500}
  COLOR_UPDATE_SPEED={0}
  SHADING={true}
  RAINBOW_MODE={false}
  COLOR="#A855F7"
/>
<App />
</>

);
