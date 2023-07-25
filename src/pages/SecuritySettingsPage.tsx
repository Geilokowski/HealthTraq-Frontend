import React from 'react';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';

const SecuritySettingsPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t('profile.nav.securitySettings.title')}</PageTitle>
    </>
  );
};

export default SecuritySettingsPage;
