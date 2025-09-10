import { useEffect } from "react";
import { useSelector } from "react-redux";
import defaultIcon from "../assets/fitconnect-icon.png";

interface PageLayoutProps {
  section: "user" | "admin" | "trainer";
  children: React.ReactNode;
}

export default function PageLayout({ section, children }: PageLayoutProps) {
  const errorMessage = useSelector((state: any) => state.error.message);
  const loading = useSelector((state: any) => state.loading); // if you have a loading slice

  useEffect(() => {
    let title = "Fitconnect";
    if (section === "admin") title = "Fitconnect - Admin";
    else if (section === "trainer") title = "Fitconnect - Trainer";
    else title = "Fitconnect - Client";

    if (loading) title = "Loading... " + title;
    if (errorMessage) title = "Error! " + title;

    document.title = title;
    let link = document.querySelector<HTMLLinkElement>("link[rel='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }

    if (loading) link.href = defaultIcon;
    else if (errorMessage) link.href = defaultIcon;
    else link.href = defaultIcon;
  }, [section, loading, errorMessage]);

  return <>{children}</>;
}
