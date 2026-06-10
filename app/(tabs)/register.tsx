import { useState, useEffect } from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, Platform } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Colors } from "@/constants/colors";
import { COURSES, EDUCATION_LEVELS, GENDERS } from "@/data/courses";

const INITIAL = { fullName: "", phone: "", email: "", gender: "", age: "", educationLevel: "", course: "", city: "", notes: "" };

export default function RegisterScreen() {
  const params = useLocalSearchParams<{ course?: string }>();
  const [form, setForm] = useState(INITIAL);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [regId, setRegId] = useState("");
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (params.course) setForm((f) => ({ ...f, course: params.course! }));
  }, [params.course]);

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    if (!form.fullName.trim()) return "الاسم الكامل مطلوب";
    if (!form.phone.trim()) return "رقم الهاتف مطلوب";
    if (!form.gender) return "الجنس مطلوب";
    if (!form.age || isNaN(+form.age) || +form.age < 10 || +form.age > 80) return "العمر يجب بين 10 و 80";
    if (!form.educationLevel) return "المستوى الدراسي مطلوب";
    if (!form.course) return "يرجى اختيار الدورة";
    return null;
  };

  const submit = async () => {
    const err = validate();
    if (err) { Alert.alert("تنبيه", err); return; }
    setLoading(true);
    try {
      const course = COURSES.find((c) => c.id === form.course);
      const ref = await addDoc(collection(db, "registrations"), {
        ...form, courseName: course?.name || form.course,
        status: "pending", createdAt: serverTimestamp(),
      });
      setRegId(ref.id.substring(0, 8).toUpperCase());
      setSuccess(true);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (e) {
      Alert.alert("خطأ", "حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى.");
    } finally { setLoading(false); }
  };

  if (success) {
    const course = COURSES.find((c) => c.id === form.course);
    return (
      <View style={[styles.successContainer, { paddingTop: insets.top + (Platform.OS === "web" ? 67 : 20) }]}>
        <View style={styles.successIcon}>
          <Ionicons name="checkmark-circle" size={72} color={Colors.primaryLighter} />
        </View>
        <Text style={styles.successTitle}>تم التسجيل بنجاح!</Text>
        <Text style={styles.successSub}>مرحباً بك في مؤسسة النبراس التعليمية</Text>
        <View style={styles.successCard}>
          {[
            { l: "رقم الطلب", v: regId },
            { l: "الاسم", v: form.fullName },
            { l: "الدورة", v: course?.name || "" },
            { l: "الحالة", v: "قيد المراجعة" },
          ].map((i) => (
            <View key={i.l} style={styles.successRow}>
              <Text style={styles.successVal}>{i.v}</Text>
              <Text style={styles.successLabel}>{i.l}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.successNote}>سيتواصل معك فريقنا قريباً على رقم هاتفك</Text>
        <TouchableOpacity style={styles.newRegBtn} onPress={() => { setSuccess(false); setForm(INITIAL); }}>
          <Ionicons name="person-add" size={20} color={Colors.white} />
          <Text style={styles.newRegText}>تسجيل طالب آخر</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={[styles.header, { paddingTop: insets.top + (Platform.OS === "web" ? 67 : 16) }]}>
        <Text style={styles.headerTitle}>تسجيل طالب جديد</Text>
        <Text style={styles.headerSub}>أكمل البيانات للتسجيل في الدورة</Text>
      </View>

      <View style={styles.form}>
        {/* Personal */}
        <Text style={styles.sectionLabel}>👤 المعلومات الشخصية</Text>
        <InputField label="الاسم الكامل *" placeholder="أدخل الاسم الرباعي" value={form.fullName} onChangeText={(v) => set("fullName", v)} />
        <PickerField label="الجنس *" value={form.gender} options={GENDERS} onSelect={(v) => set("gender", v)} />
        <InputField label="العمر *" placeholder="مثال: 22" value={form.age} onChangeText={(v) => set("age", v)} keyboardType="numeric" />
        <PickerField label="المستوى الدراسي *" value={form.educationLevel} options={EDUCATION_LEVELS} onSelect={(v) => set("educationLevel", v)} />
        <InputField label="المدينة" placeholder="مدينة الإقامة" value={form.city} onChangeText={(v) => set("city", v)} />

        {/* Contact */}
        <Text style={[styles.sectionLabel, { marginTop: 16 }]}>📞 معلومات التواصل</Text>
        <InputField label="رقم الهاتف *" placeholder="+249 ..." value={form.phone} onChangeText={(v) => set("phone", v)} keyboardType="phone-pad" />
        <InputField label="البريد الإلكتروني" placeholder="example@email.com" value={form.email} onChangeText={(v) => set("email", v)} keyboardType="email-address" />

        {/* Course */}
        <Text style={[styles.sectionLabel, { marginTop: 16 }]}>📚 اختيار الدورة *</Text>
        <View style={styles.coursesGrid}>
          {COURSES.map((c) => (
            <TouchableOpacity
              key={c.id}
              style={[styles.courseOption, form.course === c.id && styles.courseOptionActive]}
              onPress={() => { set("course", c.id); Haptics.selectionAsync(); }}
            >
              <Text style={styles.courseOptionIcon}>{c.icon}</Text>
              <Text style={[styles.courseOptionName, form.course === c.id && styles.courseOptionNameActive]} numberOfLines={2}>
                {c.name}
              </Text>
              <Text style={styles.courseOptionDur}>{c.duration}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Notes */}
        <Text style={[styles.sectionLabel, { marginTop: 16 }]}>ملاحظات إضافية</Text>
        <TextInput
          style={styles.textarea}
          placeholder="أي معلومات إضافية..."
          placeholderTextColor={Colors.gray400}
          value={form.notes}
          onChangeText={(v) => set("notes", v)}
          multiline
          numberOfLines={3}
          textAlign="right"
          textAlignVertical="top"
        />

        <TouchableOpacity style={[styles.submitBtn, loading && styles.submitDisabled]} onPress={submit} disabled={loading}>
          {loading ? (
            <Text style={styles.submitText}>جارٍ التسجيل...</Text>
          ) : (
            <>
              <Ionicons name="send" size={20} color={Colors.white} />
              <Text style={styles.submitText}>إرسال طلب التسجيل</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      <View style={{ height: Platform.OS === "web" ? 34 : 24 }} />
    </ScrollView>
  );
}

function InputField({ label, placeholder, value, onChangeText, keyboardType }: any) {
  return (
    <View style={styles.fieldWrap}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={Colors.gray400}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType || "default"}
        textAlign="right"
      />
    </View>
  );
}

function PickerField({ label, value, options, onSelect }: any) {
  const [open, setOpen] = useState(false);
  return (
    <View style={styles.fieldWrap}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TouchableOpacity style={styles.input} onPress={() => setOpen(!open)}>
        <Text style={[styles.pickerText, !value && { color: Colors.gray400 }]}>
          {value || "اختر..."}
        </Text>
        <Ionicons name={open ? "chevron-up" : "chevron-down"} size={16} color={Colors.gray400} />
      </TouchableOpacity>
      {open && (
        <View style={styles.dropdown}>
          {options.map((opt: string) => (
            <TouchableOpacity
              key={opt}
              style={[styles.dropdownItem, value === opt && styles.dropdownItemActive]}
              onPress={() => { onSelect(opt); setOpen(false); }}
            >
              <Text style={[styles.dropdownText, value === opt && { color: Colors.primary }]}>{opt}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.gray50 },
  header: { backgroundColor: Colors.primary, paddingHorizontal: 20, paddingBottom: 24, alignItems: "center" },
  headerTitle: { fontSize: 22, fontFamily: "Cairo_700Bold", color: Colors.white },
  headerSub: { fontSize: 13, color: "#a7f3d0", marginTop: 4, fontFamily: "Cairo_400Regular" },
  form: { padding: 20 },
  sectionLabel: { fontSize: 16, fontFamily: "Cairo_700Bold", color: Colors.primary, marginBottom: 12, textAlign: "right" },
  fieldWrap: { marginBottom: 14 },
  fieldLabel: { fontSize: 13, fontFamily: "Cairo_600SemiBold", color: Colors.gray700, marginBottom: 6, textAlign: "right" },
  input: {
    backgroundColor: Colors.white, borderRadius: 12, borderWidth: 1, borderColor: Colors.gray200,
    paddingHorizontal: 14, paddingVertical: 12, flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    fontFamily: "Cairo_400Regular", fontSize: 14, color: Colors.gray800,
  },
  pickerText: { fontFamily: "Cairo_400Regular", fontSize: 14, color: Colors.gray800 },
  dropdown: {
    backgroundColor: Colors.white, borderRadius: 12, borderWidth: 1, borderColor: Colors.gray200,
    marginTop: 4, overflow: "hidden",
    shadowColor: "#000", shadowOpacity: 0.08, shadowOffset: { width: 0, height: 2 }, elevation: 4,
  },
  dropdownItem: { paddingHorizontal: 14, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: Colors.gray100 },
  dropdownItemActive: { backgroundColor: Colors.primaryBg },
  dropdownText: { fontFamily: "Cairo_400Regular", fontSize: 14, color: Colors.gray700, textAlign: "right" },
  coursesGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  courseOption: {
    width: "47%", padding: 12, backgroundColor: Colors.white, borderRadius: 14,
    borderWidth: 2, borderColor: Colors.gray200, alignItems: "center",
  },
  courseOptionActive: { borderColor: Colors.primary, backgroundColor: Colors.primaryBg },
  courseOptionIcon: { fontSize: 28, marginBottom: 6 },
  courseOptionName: { fontSize: 12, fontFamily: "Cairo_600SemiBold", color: Colors.gray800, textAlign: "center" },
  courseOptionNameActive: { color: Colors.primary },
  courseOptionDur: { fontSize: 10, color: Colors.gray400, marginTop: 3, fontFamily: "Cairo_400Regular" },
  textarea: {
    backgroundColor: Colors.white, borderRadius: 12, borderWidth: 1, borderColor: Colors.gray200,
    paddingHorizontal: 14, paddingVertical: 12, minHeight: 80,
    fontFamily: "Cairo_400Regular", fontSize: 14, color: Colors.gray800,
  },
  submitBtn: {
    backgroundColor: Colors.primary, borderRadius: 16, paddingVertical: 16,
    flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 24,
    shadowColor: Colors.primary, shadowOpacity: 0.3, shadowOffset: { width: 0, height: 4 }, elevation: 6,
  },
  submitDisabled: { opacity: 0.6 },
  submitText: { color: Colors.white, fontFamily: "Cairo_700Bold", fontSize: 16 },
  successContainer: { flex: 1, backgroundColor: Colors.gray50, alignItems: "center", padding: 24, paddingBottom: 40 },
  successIcon: { marginBottom: 16 },
  successTitle: { fontSize: 26, fontFamily: "Cairo_700Bold", color: Colors.primary, marginBottom: 8 },
  successSub: { fontSize: 14, color: Colors.gray500, marginBottom: 24, fontFamily: "Cairo_400Regular" },
  successCard: {
    backgroundColor: Colors.white, borderRadius: 18, padding: 20, width: "100%",
    shadowColor: "#000", shadowOpacity: 0.06, shadowOffset: { width: 0, height: 2 }, elevation: 3, marginBottom: 20,
  },
  successRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: Colors.gray100 },
  successLabel: { fontSize: 13, color: Colors.gray400, fontFamily: "Cairo_400Regular" },
  successVal: { fontSize: 14, fontFamily: "Cairo_700Bold", color: Colors.gray800 },
  successNote: { fontSize: 13, color: Colors.gray500, textAlign: "center", marginBottom: 24, fontFamily: "Cairo_400Regular" },
  newRegBtn: {
    backgroundColor: Colors.primary, borderRadius: 16, paddingVertical: 14, paddingHorizontal: 32,
    flexDirection: "row", alignItems: "center", gap: 10,
  },
  newRegText: { color: Colors.white, fontFamily: "Cairo_700Bold", fontSize: 15 },
});
