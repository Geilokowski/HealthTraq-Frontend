import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import React from 'react';
import * as S from '../Header.styles';
import { HeaderSearch } from '../components/HeaderSearch/HeaderSearch';
import { ProfileDropdown } from '../components/profileDropdown/ProfileDropdown/ProfileDropdown';

interface DesktopHeaderProps {
  isTwoColumnsLayout: boolean;
}

export const DesktopHeader: React.FC<DesktopHeaderProps> = ({ isTwoColumnsLayout }) => {
  const leftSide = isTwoColumnsLayout ? (
    <S.SearchColumn xl={16} xxl={17}>
      <h1 style={{ fontSize: '2rem' }}>Healthtraq</h1>
    </S.SearchColumn>
  ) : (
    <>
      <h1 style={{ fontSize: '2rem' }}>Healthtraq</h1>
    </>
  );

  return (
    <BaseRow justify="space-between" align="middle">
      {leftSide}

      <S.ProfileColumn xl={8} xxl={7} $isTwoColumnsLayout={isTwoColumnsLayout}>
        <BaseRow align="middle" justify="end" gutter={[5, 5]}>
          <BaseCol>
            <ProfileDropdown />
          </BaseCol>
        </BaseRow>
      </S.ProfileColumn>
    </BaseRow>
  );
};
