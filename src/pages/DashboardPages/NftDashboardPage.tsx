import { ExerciseTable } from '@app/components/ExerciseTable';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import React from 'react';
import * as S from './DashboardPage.styles';

const ExercisesPage: React.FC = () => {
  return (
    <>
      <PageTitle>Exercise</PageTitle>
      <BaseRow>
        <S.LeftSideCol xl={24} xxl={24} id="desktop-content">
          <BaseRow gutter={[60, 60]}>
            <BaseCol span={24}>
              <ExerciseTable />
            </BaseCol>
          </BaseRow>
        </S.LeftSideCol>
      </BaseRow>
    </>
  );
};

export default ExercisesPage;
