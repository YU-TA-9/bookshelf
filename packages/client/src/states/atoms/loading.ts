import { atom, useRecoilCallback } from 'recoil';

export const requireLoadingState = atom<number>({
  key: 'requireLoadingState',
  default: 0,
});

export const useRequireLoading = () => {
  const updateAtom = useRecoilCallback(({ snapshot, set }) => async () => {
    let requireLoading = await snapshot.getPromise(requireLoadingState);
    set(requireLoadingState, requireLoading++);
  });
  return updateAtom;
};
