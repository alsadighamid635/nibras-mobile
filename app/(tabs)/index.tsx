import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import { COURSES } from "@/data/courses";

const STATS = [
  { label: "طالب مسجل", value: "1000+", icon: "school" as const },
  { label: "دورة تدريبية", value: "14", icon: "book" as const },
  { label: "مدرب متخصص", value: "20+", icon: "people" as const },
  { label: "سنوات خبرة", value: "5+", icon: "trophy" as const },
];

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero */}
      <View style={[styles.hero, { paddingTop: insets.top + (Platform.OS === "web" ? 67 : 24) }]}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>ن</Text>
        </View>
        <Text style={styles.heroTitle}>مؤسسة النبراس التعليمية</Text>
        <Text style={styles.heroSubtitle}>El-Nibras Educational Foundation</Text>
        <Text style={styles.heroDesc}>نبراس المعرفة يضيء طريق المستقبل</Text>
        <View style={styles.heroBtns}>
          <TouchableOpacity
            style={styles.btnPrimary}
            onPress={() => router.push("/(tabs)/register")}
          >
            <Text style={styles.btnPrimaryText}>سجل الآن</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnOutline}
            onPress={() => router.push("/(tabs)/courses")}
          >
            <Text style={styles.btnOutlineText}>الدورات</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        {STATS.map((s) => (
          <View key={s.label} style={styles.statCard}>
            <Ionicons name={s.icon} size={22} color={Colors.primaryLighter} />
            <Text style={styles.statValue}>{s.value}</Text>
            <Text style={styles.statLabel}>{s.label}</Text>
          </View>
        ))}
      </View>

      {/* Featured Courses */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>الدورات المميزة</Text>
          <TouchableOpacity onPress={() => router.push("/(tabs)/courses")}>
            <Text style={styles.sectionLink}>عرض الكل</Text>
          </TouchableOpacity>
        </View>
        {COURSES.slice(0, 5).map((course) => (
          <TouchableOpacity
            key={course.id}
            style={styles.courseCard}
            onPress={() => router.push(`/course/${course.id}`)}
            activeOpacity={0.7}
          >
            <Text style={styles.courseIcon}>{course.icon}</Text>
            <View style={styles.courseInfo}>
              <Text style={styles.courseName}>{course.name}</Text>
              <Text style={styles.courseDesc} numberOfLines={1}>{course.description}</Text>
              <View style={styles.courseMeta}>
                <View style={styles.courseTag}>
                  <Text style={styles.courseTagText}>{course.category}</Text>
                </View>
                <Text style={styles.courseDuration}>⏱ {course.duration}</Text>
              </View>
            </View>
            <Ionicons name="chevron-back" size={18} color={Colors.gray400} />
          </TouchableOpacity>
        ))}
      </View>

      {/* CTA */}
      <TouchableOpacity
        style={styles.cta}
        onPress={() => router.push("/(tabs)/register")}
      >
        <Ionicons name="rocket" size={24} color={Colors.white} />
        <Text style={styles.ctaText}>ابدأ رحلتك التعليمية الآن</Text>
      </TouchableOpacity>

      <View style={{ height: Platform.OS === "web" ? 34 : 24 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.gray50 },
  hero: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingBottom: 36,
    alignItems: "center",
  },
  logoCircle: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: Colors.white,
    alignItems: "center", justifyContent: "center",
    marginBottom: 16,
    shadowColor: "#000", shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2, shadowRadius: 8, elevation: 8,
  },
  logoText: { fontSize: 32, fontFamily: "Cairo_700Bold", color: Colors.primary },
  heroTitle: { fontSize: 22, fontFamily: "Cairo_700Bold", color: Colors.white, textAlign: "center", marginBottom: 4 },
  heroSubtitle: { fontSize: 13, color: "#a7f3d0", marginBottom: 6, fontFamily: "Cairo_400Regular" },
  heroDesc: { fontSize: 14, color: "#d1fae5", textAlign: "center", marginBottom: 24, fontFamily: "Cairo_400Regular" },
  heroBtns: { flexDirection: "row", gap: 12 },
  btnPrimary: {
    backgroundColor: Colors.white, paddingHorizontal: 24, paddingVertical: 12,
    borderRadius: 14, shadowColor: "#000", shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 }, elevation: 3,
  },
  btnPrimaryText: { color: Colors.primary, fontFamily: "Cairo_700Bold", fontSize: 15 },
  btnOutline: {
    borderWidth: 2, borderColor: Colors.white, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 14,
  },
  btnOutlineText: { color: Colors.white, fontFamily: "Cairo_600SemiBold", fontSize: 15 },
  statsRow: {
    flexDirection: "row", backgroundColor: Colors.white,
    paddingVertical: 16, paddingHorizontal: 8,
    shadowColor: "#000", shadowOpacity: 0.06, shadowOffset: { width: 0, height: 2 }, elevation: 2,
  },
  statCard: { flex: 1, alignItems: "center", paddingHorizontal: 4 },
  statValue: { fontSize: 18, fontFamily: "Cairo_700Bold", color: Colors.primary, marginTop: 4 },
  statLabel: { fontSize: 10, color: Colors.gray500, textAlign: "center", fontFamily: "Cairo_400Regular" },
  section: { padding: 20 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 14 },
  sectionTitle: { fontSize: 18, fontFamily: "Cairo_700Bold", color: Colors.primary },
  sectionLink: { fontSize: 13, color: Colors.primaryLighter, fontFamily: "Cairo_600SemiBold" },
  courseCard: {
    backgroundColor: Colors.white, borderRadius: 16, padding: 14,
    flexDirection: "row", alignItems: "center", marginBottom: 10,
    shadowColor: "#000", shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, elevation: 2,
  },
  courseIcon: { fontSize: 32, marginLeft: 12 },
  courseInfo: { flex: 1 },
  courseName: { fontSize: 15, fontFamily: "Cairo_700Bold", color: Colors.gray800, textAlign: "right" },
  courseDesc: { fontSize: 12, color: Colors.gray500, textAlign: "right", marginTop: 2, fontFamily: "Cairo_400Regular" },
  courseMeta: { flexDirection: "row", justifyContent: "flex-end", alignItems: "center", marginTop: 6, gap: 8 },
  courseTag: { backgroundColor: Colors.primaryBg, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 20 },
  courseTagText: { fontSize: 11, color: Colors.primary, fontFamily: "Cairo_600SemiBold" },
  courseDuration: { fontSize: 11, color: Colors.gray400, fontFamily: "Cairo_400Regular" },
  cta: {
    backgroundColor: Colors.primaryLight, margin: 20, padding: 18,
    borderRadius: 18, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10,
  },
  ctaText: { color: Colors.white, fontFamily: "Cairo_700Bold", fontSize: 16 },
});
