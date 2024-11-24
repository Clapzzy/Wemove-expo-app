import { useSharedValue } from "react-native-reanimated";

export const useDiffClamp = (scrollOffset, prev, offset, min, max): any => {
  prev.set(scrollOffset)

  // This function will run on the UI thread
  const runDiffClamp = () => {
    'worklet';
    const diff = scrollOffset - prev.value;
    prev.value = scrollOffset;

    offset.value = Math.min(
      Math.max(offset.value + diff, min),
      max
    );

    return offset.value;
  };

  return runDiffClamp;
};
