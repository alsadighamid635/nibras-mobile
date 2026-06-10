import { useState } from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, TextInput, Platform } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import { COURSES, CATEGORIES } from "@/data/courses";

export default function CoursesScreen() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("الكل");
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const filtered = COURSES.filter((c) => {
    const matchSearch = c.name.includes(search) || c.nameEn.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "الكل" || c.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + (Platform.OS === "web" ? 67 : 16) }]}>
        <Text style={styles.headerTitle}>الدورات التدريبية</Text>
        <Text style={styles.headerSub}>{COURSES.length} دورة متخصصة</Text>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color={Colors.gray400} />
          <TextInput
            style={styles.searchInput}
            placeholder="ابحث عن دورة..."
            placeholderTextColor={Colors.gray400}
            value={search}
            onChangeText={setSearch}
            textAlign="right"
          />
        </View>
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesScroll}
        contentContainerStyle={styles.categoriesContent}
      >
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            onPress={() => setActiveCategory(cat)}
            style={[styles.catBtn, activeCategory === cat && styles.catBtnActive]}
          >
            <Text style={[styles.catText, activeCategory === cat && styles.catTextActive]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.resultCount}>{filtered.length} دورة</Text>

      {/* List */}
      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {filtered.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="search-outline" size={48} color={Colors.gray300} />
            <Text style={styles.emptyText}>لا توجد دورات تطابق البحث</Text>
          </View>
        ) : (
          filtered.map((course) => (
            <TouchableOpacity
              key={course.id}
              style={styles.card}
              onPress={() => router.push(`/course/${course.id}`)}
              activeOpacity={0.7}
            >
              <View style={styles.cardTop}>
                <Text style={styles.cardIcon}>{course.icon}</Text>
                <View style={styles.cardTag}>
                  <Text style={styles.cardTagText}>{course.category}</Text>
                </View>
              </View>
              <Text style={styles.cardName}>{course.name}</Text>
              <Text style={styles.cardNameEn}>{course.nameEn}</Text>
              <Text style={styles.cardDesc} numberOfLines={2}>{course.description}</Text>
              <View style={styles.cardFooter}>
                <TouchableOpacity
                  style={styles.registerBtn}
                  onPress={() => router.push({ pathname: "/(tabs)/register", params: { course: course.id } })}
                >
                  <Text style={styles.registerBtnText}>سجل الآن</Text>
                </TouchableOpacity>
                <View style={styles.metaGroup}>
                  <Text style={styles.members}>{course.members} عضو</Text>
                  <Text style={styles.duration}>⏱ {course.duration}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
        <View style={{ height: Platform.OS === "web" ? 34 : 24 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.gray50 },
  header: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTitle: { fontSize: 22, fontFamily: "Cairo_700Bold", color: Colors.white, textAlign: "center" },
  headerSub: { fontSize: 13, color: "#a7f3d0", textAlign: "center", marginBottom: 14, fontFamily: "Cairo_400Regular" },
  searchBox: {
    flexDirection: "row", alignItems: "center", backgroundColor: Colors.white,
    borderRadius: 14, paddingHorizontal: 14, paddingVertical: 10, gap: 8,
  },
  searchInput: { flex: 1, fontFamily: "Cairo_400Regular", fontSize: 14, color: Colors.gray800 },
  categoriesScroll: { backgroundColor: Colors.white, maxHeight: 56 },
  categoriesContent: { paddingHorizontal: 16, paddingVertical: 10, gap: 8, flexDirection: "row" },
  catBtn: {
    paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20,
    backgroundColor: Colors.gray100, borderWidth: 1, borderColor: Colors.gray200,
  },
  catBtnActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  catText: { fontFamily: "Cairo_600SemiBold", fontSize: 13, color: Colors.gray600 },
  catTextActive: { color: Colors.white },
  resultCount: { fontSize: 12, color: Colors.gray400, textAlign: "right", paddingHorizontal: 20, paddingTop: 10, fontFamily: "Cairo_400Regular" },
  list: { flex: 1, paddingHorizontal: 16, paddingTop: 4 },
  empty: { alignItems: "center", paddingTop: 60 },
  emptyText: { fontSize: 15, color: Colors.gray400, marginTop: 12, fontFamily: "Cairo_400Regular" },
  card: {
    backgroundColor: Colors.white, borderRadius: 18, padding: 16, marginBottom: 12,
    shadowColor: "#000", shadowOpacity: 0.06, shadowOffset: { width: 0, height: 2 }, elevation: 3,
  },
  cardTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  cardIcon: { fontSize: 36 },
  cardTag: { backgroundColor: Colors.primaryBg, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  cardTagText: { fontSize: 12, color: Colors.primary, fontFamily: "Cairo_600SemiBold" },
  cardName: { fontSize: 17, fontFamily: "Cairo_700Bold", color: Colors.gray800, textAlign: "right" },
  cardNameEn: { fontSize: 12, color: Colors.gray400, textAlign: "right", marginBottom: 4, fontFamily: "Cairo_400Regular" },
  cardDesc: { fontSize: 13, color: Colors.gray600, textAlign: "right", lineHeight: 20, fontFamily: "Cairo_400Regular" },
  cardFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 12 },
  registerBtn: { backgroundColor: Colors.primary, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 10 },
  registerBtnText: { color: Colors.white, fontFamily: "Cairo_600SemiBold", fontSize: 13 },
  metaGroup: { alignItems: "flex-end", gap: 2 },
  members: { fontSize: 11, color: Colors.gray400, fontFamily: "Cairo_400Regular" },
  duration: { fontSize: 11, color: Colors.primaryLighter, fontFamily: "Cairo_600SemiBold" },
});
