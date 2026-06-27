import { Image } from 'expo-image';
import { X } from 'lucide-react-native';
import { Modal, Pressable, StyleSheet, View } from 'react-native';

import { colors } from '@/lib/theme';

type Props = {
  visible: boolean;
  source?: any;
  onClose: () => void;
  label: string;
};

export function ImageModal({ visible, source, onClose, label }: Props) {
  if (!source) return null;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Pressable accessibilityRole="button" accessibilityLabel="이미지 닫기" onPress={onClose} style={styles.close}>
          <X size={24} color={colors.white} />
        </Pressable>
        <Image accessibilityLabel={label} source={source} contentFit="contain" style={styles.image} transition={180} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.86)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
  },
  close: {
    position: 'absolute',
    top: 54,
    right: 20,
    zIndex: 2,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  image: {
    width: '100%',
    height: '82%',
  },
});
