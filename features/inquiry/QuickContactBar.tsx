import { Copy, MessageCircle, Phone } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';

import { callAssociation, copyPhone, openCafe } from '@/lib/contact';
import { colors } from '@/lib/theme';
import { PrimaryButton } from '@/components/ui/PrimaryButton';

export function QuickContactBar() {
  return (
    <View style={styles.wrap}>
      <PrimaryButton label="전화 걸기" onPress={callAssociation} icon={<Phone size={18} color={colors.white} />} />
      <PrimaryButton label="네이버카페" outline onPress={openCafe} icon={<MessageCircle size={18} color={colors.primary} />} />
      <PrimaryButton label="번호 복사" outline tone={colors.inkSoft} onPress={copyPhone} icon={<Copy size={18} color={colors.inkSoft} />} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 8,
  },
});
