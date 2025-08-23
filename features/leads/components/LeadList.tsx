import LoadingSkeleton from '@/components/common/LoadingSkeleton';
import React from 'react';
import { FlatList, RefreshControl } from 'react-native';
import EmptyState from '../../../components/common/EmptyState';
import ErrorState from '../../../components/common/ErrorState';
import LeadItem from './LeadItem';

interface LeadListProps {
  leads: any[];
  status: string;
  error: string | null;
  onRefresh: () => void;
}

const LeadList: React.FC<LeadListProps> = ({ leads, status, error, onRefresh }) => {
  if (status === 'loading') return <LoadingSkeleton />;
  if (error) return <ErrorState message={error} />;
  if (leads.length === 0) return <EmptyState entity={'Leads'} />;

  return (
    <FlatList
      data={leads}
      renderItem={({ item }) => <LeadItem lead={item} />}
      keyExtractor={(item) => item._id}
      refreshControl={<RefreshControl refreshing={status === 'loading'} onRefresh={onRefresh} />}
    />
  );
};

export default LeadList;