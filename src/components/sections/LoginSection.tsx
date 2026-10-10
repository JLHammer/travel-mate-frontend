import { useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import { LoginForm } from "../ui/form/LoginForm";
import { SubmitButton } from "../ui/form/formStyles";
import { Loader } from "../ui/Loader";
import { PageTitle } from "../ui/PageTitle";
import { PageLayout, PageText } from "../layout/PageLayout";
import { useAuth } from "../../hooks/useAuth";
import { useTranslation } from "../../hooks/useTranslation";
import { DEMO_LOGIN } from "../../data/users";
import { usePaths } from "../../hooks/usePaths";
import { tokens } from "../../styles/theme";

const DemoHint = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.mobile.spacing.xxs};
  width: fit-content;
  max-width: 100%;
  padding: ${tokens.mobile.spacing.s} ${tokens.mobile.spacing.m};
  border-radius: ${tokens.radii.button};
  background-color: ${({ theme }) => theme.colors.primarySoft};
  font-size: ${tokens.mobile.fontSizes.small};
`;

const DemoCredentials = styled.p`
  display: flex;
  gap: ${tokens.mobile.spacing.m};

  ${tokens.media.tablet} {
    gap: ${tokens.tablet.spacing.l};
  }

  ${tokens.media.tabletOnly} {
    justify-content: center;
  }
`;

export const LoginSection = () => {
  const { t } = useTranslation();
  const paths = usePaths();
  const { user, isLoading, logout } = useAuth();
  const location = useLocation();
  // ProtectedRoute sends logged-out users here with the page they tried to open
  const fromFavorites = (location.state as { from?: string } | null)?.from === paths.favorites;

  useEffect(() => {
    if (!fromFavorites || user || isLoading) return;
    // A fixed id stops StrictMode's double effect from showing the toast twice
    toast.info(t.login.favoritesRequired, { id: "favorites-login-required" });
  }, [fromFavorites, user, isLoading, t]);

  const handleLogout = async () => {
    await logout();
    toast.success(t.login.loggedOut);
  };

  if (isLoading) {
    return (
      <>
        <PageTitle title={t.nav.login} />
        <Loader />
      </>
    );
  }

  if (user) {
    return (
      <PageLayout
        title={t.nav.profile}
        heading={t.login.profileTitle}
        intro={<PageText>{t.login.loggedInAs(`${user.firstName} ${user.lastName}`)}</PageText>}
      >
        <SubmitButton type="button" onClick={handleLogout}>
          {t.login.logout} <LogOut />
        </SubmitButton>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title={t.nav.login}
      heading={t.login.title}
      centerOnTablet
      intro={
        <DemoHint>
          <p>{t.login.demoHint}</p>
          <DemoCredentials>
            <span>
              {t.login.labels.email}: {DEMO_LOGIN.email}
            </span>
            <span>
              {t.login.labels.password}: {DEMO_LOGIN.password}
            </span>
          </DemoCredentials>
        </DemoHint>
      }
    >
      <LoginForm />
    </PageLayout>
  );
};
