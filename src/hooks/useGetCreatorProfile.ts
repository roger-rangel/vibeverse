import { useGetCollectionById } from './useGetCollectionById';
import { useGetProfile } from './useGetProfile';

export function useGetCreatorProfile({
  collectionId,
}: {
  collectionId: bigint;
}) {
  const { data: collection } = useGetCollectionById({ id: collectionId });
  return useGetProfile({ principal: collection?.creator.toString() });
}
