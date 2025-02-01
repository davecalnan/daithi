import { Checkbox } from "@/components/ui/checkbox";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { H1 } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { useId, useState } from "react";
import {
  InputAccessoryView,
  Keyboard,
  KeyboardAvoidingView,
  View,
  Button as RNButton,
  TouchableWithoutFeedback,
} from "react-native";
import { isToday } from "date-fns";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { useRouter } from "expo-router";
import { api } from "@/features/api/client";

export default function LogNappy() {
  const router = useRouter();

  const [changedAt, setChangedAt] = useState(new Date());
  const [isWet, setIsWet] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [notes, setNotes] = useState("");

  const isWetLabelId = useId();
  const isDirtyLabelId = useId();
  const notesLabelId = useId();
  const inputAccessoryViewID = useId();

  async function handleSubmit() {
    const payload = {
      changed_at: changedAt.toISOString(),
      is_wet: isWet,
      is_dirty: isDirty,
      notes,
    };

    try {
      const response = await api.post("nappies", payload);

      if (response.response.ok) {
        router.replace("/nappies");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <SafeAreaView className="p-8 flex-1 justify-between bg-gray-100">
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View className="flex-1">
          <H1>Log a Nappy</H1>
          <View className="mt-4 gap-12">
            <DateTimeField value={changedAt} onChange={setChangedAt} />
            <View className="flex-row items-center">
              <View className="flex-1 flex-row items-center gap-3">
                <Checkbox
                  checked={isWet}
                  onCheckedChange={setIsWet}
                  aria-labelledby={isWetLabelId}
                />
                <Label nativeID={isWetLabelId} onPress={() => setIsWet(!isWet)}>
                  Wet
                </Label>
              </View>
              <View className="flex-1 flex-row items-center gap-2">
                <Checkbox
                  checked={isDirty}
                  onCheckedChange={setIsDirty}
                  aria-labelledby={isDirtyLabelId}
                />
                <Label
                  nativeID={isDirtyLabelId}
                  onPress={() => setIsDirty(!isDirty)}
                >
                  Dirty
                </Label>
              </View>
            </View>
            <View>
              <Label nativeID={notesLabelId}>Notes</Label>
              <Textarea
                value={notes}
                onChangeText={setNotes}
                aria-labelledby={notesLabelId}
                inputAccessoryViewID={inputAccessoryViewID}
              />
              <InputAccessoryView nativeID={inputAccessoryViewID}>
                <View className="flex-row justify-end pr-4 pb-1">
                  <RNButton onPress={() => Keyboard.dismiss()} title="Done" />
                </View>
              </InputAccessoryView>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>

      <View className="flex-shrink-0 gap-3 mb-16">
        <Button variant="outline" onPress={() => router.back()}>
          <Text>Cancel</Text>
        </Button>
        <Button onPress={handleSubmit}>
          <Text>Submit</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}

const HEIGHT = 16;
const BORDER_WIDTH = 1;

type DateTimeFieldProps = {
  value: Date;
  onChange: (date: Date) => void;
};

function DateTimeField({ value, onChange }: DateTimeFieldProps) {
  const labelId = useId();

  const handleChange: React.ComponentProps<
    typeof DateTimePicker
  >["onChange"] = (event, date) => {
    if (!date) return;

    onChange(date);
  };

  return (
    <View>
      <Label nativeID={labelId}>Changed at</Label>
      <View className="flex-row gap-4">
        <View className="mt-3 rounded-lg" style={{ borderWidth: BORDER_WIDTH }}>
          <View
            className={cn(
              "absolute left-2 bg-gray-100 border rounded-md px-1",
              !isToday(value) && "invisible"
            )}
            style={{
              height: HEIGHT,
              top: -(HEIGHT + BORDER_WIDTH) / 2,
              borderWidth: BORDER_WIDTH,
            }}
          >
            <Text className="text-xs">Today</Text>
          </View>
          <DateTimePicker
            value={value}
            onChange={handleChange}
            mode="date"
            style={{ marginLeft: -10 }}
            aria-labelledby={labelId}
          />
        </View>

        <View className="mt-3 rounded-lg" style={{ borderWidth: BORDER_WIDTH }}>
          <DateTimePicker
            aria-labelledby={labelId}
            value={value}
            onChange={handleChange}
            mode="time"
            is24Hour
            style={{ marginLeft: -10 }}
          />
        </View>
      </View>
    </View>
  );
}
