import { Exercise } from '@app/api/auth.api';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseSpace } from '@app/components/common/BaseSpace/BaseSpace';
import { BaseTable } from '@app/components/common/BaseTable/BaseTable';
import { Status } from '@app/components/profile/profileCard/profileFormNav/nav/payments/paymentHistory/Status/Status';
import { useAppDispatch, useAppSelector } from '@app/hooks/reduxHooks';
import { doExercisesFetch } from '@app/store/slices/exerciseSlice';
import { ColumnsType } from 'antd/es/table';
import { Pagination } from 'api/table.api';
import { notificationController } from 'controllers/notificationController';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

function fancyTimeFormat(duration: number) {
  // Hours, minutes and seconds
  const hrs = ~~(duration / 3600);
  const mins = ~~((duration % 3600) / 60);
  const secs = ~~duration % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  let ret = '';

  if (hrs > 0) {
    ret += '' + hrs + ':' + (mins < 10 ? '0' : '');
  }

  ret += '' + mins + ':' + (secs < 10 ? '0' : '');
  ret += '' + secs;

  return ret;
}

const initialPagination: Pagination = {
  current: 1,
  pageSize: 10,
};

export const ExerciseTable: React.FC = () => {
  const [tableData, setTableData] = useState<{ data: Exercise[]; pagination: Pagination; loading: boolean }>({
    data: [],
    pagination: initialPagination,
    loading: false,
  });
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const exercises = useAppSelector((state) => state.exercises.exercises);

  useEffect(() => {
    dispatch(doExercisesFetch())
      .unwrap()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        notificationController.error({ message: err.message });
      });
  }, [dispatch]);

  useEffect(() => {
    console.log('test22');
  }, []);

  const fetch = useCallback(
    (pagination: Pagination) => {
      setTableData((tableData) => ({ ...tableData, loading: true }));

      const wrappedResponse = {
        data: exercises ?? [],
        pagination: {
          ...pagination,
          total: exercises?.length ?? 0,
        },
      };

      setTableData({ data: wrappedResponse.data, pagination: wrappedResponse.pagination, loading: false });
    },
    [exercises],
  );

  useEffect(() => {
    fetch(initialPagination);
  }, [fetch]);

  const handleTableChange = (pagination: Pagination) => {
    fetch(pagination);
  };

  const columns: ColumnsType<Exercise> = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: (a: Exercise, b: Exercise) => a.id - b.id,
      defaultSortOrder: 'ascend',
    },
    {
      title: 'Participant',
      dataIndex: 'participantName',
      render: (text: string) => <span>{text}</span>,
      filterMode: 'tree',
      filterSearch: true,
    },
    {
      title: 'Date',
      dataIndex: 'startTime',
      render: (text: string) => <span>{text}</span>,
      showSorterTooltip: false,
    },
    {
      title: 'Duration',
      dataIndex: 'trainingsSeconds',
      render: (text: string) => <span>{text ? fancyTimeFormat(Number(text)) : ''}</span>,
    },
    {
      title: 'Type',
      key: 'activity',
      dataIndex: 'activity',
      render: (activity: string) => (
        <BaseRow gutter={[10, 10]}>
          <BaseCol>
            <Status color={'var(--primary-color)'} text={activity} />
          </BaseCol>
        </BaseRow>
      ),
    },
    {
      title: t('tables.actions'),
      dataIndex: 'actions',
      width: '15%',
      render: () => {
        return (
          <BaseSpace>
            <BaseButton
              type="ghost"
              onClick={() => {
                notificationController.error({ message: 'Sorry, this doesnt work currently' });
              }}
            >
              {t('tables.viewHeartrate')}
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
