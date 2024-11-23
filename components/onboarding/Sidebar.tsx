import styles from "./sidebar.module.scss";
import { WelcomeContent } from "@/components/onboarding/WelcomeContent/WelcomeContent";
import { AddPlacesContent } from "@/components/onboarding/AddPlaces/AddPlacesContent";
import { ANIMATION_VARS } from "@/app/welcome/constants";

interface SidebarProps {
  isAddPlacesPage: boolean;
  sidebarRight: boolean;
  fadeAnimation: boolean;
  changePage: () => void;
}

export const Sidebar = ({
  isAddPlacesPage,
  sidebarRight,
  fadeAnimation,
  changePage,
}: SidebarProps) => {
  const sidebarAlignment = sidebarRight
    ? {
        borderRadius: "0 1em 1em 0",
        boxShadow: "-2px 0px 10px 0px rgb(0 0 0 / 20%)",
      }
    : { left: 0 };

  return (
    <aside
      className={styles.sidebarContainer}
      style={{ ...ANIMATION_VARS, ...sidebarAlignment }}
    >
      <div style={{ opacity: fadeAnimation ? "0%" : "100%" }}>
        {isAddPlacesPage ? (
          <AddPlacesContent changePage={changePage} />
        ) : (
          <WelcomeContent />
        )}
      </div>
    </aside>
  );
};
