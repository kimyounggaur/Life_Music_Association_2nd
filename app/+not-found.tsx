import { useRouter } from 'expo-router';
import { AlertCircle } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

import { BrandHeader } from '@/components/layout/BrandHeader';
import { Screen } from '@/components/layout/Screen';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { colors } from '@/lib/theme';

export default function NotFoundScreen() {
  const router = useRouter();
  return (
    <Screen scroll={false}>
      <BrandHeader title="찾을 수 없음" back />
      <View style={styles.center}>
        <AlertCircle size={42} color={colors.inkSoft} />
        <Text style={styles.title}>화면을 찾을 수 없어요</Text>
        <Text style={styles.caption}>주소가 바뀌었거나 준비 중인 화면입니다.</Text>
        <PrimaryButton label="홈으로 돌아가기" onPress={() => router.replace('/')} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    marginTop: 14,
    color: colors.ink,
    fontSize: 20,
    fontWeight: '900',
  },
  caption: {
    marginTop: 8,
    color: colors.inkSoft,
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 22,
  },
});
