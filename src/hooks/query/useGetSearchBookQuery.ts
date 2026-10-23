import { useQuery } from '@tanstack/react-query';

import type { GetSearchBookParams } from '../../api/getSearchBook';
import getSearchBook from '../../api/getSearchBook';

const useGetSearchBookQuery = (params: GetSearchBookParams) => {
  return useQuery({
    queryKey: ['getSearchBook', params],
    queryFn: () => getSearchBook(params),
    enabled: Boolean(params.query.trim()),
  });
};

export default useGetSearchBookQuery;
