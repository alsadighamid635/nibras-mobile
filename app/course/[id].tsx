import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import { COURSES } from "@/data/courses";

export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const course = COURSES.find((c) => c.id === id);

  if (!course) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>الدورة غير موجودة</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backLink}>العودة</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + (Platform.OS === "web" ? 67 : 16) }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-forward" size={22} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>تفاصيل الدورة</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        {/* Icon & Name */}
        <View style={styles.hero}>
          <Text style={styles.heroIcon}>{course.icon}</Text>
          <View style={styles.catBadge}>
            <Text style={styles.catText}>{course.category}</Text>
          </View>
          <Text style={styles.courseName}>{course.name}</Text>
          <Text style={styles.courseNameEn}>{course.nameEn}</Text>
        </View>

        {/* Info Cards */}
        <View style={styles.infoRow}>
          <View style={styles.infoCard}>
            <Ionicons name="time" size={22} color={Colors.primaryLighter} />
            <Text style={styles.infoValue}>{course.duration}</Text>
            <Text style={styles.infoLabel}>المدة</Text>
          </View>
          <View style={styles.infoCard}>
            <Ionicons name="people" size={22} color={Colors.primaryLighter} />
            <Text style={styles.infoValue}>{course.members}</Text>
            <Text style={styles.infoLabel}>عضو</Text>
          </View>
          <View style={styles.infoCard}>
            <Ionicons name="ribbon" size={22} color={Colors.primaryLighter} />
            <Text style={styles.infoValue}>معتمد</Text>
            <Text style={styles.infoLabel}>شهادة</Text>
          </View>
        </View>

        {/* Description */}
        <View style={styles.descCard}>
          <Text style={styles.descTitle}>عن الدورة</Text>
          <Text style={styles.descText}>{course.description}</Text>
        </View>

        {/* Features */}
        <View style={styles.featuresCard}>
          <Text style={styles.descTitle}>ماذا ستتعلم؟</Text>
          {["مهارات عملية وتطبيقية", "محتوى محدّث باستمرار", "دعم المدربين المتخصصين", "شهادة إتمام معتمدة"].map((f) => (
            <View key={f} style={styles.featureRow}>
              <Ionicons name="checkmark-circle" size={18} color={Colors.primaryLighter} />
              <Text style={styles.featureText}>{f}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.registerBtn}
          onPress={() => router.push({ pathname: "/(tabs)/register", params: { course: course.id } })}
        >
          <Ionicons name="person-add" size={20} color={Colors.white} />
          <Text style={styles.registerText}>سجل في هذه الدورة</Text>
        </TouchableOpacity>

        <View style={{ height: Platform.OS === "web" ? 34 : 24 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.gray50 },
  header: {
    backgroundColor: Colors.primary, paddingHorizontal: 16, paddingBottom: 16,
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
  },
  backBtn: { width: 40, height: 40, alignItems: "center", justifyContent: "center" },
  headerTitle: { fontSize: 17, fontFamily: "Cairo_700Bold", color: Colors.white },
  body: { flex: 1 },
  hero: { backgroundColor: Colors.white, padding: 24, alignItems: "center", borderBottomWidth: 1, borderBottomColor: Colors.gray100 },
  heroIcon: { fontSize: 64, marginBottom: 12 },
  catBadge: { backgroundColor: Colors.primaryBg, paddingHorizontal: 14, paddingVertical: 4, borderRadius: 20, marginBottom: 12 },
  catText: { fontSize: 13, fontFamily: "Cairo_600SemiBold", color: Colors.primary },
  courseName: { fontSize: 22, fontFamily: "Cairo_700Bold", color: Colors.gray800, textAlign: "center" },
  courseNameEn: { fontSize: 14, color: Colors.gray400, marginTop: 4, fontFamily: "Cairo_400Regular" },
  infoRow: { flexDirection: "row", padding: 16, gap: 12 },
  infoCard: {
    flex: 1, backgroundColor: Colors.white, borderRadius: 16, padding: 16, alignItems: "center",
    shadowColor: "#000", shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, elevation: 2,
  },
  infoValue: { fontSize: 16, fontFamily: "Cairo_700Bold", color: Colors.gray800, marginTop: 6 },
  infoLabel: { fontSize: 11, color: Colors.gray400, marginTop: 2, fontFamily: "Cairo_400Regular" },
  descCard: {
    backgroundColor: Colors.white, margin: 16, marginTop: 0, borderRadius: 18, padding: 18,
    shadowColor: "#000", shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, elevation: 2,
  },
  descTitle: { fontSize: 16, fontFamily: "Cairo_700Bold", color: Colors.primary, marginBottom: 10, textAlign: "right" },
  descText: { fontSize: 14, color: Colors.gray600, lineHeight: 24, textAlign: "right", fontFamily: "Cairo_400Regular" },
  featuresCard: {
    backgroundColor: Colors.white, margin: 16, marginTop: 0, borderRadius: 18, padding: 18,
    shadowColor: "#000", shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, elevation: 2,
  },
  featureRow: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 10, justifyContent: "flex-end" },
  featureText: { fontSize: 14, color: Colors.gray700, fontFamily: "Cairo_400Regular" },
  registerBtn: {
    backgroundColor: Colors.primary, margin: 16, marginTop: 4, borderRadius: 16, paddingVertical: 16,
    flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10,
    shadowColor: Colors.primary, shadowOpacity: 0.3, shadowOffset: { width: 0, height: 4 }, elevation: 6,
  },
  registerText: { color: Colors.white, fontFamily: "Cairo_700Bold", fontSize: 16 },
  notFound: { flex: 1, alignItems: "center", justifyContent: "center" },
  notFoundText: { fontSize: 18, fontFamily: "Cairo_700Bold", color: Colors.gray600 },
  backLink: { color: Colors.primary, marginTop: 12, fontFamily: "Cairo_600SemiBold", fontSize: 15 },
});
