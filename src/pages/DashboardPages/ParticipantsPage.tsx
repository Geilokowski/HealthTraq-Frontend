import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import React from 'react';
import * as S from './DashboardPage.styles';
import { ParticipantTable } from '@app/components/ParticipantTable';
import { BaseCard } from '@app/components/common/BaseCard/BaseCard';

const ParticipantsPage: React.FC = () => {
  const backendBaseUrl = location.host.includes('localhost') ? 'http://localhost:8080' : 'https://geilostudies.com';
  const addNewUsersLink = backendBaseUrl + '/backend/partners/polar/start';

  return (
    <>
      <PageTitle>Participants</PageTitle>
      <BaseRow>
        <S.LeftSideCol xl={24} xxl={24} id="desktop-content">
          <BaseRow gutter={[60, 60]}>
            <BaseCol span={24}>
              <BaseCard id="step-form" title={'Add Participant'} padding="1.25rem">
                To add new users they have to login here: {addNewUsersLink}
              </BaseCard>
            </BaseCol>
            <BaseCol span={24}>
              <ParticipantTable />
            </BaseCol>
          </BaseRow>
        </S.LeftSideCol>
      </BaseRow>
    </>
  );
};

export default ParticipantsPage;
