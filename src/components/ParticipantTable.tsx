import { Participant } from '@app/api/auth.api';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseSpace } from '@app/components/common/BaseSpace/BaseSpace';
import { BaseTable } from '@app/components/common/BaseTable/BaseTable';
import { Status } from '@app/components/profile/profileCard/profileFormNav/nav/payments/paymentHistory/Status/Status';
import { useAppDispatch, useAppSelector } from '@app/hooks/reduxHooks';
import { doExerciseRefresh, doParticipantDeletion, doParticipantsFetch } from '@app/store/slices/participantsSlice';
import { ColumnsType } from 'antd/es/table';
import { Pagination } from 'api/table.api';
import { notificationController } from 'controllers/notificationController';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const initialPagination: Pagination = {
  current: 1,
  pageSize: 10,
};

export const ParticipantTable: React.FC = () => {
  const [tableData, setTableData] = useState<{ data: Participant[]; pagination: Pagination; loading: boolean }>({
    data: [],
    pagination: initialPagination,
    loading: false,
  });
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const participants = useAppSelector((state) => state.participants.participants);

  const updateParticipants = useCallback(() => {
    dispatch(doParticipantsFetch())
      .unwrap()
      .catch((err) => {
        notificationController.error({ message: err.message });
      });
  }, [dispatch]);

  useEffect(() => {
    updateParticipants();
    const interval = setInterval(updateParticipants, 2500);
    return () => clearInterval(interval);
  }, [updateParticipants]);

  const fetch = useCallback(
    (pagination: Pagination) => {
      setTableData((tableData) => ({ ...tableData, loading: true }));

      const wrappedResponse = {
        data: participants ?? [],
        pagination: {
          ...pagination,
          total: participants?.length ?? 0,
        },
      };

      setTableData({ data: wrappedResponse.data, pagination: wrappedResponse.pagination, loading: false });
    },
    [participants],
  );

  useEffect(() => {
    fetch(initialPagination);
  }, [fetch]);

  const handleTableChange = (pagination: Pagination) => {
    fetch(pagination);
  };

  const columns: ColumnsType<Participant> = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: (a: Participant, b: Participant) => a.id - b.id,
      defaultSortOrder: 'ascend',
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      render: (text: string) => <span>{text}</span>,
      filterMode: 'tree',
      filterSearch: true,
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      render: (text: string) => <span>{text}</span>,
      showSorterTooltip: false,
    },
    {
      title: 'Exercise Count',
      dataIndex: 'exerciseCount',
    },
    {
      title: 'Source',
      key: 'dataProvider',
      dataIndex: 'dataProvider',
      render: (dataProvider: string) => (
        <BaseRow gutter={[10, 10]}>
          <BaseCol>
            <Status color={'var(--primary-color)'} text={dataProvider} />
          </BaseCol>
        </BaseRow>
      ),
    },
    {
      title: t('tables.actions'),
      dataIndex: 'actions',
      width: '15%',
      render: (text: string, record: { id: number; fetchingData: boolean }) => {
        return (
          <BaseSpace>
            <BaseButton
              type="ghost"
              disabled={record.fetchingData}
              onClick={() => dispatch(doExerciseRefresh(record.id))}
            >
              Refresh Exercises
            </BaseButton>
            <BaseButton type="default" danger onClick={() => dispatch(doParticipantDeletion(record.id))}>
              {t('tables.delete')}
            </BaseButton>
          </BaseSpace>
        );
      },
    },
  ];

  return (
    <BaseTable
      columns={columns}
      dataSource={tableData.data}
      pagination={tableData.pagination}
      loading={tableData.loading}
      onChange={handleTableChange}
      scroll={{ x: 800 }}
      bordered
    />
  );
};
