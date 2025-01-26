import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Get an item from async storage, automatically deserialising from JSON.
 */
export async function getItem<DeserialisedResult>(
  key: string,
  { handleError = true } = {}
) {
  try {
    var result = await AsyncStorage.getItem(key);
  } catch (error) {
    if (!handleError) {
      throw error;
    }

    console.error(error);
    return null;
  }

  if (result) {
    try {
      return JSON.parse(result) as DeserialisedResult;
    } catch (error) {
      if (!handleError) {
        throw error;
      }
    }
  }

  return null;
}

/**
 * Set an item in async storage, automatically serialising to JSON.
 */
export async function setItem<DeserialisedResult>(
  key: string,
  data: DeserialisedResult,
  { handleError = true } = {}
) {
  let payload: string;

  try {
    payload = JSON.stringify(data);
  } catch (error) {
    if (!handleError) {
      throw error;
    }

    payload = data as unknown as string;
  }

  try {
    await AsyncStorage.setItem(key, payload);
  } catch (error) {
    if (!handleError) {
      throw error;
    }

    console.error(error);
  }
}
